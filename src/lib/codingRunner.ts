import type { CodingTestCase } from "@/data/codingQuestions";

export type CodingTestResult = {
  label: string;
  passed: boolean;
  expected: unknown;
  actual?: unknown;
  error?: string;
  hidden?: boolean;
};

export type CodingRunResult = {
  passed: number;
  total: number;
  runtimeMs: number;
  results: CodingTestResult[];
  error?: string;
};

const WORKER_TIMEOUT_MS = 2500;

export function runJavaScriptTests(
  code: string,
  functionName: string,
  tests: CodingTestCase[],
): Promise<CodingRunResult> {
  return new Promise((resolve) => {
    if (typeof Worker === "undefined") {
      resolve({
        passed: 0,
        total: tests.length,
        runtimeMs: 0,
        results: [],
        error: "The browser code runner is unavailable in this environment.",
      });
      return;
    }

    const workerSource = `
      const deepEqual = (first, second) => {
        if (Object.is(first, second)) return true;
        if (typeof first !== typeof second) return false;
        if (first === null || second === null) return false;
        if (Array.isArray(first) && Array.isArray(second)) {
          return first.length === second.length && first.every((value, index) => deepEqual(value, second[index]));
        }
        if (typeof first === "object") {
          const firstKeys = Object.keys(first).sort();
          const secondKeys = Object.keys(second).sort();
          return deepEqual(firstKeys, secondKeys) && firstKeys.every((key) => deepEqual(first[key], second[key]));
        }
        return false;
      };

      self.onmessage = async (event) => {
        const startedAt = performance.now();
        try {
          const factory = new Function(
            event.data.code + "\\n; return typeof " + event.data.functionName + " === 'function' ? " + event.data.functionName + " : null;"
          );
          const solution = factory();
          if (typeof solution !== "function") {
            throw new Error("Expected a function named " + event.data.functionName + ".");
          }

          const results = [];
          for (const test of event.data.tests) {
            try {
              const safeInput = structuredClone(test.input);
              const actual = await Promise.resolve(solution(...safeInput));
              results.push({
                label: test.label,
                passed: deepEqual(actual, test.expected),
                expected: test.expected,
                actual,
                hidden: test.hidden,
              });
            } catch (error) {
              results.push({
                label: test.label,
                passed: false,
                expected: test.expected,
                error: error instanceof Error ? error.message : String(error),
                hidden: test.hidden,
              });
            }
          }

          self.postMessage({
            passed: results.filter((result) => result.passed).length,
            total: results.length,
            runtimeMs: Math.max(1, Math.round(performance.now() - startedAt)),
            results,
          });
        } catch (error) {
          self.postMessage({
            passed: 0,
            total: event.data.tests.length,
            runtimeMs: Math.max(1, Math.round(performance.now() - startedAt)),
            results: [],
            error: error instanceof Error ? error.message : String(error),
          });
        }
      };
    `;

    const blobUrl = URL.createObjectURL(
      new Blob([workerSource], { type: "text/javascript" }),
    );
    const worker = new Worker(blobUrl);
    const timeout = window.setTimeout(() => {
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
      resolve({
        passed: 0,
        total: tests.length,
        runtimeMs: WORKER_TIMEOUT_MS,
        results: [],
        error: "Execution timed out. Check for an infinite loop or a slow solution.",
      });
    }, WORKER_TIMEOUT_MS);

    worker.onmessage = (event: MessageEvent<CodingRunResult>) => {
      window.clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
      resolve(event.data);
    };

    worker.onerror = (event) => {
      window.clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
      resolve({
        passed: 0,
        total: tests.length,
        runtimeMs: 0,
        results: [],
        error: event.message || "The code runner stopped unexpectedly.",
      });
    };

    worker.postMessage({ code, functionName, tests });
  });
}
