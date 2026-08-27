import type { Question } from "@/store/useStore";

type OptionSet = { A: string; B: string; C: string; D: string };

function q(
  id: string,
  topic: string,
  difficulty: Question["difficulty"],
  text: string,
  options: OptionSet,
  correctOption: Question["correctOption"],
  explanation: string,
): Question {
  return {
    id: `extra-${id}`,
    topic,
    difficulty,
    difficulty_level: difficulty === "Easy" ? 1 : difficulty === "Medium" ? 2 : 3,
    company_tag: ["TCS", "Infosys", "Accenture"],
    text,
    options,
    correctOption,
    explanation,
    simple_explanation: explanation,
    tips: "Write the known values first, then apply one rule at a time.",
  };
}

export const practiceQuestionExpansion: Record<string, Question[]> = {
  "speed-distance": [
    q("speed-relative-1", "Speed, Distance & Time", "Easy", "A car travels 150 km in 3 hours. What is its average speed?", { A: "30 km/hr", B: "40 km/hr", C: "50 km/hr", D: "60 km/hr" }, "C", "Average speed = distance / time = 150 / 3 = 50 km/hr."),
    q("speed-relative-2", "Speed, Distance & Time", "Medium", "A person walks at 5 km/hr. How far will they walk in 24 minutes?", { A: "1 km", B: "2 km", C: "2.5 km", D: "3 km" }, "B", "24 minutes is 24/60 hour. Distance = 5 × 24/60 = 2 km."),
  ],
  "work-time": [
    q("work-rate-1", "Work & Time", "Easy", "A can finish a job in 12 days. What fraction of the job does A finish in one day?", { A: "1/6", B: "1/12", C: "12", D: "11/12" }, "B", "If the whole job takes 12 equal days, one day completes 1/12 of the job."),
    q("work-rate-2", "Work & Time", "Medium", "A finishes a job in 10 days and B in 15 days. How long together?", { A: "5 days", B: "6 days", C: "8 days", D: "12 days" }, "B", "Together rate = 1/10 + 1/15 = 1/6, so the job takes 6 days."),
  ],
  percentages: [
    q("percentage-change-1", "Percentages", "Easy", "What is 15% of 240?", { A: "24", B: "30", C: "36", D: "40" }, "C", "15% of 240 = 15/100 × 240 = 36."),
    q("percentage-change-2", "Percentages", "Medium", "A price of 800 is increased by 10%. What is the new price?", { A: "810", B: "880", C: "890", D: "900" }, "B", "Increase = 10% of 800 = 80. New price = 800 + 80 = 880."),
  ],
  "profit-loss": [
    q("profit-basic-1", "Profit & Loss", "Easy", "An item bought for 500 is sold for 600. What is the profit percentage?", { A: "10%", B: "15%", C: "20%", D: "25%" }, "C", "Profit = 600 − 500 = 100. Profit% = 100/500 × 100 = 20%."),
    q("profit-basic-2", "Profit & Loss", "Medium", "An item marked 1000 gets a 15% discount. What is its selling price?", { A: "850", B: "865", C: "900", D: "915" }, "A", "Discount = 15% of 1000 = 150. Selling price = 1000 − 150 = 850."),
  ],
  interest: [
    q("interest-basic-1", "Simple & Compound Interest", "Easy", "Find the simple interest on 2000 at 5% per year for 2 years.", { A: "100", B: "150", C: "200", D: "250" }, "C", "SI = PRT/100 = 2000 × 5 × 2 / 100 = 200."),
    q("interest-basic-2", "Simple & Compound Interest", "Medium", "What is the amount after simple interest on 1500 at 8% for 1 year?", { A: "1508", B: "1620", C: "1580", D: "1700" }, "B", "Interest = 1500 × 8/100 = 120. Amount = 1500 + 120 = 1620."),
  ],
  averages: [
    q("average-basic-1", "Averages", "Easy", "The average of 8, 12, and 16 is:", { A: "10", B: "12", C: "14", D: "16" }, "B", "Average = (8 + 12 + 16) / 3 = 36 / 3 = 12."),
    q("average-basic-2", "Averages", "Medium", "The average of 5 numbers is 18. What is their total?", { A: "23", B: "90", C: "100", D: "180" }, "B", "Total = average × count = 18 × 5 = 90."),
  ],
  "ratio-proportion": [
    q("ratio-basic-1", "Ratio & Proportion", "Easy", "Divide 120 in the ratio 2:3. What is the smaller part?", { A: "40", B: "48", C: "60", D: "72" }, "B", "Total parts = 5. One part = 120/5 = 24, so the smaller part is 2 × 24 = 48."),
    q("ratio-basic-2", "Ratio & Proportion", "Medium", "If x:y = 3:4 and y:z = 2:5, what is x:z?", { A: "3:10", B: "3:5", C: "6:20", D: "5:3" }, "A", "Make y equal: 3:4 becomes 6:8 and 2:5 becomes 8:20. Therefore x:z = 6:20 = 3:10."),
  ],
  "number-systems": [
    q("number-basic-1", "Number Systems", "Easy", "What is the remainder when 47 is divided by 5?", { A: "1", B: "2", C: "3", D: "4" }, "B", "5 × 9 = 45, so 47 − 45 = 2."),
    q("number-basic-2", "Number Systems", "Medium", "What is the HCF of 24 and 36?", { A: "6", B: "8", C: "12", D: "18" }, "C", "The greatest number dividing both 24 and 36 is 12."),
  ],
  "perm-comb": [
    q("probability-basic-1", "Permutation, Combination & Probability", "Easy", "What is the probability of getting heads on one fair coin toss?", { A: "0", B: "1/4", C: "1/2", D: "1" }, "C", "There is 1 favourable outcome out of 2 equally likely outcomes, so probability is 1/2."),
    q("probability-basic-2", "Permutation, Combination & Probability", "Medium", "How many ways can 3 different books be arranged on a shelf?", { A: "3", B: "6", C: "9", D: "12" }, "B", "Three distinct objects have 3! = 3 × 2 × 1 = 6 arrangements."),
  ],
  "number-series": [
    q("series-basic-1", "Number & Letter Series", "Easy", "Find the next number: 2, 5, 8, 11, __", { A: "12", B: "13", C: "14", D: "15" }, "C", "Each term increases by 3, so the next term is 14."),
    q("series-basic-2", "Number & Letter Series", "Medium", "Find the next number: 3, 6, 12, 24, __", { A: "30", B: "36", C: "48", D: "60" }, "C", "Each term doubles, so 24 × 2 = 48."),
  ],
  "clocks-calendar": [
    q("clock-basic-1", "Clocks & Calendar", "Easy", "How many degrees does the minute hand move in 10 minutes?", { A: "30°", B: "45°", C: "60°", D: "90°" }, "C", "The minute hand moves 360° in 60 minutes, or 6° per minute. In 10 minutes it moves 60°."),
    q("clock-basic-2", "Clocks & Calendar", "Medium", "How many odd days are in a normal year of 365 days?", { A: "0", B: "1", C: "2", D: "7" }, "B", "365 = 52 weeks + 1 day, so a normal year contributes 1 odd day."),
  ],
  "verbal-main": [
    q("verbal-basic-1", "Synonyms, Antonyms & Grammar", "Easy", "Choose the synonym of ‘brief’.", { A: "Short", B: "Heavy", C: "Late", D: "Distant" }, "A", "Brief means short in duration or length."),
    q("verbal-basic-2", "Synonyms, Antonyms & Grammar", "Medium", "Choose the grammatically correct sentence.", { A: "She go to work.", B: "She going to work.", C: "She goes to work.", D: "She gone to work." }, "C", "The singular subject ‘she’ takes the present-tense verb ‘goes’."),
  ],
  "arrays-strings": [
    q("array-basic-1", "Arrays & Strings", "Easy", "What is the index of the first item in a zero-indexed array?", { A: "0", B: "1", C: "-1", D: "It depends" }, "A", "Zero-indexed arrays start at index 0."),
    q("array-basic-2", "Arrays & Strings", "Medium", "What is the usual time complexity of scanning every character in a string of length n?", { A: "O(1)", B: "O(log n)", C: "O(n)", D: "O(n²)" }, "C", "One operation per character gives linear time, O(n)."),
  ],
};
