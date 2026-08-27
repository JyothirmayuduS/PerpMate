export type CodingModule = {
  title: string;
  summary: string;
  whyItMatters: string;
  example: string;
  takeaway: string;
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
  return modules[slug] || {
    title: slug.split("-").filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ") || "Coding Fundamentals",
    summary: "Build a clear mental model for this prerequisite before applying it in a coding problem.",
    whyItMatters: "Strong fundamentals make it easier to choose an approach, explain your reasoning, and debug edge cases.",
    example: "A production feature becomes easier to maintain when each operation has a clear input, state change, and output.",
    takeaway: "Explain the invariant in your own words, then practise it on an empty case and a boundary case.",
  };
}
