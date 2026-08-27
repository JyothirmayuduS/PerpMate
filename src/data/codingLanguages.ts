import type { CodingQuestion } from "@/data/codingQuestions";

export type CodingLanguage = "javascript" | "python" | "java" | "cpp";

export type LanguageTemplate = {
  starterCode: string;
  solutionCode: string;
};

export const codingLanguageMeta: Record<
  CodingLanguage,
  { label: string; shortLabel: string; extension: string; executable: boolean }
> = {
  javascript: { label: "JavaScript", shortLabel: "JS", extension: "js", executable: true },
  python: { label: "Python 3", shortLabel: "PY", extension: "py", executable: false },
  java: { label: "Java 17", shortLabel: "JAVA", extension: "java", executable: false },
  cpp: { label: "C++ 17", shortLabel: "C++", extension: "cpp", executable: false },
};

type AdditionalLanguage = Exclude<CodingLanguage, "javascript">;

const languageTemplates: Record<
  string,
  Partial<Record<AdditionalLanguage, LanguageTemplate>>
> = {
  "delivery-fee-calculator": {
    python: {
      starterCode: `def calculate_delivery_fee(order_total, distance_km):
    # Write your solution here
    return 0`,
      solutionCode: `def calculate_delivery_fee(order_total, distance_km):
    if order_total >= 1000:
        return 0
    return 40 + max(0, distance_km - 5) * 8`,
    },
    java: {
      starterCode: `class Solution {
    public int calculateDeliveryFee(int orderTotal, int distanceKm) {
        // Write your solution here
        return 0;
    }
}`,
      solutionCode: `class Solution {
    public int calculateDeliveryFee(int orderTotal, int distanceKm) {
        if (orderTotal >= 1000) return 0;
        return 40 + Math.max(0, distanceKm - 5) * 8;
    }
}`,
    },
    cpp: {
      starterCode: `class Solution {
public:
    int calculateDeliveryFee(int orderTotal, int distanceKm) {
        // Write your solution here
        return 0;
    }
};`,
      solutionCode: `class Solution {
public:
    int calculateDeliveryFee(int orderTotal, int distanceKm) {
        if (orderTotal >= 1000) return 0;
        return 40 + max(0, distanceKm - 5) * 8;
    }
};`,
    },
  },
  "longest-study-streak": {
    python: {
      starterCode: `def longest_study_streak(days):
    # Write your solution here
    return 0`,
      solutionCode: `def longest_study_streak(days):
    current = 0
    best = 0
    for completed in days:
        current = current + 1 if completed else 0
        best = max(best, current)
    return best`,
    },
    java: {
      starterCode: `class Solution {
    public int longestStudyStreak(boolean[] days) {
        // Write your solution here
        return 0;
    }
}`,
      solutionCode: `class Solution {
    public int longestStudyStreak(boolean[] days) {
        int current = 0;
        int best = 0;
        for (boolean completed : days) {
            current = completed ? current + 1 : 0;
            best = Math.max(best, current);
        }
        return best;
    }
}`,
    },
    cpp: {
      starterCode: `class Solution {
public:
    int longestStudyStreak(vector<bool>& days) {
        // Write your solution here
        return 0;
    }
};`,
      solutionCode: `class Solution {
public:
    int longestStudyStreak(vector<bool>& days) {
        int current = 0, best = 0;
        for (bool completed : days) {
            current = completed ? current + 1 : 0;
            best = max(best, current);
        }
        return best;
    }
};`,
    },
  },
  "balanced-brackets": {
    python: {
      starterCode: `def has_balanced_brackets(text):
    # Write your solution here
    return False`,
      solutionCode: `def has_balanced_brackets(text):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for char in text:
        if char in '([{':
            stack.append(char)
        elif char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
    return not stack`,
    },
    java: {
      starterCode: `class Solution {
    public boolean hasBalancedBrackets(String text) {
        // Write your solution here
        return false;
    }
}`,
      solutionCode: `class Solution {
    public boolean hasBalancedBrackets(String text) {
        Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{');
        Deque<Character> stack = new ArrayDeque<>();
        for (char ch : text.toCharArray()) {
            if (ch == '(' || ch == '[' || ch == '{') stack.push(ch);
            else if (pairs.containsKey(ch) && (stack.isEmpty() || stack.pop() != pairs.get(ch))) return false;
        }
        return stack.isEmpty();
    }
}`,
    },
    cpp: {
      starterCode: `class Solution {
public:
    bool hasBalancedBrackets(string text) {
        // Write your solution here
        return false;
    }
};`,
      solutionCode: `class Solution {
public:
    bool hasBalancedBrackets(string text) {
        unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};
        vector<char> stack;
        for (char ch : text) {
            if (ch == '(' || ch == '[' || ch == '{') stack.push_back(ch);
            else if (pairs.count(ch)) {
                if (stack.empty() || stack.back() != pairs[ch]) return false;
                stack.pop_back();
            }
        }
        return stack.empty();
    }
};`,
    },
  },
  "move-sold-out-items": {
    python: {
      starterCode: `def move_sold_out_items(stock):
    # Write your solution here
    return []`,
      solutionCode: `def move_sold_out_items(stock):
    available = [count for count in stock if count != 0]
    return available + [0] * (len(stock) - len(available))`,
    },
    java: {
      starterCode: `class Solution {
    public int[] moveSoldOutItems(int[] stock) {
        // Write your solution here
        return new int[0];
    }
}`,
      solutionCode: `class Solution {
    public int[] moveSoldOutItems(int[] stock) {
        int[] result = new int[stock.length];
        int write = 0;
        for (int count : stock) if (count != 0) result[write++] = count;
        return result;
    }
}`,
    },
    cpp: {
      starterCode: `class Solution {
public:
    vector<int> moveSoldOutItems(vector<int>& stock) {
        // Write your solution here
        return {};
    }
};`,
      solutionCode: `class Solution {
public:
    vector<int> moveSoldOutItems(vector<int>& stock) {
        vector<int> result;
        for (int count : stock) if (count != 0) result.push_back(count);
        result.resize(stock.size(), 0);
        return result;
    }
};`,
    },
  },
  "maximum-project-impact": {
    python: {
      starterCode: `def maximum_project_impact(impact):
    # Write your solution here
    return 0`,
      solutionCode: `def maximum_project_impact(impact):
    if not impact:
        return 0
    ending_here = best = impact[0]
    for value in impact[1:]:
        ending_here = max(value, ending_here + value)
        best = max(best, ending_here)
    return best`,
    },
    java: {
      starterCode: `class Solution {
    public int maximumProjectImpact(int[] impact) {
        // Write your solution here
        return 0;
    }
}`,
      solutionCode: `class Solution {
    public int maximumProjectImpact(int[] impact) {
        if (impact.length == 0) return 0;
        int endingHere = impact[0], best = impact[0];
        for (int i = 1; i < impact.length; i++) {
            endingHere = Math.max(impact[i], endingHere + impact[i]);
            best = Math.max(best, endingHere);
        }
        return best;
    }
}`,
    },
    cpp: {
      starterCode: `class Solution {
public:
    int maximumProjectImpact(vector<int>& impact) {
        // Write your solution here
        return 0;
    }
};`,
      solutionCode: `class Solution {
public:
    int maximumProjectImpact(vector<int>& impact) {
        if (impact.empty()) return 0;
        int endingHere = impact[0], best = impact[0];
        for (int i = 1; i < impact.size(); i++) {
            endingHere = max(impact[i], endingHere + impact[i]);
            best = max(best, endingHere);
        }
        return best;
    }
};`,
    },
  },
  "matrix-row-totals": {
    python: {
      starterCode: `def matrix_row_totals(matrix):
    # Write your solution here
    return []`,
      solutionCode: `def matrix_row_totals(matrix):
    return [sum(row) for row in matrix]`,
    },
    java: {
      starterCode: `class Solution {
    public int[] matrixRowTotals(int[][] matrix) {
        // Write your solution here
        return new int[0];
    }
}`,
      solutionCode: `class Solution {
    public int[] matrixRowTotals(int[][] matrix) {
        int[] totals = new int[matrix.length];
        for (int row = 0; row < matrix.length; row++) {
            for (int value : matrix[row]) totals[row] += value;
        }
        return totals;
    }
}`,
    },
    cpp: {
      starterCode: `class Solution {
public:
    vector<int> matrixRowTotals(vector<vector<int>>& matrix) {
        // Write your solution here
        return {};
    }
};`,
      solutionCode: `class Solution {
public:
    vector<int> matrixRowTotals(vector<vector<int>>& matrix) {
        vector<int> totals;
        for (auto& row : matrix) totals.push_back(accumulate(row.begin(), row.end(), 0));
        return totals;
    }
};`,
    },
  },
  "prefix-range-sums": {
    python: {
      starterCode: `def range_sums(values, queries):
    # Write your solution here
    return []`,
      solutionCode: `def range_sums(values, queries):
    prefix = [0]
    for value in values:
        prefix.append(prefix[-1] + value)
    return [prefix[right + 1] - prefix[left] for left, right in queries]`,
    },
    java: {
      starterCode: `class Solution {
    public long[] rangeSums(int[] values, int[][] queries) {
        // Write your solution here
        return new long[0];
    }
}`,
      solutionCode: `class Solution {
    public long[] rangeSums(int[] values, int[][] queries) {
        long[] prefix = new long[values.length + 1];
        for (int i = 0; i < values.length; i++) prefix[i + 1] = prefix[i] + values[i];
        long[] answer = new long[queries.length];
        for (int i = 0; i < queries.length; i++) {
            int left = queries[i][0], right = queries[i][1];
            answer[i] = prefix[right + 1] - prefix[left];
        }
        return answer;
    }
}`,
    },
    cpp: {
      starterCode: `class Solution {
public:
    vector<long long> rangeSums(vector<int>& values, vector<vector<int>>& queries) {
        // Write your solution here
        return {};
    }
};`,
      solutionCode: `class Solution {
public:
    vector<long long> rangeSums(vector<int>& values, vector<vector<int>>& queries) {
        vector<long long> prefix(values.size() + 1, 0), answer;
        for (int i = 0; i < values.size(); i++) prefix[i + 1] = prefix[i] + values[i];
        for (auto& query : queries) answer.push_back(prefix[query[1] + 1] - prefix[query[0]]);
        return answer;
    }
};`,
    },
  },
  "rotated-student-search": {
    python: {
      starterCode: `def find_student_id(ids, target):
    # Write your solution here
    return -1`,
      solutionCode: `def find_student_id(ids, target):
    left, right = 0, len(ids) - 1
    while left <= right:
        mid = (left + right) // 2
        if ids[mid] == target:
            return mid
        if ids[left] <= ids[mid]:
            if ids[left] <= target < ids[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if ids[mid] < target <= ids[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1`,
    },
    java: {
      starterCode: `class Solution {
    public int findStudentId(int[] ids, int target) {
        // Write your solution here
        return -1;
    }
}`,
      solutionCode: `class Solution {
    public int findStudentId(int[] ids, int target) {
        int left = 0, right = ids.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (ids[mid] == target) return mid;
            if (ids[left] <= ids[mid]) {
                if (ids[left] <= target && target < ids[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (ids[mid] < target && target <= ids[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
}`,
    },
    cpp: {
      starterCode: `class Solution {
public:
    int findStudentId(vector<int>& ids, int target) {
        // Write your solution here
        return -1;
    }
};`,
      solutionCode: `class Solution {
public:
    int findStudentId(vector<int>& ids, int target) {
        int left = 0, right = (int)ids.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (ids[mid] == target) return mid;
            if (ids[left] <= ids[mid]) {
                if (ids[left] <= target && target < ids[mid]) right = mid - 1;
                else left = mid + 1;
            } else {
                if (ids[mid] < target && target <= ids[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return -1;
    }
};`,
    },
  },
  "minimum-edit-operations": {
    python: {
      starterCode: `def minimum_edit_operations(first, second):
    # Write your solution here
    return 0`,
      solutionCode: `def minimum_edit_operations(first, second):
    previous = list(range(len(second) + 1))
    for i, left_char in enumerate(first, 1):
        current = [i]
        for j, right_char in enumerate(second, 1):
            if left_char == right_char:
                current.append(previous[j - 1])
            else:
                current.append(1 + min(previous[j], current[j - 1], previous[j - 1]))
        previous = current
    return previous[-1]`,
    },
    java: {
      starterCode: `class Solution {
    public int minimumEditOperations(String first, String second) {
        // Write your solution here
        return 0;
    }
}`,
      solutionCode: `class Solution {
    public int minimumEditOperations(String first, String second) {
        int[] previous = new int[second.length() + 1];
        for (int j = 0; j <= second.length(); j++) previous[j] = j;
        for (int i = 1; i <= first.length(); i++) {
            int[] current = new int[second.length() + 1];
            current[0] = i;
            for (int j = 1; j <= second.length(); j++) {
                if (first.charAt(i - 1) == second.charAt(j - 1)) current[j] = previous[j - 1];
                else current[j] = 1 + Math.min(previous[j - 1], Math.min(previous[j], current[j - 1]));
            }
            previous = current;
        }
        return previous[second.length()];
    }
}`,
    },
    cpp: {
      starterCode: `class Solution {
public:
    int minimumEditOperations(string first, string second) {
        // Write your solution here
        return 0;
    }
};`,
      solutionCode: `class Solution {
public:
    int minimumEditOperations(string first, string second) {
        vector<int> previous(second.size() + 1);
        iota(previous.begin(), previous.end(), 0);
        for (int i = 1; i <= first.size(); i++) {
            vector<int> current(second.size() + 1);
            current[0] = i;
            for (int j = 1; j <= second.size(); j++) {
                if (first[i - 1] == second[j - 1]) current[j] = previous[j - 1];
                else current[j] = 1 + min({previous[j - 1], previous[j], current[j - 1]});
            }
            previous = current;
        }
        return previous.back();
    }
};`,
    },
  },
};

export function getSupportedLanguages(question: CodingQuestion): CodingLanguage[] {
  const additional = languageTemplates[question.id] || {};
  return (["javascript", "python", "java", "cpp"] as CodingLanguage[]).filter(
    (language) => language === "javascript" || Boolean(additional[language as AdditionalLanguage]),
  );
}

export function getLanguageTemplate(
  question: CodingQuestion,
  language: CodingLanguage,
): LanguageTemplate | null {
  if (language === "javascript") {
    return { starterCode: question.starterCode, solutionCode: question.solutionCode };
  }
  return languageTemplates[question.id]?.[language] || null;
}
