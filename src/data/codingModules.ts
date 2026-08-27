export type CodingModule = {
  title: string;
  summary: string;
  whyItMatters: string;
  example: string;
  takeaway: string;
  mentalModel?: string;
  steps?: string[];
  complexity?: string;
  pitfalls?: string[];
  videoSearch?: string;
};

const modules: Record<string, CodingModule> = {
  arrays: {
    title: "Arrays",
    summary: "Store ordered values and access each item by its index.",
    whyItMatters: "Most interview problems begin with scanning, transforming, or reorganizing a list of data.",
    example: "A delivery app can keep today’s orders in an array and scan them to find the highest fee.",
    takeaway: "Ask whether one pass, two pointers, or a second lookup structure makes the work simpler.",
  },
  loops: {
    title: "Loops",
    summary: "Repeat a small operation while moving through input or until a condition changes.",
    whyItMatters: "A loop is the heartbeat of a large number of beginner and interview solutions.",
    example: "A fitness app loops through daily activity records to calculate a current and longest streak.",
    takeaway: "Track what changes every iteration and what must remain true after each iteration.",
  },
  counters: {
    title: "Counters",
    summary: "Maintain a number that records how many times an event has occurred.",
    whyItMatters: "Counters turn a long input into a compact summary without storing every intermediate result.",
    example: "A service can count successful requests while scanning a stream of response statuses.",
    takeaway: "Update the counter exactly once for each qualifying item and test empty input first.",
  },
  sets: {
    title: "Sets and Hash Sets",
    summary: "Remember unique values and check membership quickly.",
    whyItMatters: "Sets replace repeated nested searches in duplicate detection and membership problems.",
    example: "A payment system can reject a transaction ID that has already been processed.",
    takeaway: "Store what you have seen, check before inserting when order matters, and explain the memory cost.",
  },
  "two-pointers": {
    title: "Two Pointers",
    summary: "Move two indexes through a sequence to avoid rechecking the same pairs.",
    whyItMatters: "This pattern often turns a quadratic pair search into a linear scan after sorting or preprocessing.",
    example: "A logistics system can find two package weights closest to a truck’s capacity.",
    takeaway: "State what each pointer means and prove why moving one pointer cannot skip a valid answer.",
  },
  "string-methods": {
    title: "String Methods",
    summary: "Normalize, split, search, and rebuild text safely.",
    whyItMatters: "Real inputs are messy: names, IDs, spaces, casing, and separators must be handled deliberately.",
    example: "A signup service normalizes display names before creating a stable username.",
    takeaway: "Separate normalization from validation so each transformation can be tested independently.",
  },
  stacks: {
    title: "Stacks",
    summary: "Process the most recently added item first using push and pop.",
    whyItMatters: "Stacks model nesting, undo history, browser navigation, and expression matching.",
    example: "A configuration parser uses a stack to verify that brackets close in the correct order.",
    takeaway: "Every pop needs a matching push, and an empty stack is an important boundary case.",
  },
  recursion: {
    title: "Recursion",
    summary: "Solve a problem by reducing it to smaller versions of itself.",
    whyItMatters: "Trees, divide-and-conquer, backtracking, and many dynamic programs use recursive structure.",
    example: "A file explorer recursively visits folders and their nested children.",
    takeaway: "Write the base case first, then identify the smaller input and the work done after the call returns.",
  },
  "binary-search": {
    title: "Binary Search",
    summary: "Discard half of a sorted search space after every comparison.",
    whyItMatters: "It reduces repeated searching from linear work to logarithmic work when the ordering invariant holds.",
    example: "A product catalog can locate the first price at least as large as a customer’s budget.",
    takeaway: "Keep a precise inclusive/exclusive range invariant and verify the answer at the boundary.",
  },
  "sliding-window": {
    title: "Sliding Window",
    summary: "Maintain a moving range while adding the right edge and removing the left edge.",
    whyItMatters: "It avoids recomputing every subarray or substring from scratch.",
    example: "A monitoring dashboard can find the busiest continuous five-minute interval.",
    takeaway: "Define what makes the window valid, then shrink only until that condition is restored.",
  },
  hashing: {
    title: "Hashing",
    summary: "Use keys to associate data with fast average-time lookup.",
    whyItMatters: "Hash maps help count frequencies, pair complements, cache results, and group records.",
    example: "A marketplace groups products by category while counting inventory in one pass.",
    takeaway: "Choose a key that captures the identity of the state you need to remember.",
  },
  "dynamic-programming": {
    title: "Dynamic Programming",
    summary: "Reuse answers to overlapping subproblems instead of solving them repeatedly.",
    whyItMatters: "It turns exponential recursive exploration into predictable time and memory when the state is correct.",
    example: "A subscription planner finds the best value from a sequence of upgrade choices.",
    takeaway: "Define the state, transition, base cases, iteration order, and whether memory can be compressed.",
  },
};

const lessonDetails: Record<string, Pick<CodingModule, "mentalModel" | "steps" | "complexity" | "pitfalls">> = {
  arrays: {
    mentalModel: "An array is a row of boxes. The index tells you which box to inspect, and a scan moves a pointer from left to right.",
    steps: ["Write down the input length and the answer you need.", "Choose whether you need to read, replace, insert, or reorder values.", "State what your variables mean after each index is processed.", "Test an empty array, one item, duplicates, and the last index."],
    complexity: "Index access is O(1). One full scan is O(n). A second array or result buffer is O(n) extra space.",
    pitfalls: ["Using an index outside 0 through length - 1", "Forgetting that an empty array has no first item", "Mutating the input when the problem expects a new result"],
  },
  loops: {
    mentalModel: "A loop is a repeated promise: before every iteration, the loop condition is true; after the body, progress must move toward stopping.",
    steps: ["Choose the starting state before the loop.", "Name the value processed during one iteration.", "Update state exactly once and make visible progress.", "Trace zero iterations, one iteration, and the final iteration."],
    complexity: "One loop over n items is O(n). Nested loops multiply their ranges. Constant-size variables use O(1) extra space.",
    pitfalls: ["Off-by-one boundaries", "Changing the wrong variable inside the loop", "Returning before required state has been updated"],
  },
  counters: {
    mentalModel: "A counter compresses many observations into one number: it changes only when the current item satisfies a condition.",
    steps: ["Initialize the counter to the identity value, usually zero.", "Define exactly what event increments it.", "Scan each item once and update at the decision point.", "Check the counter for empty input and all-matching input."],
    complexity: "A counter added to one scan is O(n) time and O(1) extra space.",
    pitfalls: ["Incrementing on both branches", "Starting with one instead of zero", "Counting values instead of events"],
  },
  sets: {
    mentalModel: "A set is a memory of what has already appeared. Lookup answers ‘have I seen this?’ without scanning the old values again.",
    steps: ["Create an empty set before scanning.", "Check membership before or after insertion based on the problem’s order requirement.", "Store the current value if it should affect future iterations.", "Test a repeated first item and an all-unique input."],
    complexity: "Average membership and insertion are O(1), giving O(n) average time and O(n) extra space.",
    pitfalls: ["Inserting before checking when the second occurrence matters", "Assuming worst-case hashing is always O(1)", "Using a set when counts or key-value data are required"],
  },
  "two-pointers": {
    mentalModel: "Two pointers describe two positions whose movement eliminates impossible pairs or invalid ranges.",
    steps: ["Define what the left and right pointers represent.", "Compare the current pair or window with the target condition.", "Move only the pointer that cannot keep a valid answer after the comparison.", "Prove why the movement does not skip a solution."],
    complexity: "After any required sort, the pointer scan is O(n). The pointers use O(1) extra space unless sorting allocates memory.",
    pitfalls: ["Moving both pointers without justification", "Forgetting sortedness is required for many variants", "Not handling equal values or crossing pointers"],
  },
  "string-methods": {
    mentalModel: "Treat a string transformation as a pipeline: normalize the raw text, validate it, then build the output.",
    steps: ["Write one input and expected output pair.", "Apply one transformation at a time.", "Keep the original value available if later rules need it.", "Test spaces, casing, empty strings, and repeated separators."],
    complexity: "A transformation that visits every character is O(n) time. New strings commonly require O(n) space.",
    pitfalls: ["Changing the original string accidentally", "Using a greedy replacement that misses repeated separators", "Forgetting strings are immutable in JavaScript"],
  },
  stacks: {
    mentalModel: "A stack is a pile: the last item placed is the first item removed. This mirrors nested work and undo history.",
    steps: ["Push an item when a future closing or undo action must match it.", "Peek before popping when you need to compare.", "Pop only when the top item is the correct match.", "Finish with an empty stack when every opening item was closed."],
    complexity: "Each push and pop is O(1), so one scan is O(n) time and O(n) worst-case space.",
    pitfalls: ["Popping an empty stack", "Comparing with the wrong top item", "Returning true while unmatched items remain"],
  },
  recursion: {
    mentalModel: "Every recursive call should make the same problem smaller, while the base case gives the smallest answer directly.",
    steps: ["Write the base case before the recursive call.", "Choose the smaller input passed to the next call.", "Combine the returned answer with the current work.", "Count the maximum call depth as memory."],
    complexity: "Time and space depend on the recurrence. A linear recursive scan is often O(n) time and O(n) call-stack space.",
    pitfalls: ["Missing or unreachable base cases", "Calling with an input that does not shrink", "Ignoring stack overflow on large inputs"],
  },
  "binary-search": {
    mentalModel: "Binary search keeps a range that may contain the answer and removes half only when the ordering invariant proves it cannot be there.",
    steps: ["Define whether left and right are inclusive.", "Compute the middle without overflowing in fixed-width languages.", "Discard the impossible half using a precise comparison.", "Return the boundary that satisfies the required first/last condition."],
    complexity: "Each comparison halves the search range: O(log n) time and O(1) iterative space.",
    pitfalls: ["Infinite loops from not moving a boundary", "Returning any match when the first or last match is required", "Using binary search on unsorted data"],
  },
  "sliding-window": {
    mentalModel: "A window is a live range. Expand it to include new data, then shrink it only until the validity rule is true again.",
    steps: ["Define the window’s left and right boundaries.", "Add the right item to the state.", "While invalid, remove the left item and advance left.", "Record the best valid window after restoring validity."],
    complexity: "Each item enters and leaves the window at most once: O(n) time and O(k) state space for the maintained window data.",
    pitfalls: ["Shrinking only once instead of while invalid", "Recording an invalid window", "Forgetting to remove the left item from counts"],
  },
  hashing: {
    mentalModel: "A hash map turns a repeated question into a lookup: use a key that captures exactly the information needed for the next decision.",
    steps: ["Choose the key: value, complement, frequency, or group identity.", "Decide whether to read before writing for the current item.", "Update the map after processing the decision.", "Check missing keys, duplicate keys, and collision-independent correctness."],
    complexity: "Average O(1) lookup gives O(n) time for one scan and O(n) extra space.",
    pitfalls: ["Overwriting a value when the first occurrence matters", "Using a mutable object as a key", "Ignoring whether order must be preserved"],
  },
  "dynamic-programming": {
    mentalModel: "Dynamic programming is a table of trusted smaller answers. Each cell must have a meaning, and every transition must come from already-known cells.",
    steps: ["Describe the state in one sentence, such as ‘best answer for the first i items.’", "Write the base cases for zero items or zero capacity.", "Write the transition by listing the choices at the current state.", "Choose an iteration order that computes dependencies first, then reduce memory only after correctness."],
    complexity: "Time is usually number of states × transitions. Space is the table size, sometimes compressible to one or two rows.",
    pitfalls: ["A state that loses information needed for a future choice", "Wrong base-case values", "Updating a 0/1 table in the wrong direction and reusing an item twice"],
  },
};

export function codingModuleSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/for\.\.of/g, "loops")
    .replace(/array\.map/g, "arrays")
    .replace(/math\.max/g, "counters")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCodingModule(slug: string): CodingModule {
  const base = modules[slug] || {
    title: slug.split("-").filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ") || "Coding Fundamentals",
    summary: "Build a clear mental model for this prerequisite before applying it in a coding problem.",
    whyItMatters: "Strong fundamentals make it easier to choose an approach, explain your reasoning, and debug edge cases.",
    example: "A production feature becomes easier to maintain when each operation has a clear input, state change, and output.",
    takeaway: "Explain the invariant in your own words, then practise it on an empty case and a boundary case.",
  };
  const details = lessonDetails[slug];
  return {
    ...base,
    ...details,
    videoSearch: `${base.title} data structures algorithms tutorial beginner`,
  };
}
