import type { CodingQuestion } from "@/data/codingQuestions";

export type ComplexityGuide = {
  bruteForce: {
    time: string;
    space: string;
    explanation: string;
  };
  optimized: {
    time: string;
    space: string;
    explanation: string;
  };
  improvementSteps: string[];
  interviewTip: string;
};

const linearSteps = [
  "Avoid repeating work for the same element.",
  "Keep only the state needed for the current answer.",
  "Verify that every input item is processed a constant number of times.",
];

const guides: Record<string, ComplexityGuide> = {
  Conditionals: {
    bruteForce: { time: "O(1)", space: "O(1)", explanation: "A fixed number of business rules is checked regardless of input size." },
    optimized: { time: "O(1)", space: "O(1)", explanation: "Put overriding rules first so the function exits as soon as the answer is known." },
    improvementSteps: ["Order rules from highest priority to lowest.", "Return early for rules that override every other rule.", "Avoid calculating values that an earlier rule may discard."],
    interviewTip: "Explain rule priority before writing the first if statement.",
  },
  "Slab Simulation": {
    bruteForce: { time: "O(amount)", space: "O(1)", explanation: "A naive simulation may process every individual unit in the bill." },
    optimized: { time: "O(s)", space: "O(1)", explanation: "Process each pricing slab once, where s is the small number of slabs." },
    improvementSteps: ["Model each slab as a range.", "Consume whole ranges instead of individual units.", "Stop once all units have been charged."],
    interviewTip: "State that s is normally fixed, making the practical runtime constant.",
  },
  "Linear Scan": {
    bruteForce: { time: "O(n²)", space: "O(1)", explanation: "Starting a new scan from every position repeats work across the same values." },
    optimized: { time: "O(n)", space: "O(1)", explanation: "One running state and one best state are enough to process each value once." },
    improvementSteps: linearSteps,
    interviewTip: "Name the invariant maintained after each element.",
  },
  Transformation: {
    bruteForce: { time: "O(n²)", space: "O(n)", explanation: "Repeatedly searching the output list for duplicates can make every insertion expensive." },
    optimized: { time: "O(n)", space: "O(n)", explanation: "Normalize each item once and use a Set for average O(1) duplicate checks." },
    improvementSteps: ["Normalize each value once.", "Use hashing for membership checks.", "Preserve order by emitting only the first occurrence."],
    interviewTip: "Include the total number of characters when discussing string-processing cost.",
  },
  "Hash Set": {
    bruteForce: { time: "O(n²)", space: "O(1)", explanation: "Comparing each item with all earlier items repeats duplicate checks." },
    optimized: { time: "O(n) average", space: "O(n)", explanation: "A Set remembers every value already seen and supports average constant-time lookup." },
    improvementSteps: ["Trade extra memory for faster lookup.", "Return immediately when the required duplicate is found.", "Clarify that hash-table complexity is average-case."],
    interviewTip: "Mention the O(n²) worst case only if the interviewer asks about pathological hashing.",
  },
  "Frequency Map": {
    bruteForce: { time: "O(n²)", space: "O(k)", explanation: "Counting each distinct value with a separate scan repeats the same work." },
    optimized: { time: "O(n)", space: "O(k)", explanation: "One pass updates a frequency map, where k is the number of distinct values." },
    improvementSteps: ["Build counts in one pass.", "Keep output formatting separate from counting.", "Use k, not n, when describing map storage."],
    interviewTip: "Distinguish input size n from distinct-value count k.",
  },
  "Object Aggregation": {
    bruteForce: { time: "O(n²)", space: "O(n)", explanation: "Repeated filtering for each report field scans records more than once." },
    optimized: { time: "O(n)", space: "O(n)", explanation: "A single pass reads each object and immediately updates the report." },
    improvementSteps: linearSteps,
    interviewTip: "Describe which fields are accumulated during the one pass.",
  },
  "Running Aggregates": {
    bruteForce: { time: "O(kn)", space: "O(1)", explanation: "Calculating each of k report values with a separate scan revisits the array." },
    optimized: { time: "O(n)", space: "O(1)", explanation: "Total, maximum, and count can all be updated in the same loop." },
    improvementSteps: linearSteps,
    interviewTip: "Handle empty input before initializing a maximum from the first value.",
  },
  "Matrix Traversal": {
    bruteForce: { time: "O(rows × cols)", space: "O(rows)", explanation: "Every matrix cell must be read at least once to produce exact row totals." },
    optimized: { time: "O(rows × cols)", space: "O(rows)", explanation: "A direct nested traversal is already optimal because every cell contributes to an answer." },
    improvementSteps: ["Visit each cell exactly once.", "Accumulate one row before moving to the next.", "Do not flatten or copy the entire matrix unnecessarily."],
    interviewTip: "Sometimes improvement means proving the straightforward solution is optimal.",
  },
  Recursion: {
    bruteForce: { time: "O(n)", space: "O(n)", explanation: "A recursive call visits each nested level and keeps one stack frame per level." },
    optimized: { time: "O(n)", space: "O(1) iterative", explanation: "An explicit loop can keep the same linear time while avoiding deep call stacks." },
    improvementSteps: ["Write a clear base case.", "Ensure each call moves toward the base case.", "Use iteration when nesting may exceed the language's stack limit."],
    interviewTip: "Always count recursion-stack space in the complexity answer.",
  },
  "Stack Matching": {
    bruteForce: { time: "O(n²)", space: "O(n)", explanation: "Repeatedly removing matched pairs from a string can shift or rescan characters." },
    optimized: { time: "O(n)", space: "O(n)", explanation: "A stack matches each closing symbol with the most recent unmatched opening symbol." },
    improvementSteps: ["Use last-in, first-out order.", "Reject a mismatch immediately.", "Check that the stack is empty at the end."],
    interviewTip: "Explain why nesting requires a stack rather than a simple counter.",
  },
  "Two Pointers": {
    bruteForce: { time: "O(n × m)", space: "O(n + m)", explanation: "Repeatedly searching one input for the next value compares many pairs." },
    optimized: { time: "O(n + m)", space: "O(n + m)", explanation: "Each pointer moves only forward, so every input value is consumed once." },
    improvementSteps: ["Identify the ordering property.", "Move only the pointer whose value was consumed.", "Prove neither pointer moves backward."],
    interviewTip: "Two pointers usually need sorted data or a clearly monotonic condition.",
  },
  "Stable Compaction": {
    bruteForce: { time: "O(n²)", space: "O(1)", explanation: "Removing and reinserting values can shift the remaining array repeatedly." },
    optimized: { time: "O(n)", space: "O(n) immutable", explanation: "Collect useful values once, count removed values, then append replacements." },
    improvementSteps: ["Preserve relative order explicitly.", "Avoid splice inside a loop.", "Use an in-place write pointer when mutation is allowed."],
    interviewTip: "Ask whether modifying the input is permitted; it changes the space answer.",
  },
  "Monotonic Stack": {
    bruteForce: { time: "O(n²)", space: "O(n)", explanation: "Searching forward from every position repeats future comparisons." },
    optimized: { time: "O(n)", space: "O(n)", explanation: "Each index is pushed once and popped at most once from a monotonic stack." },
    improvementSteps: ["Store indices when distance matters.", "Define whether the stack is increasing or decreasing.", "Use the current value to resolve all invalid top entries."],
    interviewTip: "The push-once/pop-once argument is the clearest proof of O(n).",
  },
  "Sliding Window": {
    bruteForce: { time: "O(n²)", space: "O(1)", explanation: "Testing every possible interval recomputes overlapping ranges." },
    optimized: { time: "O(n)", space: "O(1)", explanation: "The right edge expands once and the left edge only moves forward to restore validity." },
    improvementSteps: ["Define what makes a window valid.", "Update the window state incrementally.", "Shrink only until the invariant becomes valid again."],
    interviewTip: "State why both pointers together move at most 2n times.",
  },
  "Prefix Sum": {
    bruteForce: { time: "O(qn)", space: "O(1)", explanation: "Summing every requested range from scratch can inspect most of the array per query." },
    optimized: { time: "O(n + q)", space: "O(n)", explanation: "One prefix array makes every inclusive range query constant time." },
    improvementSteps: ["Spend O(n) once during preprocessing.", "Use prefix[right + 1] - prefix[left].", "Choose prefix sums when the input is static and queries are numerous."],
    interviewTip: "Separate preprocessing complexity from per-query complexity.",
  },
  "Binary Search on Answer": {
    bruteForce: { time: "O(n × range)", space: "O(1)", explanation: "Trying every possible capacity runs the feasibility scan many unnecessary times." },
    optimized: { time: "O(n log range)", space: "O(1)", explanation: "A monotonic feasibility test lets binary search discard half the answer range each round." },
    improvementSteps: ["Prove feasibility is monotonic.", "Choose tight lower and upper bounds.", "Return the first feasible value, not merely any feasible value."],
    interviewTip: "Say what the search space represents before writing binary search.",
  },
  "Modified Binary Search": {
    bruteForce: { time: "O(n)", space: "O(1)", explanation: "A linear scan ignores the partially sorted structure." },
    optimized: { time: "O(log n)", space: "O(1)", explanation: "At least one half is sorted at every step, so one half can be discarded." },
    improvementSteps: ["Identify the sorted half.", "Check whether the target lies inside that half.", "Move the opposite boundary when it does not."],
    interviewTip: "Walk through the equality boundaries; most bugs are off-by-one errors.",
  },
  "Custom Sort": {
    bruteForce: { time: "O(n²)", space: "O(n)", explanation: "Repeatedly finding the next highest-priority item produces selection-sort behavior." },
    optimized: { time: "O(n log n)", space: "O(n)", explanation: "A comparator applies all ranking rules during one standard sort." },
    improvementSteps: ["Write ranking rules in priority order.", "Return zero only when all rules tie.", "Copy the input first when mutation is not allowed."],
    interviewTip: "Explain every comparator branch using one concrete pair of records.",
  },
  "Fast & Slow Pointers": {
    bruteForce: { time: "O(n)", space: "O(n)", explanation: "A visited set detects repeated nodes but stores every node encountered." },
    optimized: { time: "O(n)", space: "O(1)", explanation: "A fast pointer eventually meets a slow pointer if and only if a cycle exists." },
    improvementSteps: ["Advance slow by one and fast by two.", "Check termination before dereferencing the next node.", "Use a visited set first if the pointer proof is not yet clear."],
    interviewTip: "The optimization improves space, not time.",
  },
  "Merge Intervals": {
    bruteForce: { time: "O(n²)", space: "O(n)", explanation: "Comparing every interval with every other interval repeats overlap checks." },
    optimized: { time: "O(n log n)", space: "O(n)", explanation: "Sorting by start time makes every possible merge adjacent, followed by one scan." },
    improvementSteps: ["Sort by start time.", "Compare only with the last merged interval.", "Clarify whether touching intervals count as overlapping."],
    interviewTip: "Do not claim O(n) unless the intervals are already sorted.",
  },
  "Breadth-First Search": {
    bruteForce: { time: "O(V × (V + E))", space: "O(V)", explanation: "Trying many routes independently revisits the same vertices and edges." },
    optimized: { time: "O(V + E)", space: "O(V + E)", explanation: "BFS visits each reachable vertex once and inspects each edge a constant number of times." },
    improvementSteps: ["Build an adjacency list.", "Mark a node visited when it enters the queue.", "Use BFS only when every edge has equal cost."],
    interviewTip: "Use V and E rather than calling graph traversal simply O(n).",
  },
  "Grid DFS": {
    bruteForce: { time: "O((rc)²)", space: "O(rc)", explanation: "Launching unrestricted searches without marking cells can revisit the same region many times." },
    optimized: { time: "O(rows × cols)", space: "O(rows × cols)", explanation: "Every cell is marked once and each of its four neighbors is checked a constant number of times." },
    improvementSteps: ["Mark a cell before exploring neighbors.", "Keep boundary checks in one place.", "Use an explicit stack if recursion depth may be large."],
    interviewTip: "State that recursion stack can grow to the size of the largest island.",
  },
  "Topological Sort": {
    bruteForce: { time: "O(V² + E)", space: "O(V + E)", explanation: "Repeatedly scanning all vertices for the next available dependency wastes work." },
    optimized: { time: "O(V + E)", space: "O(V + E)", explanation: "Indegrees and a queue process each vertex and directed edge once." },
    improvementSteps: ["Build indegrees while building the graph.", "Queue every zero-indegree node.", "Detect a cycle by comparing processed count with V."],
    interviewTip: "Mention that multiple valid topological orders may exist.",
  },
  "Monotonic Window": {
    bruteForce: { time: "O(n²)", space: "O(n)", explanation: "Recounting accepted events for every timestamp repeatedly scans the active range." },
    optimized: { time: "O(n)", space: "O(limit)", explanation: "A queue head removes expired events while every accepted event enters once." },
    improvementSteps: ["Store only events that affect future decisions.", "Use a head index instead of shifting.", "Remove expired state before testing the current event."],
    interviewTip: "Be precise about whether the time window is inclusive.",
  },
  "Top K": {
    bruteForce: { time: "O(n²)", space: "O(k)", explanation: "Repeatedly searching for the next most frequent item rescans all candidates." },
    optimized: { time: "O(n log k)", space: "O(n)", explanation: "Count once, then maintain only the best k candidates in a heap." },
    improvementSteps: ["Separate counting from ranking.", "Use a heap when k is much smaller than the number of unique values.", "Define deterministic tie-breaking."],
    interviewTip: "If you sort every unique item, state O(u log u), not O(n log k).",
  },
  "1D DP": {
    bruteForce: { time: "O(2ⁿ)", space: "O(n)", explanation: "Plain recursion explores the same remaining choices many times." },
    optimized: { time: "O(n)", space: "O(1)", explanation: "A recurrence reuses previous answers and only the last two states are needed." },
    improvementSteps: ["Define the state in one sentence.", "Write the recurrence before the loop.", "Compress storage only after the recurrence is correct."],
    interviewTip: "Explain what each DP value means, not only the formula.",
  },
  "2D DP": {
    bruteForce: { time: "O(3^(m+n))", space: "O(m+n)", explanation: "Recursive editing explores overlapping insert, delete, and replace branches." },
    optimized: { time: "O(m × n)", space: "O(m × n)", explanation: "A table stores the best answer for every pair of string prefixes." },
    improvementSteps: ["Define dp[i][j] for two prefixes.", "Handle empty-prefix base cases.", "Compress to O(min(m,n)) space after the full table is understood."],
    interviewTip: "Optimization starts with eliminating repeated subproblems; space compression comes second.",
  },
  Backtracking: {
    bruteForce: { time: "O(2ⁿ)", space: "O(n)", explanation: "Each choice can branch into include and exclude paths." },
    optimized: { time: "O(2ⁿ) worst case", space: "O(n)", explanation: "Backtracking keeps exponential worst-case time but prunes branches that cannot produce a valid result." },
    improvementSteps: ["Choose, recurse, and undo in that order.", "Prune as soon as a partial answer is invalid.", "Sort candidates first when it enables stronger pruning."],
    interviewTip: "Do not promise polynomial time; explain how pruning improves practical work.",
  },
  Dijkstra: {
    bruteForce: { time: "O(V² + E)", space: "O(V + E)", explanation: "Scanning every unvisited vertex to find the next minimum costs O(V) per vertex." },
    optimized: { time: "O((V + E) log V)", space: "O(V + E)", explanation: "An adjacency list and min-heap select the next closest vertex efficiently." },
    improvementSteps: ["Use Dijkstra only for non-negative weights.", "Skip stale heap entries.", "Stop early when only one destination is needed."],
    interviewTip: "Mention why negative edges break the greedy choice.",
  },
  "Union Find": {
    bruteForce: { time: "O(n²)", space: "O(n)", explanation: "Repeated graph searches to test whether records belong together revisit components." },
    optimized: { time: "O(n α(n))", space: "O(n)", explanation: "Path compression and union by rank make each operation almost constant amortized time." },
    improvementSteps: ["Give every item an initial parent.", "Compress paths during find.", "Attach the smaller-rank tree below the larger-rank tree."],
    interviewTip: "Describe α(n) as effectively constant for practical input sizes.",
  },
};

const fallbackGuide: ComplexityGuide = {
  bruteForce: {
    time: "Approach-dependent",
    space: "Approach-dependent",
    explanation: "Start by estimating how many candidate answers are generated and how much work each candidate requires.",
  },
  optimized: {
    time: "Derive from operations",
    space: "Derive from stored state",
    explanation: "Count loop movement, recursive branches, data-structure operations, and retained state instead of guessing from the problem title.",
  },
  improvementSteps: ["Write the simplest correct approach first.", "Identify repeated work or repeated searches.", "Choose a data structure or invariant that removes that repetition."],
  interviewTip: "Explain complexity using named input variables and separate average from worst case.",
};

export function getComplexityGuide(question: CodingQuestion) {
  return guides[question.pattern] || fallbackGuide;
}
