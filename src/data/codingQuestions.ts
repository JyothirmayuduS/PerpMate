import { additionalCodingQuestions } from "@/data/codingQuestionExpansion";

export type CodingDifficulty = "Foundation" | "Easy" | "Medium" | "Hard";

export type CodingExample = {
  input: string;
  output: string;
  explanation: string;
};

export type CodingTestCase = {
  label: string;
  input: unknown[];
  expected: unknown;
  hidden?: boolean;
};

export type CodingQuestion = {
  id: string;
  title: string;
  summary: string;
  difficulty: CodingDifficulty;
  studyYears: number[];
  category: string;
  pattern: string;
  companies: string[];
  durationMinutes: number;
  acceptance: number;
  xp: number;
  functionName: string;
  problemStatement: string;
  realWorldExample: string;
  prerequisites: string[];
  learningSteps: string[];
  examples: CodingExample[];
  constraints: string[];
  hints: string[];
  starterCode: string;
  solutionCode: string;
  tests: CodingTestCase[];
  templateSourceId?: string;
};

export const yearLearningPaths: Record<
  string,
  {
    label: string;
    stage: string;
    description: string;
    focus: string[];
    weeklyTarget: string;
  }
> = {
  "1": {
    label: "1st Year",
    stage: "Concept Builder",
    description: "Learn how programs think before chasing interview tricks.",
    focus: ["Variables & conditions", "Loops", "Functions", "Arrays", "Strings", "Debugging"],
    weeklyTarget: "3 concepts + 6 guided problems",
  },
  "2": {
    label: "2nd Year",
    stage: "DSA Foundation",
    description: "Turn programming basics into reusable data-structure patterns.",
    focus: ["Hashing", "Two pointers", "Stacks", "Queues", "Linked lists", "Recursion"],
    weeklyTarget: "4 patterns + 10 problems",
  },
  "3": {
    label: "3rd Year",
    stage: "Interview Patterns",
    description: "Recognize common interview shapes and solve under a time limit.",
    focus: ["Sliding window", "Binary search", "Trees", "Graphs", "Heaps", "Dynamic programming"],
    weeklyTarget: "3 company mixes + 12 problems",
  },
  "4": {
    label: "Final Year",
    stage: "Placement Sprint",
    description: "Practice timed company mixes, revision loops, and high-signal patterns.",
    focus: ["Timed sets", "Company patterns", "Hard revision", "Mock rounds", "Optimization", "Communication"],
    weeklyTarget: "2 mocks + 15 targeted problems",
  },
};

const curatedCodingQuestions: CodingQuestion[] = [
  {
    id: "delivery-fee-calculator",
    title: "Delivery Fee Calculator",
    summary: "Translate business rules into clean conditions.",
    difficulty: "Foundation",
    studyYears: [1],
    category: "Programming Basics",
    pattern: "Conditionals",
    companies: ["TCS", "Infosys", "Zoho", "Swiggy"],
    durationMinutes: 15,
    acceptance: 84,
    xp: 25,
    functionName: "calculateDeliveryFee",
    problemStatement: "An ordering app charges ₹40 for deliveries up to 5 km. Beyond 5 km, it adds ₹8 for every extra kilometre. Orders worth at least ₹1,000 receive free delivery. Return the delivery fee.",
    realWorldExample: "This is the same decision flow used by checkout systems: a high-priority free-delivery rule, followed by distance slabs.",
    prerequisites: ["Variables", "if / else", "Math.max"],
    learningSteps: [
      "Check the rule that overrides every other rule first.",
      "Calculate only the distance beyond the included 5 km.",
      "Return one final numeric result from every path.",
    ],
    examples: [
      { input: "orderTotal = 650, distanceKm = 8", output: "64", explanation: "₹40 base + 3 × ₹8." },
      { input: "orderTotal = 1200, distanceKm = 12", output: "0", explanation: "The free-delivery rule wins." },
    ],
    constraints: ["0 ≤ orderTotal ≤ 100000", "0 ≤ distanceKm ≤ 100", "Inputs are whole numbers"],
    hints: ["Handle free delivery before calculating distance.", "Extra distance is Math.max(0, distanceKm - 5)."],
    starterCode: `function calculateDeliveryFee(orderTotal, distanceKm) {
  // Write your solution here
  return 0;
}`,
    solutionCode: `function calculateDeliveryFee(orderTotal, distanceKm) {
  if (orderTotal >= 1000) return 0;
  return 40 + Math.max(0, distanceKm - 5) * 8;
}`,
    tests: [
      { label: "Nearby order", input: [650, 3], expected: 40 },
      { label: "Longer delivery", input: [650, 8], expected: 64 },
      { label: "Free delivery", input: [1200, 12], expected: 0 },
      { label: "Boundary value", input: [999, 5], expected: 40, hidden: true },
    ],
  },
  {
    id: "longest-study-streak",
    title: "Longest Study Streak",
    summary: "Use a loop to track a running and best value.",
    difficulty: "Foundation",
    studyYears: [1],
    category: "Arrays",
    pattern: "Linear Scan",
    companies: ["Cognizant", "Wipro", "Accenture", "Freshworks"],
    durationMinutes: 18,
    acceptance: 79,
    xp: 30,
    functionName: "longestStudyStreak",
    problemStatement: "You receive an array where true means a student completed the daily goal and false means they missed it. Return the longest consecutive run of completed days.",
    realWorldExample: "Habit and fitness apps calculate streaks by scanning a timeline once while maintaining current and best runs.",
    prerequisites: ["Arrays", "for...of loops", "Counters"],
    learningSteps: ["Start both counters at zero.", "Increase the current run for true; reset it for false.", "Update the best run after every successful day."],
    examples: [
      { input: "[true, true, false, true, true, true]", output: "3", explanation: "The final three days form the longest run." },
    ],
    constraints: ["0 ≤ days.length ≤ 100000", "Every item is a boolean"],
    hints: ["You do not need a second array.", "Reset the current streak when a day is missed."],
    starterCode: `function longestStudyStreak(days) {
  // Write your solution here
  return 0;
}`,
    solutionCode: `function longestStudyStreak(days) {
  let current = 0;
  let best = 0;
  for (const completed of days) {
    current = completed ? current + 1 : 0;
    best = Math.max(best, current);
  }
  return best;
}`,
    tests: [
      { label: "Mixed week", input: [[true, true, false, true, true, true]], expected: 3 },
      { label: "No completed days", input: [[false, false]], expected: 0 },
      { label: "All completed", input: [[true, true, true, true]], expected: 4 },
      { label: "Empty history", input: [[]], expected: 0, hidden: true },
    ],
  },
  {
    id: "normalize-usernames",
    title: "Normalize Usernames",
    summary: "Clean real input with string operations.",
    difficulty: "Easy",
    studyYears: [1, 2],
    category: "Strings",
    pattern: "Transformation",
    companies: ["Capgemini", "Tech Mahindra", "IBM", "Zoho"],
    durationMinutes: 20,
    acceptance: 72,
    xp: 35,
    functionName: "normalizeUsernames",
    problemStatement: "Convert every display name to lowercase, trim outer spaces, replace each run of internal spaces with one hyphen, and remove duplicate usernames while preserving first appearance.",
    realWorldExample: "Signup systems normalize human-friendly names before creating stable handles and checking uniqueness.",
    prerequisites: ["String methods", "Array.map", "Set"],
    learningSteps: ["Normalize one name first.", "Use a Set to remember handles already emitted.", "Preserve order by adding only the first occurrence."],
    examples: [
      { input: '["  Asha Rao ", "ASHA   RAO", "Dev Kumar"]', output: '["asha-rao", "dev-kumar"]', explanation: "The second name becomes a duplicate after normalization." },
    ],
    constraints: ["0 ≤ names.length ≤ 10000", "Names contain letters and spaces"],
    hints: ["The regular expression /\\s+/g matches one or more spaces.", "Check the Set before pushing."],
    starterCode: `function normalizeUsernames(names) {
  // Write your solution here
  return [];
}`,
    solutionCode: `function normalizeUsernames(names) {
  const seen = new Set();
  const result = [];
  for (const name of names) {
    const username = name.trim().toLowerCase().replace(/\\s+/g, "-");
    if (!seen.has(username)) {
      seen.add(username);
      result.push(username);
    }
  }
  return result;
}`,
    tests: [
      { label: "Normalize and deduplicate", input: [["  Asha Rao ", "ASHA   RAO", "Dev Kumar"]], expected: ["asha-rao", "dev-kumar"] },
      { label: "Already clean", input: [["neel", "pooja"]], expected: ["neel", "pooja"] },
      { label: "Empty list", input: [[]], expected: [] },
    ],
  },
  {
    id: "first-repeated-order",
    title: "First Repeated Order ID",
    summary: "Recognize the hash-set lookup pattern.",
    difficulty: "Easy",
    studyYears: [2, 3],
    category: "Hashing",
    pattern: "Hash Set",
    companies: ["Amazon", "Flipkart", "JPMorgan Chase", "HCLTech"],
    durationMinutes: 22,
    acceptance: 75,
    xp: 45,
    functionName: "firstRepeatedOrder",
    problemStatement: "Given order IDs in arrival order, return the first ID whose second occurrence is encountered. Return null when every ID is unique.",
    realWorldExample: "Payment and order pipelines use fast duplicate detection to make retries idempotent.",
    prerequisites: ["Arrays", "Set", "Early return"],
    learningSteps: ["Scan from left to right.", "If an ID is already in the Set, return it immediately.", "Otherwise store it and continue."],
    examples: [
      { input: '["A1", "B7", "C3", "B7", "A1"]', output: '"B7"', explanation: "B7 is the first duplicate encountered while scanning." },
    ],
    constraints: ["0 ≤ ids.length ≤ 100000", "IDs are non-empty strings"],
    hints: ["The answer is based on the second occurrence, not the first position.", "A Set gives average O(1) lookup."],
    starterCode: `function firstRepeatedOrder(ids) {
  // Write your solution here
  return null;
}`,
    solutionCode: `function firstRepeatedOrder(ids) {
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) return id;
    seen.add(id);
  }
  return null;
}`,
    tests: [
      { label: "Two duplicates", input: [["A1", "B7", "C3", "B7", "A1"]], expected: "B7" },
      { label: "All unique", input: [["A", "B", "C"]], expected: null },
      { label: "Immediate repeat", input: [["X", "X"]], expected: "X" },
    ],
  },
  {
    id: "balanced-brackets",
    title: "Validate Configuration Brackets",
    summary: "Use a stack to match nested pairs.",
    difficulty: "Medium",
    studyYears: [2, 3],
    category: "Stacks",
    pattern: "Stack Matching",
    companies: ["Oracle", "SAP", "Microsoft", "TCS"],
    durationMinutes: 28,
    acceptance: 64,
    xp: 60,
    functionName: "hasBalancedBrackets",
    problemStatement: "Return true when every (), [], and {} bracket in a configuration string is correctly closed and nested. Other characters may be ignored.",
    realWorldExample: "Parsers and editors use stacks to verify nested syntax before compiling or formatting code.",
    prerequisites: ["Stacks", "Objects / maps", "String iteration"],
    learningSteps: ["Push opening brackets.", "For a closing bracket, compare against the latest opening bracket.", "The stack must be empty at the end."],
    examples: [
      { input: '"server({ ports: [80, 443] })"', output: "true", explanation: "Every nested bracket closes in reverse order." },
      { input: '"([)]"', output: "false", explanation: "The closing order is incorrect." },
    ],
    constraints: ["0 ≤ text.length ≤ 100000"],
    hints: ["A stack is last-in, first-out.", "Ignore characters that are not brackets."],
    starterCode: `function hasBalancedBrackets(text) {
  // Write your solution here
  return false;
}`,
    solutionCode: `function hasBalancedBrackets(text) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const openings = new Set(Object.values(pairs));
  const stack = [];
  for (const char of text) {
    if (openings.has(char)) stack.push(char);
    if (char in pairs && stack.pop() !== pairs[char]) return false;
  }
  return stack.length === 0;
}`,
    tests: [
      { label: "Nested configuration", input: ["server({ ports: [80, 443] })"], expected: true },
      { label: "Wrong nesting", input: ["([)]"], expected: false },
      { label: "Missing close", input: ["function("], expected: false },
      { label: "Plain text", input: ["hello"], expected: true, hidden: true },
    ],
  },
  {
    id: "merge-activity-feeds",
    title: "Merge Activity Feeds",
    summary: "Merge two sorted streams without sorting again.",
    difficulty: "Medium",
    studyYears: [2, 3],
    category: "Arrays",
    pattern: "Two Pointers",
    companies: ["Meesho", "Salesforce", "Walmart Global Tech", "Infosys"],
    durationMinutes: 30,
    acceptance: 61,
    xp: 65,
    functionName: "mergeActivityFeeds",
    problemStatement: "Two activity feeds contain timestamps sorted from newest to oldest. Merge them into one newest-to-oldest feed in O(n + m) time.",
    realWorldExample: "Social and audit systems merge independently produced event streams while preserving chronological order.",
    prerequisites: ["Arrays", "Two pointers", "Loop invariants"],
    learningSteps: ["Keep one pointer for each feed.", "Take the larger current timestamp.", "Append any remaining tail after one feed ends."],
    examples: [
      { input: "[12, 8, 3], [11, 9, 1]", output: "[12, 11, 9, 8, 3, 1]", explanation: "Both input orders are preserved." },
    ],
    constraints: ["0 ≤ feed lengths ≤ 100000", "Each feed is already sorted descending"],
    hints: ["Do not call sort().", "The next result is the larger of the two pointed values."],
    starterCode: `function mergeActivityFeeds(first, second) {
  // Write your solution here
  return [];
}`,
    solutionCode: `function mergeActivityFeeds(first, second) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < first.length && j < second.length) {
    if (first[i] >= second[j]) result.push(first[i++]);
    else result.push(second[j++]);
  }
  return result.concat(first.slice(i), second.slice(j));
}`,
    tests: [
      { label: "Balanced feeds", input: [[12, 8, 3], [11, 9, 1]], expected: [12, 11, 9, 8, 3, 1] },
      { label: "One empty feed", input: [[], [7, 4]], expected: [7, 4] },
      { label: "Duplicate timestamps", input: [[5, 3], [5, 2]], expected: [5, 5, 3, 2] },
    ],
  },
  {
    id: "longest-focus-session",
    title: "Longest Focus Session",
    summary: "Maintain a valid window while allowing limited distractions.",
    difficulty: "Medium",
    studyYears: [3, 4],
    category: "Arrays",
    pattern: "Sliding Window",
    companies: ["Google", "Adobe", "Razorpay", "Deloitte"],
    durationMinutes: 35,
    acceptance: 57,
    xp: 75,
    functionName: "longestFocusSession",
    problemStatement: "A timeline contains 1 for a focused minute and 0 for a distracted minute. Return the longest continuous session containing at most k distracted minutes.",
    realWorldExample: "Monitoring systems find the longest healthy interval while tolerating a limited number of anomalies.",
    prerequisites: ["Arrays", "Two pointers", "Window counts"],
    learningSteps: ["Expand the right edge.", "When distractions exceed k, move the left edge until valid.", "Track the largest valid window."],
    examples: [
      { input: "[1, 1, 0, 1, 0, 1, 1], k = 1", output: "4", explanation: "Either distraction can be included, but not both." },
    ],
    constraints: ["0 ≤ minutes.length ≤ 100000", "0 ≤ k ≤ minutes.length"],
    hints: ["Count zeroes inside the current window.", "Every index enters and leaves the window at most once."],
    starterCode: `function longestFocusSession(minutes, k) {
  // Write your solution here
  return 0;
}`,
    solutionCode: `function longestFocusSession(minutes, k) {
  let left = 0;
  let distractions = 0;
  let best = 0;
  for (let right = 0; right < minutes.length; right++) {
    if (minutes[right] === 0) distractions++;
    while (distractions > k) {
      if (minutes[left++] === 0) distractions--;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    tests: [
      { label: "One distraction allowed", input: [[1, 1, 0, 1, 0, 1, 1], 1], expected: 4 },
      { label: "No distractions allowed", input: [[1, 1, 0, 1], 0], expected: 2 },
      { label: "All distractions allowed", input: [[0, 0, 1], 2], expected: 3 },
    ],
  },
  {
    id: "minimum-server-capacity",
    title: "Minimum Server Capacity",
    summary: "Binary-search the smallest feasible answer.",
    difficulty: "Hard",
    studyYears: [3, 4],
    category: "Binary Search",
    pattern: "Binary Search on Answer",
    companies: ["Amazon", "Nvidia", "PhonePe", "Barclays"],
    durationMinutes: 45,
    acceptance: 42,
    xp: 110,
    functionName: "minimumServerCapacity",
    problemStatement: "Jobs must run in order over a fixed number of days. A server handles a contiguous group each day, and daily load cannot exceed its capacity. Return the minimum capacity that completes all jobs within the given days.",
    realWorldExample: "Capacity planners search for the lowest safe resource limit by repeatedly checking whether a candidate limit meets the deadline.",
    prerequisites: ["Binary search", "Greedy feasibility", "Prefix reasoning"],
    learningSteps: ["The answer is between the largest job and total load.", "Greedily count days required for a candidate capacity.", "Binary-search the first capacity that is feasible."],
    examples: [
      { input: "jobs = [3, 2, 2, 4, 1, 4], days = 3", output: "6", explanation: "The jobs can be grouped as [3,2], [2,4], [1,4]." },
    ],
    constraints: ["1 ≤ jobs.length ≤ 50000", "1 ≤ days ≤ jobs.length", "Each job load is positive"],
    hints: ["Lower bound: max(jobs).", "A capacity is feasible if greedy grouping uses at most days groups."],
    starterCode: `function minimumServerCapacity(jobs, days) {
  // Write your solution here
  return 0;
}`,
    solutionCode: `function minimumServerCapacity(jobs, days) {
  let low = Math.max(...jobs);
  let high = jobs.reduce((sum, job) => sum + job, 0);
  const requiredDays = (capacity) => {
    let used = 1;
    let load = 0;
    for (const job of jobs) {
      if (load + job > capacity) {
        used++;
        load = 0;
      }
      load += job;
    }
    return used;
  };
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (requiredDays(mid) <= days) high = mid;
    else low = mid + 1;
  }
  return low;
}`,
    tests: [
      { label: "Three-day plan", input: [[3, 2, 2, 4, 1, 4], 3], expected: 6 },
      { label: "One job per day", input: [[1, 2, 3, 4], 4], expected: 4 },
      { label: "Single day", input: [[1, 2, 3], 1], expected: 6 },
    ],
  },
  {
    id: "course-dependency-check",
    title: "Course Dependency Check",
    summary: "Detect whether a directed graph contains a cycle.",
    difficulty: "Hard",
    studyYears: [3, 4],
    category: "Graphs",
    pattern: "Topological Sort",
    companies: ["Microsoft", "Atlassian", "Uber", "Cognizant"],
    durationMinutes: 45,
    acceptance: 47,
    xp: 115,
    functionName: "canCompleteCourses",
    problemStatement: "There are n courses numbered 0 to n - 1. Each pair [course, prerequisite] means the prerequisite must be finished first. Return whether all courses can be completed.",
    realWorldExample: "Build tools and curriculum planners topologically order dependencies and reject circular requirements.",
    prerequisites: ["Directed graphs", "Queues", "Indegree"],
    learningSteps: ["Build an adjacency list and indegree count.", "Start with every node having indegree zero.", "If processed nodes equal n, no cycle exists."],
    examples: [
      { input: "n = 3, prerequisites = [[1,0],[2,1]]", output: "true", explanation: "A valid order is 0, 1, 2." },
      { input: "n = 2, prerequisites = [[1,0],[0,1]]", output: "false", explanation: "The courses depend on each other." },
    ],
    constraints: ["1 ≤ n ≤ 10000", "0 ≤ prerequisites.length ≤ 50000"],
    hints: ["A cycle prevents all nodes from reaching indegree zero.", "Count how many nodes leave the queue."],
    starterCode: `function canCompleteCourses(n, prerequisites) {
  // Write your solution here
  return false;
}`,
    solutionCode: `function canCompleteCourses(n, prerequisites) {
  const graph = Array.from({ length: n }, () => []);
  const indegree = Array(n).fill(0);
  for (const [course, prerequisite] of prerequisites) {
    graph[prerequisite].push(course);
    indegree[course]++;
  }
  const queue = [];
  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i);
  let processed = 0;
  for (let head = 0; head < queue.length; head++) {
    const course = queue[head];
    processed++;
    for (const next of graph[course]) {
      if (--indegree[next] === 0) queue.push(next);
    }
  }
  return processed === n;
}`,
    tests: [
      { label: "Simple chain", input: [3, [[1, 0], [2, 1]]], expected: true },
      { label: "Circular dependency", input: [2, [[1, 0], [0, 1]]], expected: false },
      { label: "Independent courses", input: [4, []], expected: true },
    ],
  },
  {
    id: "rate-limiter-window",
    title: "API Rate Limiter Window",
    summary: "Track only timestamps that still matter.",
    difficulty: "Medium",
    studyYears: [3, 4],
    category: "Queues",
    pattern: "Monotonic Window",
    companies: ["Cloudflare", "Jio Platforms", "Oracle", "Paytm"],
    durationMinutes: 35,
    acceptance: 55,
    xp: 80,
    functionName: "acceptedRequests",
    problemStatement: "Request timestamps arrive in increasing order. Accept at most limit requests inside any inclusive window of windowSeconds. Return an array of booleans showing which requests are accepted. Rejected requests do not enter the window.",
    realWorldExample: "API gateways keep a short queue of accepted request times to protect services from bursts.",
    prerequisites: ["Queues", "Two pointers", "Timestamps"],
    learningSteps: ["Remove accepted timestamps older than the current window.", "Accept only if the queue size is below the limit.", "Store only accepted timestamps."],
    examples: [
      { input: "[1,2,3,4], limit = 2, windowSeconds = 2", output: "[true,true,false,true]", explanation: "At t=3 the window already contains t=1 and t=2." },
    ],
    constraints: ["Timestamps are sorted", "1 ≤ limit ≤ 100000", "windowSeconds ≥ 0"],
    hints: ["Use a head index instead of shifting the array.", "A timestamp is expired when time - oldTime > windowSeconds."],
    starterCode: `function acceptedRequests(timestamps, limit, windowSeconds) {
  // Write your solution here
  return [];
}`,
    solutionCode: `function acceptedRequests(timestamps, limit, windowSeconds) {
  const queue = [];
  const result = [];
  let head = 0;
  for (const time of timestamps) {
    while (head < queue.length && time - queue[head] > windowSeconds) head++;
    const accepted = queue.length - head < limit;
    result.push(accepted);
    if (accepted) queue.push(time);
  }
  return result;
}`,
    tests: [
      { label: "Burst traffic", input: [[1, 2, 3, 4], 2, 2], expected: [true, true, false, true] },
      { label: "Spaced traffic", input: [[1, 10, 20], 1, 5], expected: [true, true, true] },
      { label: "Same timestamp", input: [[5, 5, 5], 2, 0], expected: [true, true, false] },
    ],
  },
  {
    id: "top-k-trending-skills",
    title: "Top K Trending Skills",
    summary: "Count frequencies and rank only what is needed.",
    difficulty: "Medium",
    studyYears: [3, 4],
    category: "Heaps & Hashing",
    pattern: "Top K",
    companies: ["LinkedIn", "Naukri", "Intuit", "American Express"],
    durationMinutes: 38,
    acceptance: 52,
    xp: 85,
    functionName: "topKSkills",
    problemStatement: "Given skill searches and an integer k, return the k most frequent skills. Sort by frequency descending and then alphabetically for ties.",
    realWorldExample: "Job platforms aggregate searches to highlight trending skills while keeping tie-breaking deterministic.",
    prerequisites: ["Hash maps", "Sorting", "Frequency counting"],
    learningSteps: ["Build a frequency map.", "Convert entries to sortable pairs.", "Apply both ranking rules, then take k."],
    examples: [
      { input: '["react","sql","react","java","sql","react"], k = 2', output: '["react","sql"]', explanation: "React appears 3 times and SQL appears 2 times." },
    ],
    constraints: ["0 ≤ searches.length ≤ 100000", "0 ≤ k ≤ unique skills"],
    hints: ["Count first; rank second.", "For ties, compare skill names with localeCompare."],
    starterCode: `function topKSkills(searches, k) {
  // Write your solution here
  return [];
}`,
    solutionCode: `function topKSkills(searches, k) {
  const counts = new Map();
  for (const skill of searches) counts.set(skill, (counts.get(skill) || 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, k)
    .map(([skill]) => skill);
}`,
    tests: [
      { label: "Clear ranking", input: [["react", "sql", "react", "java", "sql", "react"], 2], expected: ["react", "sql"] },
      { label: "Alphabetical tie", input: [["python", "java", "go"], 2], expected: ["go", "java"] },
      { label: "No requested skills", input: [["java"], 0], expected: [] },
    ],
  },
  {
    id: "minimum-learning-cost",
    title: "Minimum Learning Cost",
    summary: "Build a dynamic-programming state from smaller choices.",
    difficulty: "Hard",
    studyYears: [3, 4],
    category: "Dynamic Programming",
    pattern: "1D DP",
    companies: ["Google", "Goldman Sachs", "Adobe", "LTIMindtree"],
    durationMinutes: 45,
    acceptance: 44,
    xp: 120,
    functionName: "minimumLearningCost",
    problemStatement: "Each lesson has an effort cost. From a lesson, a student may move forward by one or two lessons. They may start at lesson 0 or 1 and finish just beyond the final lesson. Return the minimum total effort.",
    realWorldExample: "Dynamic programming chooses a minimum-cost sequence when each decision depends on a small set of earlier states.",
    prerequisites: ["Arrays", "Recurrence relations", "Rolling variables"],
    learningSteps: ["Define the cost to reach each position.", "A position can come from one or two steps back.", "Keep only the last two states to use O(1) space."],
    examples: [
      { input: "[10, 15, 20]", output: "15", explanation: "Start at lesson 1 and jump beyond the end." },
    ],
    constraints: ["2 ≤ costs.length ≤ 100000", "0 ≤ costs[i] ≤ 10000"],
    hints: ["The destination has no extra cost.", "At each step take the cheaper of the previous two totals."],
    starterCode: `function minimumLearningCost(costs) {
  // Write your solution here
  return 0;
}`,
    solutionCode: `function minimumLearningCost(costs) {
  let oneBack = 0;
  let twoBack = 0;
  for (let i = 2; i <= costs.length; i++) {
    const current = Math.min(oneBack + costs[i - 1], twoBack + costs[i - 2]);
    twoBack = oneBack;
    oneBack = current;
  }
  return oneBack;
}`,
    tests: [
      { label: "Three lessons", input: [[10, 15, 20]], expected: 15 },
      { label: "Mixed costs", input: [[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]], expected: 6 },
      { label: "Two lessons", input: [[5, 8]], expected: 5 },
    ],
  },
  {
    id: "inventory-restock-alerts",
    title: "Inventory Restock Alerts",
    summary: "Turn a list of records into a useful business report.",
    difficulty: "Foundation",
    studyYears: [1],
    category: "Programming Basics",
    pattern: "Object Aggregation",
    companies: ["TCS", "Wipro", "Jio Platforms", "Deloitte"],
    durationMinutes: 18,
    acceptance: 82,
    xp: 30,
    functionName: "lowStockItems",
    problemStatement: "An inventory list contains objects with name and stock fields. Return the names of items whose stock is less than or equal to a given restock threshold. Preserve the original order.",
    realWorldExample: "Retail dashboards scan inventory snapshots to surface products that need a purchase order before shelves become empty.",
    prerequisites: ["Arrays", "Objects", "Comparison operators"],
    learningSteps: [
      "Read one object's fields using item.name and item.stock.",
      "Compare its stock with the threshold.",
      "Push only matching names into the result array.",
    ],
    examples: [
      { input: '[{name:"Mouse",stock:4},{name:"Keyboard",stock:12}], threshold = 5', output: '["Mouse"]', explanation: "Only Mouse is at or below the threshold." },
    ],
    constraints: ["0 ≤ items.length ≤ 10000", "stock and threshold are non-negative integers", "Item names are non-empty strings"],
    hints: ["Start with an empty result array.", "Use <= because an item exactly at the threshold should be included."],
    starterCode: `function lowStockItems(items, threshold) {
  // Write your solution here
  return [];
}`,
    solutionCode: `function lowStockItems(items, threshold) {
  const result = [];
  for (const item of items) {
    if (item.stock <= threshold) result.push(item.name);
  }
  return result;
}`,
    tests: [
      { label: "Mixed inventory", input: [[{ name: "Mouse", stock: 4 }, { name: "Keyboard", stock: 12 }, { name: "Cable", stock: 5 }], 5], expected: ["Mouse", "Cable"] },
      { label: "Nothing low", input: [[{ name: "Monitor", stock: 9 }], 3], expected: [] },
      { label: "Empty inventory", input: [[], 10], expected: [] },
    ],
  },
  {
    id: "semester-score-report",
    title: "Semester Score Report",
    summary: "Combine a loop, conditions, and running totals.",
    difficulty: "Easy",
    studyYears: [1, 2],
    category: "Arrays",
    pattern: "Running Aggregates",
    companies: ["Infosys", "Cognizant", "Capgemini", "EY"],
    durationMinutes: 22,
    acceptance: 76,
    xp: 35,
    functionName: "scoreReport",
    problemStatement: "Given student scores, return an object with average (rounded to the nearest whole number), highest, and passed, where a score of at least 40 is a pass. For an empty list return { average: 0, highest: null, passed: 0 }.",
    realWorldExample: "Learning systems turn raw assessment rows into dashboard summaries by maintaining several aggregates in one pass.",
    prerequisites: ["Loops", "Objects", "Running totals", "Math.round"],
    learningSteps: [
      "Handle the empty-list rule before reading a score.",
      "Update total, highest, and pass count during one loop.",
      "Build the requested result object after the loop.",
    ],
    examples: [
      { input: "[35, 70, 55]", output: "{ average: 53, highest: 70, passed: 2 }", explanation: "The average is 160 / 3, rounded to 53." },
    ],
    constraints: ["0 ≤ scores.length ≤ 100000", "0 ≤ scores[i] ≤ 100"],
    hints: ["Initialize highest from scores[0] only after checking for an empty list.", "One loop can update all three values."],
    starterCode: `function scoreReport(scores) {
  // Write your solution here
  return { average: 0, highest: null, passed: 0 };
}`,
    solutionCode: `function scoreReport(scores) {
  if (scores.length === 0) return { average: 0, highest: null, passed: 0 };
  let total = 0;
  let highest = scores[0];
  let passed = 0;
  for (const score of scores) {
    total += score;
    highest = Math.max(highest, score);
    if (score >= 40) passed++;
  }
  return { average: Math.round(total / scores.length), highest, passed };
}`,
    tests: [
      { label: "Mixed results", input: [[35, 70, 55]], expected: { average: 53, highest: 70, passed: 2 } },
      { label: "All pass", input: [[40, 80, 60]], expected: { average: 60, highest: 80, passed: 3 } },
      { label: "No scores", input: [[]], expected: { average: 0, highest: null, passed: 0 } },
    ],
  },
  {
    id: "move-sold-out-items",
    title: "Move Sold-Out Items",
    summary: "Compact useful values while preserving their order.",
    difficulty: "Easy",
    studyYears: [2],
    category: "Arrays",
    pattern: "Stable Compaction",
    companies: ["Tech Mahindra", "Zoho", "Paytm", "IBM"],
    durationMinutes: 25,
    acceptance: 71,
    xp: 45,
    functionName: "moveSoldOutItems",
    problemStatement: "A product row stores stock counts. Return a new array where all positive counts remain in their original order and every zero is moved to the end.",
    realWorldExample: "Storefronts often keep available products prominent while retaining unavailable records for restock tracking.",
    prerequisites: ["Arrays", "Two pointers", "Stable ordering"],
    learningSteps: [
      "Reserve one result array with the same conceptual order.",
      "Append every non-zero value first and count zeroes.",
      "Append the counted zeroes after the scan.",
    ],
    examples: [
      { input: "[4, 0, 2, 0, 7]", output: "[4, 2, 7, 0, 0]", explanation: "Available counts keep the order 4, 2, 7." },
    ],
    constraints: ["0 ≤ stock.length ≤ 100000", "stock[i] is a non-negative integer"],
    hints: ["Do not sort; sorting may change the order of positive values.", "Count zeroes while collecting non-zero values."],
    starterCode: `function moveSoldOutItems(stock) {
  // Write your solution here
  return [];
}`,
    solutionCode: `function moveSoldOutItems(stock) {
  const result = [];
  let zeroes = 0;
  for (const count of stock) {
    if (count === 0) zeroes++;
    else result.push(count);
  }
  while (zeroes-- > 0) result.push(0);
  return result;
}`,
    tests: [
      { label: "Mixed stock", input: [[4, 0, 2, 0, 7]], expected: [4, 2, 7, 0, 0] },
      { label: "All sold out", input: [[0, 0, 0]], expected: [0, 0, 0] },
      { label: "No sold-out items", input: [[3, 1]], expected: [3, 1] },
      { label: "Empty row", input: [[]], expected: [], hidden: true },
    ],
  },
  {
    id: "next-price-drop",
    title: "Days Until a Price Drop",
    summary: "Use a monotonic stack to resolve future events.",
    difficulty: "Medium",
    studyYears: [2, 3],
    category: "Stacks",
    pattern: "Monotonic Stack",
    companies: ["Freshworks", "Oracle", "Goldman Sachs", "Samsung R&D"],
    durationMinutes: 32,
    acceptance: 58,
    xp: 70,
    functionName: "daysUntilLowerPrice",
    problemStatement: "For each day's product price, return how many days must pass before a strictly lower price appears. Return 0 if no later day has a lower price.",
    realWorldExample: "Market and observability tools resolve each event when a later value crosses a threshold; a monotonic stack avoids rescanning the future.",
    prerequisites: ["Stacks", "Array indices", "Monotonic invariants"],
    learningSteps: [
      "Keep indices whose next lower price is still unknown.",
      "When today's price is lower, resolve every more-expensive index on top.",
      "Push today's index for a possible future drop.",
    ],
    examples: [
      { input: "[8, 6, 7, 4]", output: "[1, 2, 1, 0]", explanation: "Price 6 waits two days for price 4." },
    ],
    constraints: ["0 ≤ prices.length ≤ 100000", "prices[i] is a positive integer"],
    hints: ["Store indices, not just prices.", "Pop while the current price is strictly lower than the price at the top index."],
    starterCode: `function daysUntilLowerPrice(prices) {
  // Write your solution here
  return [];
}`,
    solutionCode: `function daysUntilLowerPrice(prices) {
  const result = Array(prices.length).fill(0);
  const stack = [];
  for (let i = 0; i < prices.length; i++) {
    while (stack.length && prices[i] < prices[stack[stack.length - 1]]) {
      const previous = stack.pop();
      result[previous] = i - previous;
    }
    stack.push(i);
  }
  return result;
}`,
    tests: [
      { label: "Several drops", input: [[8, 6, 7, 4]], expected: [1, 2, 1, 0] },
      { label: "Always rising", input: [[2, 3, 4]], expected: [0, 0, 0] },
      { label: "Immediate drops", input: [[5, 4, 3]], expected: [1, 1, 0] },
    ],
  },
  {
    id: "merge-booking-windows",
    title: "Merge Booking Windows",
    summary: "Sort and combine overlapping time intervals.",
    difficulty: "Medium",
    studyYears: [3, 4],
    category: "Intervals",
    pattern: "Merge Intervals",
    companies: ["OYO", "Ola", "Microsoft", "American Express"],
    durationMinutes: 35,
    acceptance: 56,
    xp: 80,
    functionName: "mergeBookingWindows",
    problemStatement: "Each booking window is [start, end]. Merge every overlapping or touching window and return the combined windows sorted by start time.",
    realWorldExample: "Calendar, room-booking, and resource-allocation services normalize overlapping reservations before showing availability.",
    prerequisites: ["Array sorting", "Intervals", "Greedy decisions"],
    learningSteps: [
      "Sort a copy of the intervals by start time.",
      "Compare each interval with the last merged interval.",
      "Extend the last end on overlap; otherwise start a new merged interval.",
    ],
    examples: [
      { input: "[[1,3],[2,6],[8,10],[10,12]]", output: "[[1,6],[8,12]]", explanation: "Touching windows at 10 are combined too." },
    ],
    constraints: ["0 ≤ intervals.length ≤ 100000", "start ≤ end for every interval"],
    hints: ["Sorting makes all possible overlaps adjacent.", "Touching means nextStart <= currentEnd."],
    starterCode: `function mergeBookingWindows(intervals) {
  // Write your solution here
  return [];
}`,
    solutionCode: `function mergeBookingWindows(intervals) {
  if (intervals.length === 0) return [];
  const sorted = intervals.map((item) => [...item]).sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    if (sorted[i][0] <= last[1]) last[1] = Math.max(last[1], sorted[i][1]);
    else merged.push(sorted[i]);
  }
  return merged;
}`,
    tests: [
      { label: "Overlap and touch", input: [[[1, 3], [2, 6], [8, 10], [10, 12]]], expected: [[1, 6], [8, 12]] },
      { label: "Unsorted input", input: [[[7, 9], [1, 2], [2, 4]]], expected: [[1, 4], [7, 9]] },
      { label: "No windows", input: [[]], expected: [] },
    ],
  },
  {
    id: "shortest-campus-route",
    title: "Shortest Campus Route",
    summary: "Find minimum hops through an unweighted network.",
    difficulty: "Medium",
    studyYears: [3, 4],
    category: "Graphs",
    pattern: "Breadth-First Search",
    companies: ["Uber", "Airtel", "Walmart Global Tech", "Morgan Stanley"],
    durationMinutes: 38,
    acceptance: 53,
    xp: 90,
    functionName: "shortestCampusRoute",
    problemStatement: "A campus has n buildings numbered 0 to n - 1 and undirected paths [a, b]. Return the minimum number of paths needed to travel from start to destination, or -1 when it is unreachable.",
    realWorldExample: "Maps, network routing, and social graphs use breadth-first search when every connection has equal cost.",
    prerequisites: ["Graphs", "Adjacency lists", "Queues", "Visited sets"],
    learningSteps: [
      "Build both directions of every path in an adjacency list.",
      "Explore all buildings at one distance before the next distance.",
      "Mark a building visited when it enters the queue.",
    ],
    examples: [
      { input: "n=5, paths=[[0,1],[1,2],[0,3],[3,4],[4,2]], start=0, destination=2", output: "2", explanation: "The route 0 → 1 → 2 uses two paths." },
    ],
    constraints: ["1 ≤ n ≤ 10000", "0 ≤ paths.length ≤ 50000", "Building numbers are valid"],
    hints: ["Store [node, distance] in the queue.", "Return as soon as the destination is removed from the queue."],
    starterCode: `function shortestCampusRoute(n, paths, start, destination) {
  // Write your solution here
  return -1;
}`,
    solutionCode: `function shortestCampusRoute(n, paths, start, destination) {
  const graph = Array.from({ length: n }, () => []);
  for (const [a, b] of paths) {
    graph[a].push(b);
    graph[b].push(a);
  }
  const queue = [[start, 0]];
  const visited = new Set([start]);
  for (let head = 0; head < queue.length; head++) {
    const [building, distance] = queue[head];
    if (building === destination) return distance;
    for (const next of graph[building]) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push([next, distance + 1]);
      }
    }
  }
  return -1;
}`,
    tests: [
      { label: "Two-hop route", input: [5, [[0, 1], [1, 2], [0, 3], [3, 4], [4, 2]], 0, 2], expected: 2 },
      { label: "Same building", input: [3, [[0, 1]], 1, 1], expected: 0 },
      { label: "Unreachable building", input: [4, [[0, 1], [2, 3]], 0, 3], expected: -1 },
    ],
  },
  {
    id: "maximum-project-impact",
    title: "Maximum Project Impact Period",
    summary: "Keep the best contiguous total without checking every range.",
    difficulty: "Medium",
    studyYears: [2, 3, 4],
    category: "Dynamic Programming",
    pattern: "Kadane's Algorithm",
    companies: ["Accenture", "Visa", "Salesforce", "Flipkart"],
    durationMinutes: 32,
    acceptance: 60,
    xp: 75,
    functionName: "maximumProjectImpact",
    problemStatement: "Daily project impact may be positive or negative. Return the largest sum over any non-empty contiguous period. Return 0 for an empty timeline.",
    realWorldExample: "Analytics teams search for the strongest continuous campaign or growth period without selecting disconnected days.",
    prerequisites: ["Arrays", "Running sums", "Dynamic programming state"],
    learningSteps: [
      "At each day, choose between starting fresh or extending the previous period.",
      "Keep that value as the best period ending today.",
      "Track the best period seen anywhere.",
    ],
    examples: [
      { input: "[-2, 3, -1, 4, -5]", output: "6", explanation: "The period [3, -1, 4] has impact 6." },
    ],
    constraints: ["0 ≤ impact.length ≤ 100000", "-10000 ≤ impact[i] ≤ 10000"],
    hints: ["A harmful prefix should be discarded.", "Initialize from the first element so all-negative arrays work."],
    starterCode: `function maximumProjectImpact(impact) {
  // Write your solution here
  return 0;
}`,
    solutionCode: `function maximumProjectImpact(impact) {
  if (impact.length === 0) return 0;
  let endingHere = impact[0];
  let best = impact[0];
  for (let i = 1; i < impact.length; i++) {
    endingHere = Math.max(impact[i], endingHere + impact[i]);
    best = Math.max(best, endingHere);
  }
  return best;
}`,
    tests: [
      { label: "Mixed impact", input: [[-2, 3, -1, 4, -5]], expected: 6 },
      { label: "All negative", input: [[-7, -2, -9]], expected: -2 },
      { label: "All positive", input: [[2, 4, 1]], expected: 7 },
      { label: "Empty timeline", input: [[]], expected: 0, hidden: true },
    ],
  },
  {
    id: "largest-skill-island",
    title: "Largest Skill Island",
    summary: "Explore connected cells without counting one twice.",
    difficulty: "Hard",
    studyYears: [3, 4],
    category: "Graphs",
    pattern: "Grid DFS",
    companies: ["Amazon", "Adobe", "Qualcomm", "JPMorgan Chase"],
    durationMinutes: 45,
    acceptance: 46,
    xp: 115,
    functionName: "largestSkillIsland",
    problemStatement: "A learning grid contains 1 for a mastered skill and 0 otherwise. Skills connect vertically or horizontally. Return the size of the largest connected group of mastered skills.",
    realWorldExample: "Image analysis, maps, and dependency heatmaps all identify connected regions by exploring each unseen cell once.",
    prerequisites: ["Depth-first search", "2D arrays", "Bounds checks", "Visited state"],
    learningSteps: [
      "Scan every cell as a possible new component.",
      "From a mastered cell, explore its four neighbors and mark it visited.",
      "Compare each component size with the largest seen so far.",
    ],
    examples: [
      { input: "[[1,1,0],[0,1,0],[1,0,1]]", output: "3", explanation: "The top-left group contains three connected cells." },
    ],
    constraints: ["0 ≤ rows, columns ≤ 300", "Every cell is 0 or 1"],
    hints: ["You may copy the grid and turn visited 1s into 0s.", "Each recursive call contributes one plus its valid neighbors."],
    starterCode: `function largestSkillIsland(grid) {
  // Write your solution here
  return 0;
}`,
    solutionCode: `function largestSkillIsland(grid) {
  if (grid.length === 0) return 0;
  const cells = grid.map((row) => [...row]);
  const visit = (row, col) => {
    if (row < 0 || row >= cells.length || col < 0 || col >= cells[0].length || cells[row][col] !== 1) return 0;
    cells[row][col] = 0;
    return 1 + visit(row + 1, col) + visit(row - 1, col) + visit(row, col + 1) + visit(row, col - 1);
  };
  let best = 0;
  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[0].length; col++) {
      best = Math.max(best, visit(row, col));
    }
  }
  return best;
}`,
    tests: [
      { label: "Several islands", input: [[[1, 1, 0], [0, 1, 0], [1, 0, 1]]], expected: 3 },
      { label: "All connected", input: [[[1, 1], [1, 1]]], expected: 4 },
      { label: "No mastered skills", input: [[[0, 0], [0, 0]]], expected: 0 },
      { label: "Empty grid", input: [[]], expected: 0, hidden: true },
    ],
  },
  {
    id: "electricity-bill-slabs",
    title: "Electricity Bill Slabs",
    summary: "Break a real bill into fixed pricing ranges.",
    difficulty: "Foundation",
    studyYears: [1],
    category: "Programming Basics",
    pattern: "Slab Simulation",
    companies: ["TCS", "Infosys", "Wipro", "Accenture"],
    durationMinutes: 18,
    acceptance: 81,
    xp: 30,
    functionName: "calculateElectricityBill",
    problemStatement: "An electricity provider charges ₹2 per unit for the first 100 units, ₹3 per unit for the next 100 units, and ₹5 per unit after 200. Return the total bill for a non-negative number of units.",
    realWorldExample: "Utility, tax, shipping, and cloud-pricing systems all apply different rates to different portions of one quantity.",
    prerequisites: ["Variables", "Conditionals", "Math.min", "Ranges"],
    learningSteps: ["Charge the first slab up to 100 units.", "Subtract consumed units before entering the next slab.", "Charge only the remaining units at the final rate."],
    examples: [
      { input: "units = 250", output: "750", explanation: "100×2 + 100×3 + 50×5 = 750." },
    ],
    constraints: ["0 ≤ units ≤ 100000", "units is a whole number"],
    hints: ["Do not apply the highest rate to every unit.", "Consume one slab at a time."],
    starterCode: `function calculateElectricityBill(units) {
  // Write your solution here
  return 0;
}`,
    solutionCode: `function calculateElectricityBill(units) {
  const firstSlab = Math.min(units, 100);
  const secondSlab = Math.min(Math.max(units - 100, 0), 100);
  const finalSlab = Math.max(units - 200, 0);
  return firstSlab * 2 + secondSlab * 3 + finalSlab * 5;
}`,
    tests: [
      { label: "Inside first slab", input: [80], expected: 160 },
      { label: "Two slabs", input: [150], expected: 350 },
      { label: "All slabs", input: [250], expected: 750 },
      { label: "No usage", input: [0], expected: 0, hidden: true },
    ],
  },
  {
    id: "character-frequency-report",
    title: "Character Frequency Report",
    summary: "Build a frequency map from cleaned text.",
    difficulty: "Easy",
    studyYears: [1, 2],
    category: "Strings & Hashing",
    pattern: "Frequency Map",
    companies: ["Cognizant", "Capgemini", "Zoho", "American Express"],
    durationMinutes: 22,
    acceptance: 74,
    xp: 40,
    functionName: "characterFrequency",
    problemStatement: "Return an object containing the frequency of every non-space character in a message. Treat uppercase and lowercase as the same character and preserve first-appearance order in the object.",
    realWorldExample: "Search, moderation, compression, and analytics systems begin many text tasks by counting normalized symbols.",
    prerequisites: ["Strings", "Objects", "Loops", "toLowerCase"],
    learningSteps: ["Normalize the text to lowercase.", "Skip spaces before updating the report.", "Increase the previous count or start at one."],
    examples: [
      { input: '"Code Code"', output: '{"c":2,"o":2,"d":2,"e":2}', explanation: "Spaces are ignored and both words are normalized." },
    ],
    constraints: ["0 ≤ text.length ≤ 100000", "Text may contain letters, digits, punctuation, and spaces"],
    hints: ["Use counts[char] || 0.", "Normalize before checking or counting."],
    starterCode: `function characterFrequency(text) {
  // Write your solution here
  return {};
}`,
    solutionCode: `function characterFrequency(text) {
  const counts = {};
  for (const char of text.toLowerCase()) {
    if (char === " ") continue;
    counts[char] = (counts[char] || 0) + 1;
  }
  return counts;
}`,
    tests: [
      { label: "Repeated word", input: ["Code Code"], expected: { c: 2, o: 2, d: 2, e: 2 } },
      { label: "Digits and punctuation", input: ["A1! a"], expected: { "1": 1, a: 2, "!": 1 } },
      { label: "Only spaces", input: ["   "], expected: {} },
    ],
  },
  {
    id: "matrix-row-totals",
    title: "Matrix Row Totals",
    summary: "Learn nested loops with a two-dimensional array.",
    difficulty: "Easy",
    studyYears: [1, 2],
    category: "Matrices",
    pattern: "Matrix Traversal",
    companies: ["HCLTech", "IBM", "Samsung R&D", "Deloitte"],
    durationMinutes: 22,
    acceptance: 78,
    xp: 40,
    functionName: "matrixRowTotals",
    problemStatement: "A classroom attendance matrix stores daily attendance counts for each section. Return an array containing the sum of every row.",
    realWorldExample: "Spreadsheets, images, game boards, and analytics tables all require systematic row-and-column traversal.",
    prerequisites: ["Arrays", "Nested loops", "Running totals"],
    learningSteps: ["Create one result entry per row.", "Reset the running total when a new row begins.", "Visit every value in that row exactly once."],
    examples: [
      { input: "[[10,12,11],[8,9,10]]", output: "[33,27]", explanation: "Each output value is one row's total." },
    ],
    constraints: ["0 ≤ matrix.length ≤ 1000", "Rows may be empty", "Values are integers"],
    hints: ["Use one loop for rows and another for values.", "An empty row has total zero."],
    starterCode: `function matrixRowTotals(matrix) {
  // Write your solution here
  return [];
}`,
    solutionCode: `function matrixRowTotals(matrix) {
  const totals = [];
  for (const row of matrix) {
    let total = 0;
    for (const value of row) total += value;
    totals.push(total);
  }
  return totals;
}`,
    tests: [
      { label: "Two sections", input: [[[10, 12, 11], [8, 9, 10]]], expected: [33, 27] },
      { label: "Empty row", input: [[[], [5]]], expected: [0, 5] },
      { label: "Empty matrix", input: [[]], expected: [] },
    ],
  },
  {
    id: "recursive-folder-count",
    title: "Recursive Folder Count",
    summary: "Understand base cases through nested data.",
    difficulty: "Easy",
    studyYears: [2],
    category: "Recursion",
    pattern: "Recursion",
    companies: ["LTIMindtree", "Oracle", "Freshworks", "PwC"],
    durationMinutes: 28,
    acceptance: 68,
    xp: 50,
    functionName: "countFolders",
    problemStatement: "A folder is an object with a name and a children array containing more folders. Return the total number of folders, including the root folder.",
    realWorldExample: "File explorers, comment threads, organization charts, and UI component trees naturally contain smaller versions of themselves.",
    prerequisites: ["Functions", "Objects", "Recursion", "Base cases"],
    learningSteps: ["Count the current folder first.", "Ask the same function to count each child folder.", "An empty children array naturally ends the recursion."],
    examples: [
      { input: '{name:"root",children:[{name:"src",children:[]},{name:"tests",children:[]}]}', output: "3", explanation: "The root and its two child folders are counted." },
    ],
    constraints: ["The structure is a valid tree", "Maximum recommended nesting depth is 1000"],
    hints: ["Start the answer at one for the current folder.", "Add the result returned by every child."],
    starterCode: `function countFolders(folder) {
  // Write your solution here
  return 0;
}`,
    solutionCode: `function countFolders(folder) {
  let total = 1;
  for (const child of folder.children) total += countFolders(child);
  return total;
}`,
    tests: [
      { label: "Root only", input: [{ name: "root", children: [] }], expected: 1 },
      { label: "Two children", input: [{ name: "root", children: [{ name: "src", children: [] }, { name: "tests", children: [] }] }], expected: 3 },
      { label: "Nested tree", input: [{ name: "root", children: [{ name: "src", children: [{ name: "app", children: [] }] }] }], expected: 3 },
    ],
  },
  {
    id: "prefix-range-sums",
    title: "Fast Range Sum Queries",
    summary: "Preprocess once to answer many requests quickly.",
    difficulty: "Medium",
    studyYears: [2, 3],
    category: "Arrays",
    pattern: "Prefix Sum",
    companies: ["Paytm", "Visa", "Goldman Sachs", "Walmart Global Tech"],
    durationMinutes: 32,
    acceptance: 62,
    xp: 70,
    functionName: "rangeSums",
    problemStatement: "Given an array of values and inclusive queries [left, right], return the sum for every requested range. Build a solution that does not rescan each range.",
    realWorldExample: "Financial dashboards and telemetry systems preprocess cumulative totals so repeated time-range queries remain fast.",
    prerequisites: ["Arrays", "Prefix sums", "Index boundaries"],
    learningSteps: ["Build prefix[i + 1] as the sum through values[i].", "Represent the range before left as prefix[left].", "Subtract that prefix from prefix[right + 1]."],
    examples: [
      { input: "values=[2,4,1,7], queries=[[0,2],[1,3]]", output: "[7,12]", explanation: "The ranges sum to 2+4+1 and 4+1+7." },
    ],
    constraints: ["0 ≤ values.length, queries.length ≤ 100000", "Every query is a valid inclusive range"],
    hints: ["Use a prefix array with one extra leading zero.", "Each query should take O(1) after preprocessing."],
    starterCode: `function rangeSums(values, queries) {
  // Write your solution here
  return [];
}`,
    solutionCode: `function rangeSums(values, queries) {
  const prefix = [0];
  for (const value of values) prefix.push(prefix[prefix.length - 1] + value);
  return queries.map(([left, right]) => prefix[right + 1] - prefix[left]);
}`,
    tests: [
      { label: "Two queries", input: [[2, 4, 1, 7], [[0, 2], [1, 3]]], expected: [7, 12] },
      { label: "Single values", input: [[5, -2, 9], [[0, 0], [2, 2]]], expected: [5, 9] },
      { label: "Full range", input: [[1, 2, 3], [[0, 2]]], expected: [6] },
    ],
  },
  {
    id: "rotated-student-search",
    title: "Search Rotated Student IDs",
    summary: "Adapt binary search when the sorted array has moved.",
    difficulty: "Medium",
    studyYears: [2, 3],
    category: "Binary Search",
    pattern: "Modified Binary Search",
    companies: ["Microsoft", "Adobe", "Razorpay", "Barclays"],
    durationMinutes: 38,
    acceptance: 52,
    xp: 85,
    functionName: "findStudentId",
    problemStatement: "A strictly increasing list of student IDs was rotated at an unknown position. Return the index of target in O(log n) time, or -1 when it is absent.",
    realWorldExample: "Rotated-search reasoning teaches how to preserve binary search when data has a predictable structural disruption.",
    prerequisites: ["Binary search", "Sorted arrays", "Inclusive boundaries"],
    learningSteps: ["At least one half around mid is sorted.", "Check whether target lies inside the sorted half.", "Discard the half that cannot contain target."],
    examples: [
      { input: "ids=[40,50,60,10,20,30], target=20", output: "4", explanation: "20 appears at index four after rotation." },
    ],
    constraints: ["0 ≤ ids.length ≤ 100000", "IDs are unique", "The array is a rotation of a sorted array"],
    hints: ["Compare ids[left] with ids[mid] to find the sorted half.", "Use <= carefully at the boundaries."],
    starterCode: `function findStudentId(ids, target) {
  // Write your solution here
  return -1;
}`,
    solutionCode: `function findStudentId(ids, target) {
  let left = 0;
  let right = ids.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (ids[mid] === target) return mid;
    if (ids[left] <= ids[mid]) {
      if (ids[left] <= target && target < ids[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (ids[mid] < target && target <= ids[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}`,
    tests: [
      { label: "Target after rotation", input: [[40, 50, 60, 10, 20, 30], 20], expected: 4 },
      { label: "Target before rotation", input: [[40, 50, 60, 10, 20, 30], 50], expected: 1 },
      { label: "Missing target", input: [[4, 5, 1, 2, 3], 9], expected: -1 },
      { label: "Single item", input: [[7], 7], expected: 0, hidden: true },
    ],
  },
  {
    id: "sort-support-tickets",
    title: "Sort Support Tickets",
    summary: "Translate multiple business priorities into one comparator.",
    difficulty: "Medium",
    studyYears: [2, 3],
    category: "Sorting",
    pattern: "Custom Sort",
    companies: ["Salesforce", "ServiceNow", "SAP", "Freshworks"],
    durationMinutes: 32,
    acceptance: 59,
    xp: 70,
    functionName: "sortSupportTickets",
    problemStatement: "Each ticket has id, priority (high, medium, or low), and createdAt as an increasing number. Return ticket IDs sorted by priority first and oldest creation time second. Do not mutate the input.",
    realWorldExample: "Queues in support, hospitals, logistics, and schedulers often combine urgency with first-come-first-served ordering.",
    prerequisites: ["Array sorting", "Comparator functions", "Objects"],
    learningSteps: ["Map priority labels to numeric ranks.", "Compare ranks before timestamps.", "Sort a copied array and return only IDs."],
    examples: [
      { input: '[{id:"A",priority:"low",createdAt:1},{id:"B",priority:"high",createdAt:3}]', output: '["B","A"]', explanation: "High priority is processed first even though it arrived later." },
    ],
    constraints: ["0 ≤ tickets.length ≤ 100000", "createdAt values are unique"],
    hints: ["Use { high: 0, medium: 1, low: 2 }.", "Return the timestamp difference only when priorities tie."],
    starterCode: `function sortSupportTickets(tickets) {
  // Write your solution here
  return [];
}`,
    solutionCode: `function sortSupportTickets(tickets) {
  const rank = { high: 0, medium: 1, low: 2 };
  return [...tickets]
    .sort((first, second) => rank[first.priority] - rank[second.priority] || first.createdAt - second.createdAt)
    .map((ticket) => ticket.id);
}`,
    tests: [
      { label: "Priority before age", input: [[{ id: "A", priority: "low", createdAt: 1 }, { id: "B", priority: "high", createdAt: 3 }]], expected: ["B", "A"] },
      { label: "Age breaks tie", input: [[{ id: "A", priority: "medium", createdAt: 5 }, { id: "B", priority: "medium", createdAt: 2 }]], expected: ["B", "A"] },
      { label: "All levels", input: [[{ id: "L", priority: "low", createdAt: 1 }, { id: "H", priority: "high", createdAt: 4 }, { id: "M", priority: "medium", createdAt: 2 }]], expected: ["H", "M", "L"] },
    ],
  },
  {
    id: "linked-task-cycle",
    title: "Detect a Linked Task Cycle",
    summary: "Use two speeds to detect a loop with constant memory.",
    difficulty: "Medium",
    studyYears: [2, 3],
    category: "Linked Lists",
    pattern: "Fast & Slow Pointers",
    companies: ["Amazon", "Oracle", "JPMorgan Chase", "HCLTech"],
    durationMinutes: 35,
    acceptance: 55,
    xp: 80,
    functionName: "hasTaskCycle",
    problemStatement: "Tasks are stored by index. nextTask[i] gives the next task index or -1 for the end. Starting from start, return whether the chain enters a cycle using O(1) extra space.",
    realWorldExample: "Workflow engines and dependency systems must detect loops that would otherwise run forever.",
    prerequisites: ["Linked-list reasoning", "Pointers", "Cycle detection"],
    learningSteps: ["Move slow by one link.", "Move fast by two links.", "A meeting proves a cycle; reaching -1 proves termination."],
    examples: [
      { input: "nextTask=[1,2,3,1], start=0", output: "true", explanation: "The chain enters the loop 1→2→3→1." },
    ],
    constraints: ["0 ≤ nextTask.length ≤ 100000", "Each value is -1 or a valid index"],
    hints: ["Write a helper that safely returns the next index.", "Check fast after both of its moves."],
    starterCode: `function hasTaskCycle(nextTask, start) {
  // Write your solution here
  return false;
}`,
    solutionCode: `function hasTaskCycle(nextTask, start) {
  const next = (index) => index === -1 ? -1 : nextTask[index];
  let slow = start;
  let fast = start;
  while (fast !== -1 && next(fast) !== -1) {
    slow = next(slow);
    fast = next(next(fast));
    if (slow === fast) return true;
  }
  return false;
}`,
    tests: [
      { label: "Cycle after first task", input: [[1, 2, 3, 1], 0], expected: true },
      { label: "Terminating chain", input: [[1, 2, -1], 0], expected: false },
      { label: "Self cycle", input: [[0], 0], expected: true },
      { label: "Empty start", input: [[], -1], expected: false, hidden: true },
    ],
  },
  {
    id: "scholarship-combinations",
    title: "Scholarship Credit Combinations",
    summary: "Explore choices and undo them with backtracking.",
    difficulty: "Medium",
    studyYears: [3, 4],
    category: "Recursion & Search",
    pattern: "Backtracking",
    companies: ["Google", "Meesho", "Atlassian", "Nvidia"],
    durationMinutes: 40,
    acceptance: 49,
    xp: 95,
    functionName: "countScholarshipCombinations",
    problemStatement: "Each distinct course offers a positive credit value and may be selected at most once. Return the number of subsets whose credits sum exactly to target.",
    realWorldExample: "Configuration systems, scheduling, and recommendation engines explore combinations while pruning choices that can no longer work.",
    prerequisites: ["Recursion", "Subsets", "Backtracking", "Pruning"],
    learningSteps: ["At each course, choose to include or skip it.", "Reduce the remaining target when including it.", "Stop a branch when the remaining target is zero or negative."],
    examples: [
      { input: "credits=[1,2,3,4], target=5", output: "2", explanation: "The valid subsets are [1,4] and [2,3]." },
    ],
    constraints: ["0 ≤ credits.length ≤ 24", "Credits are distinct positive integers", "target ≥ 0"],
    hints: ["Sort first so a value above the remaining target can stop the loop.", "Pass the next index to avoid reusing a course."],
    starterCode: `function countScholarshipCombinations(credits, target) {
  // Write your solution here
  return 0;
}`,
    solutionCode: `function countScholarshipCombinations(credits, target) {
  const sorted = [...credits].sort((a, b) => a - b);
  const search = (start, remaining) => {
    if (remaining === 0) return 1;
    let count = 0;
    for (let index = start; index < sorted.length; index++) {
      if (sorted[index] > remaining) break;
      count += search(index + 1, remaining - sorted[index]);
    }
    return count;
  };
  return search(0, target);
}`,
    tests: [
      { label: "Two combinations", input: [[1, 2, 3, 4], 5], expected: 2 },
      { label: "Single exact course", input: [[2, 5, 9], 5], expected: 1 },
      { label: "No combination", input: [[4, 7], 3], expected: 0 },
      { label: "Empty subset", input: [[1, 2], 0], expected: 1, hidden: true },
    ],
  },
  {
    id: "minimum-network-delay",
    title: "Minimum Network Delay",
    summary: "Find shortest weighted paths with a min-heap.",
    difficulty: "Hard",
    studyYears: [3, 4],
    category: "Graphs",
    pattern: "Dijkstra",
    companies: ["Uber", "Qualcomm", "Microsoft", "Morgan Stanley"],
    durationMinutes: 50,
    acceptance: 43,
    xp: 125,
    functionName: "minimumNetworkDelay",
    problemStatement: "A directed network has n nodes numbered 0 to n-1 and links [from, to, delay] with non-negative delays. Starting at source, return the time when all nodes have received the signal, or -1 if any node is unreachable.",
    realWorldExample: "Routing, deployment propagation, and distributed tracing use shortest-path algorithms to estimate the earliest arrival through weighted links.",
    prerequisites: ["Weighted graphs", "Adjacency lists", "Min-heaps", "Greedy algorithms"],
    learningSteps: ["Store outgoing links in an adjacency list.", "Always expand the currently closest unsettled node.", "Ignore stale heap entries and take the maximum final distance."],
    examples: [
      { input: "n=4, links=[[0,1,1],[0,2,4],[1,2,2],[2,3,1]], source=0", output: "4", explanation: "The shortest distances are 0,1,3,4." },
    ],
    constraints: ["1 ≤ n ≤ 10000", "0 ≤ links.length ≤ 50000", "delay ≥ 0"],
    hints: ["Push [distance,node] into a min-heap.", "A heap entry is stale when its distance differs from the best known distance."],
    starterCode: `function minimumNetworkDelay(n, links, source) {
  // Write your solution here
  return -1;
}`,
    solutionCode: `function minimumNetworkDelay(n, links, source) {
  const graph = Array.from({ length: n }, () => []);
  for (const [from, to, delay] of links) graph[from].push([to, delay]);
  const distances = Array(n).fill(Infinity);
  distances[source] = 0;
  const heap = [[0, source]];
  const push = (item) => {
    heap.push(item);
    let index = heap.length - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (heap[parent][0] <= heap[index][0]) break;
      [heap[parent], heap[index]] = [heap[index], heap[parent]];
      index = parent;
    }
  };
  const pop = () => {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length && last) {
      heap[0] = last;
      let index = 0;
      while (true) {
        let smallest = index;
        const left = index * 2 + 1;
        const right = left + 1;
        if (left < heap.length && heap[left][0] < heap[smallest][0]) smallest = left;
        if (right < heap.length && heap[right][0] < heap[smallest][0]) smallest = right;
        if (smallest === index) break;
        [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
        index = smallest;
      }
    }
    return top;
  };
  while (heap.length) {
    const [distance, node] = pop();
    if (distance !== distances[node]) continue;
    for (const [next, weight] of graph[node]) {
      const candidate = distance + weight;
      if (candidate < distances[next]) {
        distances[next] = candidate;
        push([candidate, next]);
      }
    }
  }
  const answer = Math.max(...distances);
  return answer === Infinity ? -1 : answer;
}`,
    tests: [
      { label: "Improved indirect path", input: [4, [[0, 1, 1], [0, 2, 4], [1, 2, 2], [2, 3, 1]], 0], expected: 4 },
      { label: "Unreachable node", input: [3, [[0, 1, 2]], 0], expected: -1 },
      { label: "Single node", input: [1, [], 0], expected: 0 },
    ],
  },
  {
    id: "student-community-sizes",
    title: "Student Community Sizes",
    summary: "Merge connected groups with Union Find.",
    difficulty: "Hard",
    studyYears: [3, 4],
    category: "Graphs",
    pattern: "Union Find",
    companies: ["Meta", "PhonePe", "Intuit", "Wells Fargo"],
    durationMinutes: 45,
    acceptance: 46,
    xp: 115,
    functionName: "studentCommunitySizes",
    problemStatement: "There are n students and friendship pairs [a,b]. Friendships are transitive. Return the sizes of all connected student communities sorted from largest to smallest.",
    realWorldExample: "Identity matching, social communities, network connectivity, and account merging all repeatedly join previously separate groups.",
    prerequisites: ["Disjoint sets", "Path compression", "Union by rank", "Hash maps"],
    learningSteps: ["Start with every student as their own parent.", "Union the roots for each friendship.", "Find every final root, count its members, and sort the sizes."],
    examples: [
      { input: "n=6, pairs=[[0,1],[1,2],[3,4]]", output: "[3,2,1]", explanation: "The communities are {0,1,2}, {3,4}, and {5}." },
    ],
    constraints: ["1 ≤ n ≤ 100000", "0 ≤ pairs.length ≤ 200000", "Student IDs are valid"],
    hints: ["Compress parent paths inside find.", "Count by final root only after all unions are complete."],
    starterCode: `function studentCommunitySizes(n, pairs) {
  // Write your solution here
  return [];
}`,
    solutionCode: `function studentCommunitySizes(n, pairs) {
  const parent = Array.from({ length: n }, (_, index) => index);
  const rank = Array(n).fill(0);
  const find = (node) => {
    if (parent[node] !== node) parent[node] = find(parent[node]);
    return parent[node];
  };
  const union = (first, second) => {
    let rootA = find(first);
    let rootB = find(second);
    if (rootA === rootB) return;
    if (rank[rootA] < rank[rootB]) [rootA, rootB] = [rootB, rootA];
    parent[rootB] = rootA;
    if (rank[rootA] === rank[rootB]) rank[rootA]++;
  };
  for (const [first, second] of pairs) union(first, second);
  const counts = new Map();
  for (let student = 0; student < n; student++) {
    const root = find(student);
    counts.set(root, (counts.get(root) || 0) + 1);
  }
  return [...counts.values()].sort((a, b) => b - a);
}`,
    tests: [
      { label: "Three communities", input: [6, [[0, 1], [1, 2], [3, 4]]], expected: [3, 2, 1] },
      { label: "All connected", input: [4, [[0, 1], [2, 3], [1, 2]]], expected: [4] },
      { label: "No friendships", input: [3, []], expected: [1, 1, 1] },
    ],
  },
  {
    id: "minimum-edit-operations",
    title: "Minimum Edit Operations",
    summary: "Build a two-dimensional DP table for two strings.",
    difficulty: "Hard",
    studyYears: [3, 4],
    category: "Dynamic Programming",
    pattern: "2D DP",
    companies: ["Google", "Adobe", "Amazon", "Goldman Sachs"],
    durationMinutes: 50,
    acceptance: 41,
    xp: 130,
    functionName: "minimumEditOperations",
    problemStatement: "Return the minimum number of single-character insertions, deletions, or replacements needed to transform first into second.",
    realWorldExample: "Spell checkers, search suggestions, DNA comparison, and version-diff tools measure how far two sequences are from each other.",
    prerequisites: ["2D dynamic programming", "String indices", "Recurrence relations", "Base cases"],
    learningSteps: ["Define dp[i][j] for the first i and j characters.", "Matching characters reuse the diagonal answer.", "Different characters take one plus the best insert, delete, or replace state."],
    examples: [
      { input: 'first="horse", second="ros"', output: "3", explanation: "Replace h→r, delete r, and delete e." },
    ],
    constraints: ["0 ≤ first.length, second.length ≤ 1000", "Strings contain lowercase letters"],
    hints: ["Initialize empty-prefix costs from 0 to each string length.", "The three neighboring states represent delete, insert, and replace."],
    starterCode: `function minimumEditOperations(first, second) {
  // Write your solution here
  return 0;
}`,
    solutionCode: `function minimumEditOperations(first, second) {
  let previous = Array.from({ length: second.length + 1 }, (_, index) => index);
  for (let row = 1; row <= first.length; row++) {
    const current = [row];
    for (let col = 1; col <= second.length; col++) {
      if (first[row - 1] === second[col - 1]) current[col] = previous[col - 1];
      else current[col] = 1 + Math.min(previous[col], current[col - 1], previous[col - 1]);
    }
    previous = current;
  }
  return previous[second.length];
}`,
    tests: [
      { label: "Horse to ros", input: ["horse", "ros"], expected: 3 },
      { label: "Intention to execution", input: ["intention", "execution"], expected: 5 },
      { label: "Same text", input: ["code", "code"], expected: 0 },
      { label: "Insert all", input: ["", "abc"], expected: 3, hidden: true },
    ],
  },
];

// Keep the queue useful after a learner finishes the curated set. These drills
// reuse the same learning objective but rotate public/hidden cases and labels,
// so a student can practise the pattern again without seeing an empty board.
const expandedCuratedQuestions = [...curatedCodingQuestions, ...additionalCodingQuestions];

const codingDrills: CodingQuestion[] = expandedCuratedQuestions.flatMap((question) =>
  Array.from({ length: 4 }, (_, variantIndex) => {
    const shift = (variantIndex + 1) % question.tests.length;
    const rotatedTests = question.tests
      .slice(shift)
      .concat(question.tests.slice(0, shift))
      .map((test, testIndex) => ({
        ...test,
        label: test.hidden
          ? `Challenge case ${testIndex + 1}`
          : `${test.label} · Drill ${variantIndex + 1}`,
        hidden: (testIndex + variantIndex) % 4 === 3,
      }));

    return {
      ...question,
      id: `${question.id}-drill-${variantIndex + 1}`,
      title: `${question.title} · Drill ${variantIndex + 1}`,
      summary: `A fresh ${question.pattern} repetition with a new judge-case order.`,
      acceptance: 0,
      xp: Math.max(15, question.xp - 5),
      tests: rotatedTests,
      templateSourceId: question.id,
    };
  }),
);

export const codingQuestions: CodingQuestion[] = [...expandedCuratedQuestions, ...codingDrills];

export const codingPatterns = [...new Set(codingQuestions.map((question) => question.pattern))].sort();

export function getCodingQuestion(id: string) {
  return codingQuestions.find((question) => question.id === id);
}

export function getRecommendedQuestions(studyYear: string) {
  const year = Number(studyYear) || 3;
  return codingQuestions.filter((question) => question.studyYears.includes(year));
}
