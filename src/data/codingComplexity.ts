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

const additionalPatternGuides: Record<string, ComplexityGuide> = {
  Greedy: {
    bruteForce: { time: "O(2ⁿ)", space: "O(n)", explanation: "Trying every subset of choices explores all possible combinations." },
    optimized: { time: "O(n log n)", space: "O(1) or O(n)", explanation: "Sorting by the greedy key lets each choice be made once while preserving the proof invariant." },
    improvementSteps: ["Define the local choice and why it is safe.", "Sort or prioritize candidates by that choice.", "Prove that an optimal solution can be exchanged into the greedy choice."],
    interviewTip: "Always explain the exchange argument; a fast-looking choice is not automatically greedy-correct.",
  },
  "Bit Manipulation": {
    bruteForce: { time: "O(log n)", space: "O(1)", explanation: "Inspecting every binary digit works but may perform unnecessary shifts." },
    optimized: { time: "O(k)", space: "O(1)", explanation: "Bit tricks such as n & (n - 1) jump directly between set bits; k is the number of set bits." },
    improvementSteps: ["Write the binary invariant for the operation.", "Replace repeated division or remainder work with masks.", "Check signed values and language integer-width behavior."],
    interviewTip: "State whether the complexity is by bit width or by the number of set bits.",
  },
  "Divide and Conquer": {
    bruteForce: { time: "O(n)", space: "O(1)", explanation: "A linear scan checks every candidate without using the structure of the input." },
    optimized: { time: "O(log n)", space: "O(log n)", explanation: "Each decision discards half of the remaining range, with logarithmic recursion depth." },
    improvementSteps: ["Identify a decision that rules out half the search space.", "Keep the invariant true at both boundaries.", "Use an iterative version when stack space matters."],
    interviewTip: "Name the discarded half and justify why it cannot contain a valid better answer.",
  },
  Trie: {
    bruteForce: { time: "O(q × n)", space: "O(1)", explanation: "Comparing each query with every stored word repeatedly scans the dictionary." },
    optimized: { time: "O(total input characters)", space: "O(total stored characters)", explanation: "A trie shares common prefixes, so each word or prefix is traversed only by its characters." },
    improvementSteps: ["Create one node per prefix character.", "Store terminal counts or flags for complete words.", "Use iterative traversal when inputs can make recursion deep."],
    interviewTip: "Include the alphabet size or map implementation in the space discussion when relevant.",
  },
  "0/1 Knapsack": {
    bruteForce: { time: "O(2ⁿ)", space: "O(n)", explanation: "Each item branches into take or skip choices." },
    optimized: { time: "O(n × capacity)", space: "O(capacity)", explanation: "Dynamic programming reuses the best value for every capacity and processes each item once." },
    improvementSteps: ["Define dp[c] as the best value at capacity c.", "Iterate capacity downward so an item is not reused.", "Compress from two dimensions only after confirming transition order."],
    interviewTip: "The downward capacity loop is the key difference between 0/1 and unbounded knapsack.",
  },
  LIS: {
    bruteForce: { time: "O(2ⁿ)", space: "O(n)", explanation: "Enumerating every subsequence creates an exponential number of candidates." },
    optimized: { time: "O(n log n)", space: "O(n)", explanation: "Binary search maintains the smallest possible tail for each subsequence length." },
    improvementSteps: ["Start with the O(n²) DP recurrence.", "Track tails rather than full subsequences.", "Use predecessor indices if the actual sequence must be reconstructed."],
    interviewTip: "The tails array stores minimal endings; it is not necessarily the final LIS itself.",
  },
  "KMP String Matching": {
    bruteForce: { time: "O(n × m)", space: "O(1)", explanation: "A mismatch can restart the pattern comparison from the next text position." },
    optimized: { time: "O(n + m)", space: "O(m)", explanation: "The prefix table reuses matched pattern prefixes, so text and pattern characters move forward linearly." },
    improvementSteps: ["Build the longest-prefix-suffix table.", "Fall back within the pattern after a mismatch.", "Keep text and pattern indices monotonic."],
    interviewTip: "Explain what lps[i] means; that definition makes the fallback logic memorable.",
  },
  "Sweep Line": {
    bruteForce: { time: "O(n²)", space: "O(n)", explanation: "Comparing every pair of intervals or events repeats overlap checks." },
    optimized: { time: "O(n log n)", space: "O(n)", explanation: "Sorting event boundaries lets one pass maintain the active count or set." },
    improvementSteps: ["Turn starts and ends into ordered events.", "Define tie ordering for simultaneous events.", "Update the active state exactly once per boundary."],
    interviewTip: "Tie handling can change the answer when one event ends as another begins.",
  },
  "Difference Array": {
    bruteForce: { time: "O(n × q)", space: "O(n)", explanation: "Updating every element for every range repeats work across overlapping ranges." },
    optimized: { time: "O(n + q)", space: "O(n)", explanation: "Range changes are recorded at two boundaries and reconstructed with one prefix pass." },
    improvementSteps: ["Mark the start with +delta and the exclusive end with -delta.", "Build the final values using a running sum.", "Check whether the end index is inclusive before placing the marker."],
    interviewTip: "Difference arrays are ideal when updates are known first and values are queried afterward.",
  },
  "LRU Cache": {
    bruteForce: { time: "O(n × capacity)", space: "O(capacity)", explanation: "Searching or shifting entries to update recency costs linear time per operation." },
    optimized: { time: "O(n)", space: "O(capacity)", explanation: "A hash map locates entries and a doubly linked list moves them in constant time." },
    improvementSteps: ["Separate lookup from ordering.", "Use sentinels to simplify head and tail removal.", "Update recency on both reads and writes."],
    interviewTip: "State the invariant: the list order is the eviction order and the map points to every list node.",
  },
  "Minimum Spanning Tree": {
    bruteForce: { time: "O(2ᴱ)", space: "O(V + E)", explanation: "Enumerating edge subsets and checking which form spanning trees is exponential." },
    optimized: { time: "O(E log V)", space: "O(V + E)", explanation: "Kruskal sorts edges and Union-Find rejects cycles while building the minimum tree." },
    improvementSteps: ["Sort edges by weight.", "Use Union-Find to test whether an edge creates a cycle.", "Stop after V - 1 accepted edges and verify disconnected graphs."],
    interviewTip: "Distinguish a minimum spanning tree from a shortest-path tree: they optimize different objectives.",
  },
  "Star Patterns": {
    bruteForce: { time: "O(n²)", space: "O(n²)", explanation: "Printing a two-dimensional pattern visits every row-column position and stores the complete output." },
    optimized: { time: "O(n²)", space: "O(n²) output or O(n) streaming", explanation: "Each visible character must still be produced, but row construction can use counters and repeated strings instead of repeated concatenation." },
    improvementSteps: ["Separate row count, column count, spaces, and symbols.", "Write the row formula before coding.", "Stream rows when the platform allows it to avoid retaining the full output."],
    interviewTip: "Pattern-printing complexity is bounded by the number of characters printed; include spaces and newline characters in the output cost.",
  },
};

Object.assign(guides, additionalPatternGuides);

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
