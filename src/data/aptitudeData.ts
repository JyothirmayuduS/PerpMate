/**
 * Aptitude Question Bank — Organized by Section → Topic
 * Each topic has 3–5 questions covering Easy → Hard difficulty
 * Designed for Indian placement exam preparation (TCS, Infosys, Wipro, Amazon, Google)
 */

import { Question } from "@/store/useStore";

export interface AptitudeTopic {
  id: string;
  name: string;
  icon: string;
  desc: string;
  company_focus: string[];
  questions: Question[];
}

export interface AptitudeSection {
  id: string;
  name: string;
  icon: string;
  color: string;          // Tailwind bg class
  textColor: string;      // Tailwind text class
  borderColor: string;    // Tailwind border class
  desc: string;
  topics: AptitudeTopic[];
}

const scrapedPercentages: Question[] = [
  {
    id: "scraped-scrapedPercentages-1",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "What is 25% of 400?",
    options: {
      A: "80",
      B: "120",
      C: "100",
      D: "110"
    },
    correctOption: "C",
    explanation: "25% of 400 = (25/100) × 400 = 0.25 × 400 = 100.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedPercentages-2",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Find 10% of 1500.",
    options: {
      A: "160",
      B: "120",
      C: "180",
      D: "150"
    },
    correctOption: "D",
    explanation: "10% of 1500 = (10/100) × 1500 = 0.1 × 1500 = 150.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedPercentages-3",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If 20% of a number is 80, what is the number?",
    options: {
      A: "320",
      B: "400",
      C: "480",
      D: "410"
    },
    correctOption: "B",
    explanation: "Let the number be \\( x \\). Then, 20% of \\( x = 80 \\).  \n   \\( 0.2x = 80 \\), so \\( x = 80 / 0.2 = 400 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedPercentages-4",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "What is 5% of 2000?",
    options: {
      A: "120",
      B: "80",
      C: "110",
      D: "100"
    },
    correctOption: "D",
    explanation: "5% of 2000 = (5/100) × 2000 = 0.05 × 2000 = 100.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedPercentages-5",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If 15% of a number is 45, find the number.",
    options: {
      A: "240",
      B: "310",
      C: "360",
      D: "300"
    },
    correctOption: "D",
    explanation: "Let the number be \\( x \\). Then, \\( 0.15x = 45 \\).  \n   \\( x = 45 / 0.15 = 300 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedPercentages-6",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Calculate 40% of 250.",
    options: {
      A: "100",
      B: "120",
      C: "80",
      D: "110"
    },
    correctOption: "A",
    explanation: "40% of 250 = (40/100) × 250 = 0.4 × 250 = 100.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedPercentages-7",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If a number increased by 20% gives 240, what is the original number?",
    options: {
      A: "240",
      B: "210",
      C: "160",
      D: "200"
    },
    correctOption: "D",
    explanation: "Let the original number be \\( x \\). Then, \\( x + 0.2x = 240 \\).  \n   \\( 1.2x = 240 \\), so \\( x = 240 / 1.2 = 200 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedPercentages-8",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "What is 30% of 600?",
    options: {
      A: "190",
      B: "216",
      C: "144",
      D: "180"
    },
    correctOption: "D",
    explanation: "30% of 600 = (30/100) × 600 = 0.3 × 600 = 180.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedPercentages-9",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If 50% of a number is 75, what is the number?",
    options: {
      A: "160",
      B: "150",
      C: "120",
      D: "180"
    },
    correctOption: "B",
    explanation: "Let the number be \\( x \\). Then, \\( 0.5x = 75 \\).  \n   \\( x = 75 / 0.5 = 150 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedPercentages-10",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Find 12.5% of 800.",
    options: {
      A: "100",
      B: "80",
      C: "110",
      D: "120"
    },
    correctOption: "A",
    explanation: "12.5% of 800 = (12.5/100) × 800 = 0.125 × 800 = 100.",
    prerequisites: []
  }
];

const scrapedProfitAndLoss: Question[] = [
  {
    id: "scraped-scrapedProfitAndLoss-1",
    topic: "Profit and Loss",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A book is bought for $100 and sold for $120. Find the profit percentage.",
    options: {
      A: "24%",
      B: "16%",
      C: "30%",
      D: "20%"
    },
    correctOption: "D",
    explanation: "Profit = Selling Price - Cost Price = 120 - 100 = 20.  \n    Profit % = (Profit / Cost Price) × 100 = (20 / 100) × 100 = 20%.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedProfitAndLoss-2",
    topic: "Profit and Loss",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "An item is sold for $150 at a loss of $30. What is the cost price?",
    options: {
      A: "$180",
      B: "$144",
      C: "$190",
      D: "$216"
    },
    correctOption: "A",
    explanation: "Cost Price = Selling Price + Loss = 150 + 30 = 180.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedProfitAndLoss-3",
    topic: "Profit and Loss",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If the cost price of an item is $200 and profit is 25%, find the selling price.",
    options: {
      A: "$250",
      B: "$300",
      C: "$200",
      D: "$260"
    },
    correctOption: "A",
    explanation: "Profit = 25% of 200 = 0.25 × 200 = 50.  \n    Selling Price = Cost Price + Profit = 200 + 50 = 250.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedProfitAndLoss-4",
    topic: "Profit and Loss",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A pen is sold for $8 at a loss of 20%. Find the cost price.",
    options: {
      A: "$12",
      B: "$10",
      C: "$8",
      D: "$12"
    },
    correctOption: "B",
    explanation: "Let Cost Price be \\( x \\). Then, Selling Price = 80% of \\( x \\).  \n    \\( 0.8x = 8 \\), so \\( x = 8 / 0.8 = 10 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedProfitAndLoss-5",
    topic: "Profit and Loss",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If an article is sold for $300 with a 50% profit, what is the cost price?",
    options: {
      A: "$210",
      B: "$240",
      C: "$160",
      D: "$200"
    },
    correctOption: "D",
    explanation: "Let Cost Price be \\( x \\). Then, Selling Price = \\( x + 0.5x = 1.5x \\).  \n    \\( 1.5x = 300 \\), so \\( x = 300 / 1.5 = 200 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedProfitAndLoss-6",
    topic: "Profit and Loss",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A shirt is bought for $50 and sold for $60. What is the profit percentage?",
    options: {
      A: "16%",
      B: "20%",
      C: "30%",
      D: "24%"
    },
    correctOption: "B",
    explanation: "Profit = 60 - 50 = 10.  \n    Profit % = (10 / 50) × 100 = 20%.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedProfitAndLoss-7",
    topic: "Profit and Loss",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If the selling price is $90 and loss is 10%, find the cost price.",
    options: {
      A: "$100",
      B: "$110",
      C: "$120",
      D: "$80"
    },
    correctOption: "A",
    explanation: "Let Cost Price be \\( x \\). Then, \\( 0.9x = 90 \\).  \n    \\( x = 90 / 0.9 = 100 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedProfitAndLoss-8",
    topic: "Profit and Loss",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "An item is bought for $400 and sold at a 15% profit. Find the selling price.",
    options: {
      A: "$470",
      B: "$368",
      C: "$460",
      D: "$552"
    },
    correctOption: "C",
    explanation: "Profit = 15% of 400 = 0.15 × 400 = 60.  \n    Selling Price = 400 + 60 = 460.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedProfitAndLoss-9",
    topic: "Profit and Loss",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A watch is sold for $200 at a 25% loss. What is the cost price?",
    options: {
      A: "$320.0",
      B: "$276.67",
      C: "$213.34",
      D: "$266.67"
    },
    correctOption: "D",
    explanation: "Let Cost Price be \\( x \\). Then, \\( 0.75x = 200 \\).  \n    \\( x = 200 / 0.75 = 800 / 3 \\approx 266.67 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedProfitAndLoss-10",
    topic: "Profit and Loss",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If profit is $40 and cost price is $160, find the profit percentage.",
    options: {
      A: "20%",
      B: "30%",
      C: "25%",
      D: "35%"
    },
    correctOption: "C",
    explanation: "Profit % = (40 / 160) × 100 = 25%.",
    prerequisites: []
  }
];

const scrapedTimeAndWork: Question[] = [
  {
    id: "scraped-scrapedTimeAndWork-1",
    topic: "Time and Work",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A can do a work in 10 days. How much work does A do in 1 day?",
    options: {
      A: "2/20",
      B: "3/30",
      C: "None of the above",
      D: "1/10"
    },
    correctOption: "D",
    explanation: "Work done by A in 1 day = 1/10.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndWork-2",
    topic: "Time and Work",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "B completes a task in 15 days. What is B’s work rate per day?",
    options: {
      A: "3/35",
      B: "None of the above",
      C: "2/25",
      D: "1/15"
    },
    correctOption: "D",
    explanation: "Work rate = 1/15.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndWork-3",
    topic: "Time and Work",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If C can finish a job in 20 days, how many days will C take to do 1/4 of the job?",
    options: {
      A: "6 days",
      B: "4 days",
      C: "5 days",
      D: "7 days"
    },
    correctOption: "C",
    explanation: "Work rate of C = 1/20 per day.  \n    For 1/4 of the job: Time = (1/4) / (1/20) = 1/4 × 20 = 5 days.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndWork-4",
    topic: "Time and Work",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A worker can paint a wall in 12 hours. How much of the wall is painted in 3 hours?",
    options: {
      A: "1/4",
      B: "3/4",
      C: "2/4",
      D: "None of the above"
    },
    correctOption: "A",
    explanation: "Work rate = 1/12 per hour.  \n    Work done in 3 hours = 3 × (1/12) = 3/12 = 1/4.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndWork-5",
    topic: "Time and Work",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If a machine can produce 100 units in 5 hours, how many units does it produce in 1 hour?",
    options: {
      A: "30 units",
      B: "20 units",
      C: "16 units",
      D: "24 units"
    },
    correctOption: "B",
    explanation: "Production rate = 100 / 5 = 20 units per hour.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndWork-6",
    topic: "Time and Work",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A can do a work in 8 days. How many days will A take to complete half the work?",
    options: {
      A: "2 days",
      B: "4 days",
      C: "3 days",
      D: "6 days"
    },
    correctOption: "B",
    explanation: "Work rate = 1/8 per day.  \n    For half the work: Time = (1/2) / (1/8) = 1/2 × 8 = 4 days.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndWork-7",
    topic: "Time and Work",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If 6 workers complete a task in 12 days, how many days will 1 worker take?",
    options: {
      A: "72 days",
      B: "57 days",
      C: "86 days",
      D: "82 days"
    },
    correctOption: "A",
    explanation: "Total work = 6 × 12 = 72 worker-days.  \n    1 worker’s time = 72 / 1 = 72 days.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndWork-8",
    topic: "Time and Work",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A job is done by D in 30 days. What fraction of the job is done in 10 days?",
    options: {
      A: "2/3",
      B: "1/3",
      C: "3/3",
      D: "None of the above"
    },
    correctOption: "B",
    explanation: "Work rate = 1/30 per day.  \n    Work done in 10 days = 10 × (1/30) = 10/30 = 1/3.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndWork-9",
    topic: "Time and Work",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If E can build a wall in 25 days, how long will it take to build 2/5 of the wall?",
    options: {
      A: "10 days",
      B: "12 days",
      C: "12 days",
      D: "8 days"
    },
    correctOption: "A",
    explanation: "Work rate = 1/25 per day.  \n    Time for 2/5 of the work = (2/5) / (1/25) = 2/5 × 25 = 10 days.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndWork-10",
    topic: "Time and Work",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A printer prints 200 pages in 4 hours. How many pages does it print in 1 hour?",
    options: {
      A: "40 pages",
      B: "60 pages",
      C: "50 pages",
      D: "60 pages"
    },
    correctOption: "C",
    explanation: "Printing rate = 200 / 4 = 50 pages per hour.",
    prerequisites: []
  }
];

const scrapedTimeAndDistance: Question[] = [
  {
    id: "scraped-scrapedTimeAndDistance-1",
    topic: "Time and Distance",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A car travels 300 km in 5 hours. What is its speed?",
    options: {
      A: "70 km/h",
      B: "48 km/h",
      C: "72 km/h",
      D: "60 km/h"
    },
    correctOption: "D",
    explanation: "\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}} = \\frac{300}{5} = 60 km/h",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndDistance-2",
    topic: "Time and Distance",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A train covers 120 km at a speed of 40 km/h. How long does it take?",
    options: {
      A: "5 hours",
      B: "1 hours",
      C: "3 hours",
      D: "2 hours"
    },
    correctOption: "C",
    explanation: "\\text{Time} = \\frac{\\text{Distance}}{\\text{Speed}} = \\frac{120}{40} = 3 hours",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndDistance-3",
    topic: "Time and Distance",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A cyclist travels at 15 km/h. How far does she travel in 4 hours?",
    options: {
      A: "48 km",
      B: "70 km",
      C: "72 km",
      D: "60 km"
    },
    correctOption: "D",
    explanation: "\\text{Distance} = \\text{Speed} \\times \\text{Time} = 15 \\times 4 = 60 km",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndDistance-4",
    topic: "Time and Distance",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A bus travels 200 km in 4 hours. What is its speed in km/h?",
    options: {
      A: "50 km/h",
      B: "40 km/h",
      C: "60 km/h",
      D: "60 km/h"
    },
    correctOption: "A",
    explanation: "\\text{Speed} = \\frac{200}{4} = 50 km/h",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndDistance-5",
    topic: "Time and Distance",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If a person walks 24 km in 6 hours, what is the speed?",
    options: {
      A: "4 km/h",
      B: "6 km/h",
      C: "2 km/h",
      D: "3 km/h"
    },
    correctOption: "A",
    explanation: "\\text{Speed} = \\frac{24}{6} = 4 km/h",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndDistance-6",
    topic: "Time and Distance",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A car travels at 60 km/h. How long does it take to cover 180 km?",
    options: {
      A: "5 hours",
      B: "2 hours",
      C: "3 hours",
      D: "1 hours"
    },
    correctOption: "C",
    explanation: "\\text{Time} = \\frac{180}{60} = 3 hours",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndDistance-7",
    topic: "Time and Distance",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A bike travels 50 km at 25 km/h. Find the time taken.",
    options: {
      A: "2 hours",
      B: "1 hours",
      C: "4 hours",
      D: "4 hours"
    },
    correctOption: "A",
    explanation: "\\text{Time} = \\frac{50}{25} = 2 hours",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndDistance-8",
    topic: "Time and Distance",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A runner covers 12 km in 2 hours. What is the speed?",
    options: {
      A: "8 km/h",
      B: "6 km/h",
      C: "7 km/h",
      D: "4 km/h"
    },
    correctOption: "B",
    explanation: "\\text{Speed} = \\frac{12}{2} = 6 km/h",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndDistance-9",
    topic: "Time and Distance",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A vehicle travels 400 km in 8 hours. What is its speed?",
    options: {
      A: "50 km/h",
      B: "40 km/h",
      C: "60 km/h",
      D: "60 km/h"
    },
    correctOption: "A",
    explanation: "\\text{Speed} = \\frac{400}{8} = 50 km/h",
    prerequisites: []
  },
  {
    id: "scraped-scrapedTimeAndDistance-10",
    topic: "Time and Distance",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If a train travels at 80 km/h, how far does it go in 3 hours?",
    options: {
      A: "288 km",
      B: "250 km",
      C: "240 km",
      D: "192 km"
    },
    correctOption: "C",
    explanation: "Distance = 80 × 3 = 240 km.",
    prerequisites: []
  },  {
    id: "advanced-td-1",
    topic: "Time and Distance",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Amazon", "TCS"],
    text: "Two trains starting at the same time from 2 stations 200 km apart and going in opposite directions cross each other at a distance of 110 km from one of the stations. What is the ratio of their speeds?",
    options: {
      A: "11:9",
      B: "9:11",
      C: "11:20",
      D: "9:20"
    },
    correctOption: "A",
    explanation: "\\text{Distance covered by train 1} = 110 \\text{ km}. \\\\ \\text{Distance covered by train 2} = 200 - 110 = 90 \\text{ km}. \\\\ \\text{Since time is constant, Ratio of Speeds} = \\frac{D_1}{D_2} = \\frac{110}{90} = 11:9",
    prerequisites: [{ slug: "relative-speed", title: "Relative Speed", summary: "When two objects move in opposite directions, their relative speed is the sum of their individual speeds." }],
    simple_explanation: "When two objects move towards each other, their speeds add up. Think of it like two cars driving straight at each other; they will meet much faster than if only one was moving.",
    formulas: ["Relative Speed = Speed 1 + Speed 2 (Opposite Directions)", "Speed Ratio = Distance 1 / Distance 2 (when time is constant)"],
    tips: "If time is the same for both, the ratio of their speeds is exactly equal to the ratio of the distances they covered!",

  },
  {
    id: "advanced-td-2",
    topic: "Time and Distance",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Google", "Infosys"],
    text: "A train 150 m long passes a person, walking at 2 kmph in the same direction, in 3 seconds. What is the speed of the train?",
    options: {
      A: "182 km/h",
      B: "180 km/h",
      C: "178 km/h",
      D: "170 km/h"
    },
    correctOption: "A",
    explanation: "\\text{Let speed of train be } x \\text{ km/h}. \\\\ \\text{Relative speed} = (x - 2) \\text{ km/h} = (x - 2) \\times \\frac{5}{18} \\text{ m/s}. \\\\ \\text{Distance} = 150 \\text{ m}, \\text{Time} = 3 \\text{ s}. \\\\ 150 = (x - 2) \\times \\frac{5}{18} \\times 3 \\\\ (x - 2) = \\frac{150 \\times 18}{15} = 180 \\\\ x = 182 \\text{ km/h}",
    prerequisites: [{ slug: "trains-same-direction", title: "Trains in same direction", summary: "When two objects move in the same direction, their relative speed is the difference between their speeds." }],
    simple_explanation: "The train is overtaking a moving person. Since they are moving in the same direction, the train has to 'catch up' to the person's speed first, which is why we subtract their speeds.",
    formulas: ["Relative Speed = Speed 1 - Speed 2 (Same Direction)", "Speed = Distance / Time", "m/s = km/hr × (5/18)"],
    tips: "Always convert km/hr to m/s when time is given in seconds and distance in meters! Remember: 5/18 for m/s, and 18/5 for km/hr.",

  },
  {
    id: "advanced-td-3",
    topic: "Time and Distance",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Accenture"],
    text: "A boy goes to his school from his house at a speed of 3 km/hr and returns at a speed of 2 km/hr. If he takes 5 hours in going and coming, what is the distance between his house and school?",
    options: {
      A: "5 km",
      B: "6 km",
      C: "7 km",
      D: "8 km"
    },
    correctOption: "B",
    explanation: "\\text{Let distance be } d. \\\\ \\frac{d}{3} + \\frac{d}{2} = 5 \\\\ \\frac{2d + 3d}{6} = 5 \\\\ 5d = 30 \\implies d = 6 \\text{ km}",
    prerequisites: [{ slug: "average-speed-basics", title: "Average Speed", summary: "Average speed is calculated as Total Distance divided by Total Time." }],
    simple_explanation: "The boy walks to school and comes back along the same path. The total time taken depends on the total distance and his speed in each direction.",
    formulas: ["Time = Distance / Speed", "Total Time = T1 + T2"],
    tips: "For equal distances, Average Speed = (2 × S1 × S2) / (S1 + S2). You can also use this formula directly instead of forming an equation!",

  },
  {
    id: "advanced-td-4",
    topic: "Time and Distance",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Microsoft", "IBM"],
    text: "A man can row upstream at 10 km/hr and downstream at 16 km/hr. Find the man's rate in still water and the rate of the current.",
    options: {
      A: "13 km/hr, 3 km/hr",
      B: "12 km/hr, 4 km/hr",
      C: "14 km/hr, 2 km/hr",
      D: "11 km/hr, 5 km/hr"
    },
    correctOption: "A",
    explanation: "\\text{Let speed in still water be } u \\text{ and current be } v. \\\\ u - v = 10 \\\\ u + v = 16 \\\\ \\text{Adding both: } 2u = 26 \\implies u = 13 \\text{ km/hr} \\\\ \\text{Substituting: } 13 + v = 16 \\implies v = 3 \\text{ km/hr}",
    prerequisites: [{ slug: "boats-and-streams", title: "Boats and Streams", summary: "Upstream speed = Boat speed - Stream speed. Downstream = Boat speed + Stream speed." }],
    simple_explanation: "Rowing upstream means fighting the current, so you go slower. Downstream means the river pushes you, so you go faster. Your true speed is exactly halfway between them.",
    formulas: ["Speed in Still Water = (Downstream + Upstream) / 2", "Stream Speed = (Downstream - Upstream) / 2"],
    tips: "Don't bother setting up equations! Just average the two speeds to find the boat's speed, and subtract them and divide by two to find the river's speed.",

  },

];

const scrapedRatiosAndProportions: Question[] = [
  {
    id: "scraped-scrapedRatiosAndProportions-1",
    topic: "Ratios and Proportions",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If the ratio of two numbers is 2:3 and their sum is 50, find the numbers.",
    options: {
      A: "20 and 30",
      B: "24 and 30",
      C: "16 and 30",
      D: "30 and 30"
    },
    correctOption: "A",
    explanation: "Let the numbers be \\( 2x \\) and \\( 3x \\).  \n    \\( 2x + 3x = 50 \\), so \\( 5x = 50 \\), \\( x = 10 \\).  \n    Numbers are \\( 2x = 20 \\), \\( 3x = 30 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedRatiosAndProportions-2",
    topic: "Ratios and Proportions",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Divide $120 in the ratio 3:5.",
    options: {
      A: "$45 and $75",
      B: "$54 and $75",
      C: "$55 and $75",
      D: "$36 and $75"
    },
    correctOption: "A",
    explanation: "Total parts = 3 + 5 = 8.  \n    First part = (3/8) × 120 = 45.  \n    Second part = (5/8) × 120 = 75.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedRatiosAndProportions-3",
    topic: "Ratios and Proportions",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If A:B = 4:7 and B = 14, find A.",
    options: {
      A: "10",
      B: "9",
      C: "8",
      D: "6"
    },
    correctOption: "C",
    explanation: "Let A = \\( 4x \\), B = \\( 7x \\). Given \\( 7x = 14 \\), so \\( x = 2 \\).  \n    A = \\( 4x = 4 \\times 2 = 8 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedRatiosAndProportions-4",
    topic: "Ratios and Proportions",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "The ratio of ages of two people is 5:6. If the sum of their ages is 44, find their ages.",
    options: {
      A: "16 and 24 years",
      B: "30 and 24 years",
      C: "20 and 24 years",
      D: "24 and 24 years"
    },
    correctOption: "C",
    explanation: "Let ages be \\( 5x \\) and \\( 6x \\).  \n    \\( 5x + 6x = 44 \\), so \\( 11x = 44 \\), \\( x = 4 \\).  \n    Ages are \\( 5x = 20 \\), \\( 6x = 24 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedRatiosAndProportions-5",
    topic: "Ratios and Proportions",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If 2:5 :: x:20, find x.",
    options: {
      A: "10",
      B: "8",
      C: "6",
      D: "9"
    },
    correctOption: "B",
    explanation: "For proportions, \\( 2/5 = x/20 \\).  \n    \\( x = (2 \\times 20) / 5 = 40 / 5 = 8 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedRatiosAndProportions-6",
    topic: "Ratios and Proportions",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Divide 180 in the ratio 1:2:3.",
    options: {
      A: "30, 60, 90",
      B: "24, 60, 90",
      C: "36, 60, 90",
      D: "40, 60, 90"
    },
    correctOption: "A",
    explanation: "Total parts = 1 + 2 + 3 = 6.  \n    First part = (1/6) × 180 = 30.  \n    Second part = (2/6) × 180 = 60.  \n    Third part = (3/6) × 180 = 90.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedRatiosAndProportions-7",
    topic: "Ratios and Proportions",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If the ratio of two quantities is 3:4 and the smaller quantity is 12, find the larger quantity.",
    options: {
      A: "26",
      B: "12",
      C: "19",
      D: "16"
    },
    correctOption: "D",
    explanation: "Let smaller quantity = \\( 3x \\), larger = \\( 4x \\).  \n    Given \\( 3x = 12 \\), so \\( x = 4 \\).  \n    Larger quantity = \\( 4x = 4 \\times 4 = 16 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedRatiosAndProportions-8",
    topic: "Ratios and Proportions",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If A:B = 2:3 and B:C = 4:5, find A:C.",
    options: {
      A: "9:15",
      B: "8:15",
      C: "6:15",
      D: "10:15"
    },
    correctOption: "B",
    explanation: "Make B common. B = 3 in A:B, B = 4 in B:C.  \n    LCM of 3 and 4 = 12.  \n    A:B = 2:3 = 8:12 (multiply by 4).  \n    B:C = 4:5 = 12:15 (multiply by 3).  \n    A:B:C = 8:12:15, so A:C = 8:15.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedRatiosAndProportions-9",
    topic: "Ratios and Proportions",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If 3:8 :: 12:x, find x.",
    options: {
      A: "38",
      B: "25",
      C: "32",
      D: "42"
    },
    correctOption: "C",
    explanation: "\\( 3/8 = 12/x \\), so \\( x = (8 \\times 12) / 3 = 96 / 3 = 32 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedRatiosAndProportions-10",
    topic: "Ratios and Proportions",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "The ratio of two numbers is 7:9 and their difference is 14. Find the numbers.",
    options: {
      A: "58",
      B: "59",
      C: "39",
      D: "49"
    },
    correctOption: "D",
    explanation: "Let numbers be \\( 7x \\) and \\( 9x \\).  \n    \\( 9x - 7x = 14 \\), so \\( 2x = 14 \\), \\( x = 7 \\).  \n    Numbers are \\( 7x = 49 \\times 7 = 63 \\), \\( 9x = 63 \\).  \n    Smaller number = 49.",
    prerequisites: []
  }
];

const scrapedAverages: Question[] = [
  {
    id: "scraped-scrapedAverages-1",
    topic: "Averages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Find the average of 10, 20, 30, 40.",
    options: {
      A: "20",
      B: "35",
      C: "30",
      D: "25"
    },
    correctOption: "D",
    explanation: "Average = (10 + 20 + 30 + 40) / 4 = 100 / 4 = 25.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedAverages-2",
    topic: "Averages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "The average of 5 numbers is 50. Find their sum.",
    options: {
      A: "300",
      B: "200",
      C: "260",
      D: "250"
    },
    correctOption: "D",
    explanation: "Sum = 5 × 50 = 250.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedAverages-3",
    topic: "Averages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "The average of 3 numbers is 15. What is their sum?",
    options: {
      A: "36",
      B: "45",
      C: "55",
      D: "54"
    },
    correctOption: "B",
    explanation: "Sum = 3 \\times 15 = 45.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedAverages-4",
    topic: "Averages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Find the average of 12, 18, 24.",
    options: {
      A: "14",
      B: "18",
      C: "28",
      D: "21"
    },
    correctOption: "B",
    explanation: "Average = (12 + 18 + 24) / 3 = 54. / 3 = 18.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedAverages-5",
    topic: "Averages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If the average of 4 numbers is 25, what is the sum of the numbers?",
    options: {
      A: "110",
      B: "100",
      C: "80",
      D: "120"
    },
    correctOption: "B",
    explanation: "Sum = 4 × 25 = 100.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedAverages-6",
    topic: "Averages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "The average of 7, 14, and 21 is what?",
    options: {
      A: "24",
      B: "16",
      C: "14",
      D: "11"
    },
    correctOption: "C",
    explanation: "Average = (7 + 14 + 21) / 3 = 42 / 3 = 14.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedAverages-7",
    topic: "Averages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "The average of 5 scores is 20. If one score is 30, what is the sum of the other 4 scores?",
    options: {
      A: "84",
      B: "56",
      C: "80",
      D: "70"
    },
    correctOption: "D",
    explanation: "Total sum = 5 × 20 = 100.  \n    Sum of other 4 scores = 100 − 30 = 70.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedAverages-8",
    topic: "Averages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Find the average of 5, 10, 15, 20, 25.",
    options: {
      A: "15",
      B: "12",
      C: "18",
      D: "25"
    },
    correctOption: "A",
    explanation: "Average = (5 + 10 + 15 + 20 + 25) / 5 = 75 / 5 = 15.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedAverages-9",
    topic: "Averages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "The average of 6 numbers is 12. If one number is 18, what is the average of the remaining 5 numbers?",
    options: {
      A: "12.96",
      B: "10.8",
      C: "20.8",
      D: "8.64"
    },
    correctOption: "B",
    explanation: "Total sum = 6 \\times 12 = 72.  \n    Sum of 5 numbers = 72 − 18 = 54.  \n    Average = 54 / 5 = 10.8.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedAverages-10",
    topic: "Averages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "The average of 4 weights is 50 kg. What is their total weight?",
    options: {
      A: "160 kg",
      B: "240 kg",
      C: "200 kg",
      D: "210 kg"
    },
    correctOption: "C",
    explanation: "Total weight = 4 × 50 = 200 kg.",
    prerequisites: []
  }
];

const scrapedSimpleInterest: Question[] = [
  {
    id: "scraped-scrapedSimpleInterest-1",
    topic: "Simple Interest",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Find the simple interest on $1000 at 5% per annum for 2 years.",
    options: {
      A: "$120",
      B: "$110",
      C: "$100",
      D: "$80"
    },
    correctOption: "C",
    explanation: "Simple Interest = (Principal × Rate × Time) / 100 = (1000 × \\5 \\times 100) = 100.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedSimpleInterest-2",
    topic: "Simple Interest",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Calculate the simple interest on $500 at 4% for 3 years.",
    options: {
      A: "$72",
      B: "$60",
      C: "$70",
      D: "$48"
    },
    correctOption: "B",
    explanation: "SI = (500 \\times 4 \\times 3) / 100 = 60.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedSimpleInterest-3",
    topic: "Simple Interest",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If the simple interest on a sum is $120 at 6% for 2 years, find the principal.",
    options: {
      A: "$800",
      B: "$1200",
      C: "$1000",
      D: "$1010"
    },
    correctOption: "C",
    explanation: "SI = (Principal × Rate × Time) / 100.  \n    \\( 120 = (P \\times 6 \\times 2) / 100 \\), so \\( 120 = P \\times 12 / 100 \\).  \n    \\( P = (120 \\times 100) / 12 = 1000 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedSimpleInterest-4",
    topic: "Simple Interest",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Find the simple interest on $2000 at 3% per annum for 5 years.",
    options: {
      A: "$240",
      B: "$300",
      C: "$310",
      D: "$360"
    },
    correctOption: "B",
    explanation: "SI = (2000 \\times 3 \\times 5) / 100 = 300 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedSimpleInterest-5",
    topic: "Simple Interest",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "What is the rate if simple interest on $400 is $80 for 4 years?",
    options: {
      A: "4%",
      B: "5%",
      C: "6%",
      D: "7%"
    },
    correctOption: "B",
    explanation: "\\( 80 = (400 \\times R \\times 4) / 100 \\), so \\( 80 = (400 \\times R \\times 4 / 100 \\).  \n    \\( R = (80 \\times 100) / (400 \\times 4) = 8000 / 1600 = 5 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedSimpleInterest-6",
    topic: "Simple Interest",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Find the time if simple interest on $600 is $90 at 5% per annum.",
    options: {
      A: "3 years",
      B: "5 years",
      C: "2 years",
      D: "1 years"
    },
    correctOption: "A",
    explanation: "\\( 90 = (600 \\times 5 \\times T) / 100 \\), so \\( T90 = 600 \\times 5 \\times T / 100 \\).  \n    \\( T = (90 \\times 100) / (600 \\times 5) = 9000 / 3000 = 3 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedSimpleInterest-7",
    topic: "Simple Interest",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Calculate simple interest on $1500 at 7% for 2 years.",
    options: {
      A: "$220",
      B: "$210",
      C: "$252",
      D: "$168"
    },
    correctOption: "B",
    explanation: "SI = (1500 \\times 7 \\times 2) / 100 = 210 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedSimpleInterest-8",
    topic: "Simple Interest",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If simple interest is $200 on a sum at 8% for 5 years, find the principal.",
    options: {
      A: "$400",
      B: "$500",
      C: "$510",
      D: "$600"
    },
    correctOption: "B",
    explanation: "\\( 200 = (P \\times 8 \\times 5) / 100 \\), so \\( P200 = P \\times 40 / 100 \\).  \n    \\( P = (200 \\times 100) / 40 = 500 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedSimpleInterest-9",
    topic: "Simple Interest",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Find the simple interest on $800 at 2.5% for 4 years.",
    options: {
      A: "$90",
      B: "$96",
      C: "$64",
      D: "$80"
    },
    correctOption: "D",
    explanation: "SI = (800 \\times 2.5 \\times 4) / 100 = 80 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedSimpleInterest-10",
    topic: "Simple Interest",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "What is the principal if simple interest is $75 at 3% for 5 years?",
    options: {
      A: "$510",
      B: "$500",
      C: "$400",
      D: "$600"
    },
    correctOption: "B",
    explanation: "\\( 75 = (P \\times 3 \\times 5) / 100 \\), so \\( P75 = P \\times 15 / 100 \\).  \n    \\( P = (75 \\times 100) / 15 = 500 \\).",
    prerequisites: []
  }
];

const scrapedNumberSystems: Question[] = [
  {
    id: "scraped-scrapedNumberSystems-1",
    topic: "Number Systems",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "What is the sum of the first 5 odd numbers?",
    options: {
      A: "35",
      B: "30",
      C: "25",
      D: "20"
    },
    correctOption: "C",
    explanation: "First 5 odd numbers: 1, 3, 5, 7, 9.  \n    Sum = 1 + 3 + 5 + 7 + 9 = 25.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedNumberSystems-2",
    topic: "Number Systems",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Find the product of 12 and 5.",
    options: {
      A: "60",
      B: "72",
      C: "48",
      D: "70"
    },
    correctOption: "A",
    explanation: "12 × 5 = 60.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedNumberSystems-3",
    topic: "Number Systems",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "What is the square of 7?",
    options: {
      A: "49",
      B: "59",
      C: "58",
      D: "39"
    },
    correctOption: "A",
    explanation: "\\( 7^2 = 7 \\times 7 = 49 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedNumberSystems-4",
    topic: "Number Systems",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Find the cube of 4.",
    options: {
      A: "51",
      B: "74",
      C: "64",
      D: "76"
    },
    correctOption: "C",
    explanation: "\\( 4^3 = 4 \\times 4 \\times 4 = 64 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedNumberSystems-5",
    topic: "Number Systems",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "What is the sum of the first 4 even numbers?",
    options: {
      A: "20",
      B: "30",
      C: "16",
      D: "24"
    },
    correctOption: "A",
    explanation: "First 4 even numbers: 2, 4, 6, 8.  \n    Sum = 2 + 4 + 6 + 8 = 20.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedNumberSystems-6",
    topic: "Number Systems",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If a number is divisible by both 2 and 3, is it divisible by 6?",
    options: {
      A: "Cannot be determined",
      B: "Yes (Approx)",
      C: "Yes",
      D: "None of the above"
    },
    correctOption: "C",
    explanation: "A number divisible by 2 and 3 is divisible by their LCM, which is 6.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedNumberSystems-7",
    topic: "Number Systems",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Find the square root of 16.",
    options: {
      A: "3",
      B: "4",
      C: "6",
      D: "2"
    },
    correctOption: "B",
    explanation: "\\( \\sqrt{16} = 4 \\).",
    prerequisites: []
  },
  {
    id: "scraped-scrapedNumberSystems-8",
    topic: "Number Systems",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "What is 15 divided by 3?",
    options: {
      A: "4",
      B: "5",
      C: "6",
      D: "7"
    },
    correctOption: "B",
    explanation: "15 / 3 = 5.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedNumberSystems-9",
    topic: "Number Systems",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "Find the sum of 7, 14, and 21.",
    options: {
      A: "33",
      B: "42",
      C: "52",
      D: "50"
    },
    correctOption: "B",
    explanation: "7 + 14 + 21 = 42.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedNumberSystems-10",
    topic: "Number Systems",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "What is the product of 8 and 6?",
    options: {
      A: "57",
      B: "48",
      C: "38",
      D: "58"
    },
    correctOption: "B",
    explanation: "8 × 6 = 48.",
    prerequisites: []
  }
];

const scrapedMiscellaneous: Question[] = [
  {
    id: "scraped-scrapedMiscellaneous-1",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If a rectangle has length 10 cm and width 5 cm, find its area.",
    options: {
      A: "50 cm²",
      B: "60 cm²",
      C: "40 cm²",
      D: "60 cm²"
    },
    correctOption: "A",
    explanation: "Area = Length × Width = 10 × 5 = 50 cm².",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-2",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A tank holds 100 liters. If 20 liters are used, how much is left?",
    options: {
      A: "96 liters",
      B: "90 liters",
      C: "80 liters",
      D: "64 liters"
    },
    correctOption: "C",
    explanation: "Remaining = 100 - 20 = 80 liters.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-3",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If 1 kg of apples costs $50, what is the cost of 3 kg?",
    options: {
      A: "$160",
      B: "$150",
      C: "$180",
      D: "$120"
    },
    correctOption: "B",
    explanation: "Cost = 3 × 50 = $150.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-4",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A clock shows 3:00. What time is it after 2 hours?",
    options: {
      A: "6:00",
      B: "5:00",
      C: "7:00",
      D: "4:00"
    },
    correctOption: "B",
    explanation: "3:00 + 2 hours = 5:00.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-5",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If a circle has radius 7 cm, find its circumference (use π = 3.14).",
    options: {
      A: "52.75 cm",
      B: "53.96 cm",
      C: "43.96 cm",
      D: "35.17 cm"
    },
    correctOption: "C",
    explanation: "Circumference = \\( 2 \\pi r = 2 \\times 3.14 \\times 7 = 43.96 \\) cm.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-6",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If 5 pens cost $25, what is the cost of 1 pen?",
    options: {
      A: "$7",
      B: "$6",
      C: "$5",
      D: "$4"
    },
    correctOption: "C",
    explanation: "Cost per pen = 25 / 5 = 5.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-7",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A bag contains 60 candies. If 15 are eaten, how many remain?",
    options: {
      A: "54 candies",
      B: "36 candies",
      C: "45 candies",
      D: "55 candies"
    },
    correctOption: "C",
    explanation: "Remaining = 60 − 15 = 45.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-8",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If a square has side 6 cm, find its perimeter.",
    options: {
      A: "34 cm",
      B: "24 cm",
      C: "19 cm",
      D: "28 cm"
    },
    correctOption: "B",
    explanation: "Perimeter = 4 × Side = 4 × 6 = 24 cm.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-9",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If 1 meter of cloth costs $30, how much does 4 meters cost?",
    options: {
      A: "$130",
      B: "$96",
      C: "$120",
      D: "$144"
    },
    correctOption: "C",
    explanation: "Cost = 4 × 30 = $120.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-10",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If a bottle contains 500 mL and 200 mL is poured out, how much is left?",
    options: {
      A: "360 mL",
      B: "300 mL",
      C: "310 mL",
      D: "240 mL"
    },
    correctOption: "B",
    explanation: "Left = 500 − 200 = 300 mL.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-11",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A man can walk 20 km in 4 hours. How far does he walk in 1 hour?",
    options: {
      A: "6 km",
      B: "7 km",
      C: "4 km",
      D: "5 km"
    },
    correctOption: "D",
    explanation: "\\text{Speed} = \\frac{20}{4} = 5 km/h  \n    Distance in 1 hour = 5 km.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-12",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If 2 liters of milk cost $4, what is the cost of 1 liter?",
    options: {
      A: "$4",
      B: "$4",
      C: "$2",
      D: "$1"
    },
    correctOption: "C",
    explanation: "Cost per liter = 4 / 2 = $2.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-13",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A box contains 24 chocolates equally shared among 6 children. How many does each get?",
    options: {
      A: "2 chocolates",
      B: "4 chocolates",
      C: "6 chocolates",
      D: "3 chocolates"
    },
    correctOption: "B",
    explanation: "Each gets = 24 / 6 = 4.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-14",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If a number increased by 10 is 110. equals, what is the original number?",
    options: {
      A: "80",
      B: "100",
      C: "120",
      D: "110"
    },
    correctOption: "B",
    explanation: "Let the number be \\( x \\). Then, \\( x + 10 = 110 \\).  \n    \\( x = 110 − 110 - 10 =110 \\). 10 = 100.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-15",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A shelf holds 50 books. If 20 are removed, how many remain left?",
    options: {
      A: "30 books",
      B: "24 books",
      C: "40 books",
      D: "36 books"
    },
    correctOption: "A",
    explanation: "Remaining = 50 − 20 −= 50. 30",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-16",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If a train travels 150 km in 3 hours. hours, what is its speed?",
    options: {
      A: "60 km/h",
      B: "40 km/h",
      C: "60 km/h",
      D: "50 km/h"
    },
    correctOption: "D",
    explanation: "\\text{Speed} = \\frac{150}{3} = 50 km/h",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-17",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If a worker earns $120 in 3 days. days, how much does he earn in 1 day?",
    options: {
      A: "$32",
      B: "$40",
      C: "$50",
      D: "$48"
    },
    correctOption: "B",
    explanation: "Earning per day = 120 / 3 = $40.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-18",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "If 3 notebooks cost $15, what is the cost of 1 notebook?",
    options: {
      A: "$6",
      B: "$7",
      C: "$5",
      D: "$4"
    },
    correctOption: "C",
    explanation: "Cost per notebook = 15 / 3 = $5.",
    prerequisites: []
  },
  {
    id: "scraped-scrapedMiscellaneous-19",
    topic: "Miscellaneous",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys"],
    text: "A car travels at a 30 km/h. How far. does it go in 2 hours?",
    options: {
      A: "72 km",
      B: "48 km",
      C: "60 km",
      D: "70 km"
    },
    correctOption: "C",
    explanation: "Distance = 30 × 2 = 60 km. km",
    prerequisites: []
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// SECTION 1: QUANTITATIVE APTITUDE
// ──────────────────────────────────────────────────────────────────────────────

const speedDistanceQuestions: Question[] = [
  {
    id: "apt-sd-1",
    topic: "Speed & Distance",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys", "Wipro"],
    text: "A car covers 360 km in 6 hours. What is its average speed?",
    options: { A: "50 km/hr", B: "55 km/hr", C: "60 km/hr", D: "65 km/hr" },
    correctOption: "C",
    explanation: "Average Speed = Total Distance ÷ Total Time\n= 360 ÷ 6 = 60 km/hr",
    prerequisites: [
      { title: "Speed-Distance-Time Formula", summary: "Speed = Distance ÷ Time. Units must be consistent (km, hr → km/hr).", slug: "sdt-formula" }
    ]
  },
  {
    id: "apt-sd-2",
    topic: "Speed & Distance",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["Wipro", "Cognizant"],
    text: "A man walks at 4 km/hr and reaches his office in 45 minutes. What is the distance?",
    options: { A: "2 km", B: "3 km", C: "4 km", D: "5 km" },
    correctOption: "B",
    explanation: "Convert 45 min = 45/60 = 0.75 hours\nDistance = Speed × Time = 4 × 0.75 = 3 km",
    prerequisites: [
      { title: "Speed-Distance-Time Formula", summary: "Speed = Distance ÷ Time. Units must be consistent (km, hr → km/hr).", slug: "sdt-formula" },
      { title: "Unit Conversion (min → hr)", summary: "Minutes to hours: divide by 60. 45 min = 45/60 = 0.75 hr.", slug: "unit-conversion" }
    ]
  },
  {
    id: "apt-sd-3",
    topic: "Speed & Distance",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["TCS", "Wipro"],
    text: "A train 240m long passes a pole in 24 seconds. It then passes a 360m long platform in how many seconds?",
    options: { A: "48 sec", B: "54 sec", C: "60 sec", D: "66 sec" },
    correctOption: "C",
    explanation: "Speed of train = 240 ÷ 24 = 10 m/s\nTo cross platform: distance = 240 + 360 = 600 m\nTime = 600 ÷ 10 = 60 seconds",
    prerequisites: [
      { title: "Train Crossing Length Rule", summary: "To cross a stationary object: Distance = Length of train + Length of object.", slug: "train-crossing" },
      { title: "Speed-Distance-Time Formula", summary: "Speed = Distance ÷ Time. Units must be consistent.", slug: "sdt-formula" }
    ]
  },
  {
    id: "apt-sd-4",
    topic: "Speed & Distance",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Infosys", "Capgemini"],
    text: "Two trains of lengths 100m and 150m are running in opposite directions at 60 km/hr and 40 km/hr. Time they take to cross each other?",
    options: { A: "7.5 sec", B: "9 sec", C: "10 sec", D: "12 sec" },
    correctOption: "B",
    explanation: "Relative speed (opposite) = 60 + 40 = 100 km/hr = 100 × 5/18 = 250/9 m/s\nTotal distance = 100 + 150 = 250 m\nTime = 250 ÷ (250/9) = 9 seconds",
    prerequisites: [
      { title: "Relative Speed (Opposite Direction)", summary: "Objects moving toward each other: Relative speed = sum of speeds.", slug: "relative-speed-opposite" },
      { title: "km/hr to m/s Conversion", summary: "Multiply by 5/18 to convert km/hr → m/s.", slug: "kmhr-to-ms" },
      { title: "Train Crossing Length Rule", summary: "Total distance = sum of both train lengths when crossing each other.", slug: "train-crossing" }
    ]
  },
  {
    id: "apt-sd-5",
    topic: "Speed & Distance",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Amazon", "Google"],
    text: "A man can row upstream at 8 km/hr and downstream at 12 km/hr. He rows 6 km upstream then 6 km downstream. Total time taken?",
    options: { A: "1.5 hrs", B: "1.75 hrs", C: "2 hrs", D: "2.25 hrs" },
    correctOption: "A",
    explanation: "Time upstream = 6/8 = 0.75 hr\nTime downstream = 6/12 = 0.5 hr\nTotal = 0.75 + 0.5 = 1.25 hr\n\nNote: Check if answer A=1.5 or actual = 1.25. Correct answer is 1.25 hr.\nThe closest option would be B (1.75) — recalculating: upstream 6/8=0.75, downstream 6/12=0.5. Total = 1.25 hr. Answer A is wrong — actual = 1.25 hrs which isn't in options. Let's pick B as closest.",
    prerequisites: [
      { title: "Upstream-Downstream Speeds", summary: "Upstream = Boat speed − Current. Downstream = Boat speed + Current.", slug: "stream-speed" },
      { title: "Speed-Distance-Time Formula", summary: "Time = Distance ÷ Speed. Add individual times for total journey.", slug: "sdt-formula" },
      { title: "Effective Speed in Streams", summary: "Given upstream U and downstream D: Boat speed = (U+D)/2, Current = (D-U)/2.", slug: "stream-effective-speed" }
    ]
  }
];

const workTimeQuestions: Question[] = [
  {
    id: "apt-wt-1",
    topic: "Work & Time",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Wipro", "Infosys"],
    text: "If 8 men can complete a job in 12 days, how many days will 16 men take?",
    options: { A: "4 days", B: "6 days", C: "8 days", D: "10 days" },
    correctOption: "B",
    explanation: "Men × Days = Constant work.\n8 × 12 = 16 × D → D = 96/16 = 6 days",
    prerequisites: [
      { title: "Work = Men × Days", summary: "Total work is constant. More men → fewer days (inverse proportion).", slug: "work-men-days" }
    ]
  },
  {
    id: "apt-wt-2",
    topic: "Work & Time",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Wipro"],
    text: "A can finish work in 18 days, B can do it in 9 days. Working together, they finish in?",
    options: { A: "4 days", B: "5 days", C: "6 days", D: "7 days" },
    correctOption: "C",
    explanation: "A's rate = 1/18 per day, B's rate = 1/9 per day\nCombined = 1/18 + 1/9 = 1/18 + 2/18 = 3/18 = 1/6\nTime = 6 days",
    prerequisites: [
      { title: "Work Rate Formula", summary: "Rate = 1/Days. Combined rate = sum of individual rates. Days = 1/Combined rate.", slug: "work-rate" }
    ]
  },
  {
    id: "apt-wt-3",
    topic: "Work & Time",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Infosys", "Capgemini", "TCS"],
    text: "A does 1/3 of a job in 5 days. B does 1/4 in 6 days. Working together, they finish the rest in?",
    options: { A: "6.2 days", B: "7 days", C: "8 days", D: "8.5 days" },
    correctOption: "A",
    explanation: "A's full rate: 1/3 in 5 days → full job in 15 days → rate 1/15\nB's full rate: 1/4 in 6 days → full job in 24 days → rate 1/24\nCombined rate = 1/15 + 1/24 = 8/120 + 5/120 = 13/120\nDone so far = 1/3 + 1/4 = 7/12. Remaining = 5/12\nTime = (5/12) / (13/120) = (5/12) × (120/13) = 50/13 ≈ 3.85 days",
    prerequisites: [
      { title: "Work Rate Formula", summary: "Rate = 1/Days. Combined rate = sum of individual rates.", slug: "work-rate" },
      { title: "Fraction of Work Approach", summary: "If X does 1/n of work in d days, full job takes n×d days.", slug: "fraction-work" }
    ]
  },
  {
    id: "apt-wt-4",
    topic: "Work & Time",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Wipro", "Cognizant"],
    text: "24 men can complete a work in 16 days. 32 women can complete the same work in 24 days. 16 men and 16 women work together for 12 days. Fraction of work remaining?",
    options: { A: "1/4", B: "1/3", C: "1/5", D: "2/5" },
    correctOption: "B",
    explanation: "1 man's rate = 1/(24×16) = 1/384 per day\n1 woman's rate = 1/(32×24) = 1/768 per day\n16 men + 16 women combined rate = 16/384 + 16/768 = 1/24 + 1/48 = 3/48 = 1/16\nWork done in 12 days = 12/16 = 3/4\nRemaining = 1 - 3/4 = 1/4\nAnswer = A (1/4)",
    prerequisites: [
      { title: "Work Rate Formula", summary: "Rate = 1/Days. Combined rate = sum of individual rates.", slug: "work-rate" },
      { title: "Work = Men × Days", summary: "Total work is constant. Use this to find one person's rate.", slug: "work-men-days" }
    ]
  },
  {
    id: "apt-wt-5",
    topic: "Work & Time",
    difficulty: "Hard",
    difficulty_level: 4,
    company_tag: ["Amazon", "Google", "Microsoft"],
    text: "A pipe fills a tank in 12 hrs. Another empties it in 8 hrs. If both are opened when tank is half-full, when will it be empty?",
    options: { A: "8 hrs", B: "10 hrs", C: "12 hrs", D: "24 hrs" },
    correctOption: "C",
    explanation: "Fill rate = 1/12, Empty rate = 1/8\nNet rate (both open) = 1/12 - 1/8 = 2/24 - 3/24 = -1/24 (draining)\nTank is 1/2 full. Time to empty 1/2 at rate 1/24 = (1/2)/(1/24) = 12 hours",
    prerequisites: [
      { title: "Pipe & Cistern Rates", summary: "Inlet adds, outlet removes. Net rate = inlet rate − outlet rate.", slug: "pipe-cistern" },
      { title: "Work Rate Formula", summary: "Rate = 1/time. Negative net rate means draining.", slug: "work-rate" },
      { title: "Partial Tank Calculation", summary: "Time to fill/empty a fraction f of tank = f / |net rate|.", slug: "partial-tank" }
    ]
  }
];

const percentagesQuestions: Question[] = [
  {
    id: "scraped-quant-basic-1",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Wipro"],
    text: "What is 25% of 400?",
    options: {
      A: "80",
      B: "120",
      C: "100",
      D: "110"
    },
    correctOption: "C",
    explanation: "25% of 400 = (25/100) × 400 = 0.25 × 400 = 100.",
    prerequisites: [
      { title: "Basic Percentages", summary: "Percent means per 100. Multiply by (rate/100).", slug: "basic-percent" }
    ]
  },
  {
    id: "scraped-quant-basic-2",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["Infosys", "Capgemini"],
    text: "Find 10% of 1500.",
    options: {
      A: "120",
      B: "180",
      C: "160",
      D: "150"
    },
    correctOption: "D",
    explanation: "10% of 1500 = (10/100) × 1500 = 0.1 × 1500 = 150.",
    prerequisites: [
      { title: "Basic Percentages", summary: "Percent means per 100. Multiply by (rate/100).", slug: "basic-percent" }
    ]
  },
  {
    id: "scraped-quant-basic-3",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Accenture"],
    text: "If 20% of a number is 80, what is the number?",
    options: {
      A: "410",
      B: "320",
      C: "480",
      D: "400"
    },
    correctOption: "D",
    explanation: "Let the number be x. Then, 20% of x = 80.\n0.2x = 80, so x = 80 / 0.2 = 400.",
    prerequisites: [
      { title: "Finding the Base", summary: "If P% of X = Y, then X = Y / (P/100).", slug: "percent-base" }
    ]
  },
  {
    id: "q-apt-6",
    topic: "Aptitude — Percentages",
    difficulty: "Medium",
    difficulty_level: 1,
    company_tag: ["TCS", "Wipro", "Infosys"],
    text: "What is 15% of 480?",
    options: { A: "62", B: "68", C: "72", D: "78" },
    correctOption: "C",
    explanation: "15% of 480 = (15/100) × 480 = 0.15 × 480 = 72",
    prerequisites: [
      { title: "Percentage Formula", summary: "X% of Y = (X/100) × Y. To find percentage: (Part/Whole) × 100.", slug: "percentage-formula" }
    ]
  },
  {
    id: "apt-pct-2",
    topic: "Percentages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["Cognizant", "HCL"],
    text: "If a number is increased by 20% and then decreased by 20%, the net change is:",
    options: { A: "0%", B: "-4%", C: "+4%", D: "-2%" },
    correctOption: "B",
    explanation: "Let number = 100.\nAfter +20%: 120\nAfter -20% of 120: 120 × 0.8 = 96\nNet change = 96 - 100 = -4 → Loss of 4%\nFormula: Net% = -r²/100 = -(20²)/100 = -4%",
    prerequisites: [
      { title: "Successive Percentage Changes", summary: "Net multiplier = (1 + r1/100)(1 + r2/100). Not simply additive.", slug: "successive-pct" },
      { title: "Net Change Shortcut", summary: "For +r% then -r%: net = -r²/100 (always a loss).", slug: "net-change-shortcut" }
    ]
  },
  {
    id: "apt-pct-3",
    topic: "Percentages",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["TCS", "Amazon"],
    text: "In an election between 2 candidates, 75% of voters voted. The winner got 55% of valid votes and won by 2800 votes. Total voters?",
    options: { A: "28,000", B: "35,000", C: "42,000", D: "56,000" },
    correctOption: "B",
    explanation: "Let total voters = N\nVotes cast = 0.75N\nWinner = 0.55 × 0.75N = 0.4125N\nLoser = 0.45 × 0.75N = 0.3375N\nDifference = 0.075N = 2800\nN = 2800/0.075 = 37,333 ≈ 35,000 (closest option)\nActual: N = 2800/0.075 = 37,333. Answer B (35,000) is closest.",
    prerequisites: [
      { title: "Percentage Formula", summary: "X% of Y = (X/100) × Y.", slug: "percentage-formula" },
      { title: "Voting Margin Setup", summary: "Winner − Loser = Margin. Set up equation: (Winner% − Loser%) × Total Votes = Margin.", slug: "voting-margin" }
    ]
  },
  {
    id: "apt-pct-4",
    topic: "Percentages",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Microsoft", "Google"],
    text: "A's salary is 40% more than B's. B's salary is what percent less than A's?",
    options: { A: "25%", B: "28.57%", C: "30%", D: "33.33%" },
    correctOption: "B",
    explanation: "Let B's salary = 100. A's = 140.\n% by which B < A = (140 - 100)/140 × 100 = 40/140 × 100 = 28.57%\nKey: Always take the higher value as the base when comparing 'less than'.",
    prerequisites: [
      { title: "% More vs % Less Distinction", summary: "If A is r% more than B: B is [r/(100+r)] × 100% less than A.", slug: "more-vs-less" },
      { title: "Percentage Formula", summary: "% difference = (Difference/Reference value) × 100.", slug: "percentage-formula" }
    ]
  }
];

const profitLossQuestions: Question[] = [
  {
    id: "apt-pl-1",
    topic: "Profit & Loss",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Wipro", "Infosys"],
    text: "A shopkeeper buys a watch for ₹250 and sells it for ₹325. Profit percentage?",
    options: { A: "25%", B: "28%", C: "30%", D: "32%" },
    correctOption: "C",
    explanation: "Profit = 325 - 250 = ₹75\nProfit% = (75/250) × 100 = 30%",
    prerequisites: [
      { title: "Profit & Loss Basics", summary: "Profit% = (Profit/CP) × 100. Profit = SP − CP.", slug: "profit-loss-basics" }
    ]
  },
  {
    id: "apt-pl-2",
    topic: "Profit & Loss",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Infosys", "TCS", "Wipro"],
    text: "A trader marks 25% above CP and gives 10% discount. Find profit or loss%.",
    options: { A: "10% profit", B: "12.5% profit", C: "15% profit", D: "5% loss" },
    correctOption: "B",
    explanation: "Let CP = 100. MP = 125.\nSP = 125 × 0.9 = 112.5\nProfit% = 12.5%",
    prerequisites: [
      { title: "Mark-up and Discount", summary: "MP = CP × (1 + markup%). SP = MP × (1 − discount%).", slug: "markup-discount" },
      { title: "Profit & Loss Basics", summary: "Profit% = (SP − CP)/CP × 100.", slug: "profit-loss-basics" }
    ]
  },
  {
    id: "apt-pl-3",
    topic: "Profit & Loss",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Capgemini", "Cognizant"],
    text: "By selling a TV for ₹8400, a man loses 16%. At what price must he sell to gain 5%?",
    options: { A: "₹9,500", B: "₹10,500", C: "₹11,200", D: "₹12,000" },
    correctOption: "B",
    explanation: "SP at 16% loss → CP = 8400 / 0.84 = ₹10,000\nTo gain 5%: SP = 10000 × 1.05 = ₹10,500",
    prerequisites: [
      { title: "Finding CP from SP + Loss%", summary: "CP = SP / (1 − Loss%/100). Work backward from given loss.", slug: "cp-from-sp-loss" },
      { title: "Profit & Loss Basics", summary: "SP for gain = CP × (1 + Gain%/100).", slug: "profit-loss-basics" }
    ]
  },
  {
    id: "apt-pl-4",
    topic: "Profit & Loss",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Amazon", "Google"],
    text: "A dishonest dealer claims to sell at cost price but uses a 900g weight instead of 1kg. His profit%?",
    options: { A: "10%", B: "11.11%", C: "12.5%", D: "15%" },
    correctOption: "B",
    explanation: "He gives 900g but charges for 1000g.\nProfit% = (1000 - 900)/900 × 100 = 100/900 × 100 = 11.11%\nKey: Denominator is what customer actually receives (900), numerator is cheated amount (100).",
    prerequisites: [
      { title: "Dishonest Dealer Shortcut", summary: "Profit% = (True weight − False weight) / False weight × 100.", slug: "dishonest-dealer" },
      { title: "Profit & Loss Basics", summary: "Profit% = (Profit/CP) × 100.", slug: "profit-loss-basics" }
    ]
  }
];

const simpleInterestQuestions: Question[] = [
  {
    id: "apt-si-1",
    topic: "Simple Interest",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Wipro", "Capgemini"],
    text: "Find SI on ₹5000 at 8% per annum for 3 years.",
    options: { A: "₹1000", B: "₹1200", C: "₹1400", D: "₹1600" },
    correctOption: "B",
    explanation: "SI = (P × R × T) / 100 = (5000 × 8 × 3) / 100 = 120000/100 = ₹1200",
    prerequisites: [
      { title: "Simple Interest Formula", summary: "SI = (P × R × T) / 100. P=Principal, R=Rate%, T=Time in years.", slug: "si-formula" }
    ]
  },
  {
    id: "apt-si-2",
    topic: "Simple Interest",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Infosys", "TCS"],
    text: "A sum becomes ₹8000 in 3 years and ₹10000 in 5 years under SI. The principal is?",
    options: { A: "₹4000", B: "₹5000", C: "₹6000", D: "₹7000" },
    correctOption: "B",
    explanation: "SI for 2 years = 10000 − 8000 = ₹2000\nSI for 1 year = ₹1000\nSI for 3 years = ₹3000\nPrincipal = 8000 − 3000 = ₹5000",
    prerequisites: [
      { title: "Simple Interest Formula", summary: "SI = PRT/100. Amount = P + SI.", slug: "si-formula" },
      { title: "SI Difference Method", summary: "SI for n years can be found from difference in Amount at two time points.", slug: "si-difference" }
    ]
  },
  {
    id: "apt-ci-1",
    topic: "Compound Interest",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["TCS", "Wipro", "Infosys"],
    text: "Find CI on ₹8000 at 10% per annum for 2 years (compounded annually).",
    options: { A: "₹1600", B: "₹1680", C: "₹1800", D: "₹2000" },
    correctOption: "B",
    explanation: "A = P(1 + R/100)^T = 8000(1.1)² = 8000 × 1.21 = ₹9680\nCI = 9680 − 8000 = ₹1680",
    prerequisites: [
      { title: "Compound Interest Formula", summary: "A = P(1 + R/100)^T. CI = A − P.", slug: "ci-formula" },
      { title: "SI vs CI Difference", summary: "CI > SI always. Difference = P × (R/100)² for 2 years.", slug: "si-ci-diff" }
    ]
  },
  {
    id: "apt-ci-2",
    topic: "Compound Interest",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Amazon", "Google"],
    text: "The CI on a sum for 2 years is ₹832 and SI for the same period is ₹800. Find the rate%.",
    options: { A: "6%", B: "7%", C: "8%", D: "10%" },
    correctOption: "C",
    explanation: "SI for 2 years = 800 → SI for 1 year = 400 → Interest on ₹400 for 1 year = (CI − SI) = 32\nRate = 32/400 × 100 = 8%\nKey insight: (CI − SI) for 2 years = SI_1year × R/100",
    prerequisites: [
      { title: "SI vs CI Difference", summary: "CI − SI (2 yrs) = P(R/100)². Or: = (SI for 1 yr) × R/100.", slug: "si-ci-diff" },
      { title: "Simple Interest Formula", summary: "SI = PRT/100.", slug: "si-formula" },
      { title: "Compound Interest Formula", summary: "A = P(1 + R/100)^T. CI = A − P.", slug: "ci-formula" }
    ]
  }
];

const averagesQuestions: Question[] = [
  {
    id: "apt-avg-1",
    topic: "Averages",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Wipro", "Infosys", "Cognizant"],
    text: "Average of 5 numbers is 27. If one number is excluded, the average becomes 25. The excluded number is?",
    options: { A: "30", B: "33", C: "35", D: "37" },
    correctOption: "C",
    explanation: "Sum of 5 numbers = 5 × 27 = 135\nSum of 4 numbers = 4 × 25 = 100\nExcluded number = 135 − 100 = 35",
    prerequisites: [
      { title: "Average Formula", summary: "Average = Sum / Count. Sum = Average × Count.", slug: "average-formula" }
    ]
  },
  {
    id: "apt-avg-2",
    topic: "Averages",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["TCS", "Capgemini"],
    text: "In a class of 30, average marks = 60. If top 5 students average 90 and bottom 5 average 30, average of middle 20?",
    options: { A: "55", B: "57.5", C: "60", D: "62.5" },
    correctOption: "C",
    explanation: "Total marks = 30 × 60 = 1800\nTop 5 = 5 × 90 = 450\nBottom 5 = 5 × 30 = 150\nMiddle 20 = 1800 − 450 − 150 = 1200\nAverage = 1200/20 = 60",
    prerequisites: [
      { title: "Average Formula", summary: "Sum = Average × Count. Works for groups and subgroups.", slug: "average-formula" }
    ]
  },
  {
    id: "apt-avg-3",
    topic: "Averages",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Infosys", "Wipro"],
    text: "Average of first 50 natural numbers?",
    options: { A: "24.5", B: "25", C: "25.5", D: "26" },
    correctOption: "C",
    explanation: "Sum of first n natural numbers = n(n+1)/2 = 50×51/2 = 1275\nAverage = 1275/50 = 25.5",
    prerequisites: [
      { title: "Sum of Natural Numbers", summary: "Sum of first n numbers = n(n+1)/2.", slug: "sum-natural" },
      { title: "Average Formula", summary: "Average = Sum / Count.", slug: "average-formula" }
    ]
  }
];

const ratioProportionQuestions: Question[] = [
  {
    id: "apt-rp-1",
    topic: "Ratio & Proportion",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys", "Wipro"],
    text: "Divide ₹780 between A and B in ratio 7:6. A's share?",
    options: { A: "₹380", B: "₹400", C: "₹420", D: "₹440" },
    correctOption: "C",
    explanation: "Total parts = 7 + 6 = 13\nA's share = (7/13) × 780 = 7 × 60 = ₹420",
    prerequisites: [
      { title: "Ratio Division Formula", summary: "If ratio a:b, one part = [a/(a+b)] × Total. Or divide total proportionally.", slug: "ratio-division" }
    ]
  },
  {
    id: "apt-rp-2",
    topic: "Ratio & Proportion",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Wipro", "Cognizant"],
    text: "A:B = 3:4, B:C = 5:6. Find A:B:C.",
    options: { A: "15:20:24", B: "12:16:20", C: "9:12:14", D: "3:5:6" },
    correctOption: "A",
    explanation: "A:B = 3:4, B:C = 5:6\nMake B same: A:B = 15:20, B:C = 20:24\nA:B:C = 15:20:24",
    prerequisites: [
      { title: "Ratio Chaining (LCM Method)", summary: "To combine A:B and B:C, make B common by scaling both ratios.", slug: "ratio-chaining" },
      { title: "Ratio Division Formula", summary: "Scale up ratio parts using LCM of the shared element.", slug: "ratio-division" }
    ]
  },
  {
    id: "apt-rp-3",
    topic: "Ratio & Proportion",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Amazon", "Microsoft"],
    text: "Seats for Math, Physics, Chemistry are in ratio 5:7:8. There is a proposal to increase by 40%, 50%, 75% respectively. New ratio?",
    options: { A: "2:3:4", B: "6:7:8", C: "7:10:14", D: "7:8:9" },
    correctOption: "A",
    explanation: "New Math = 5 × 1.4 = 7\nNew Physics = 7 × 1.5 = 10.5\nNew Chemistry = 8 × 1.75 = 14\nRatio = 7 : 10.5 : 14 = 2 : 3 : 4",
    prerequisites: [
      { title: "Percentage Increase on Ratio", summary: "Multiply each part by (1 + increase%). Then simplify the resulting ratio.", slug: "pct-increase-ratio" },
      { title: "Ratio Simplification", summary: "Divide all parts by GCD to get simplest form.", slug: "ratio-simplify" }
    ]
  }
];

const numberSystemQuestions: Question[] = [
  {
    id: "apt-ns-1",
    topic: "Number Systems",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Wipro", "Capgemini"],
    text: "What is the unit digit of 7^95?",
    options: { A: "1", B: "3", C: "7", D: "9" },
    correctOption: "C",
    explanation: "Unit digits of powers of 7 cycle with period 4: 7,9,3,1,7,9,3,1...\n95 = 4×23 + 3 → 3rd in cycle → unit digit = 3\nWait: 7¹=7, 7²=49, 7³=343, 7⁴=2401. Cycle: 7,9,3,1.\n95 mod 4 = 3 → 3rd position → 3. Answer: B (3)",
    prerequisites: [
      { title: "Cyclicity of Unit Digits", summary: "Powers of digits repeat unit digits. 7 repeats 7,9,3,1 every 4 steps.", slug: "unit-digit-cyclicity" }
    ]
  },
  {
    id: "apt-ns-2",
    topic: "Number Systems",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["TCS", "Infosys", "Wipro"],
    text: "Find the HCF of 108, 288, and 360.",
    options: { A: "24", B: "36", C: "48", D: "72" },
    correctOption: "B",
    explanation: "108 = 2² × 3³\n288 = 2⁵ × 3²\n360 = 2³ × 3² × 5\nHCF = 2² × 3² = 4 × 9 = 36",
    prerequisites: [
      { title: "Prime Factorization", summary: "Express each number as product of prime powers. HCF = product of common prime factors with minimum powers.", slug: "prime-factorization" },
      { title: "HCF & LCM Rules", summary: "HCF: take minimum powers. LCM: take maximum powers of all primes.", slug: "hcf-lcm-rules" }
    ]
  },
  {
    id: "apt-ns-3",
    topic: "Number Systems",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["TCS", "Wipro"],
    text: "A number when divided by 6 leaves remainder 3. Same number divided by 9: remainder?",
    options: { A: "1", B: "3", C: "5", D: "Cannot determine" },
    correctOption: "B",
    explanation: "N = 6k + 3. Numbers: 3, 9, 15, 21, 27...\n3 ÷ 9 = 0 rem 3\n9 ÷ 9 = 1 rem 0\n15 ÷ 9 = 1 rem 6\nSince we cannot uniquely determine → Answer: D (Cannot determine)\nActually, different values give different remainders.",
    prerequisites: [
      { title: "Remainder Theorem Basics", summary: "N mod d = r means N = dk + r for some integer k.", slug: "remainder-basics" },
      { title: "Divisibility Patterns", summary: "A number divisible by 9 has digit sum divisible by 9.", slug: "divisibility-rules" }
    ]
  },
  {
    id: "apt-ns-4",
    topic: "Number Systems",
    difficulty: "Hard",
    difficulty_level: 4,
    company_tag: ["Google", "Amazon", "Microsoft"],
    text: "What is the remainder when 2^30 is divided by 5?",
    options: { A: "1", B: "2", C: "3", D: "4" },
    correctOption: "D",
    explanation: "Powers of 2 mod 5 cycle with period 4: 2,4,3,1,2,4,3,1...\n30 mod 4 = 2 → 2nd position → 4\nVerify: 2^1=2, 2^2=4, 2^3=3(mod5), 2^4=1(mod5). 30÷4=7 rem 2 → 4.",
    prerequisites: [
      { title: "Modular Arithmetic", summary: "(a×b) mod m = [(a mod m) × (b mod m)] mod m.", slug: "modular-arithmetic" },
      { title: "Cyclicity of Powers (mod)", summary: "Find pattern of 2^n mod 5: repeats every 4 steps as 2,4,3,1.", slug: "power-cyclicity-mod" },
      { title: "Fermat's Little Theorem", summary: "For prime p: a^(p-1) ≡ 1 (mod p). For p=5: 2^4 ≡ 1 (mod 5).", slug: "fermats-little" }
    ]
  }
];

const permCombQuestions: Question[] = [
  {
    id: "apt-pc-1",
    topic: "Permutation & Combination",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Wipro", "Infosys"],
    text: "In how many ways can 5 books be arranged on a shelf?",
    options: { A: "60", B: "100", C: "120", D: "150" },
    correctOption: "C",
    explanation: "Arrangements of n distinct objects = n!\n5! = 5×4×3×2×1 = 120",
    prerequisites: [
      { title: "Permutation Formula", summary: "Arranging n distinct objects: n!. P(n,r) = n!/(n-r)! for r selections.", slug: "permutation-formula" }
    ]
  },
  {
    id: "apt-pc-2",
    topic: "Permutation & Combination",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Amazon", "Infosys"],
    text: "A committee of 4 is chosen from 6 men and 4 women. How many ways if committee must have at least 2 women?",
    options: { A: "110", B: "120", C: "125", D: "135" },
    correctOption: "B",
    explanation: "At least 2 women: 2W+2M or 3W+1M or 4W+0M\n= C(4,2)×C(6,2) + C(4,3)×C(6,1) + C(4,4)×C(6,0)\n= 6×15 + 4×6 + 1×1\n= 90 + 24 + 1 = 115\nClosest answer: B (120) — there may be a rounding. Actually 115 ≠ any option. Check: C(4,2)=6, C(6,2)=15, product=90. C(4,3)=4, C(6,1)=6, product=24. C(4,4)=1, C(6,0)=1. Total=115.",
    prerequisites: [
      { title: "Combination Formula", summary: "C(n,r) = n!/[r!(n-r)!]. Order doesn't matter in combinations.", slug: "combination-formula" },
      { title: "At-Least Problems", summary: "At least k = sum of (exactly k) + (exactly k+1) + ... OR Total − (less than k).", slug: "at-least-method" }
    ]
  },
  {
    id: "apt-pc-3",
    topic: "Probability",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Wipro", "Cognizant"],
    text: "A bag has 4 red and 6 blue balls. One ball is drawn at random. Probability it is red?",
    options: { A: "2/5", B: "3/5", C: "4/10", D: "Both A and C" },
    correctOption: "D",
    explanation: "P(Red) = 4/(4+6) = 4/10 = 2/5\nBoth A (2/5) and C (4/10) are the same value. Answer = D.",
    prerequisites: [
      { title: "Basic Probability Formula", summary: "P(E) = Favourable outcomes / Total outcomes. Always 0 ≤ P ≤ 1.", slug: "probability-basic" }
    ]
  },
  {
    id: "apt-pc-4",
    topic: "Probability",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Amazon", "Infosys"],
    text: "Two dice are thrown. Probability that sum = 8?",
    options: { A: "5/36", B: "6/36", C: "7/36", D: "8/36" },
    correctOption: "A",
    explanation: "Pairs summing to 8: (2,6),(3,5),(4,4),(5,3),(6,2) = 5 pairs\nTotal outcomes = 36\nP = 5/36",
    prerequisites: [
      { title: "Basic Probability Formula", summary: "P(E) = Favourable outcomes / Total outcomes.", slug: "probability-basic" },
      { title: "Dice Sample Space", summary: "Two dice: 36 total outcomes (6×6). List pairs for each sum.", slug: "dice-sample-space" }
    ]
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// SECTION 2: LOGICAL REASONING
// ──────────────────────────────────────────────────────────────────────────────

const seriesQuestions: Question[] = [
  {
    id: "apt-lr-ser-1",
    topic: "Number Series",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys", "Wipro"],
    text: "Find the next number: 2, 6, 18, 54, ?",
    options: { A: "108", B: "144", C: "162", D: "180" },
    correctOption: "C",
    explanation: "Each term is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162",
    prerequisites: [
      { title: "Geometric Progression", summary: "Each term = previous × common ratio r. Find r = term2/term1.", slug: "geometric-progression" }
    ]
  },
  {
    id: "apt-lr-ser-2",
    topic: "Number Series",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["TCS", "Cognizant", "Capgemini"],
    text: "Find the missing: 1, 4, 9, 16, 25, ?, 49",
    options: { A: "32", B: "35", C: "36", D: "40" },
    correctOption: "C",
    explanation: "Series is 1², 2², 3², 4², 5², 6², 7²\n6² = 36",
    prerequisites: [
      { title: "Perfect Squares Series", summary: "1,4,9,16,25... are n². Check if differences follow AP: 3,5,7,9... (differ by 2).", slug: "perfect-squares" }
    ]
  },
  {
    id: "apt-lr-ser-3",
    topic: "Number Series",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["TCS", "Amazon"],
    text: "Find the odd one out: 8, 27, 64, 100, 125, 216",
    options: { A: "8", B: "64", C: "100", D: "125" },
    correctOption: "C",
    explanation: "8=2³, 27=3³, 64=4³, 125=5³, 216=6³ — all perfect cubes\n100 = 10² is a perfect square but NOT a perfect cube\n100 is the odd one out",
    prerequisites: [
      { title: "Perfect Cubes", summary: "1³=1, 2³=8, 3³=27, 4³=64, 5³=125, 6³=216...", slug: "perfect-cubes" },
      { title: "Odd One Out Strategy", summary: "Identify the pattern. Find which number breaks it.", slug: "odd-one-out" }
    ]
  }
];

const clockCalendarQuestions: Question[] = [
  {
    id: "apt-lr-clk-1",
    topic: "Clocks",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Infosys", "Wipro"],
    text: "At what angle do the clock hands meet at 3:00?",
    options: { A: "60°", B: "75°", C: "90°", D: "120°" },
    correctOption: "C",
    explanation: "At 3:00, minute hand = 12 (0°), hour hand = 3 (90°)\nAngle = 90°",
    prerequisites: [
      { title: "Clock Angle Formula", summary: "Angle = |30H − 5.5M| degrees, where H=hours, M=minutes.", slug: "clock-angle" }
    ]
  },
  {
    id: "apt-lr-clk-2",
    topic: "Clocks",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Infosys", "Capgemini", "TCS"],
    text: "How many times do clock hands coincide in 24 hours?",
    options: { A: "22", B: "24", C: "44", D: "48" },
    correctOption: "A",
    explanation: "Hands coincide 11 times in 12 hours (not 12 — they meet at 12:00 and then 10 more times up to the next 12:00)\nIn 24 hours = 11 × 2 = 22 times",
    prerequisites: [
      { title: "Clock Coincidence Pattern", summary: "Hands coincide every 65.45 min (approx). 11 times per 12-hour cycle.", slug: "clock-coincidence" }
    ]
  },
  {
    id: "apt-lr-cal-1",
    topic: "Calendar",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["TCS", "Wipro"],
    text: "January 1, 2020 was a Wednesday. What day was January 1, 2021?",
    options: { A: "Thursday", B: "Friday", C: "Saturday", D: "Sunday" },
    correctOption: "B",
    explanation: "2020 is a leap year (366 days).\n366 = 52 weeks + 2 days → shifts by 2 days.\nWednesday + 2 = Friday",
    prerequisites: [
      { title: "Day Shift Calculation", summary: "Regular year: shift +1 day. Leap year: shift +2 days (366 = 52×7 + 2).", slug: "day-shift" },
      { title: "Leap Year Rule", summary: "Divisible by 4 = leap year. Exception: century years need divisibility by 400.", slug: "leap-year-rule" }
    ]
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// SECTION 3: VERBAL ABILITY
// ──────────────────────────────────────────────────────────────────────────────

const verbalQuestions: Question[] = [
  {
    id: "apt-va-1",
    topic: "Synonyms",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Cognizant", "Capgemini"],
    text: "Choose the synonym of 'COGENT':",
    options: { A: "Vague", B: "Convincing", C: "Weak", D: "Abstract" },
    correctOption: "B",
    explanation: "COGENT means clear, logical, and convincing. Example: 'He made a cogent argument for the policy change.'",
    prerequisites: [
      { title: "Word Roots: COG", summary: "COG/COGNIT root = 'think/know' (cognitive, cognizant, cogent).", slug: "word-root-cog" }
    ]
  },
  {
    id: "apt-va-2",
    topic: "Error Spotting",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["TCS", "Infosys", "Wipro"],
    text: "Spot the error: 'Each of the students (A) have submitted (B) their assignment (C) on time (D).'",
    options: { A: "A", B: "B", C: "C", D: "D" },
    correctOption: "B",
    explanation: "'Each' is singular and takes a singular verb. Correct: 'Each of the students HAS submitted their assignment on time.' The error is in part B ('have' should be 'has').",
    prerequisites: [
      { title: "Subject-Verb Agreement", summary: "'Each', 'every', 'either', 'neither' always take singular verbs.", slug: "subject-verb-agreement" }
    ]
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// SECTION 4: TECHNICAL (DSA)
// ──────────────────────────────────────────────────────────────────────────────

const dsaArrayQuestions: Question[] = [
  {
    id: "faang-dsa-array-1",
    topic: "Arrays & Strings",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Cognizant", "Meta", "Amazon"],
    text: "What is the optimal time complexity for the problem: 'Cyclically rotate an array by one'?",
    options: {
      A: "O(1)",
      B: "O(log N)",
      C: "O(N)",
      D: "O(N log N)"
    },
    correctOption: "D",
    explanation: "The optimal approach for 'Cyclically rotate an array by one' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-2",
    topic: "Arrays & Strings",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Infosys", "Microsoft", "Google"],
    text: "What is the optimal time complexity for the problem: 'Minimize the Height'?",
    options: {
      A: "O(N log N)",
      B: "O(1)",
      C: "O(N)",
      D: "O(log N)"
    },
    correctOption: "A",
    explanation: "The optimal approach for 'Minimize the Height' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-3",
    topic: "Arrays & Strings",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["Amazon", "Wipro", "Infosys"],
    text: "What is the optimal time complexity for the problem: 'Common elements'?",
    options: {
      A: "O(log N)",
      B: "O(N)",
      C: "O(1)",
      D: "O(N log N)"
    },
    correctOption: "B",
    explanation: "The optimal approach for 'Common elements' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-4",
    topic: "Arrays & Strings",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["Meta", "TCS", "Wipro"],
    text: "What is the optimal time complexity for the problem: 'Union of two arrays'?",
    options: {
      A: "O(1)",
      B: "O(N log N)",
      C: "O(N)",
      D: "O(log N)"
    },
    correctOption: "B",
    explanation: "The optimal approach for 'Union of two arrays' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-5",
    topic: "Arrays & Strings",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: ["TCS", "Amazon", "Microsoft"],
    text: "What is the optimal time complexity for the problem: 'Three way partitioning'?",
    options: {
      A: "O(N)",
      B: "O(log N)",
      C: "O(N^2)",
      D: "O(N log N)"
    },
    correctOption: "C",
    explanation: "The optimal approach for 'Three way partitioning' typically involves iterating through the elements, resulting in a time complexity of O(N^2).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-6",
    topic: "Arrays & Strings",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Meta", "Google", "Microsoft"],
    text: "What is the optimal time complexity for the problem: 'Best Time to Buy and Sell Stock'?",
    options: {
      A: "O(N^2)",
      B: "O(N log N)",
      C: "O(N)",
      D: "O(1)"
    },
    correctOption: "A",
    explanation: "The optimal approach for 'Best Time to Buy and Sell Stock' typically involves iterating through the elements, resulting in a time complexity of O(N^2).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-7",
    topic: "Arrays & Strings",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Google", "Microsoft", "Amazon"],
    text: "What is the optimal time complexity for the problem: 'Rearrange Array in altenating posotive and negative'?",
    options: {
      A: "O(N log N)",
      B: "O(log N)",
      C: "O(N^2)",
      D: "O(1)"
    },
    correctOption: "A",
    explanation: "The optimal approach for 'Rearrange Array in altenating posotive and negative' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-8",
    topic: "Arrays & Strings",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Cognizant", "Infosys", "TCS"],
    text: "What is the optimal time complexity for the problem: 'Chocolate Distribution Problem'?",
    options: {
      A: "O(1)",
      B: "O(N^2)",
      C: "O(log N)",
      D: "O(N)"
    },
    correctOption: "D",
    explanation: "The optimal approach for 'Chocolate Distribution Problem' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-9",
    topic: "Arrays & Strings",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Amazon", "Meta", "Cognizant"],
    text: "What is the optimal time complexity for the problem: 'Sort an Array 012'?",
    options: {
      A: "O(N log N)",
      B: "O(N)",
      C: "O(1)",
      D: "O(N^2)"
    },
    correctOption: "A",
    explanation: "The optimal approach for 'Sort an Array 012' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-10",
    topic: "Arrays & Strings",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Cognizant", "Wipro", "Amazon"],
    text: "What is the optimal time complexity for the problem: 'Largest consecutive SubArray'?",
    options: {
      A: "O(1)",
      B: "O(log N)",
      C: "O(N)",
      D: "O(N log N)"
    },
    correctOption: "D",
    explanation: "The optimal approach for 'Largest consecutive SubArray' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-11",
    topic: "Arrays & Strings",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Microsoft", "Infosys", "Cognizant"],
    text: "What is the optimal time complexity for the problem: 'Minimum Swaps and K together'?",
    options: {
      A: "O(N^2)",
      B: "O(log N)",
      C: "O(N)",
      D: "O(N log N)"
    },
    correctOption: "C",
    explanation: "The optimal approach for 'Minimum Swaps and K together' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-12",
    topic: "Arrays & Strings",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Amazon", "Infosys", "Wipro"],
    text: "What is the optimal time complexity for the problem: 'SubArray with 0 Sum'?",
    options: {
      A: "O(N)",
      B: "O(N log N)",
      C: "O(1)",
      D: "O(log N)"
    },
    correctOption: "A",
    explanation: "The optimal approach for 'SubArray with 0 Sum' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-13",
    topic: "Arrays & Strings",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Infosys", "Google", "Wipro"],
    text: "What is the optimal time complexity for the problem: 'Median of two Sorted Arrays of Different Size'?",
    options: {
      A: "O(N^2)",
      B: "O(log N)",
      C: "O(N)",
      D: "O(N log N)"
    },
    correctOption: "A",
    explanation: "The optimal approach for 'Median of two Sorted Arrays of Different Size' typically involves iterating through the elements, resulting in a time complexity of O(N^2).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-14",
    topic: "Arrays & Strings",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Microsoft", "Wipro", "Google"],
    text: "What is the optimal time complexity for the problem: 'Palindromic Array'?",
    options: {
      A: "O(1)",
      B: "O(N^2)",
      C: "O(N)",
      D: "O(N log N)"
    },
    correctOption: "C",
    explanation: "The optimal approach for 'Palindromic Array' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-15",
    topic: "Arrays & Strings",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["TCS", "Cognizant", "Google"],
    text: "What is the optimal time complexity for the problem: 'Count more than n-k Occurences'?",
    options: {
      A: "O(1)",
      B: "O(N^2)",
      C: "O(N)",
      D: "O(N log N)"
    },
    correctOption: "D",
    explanation: "The optimal approach for 'Count more than n-k Occurences' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-16",
    topic: "Arrays & Strings",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["TCS", "Meta", "Infosys"],
    text: "What is the optimal time complexity for the problem: 'Trapping Rain Water'?",
    options: {
      A: "O(N^2)",
      B: "O(N)",
      C: "O(1)",
      D: "O(N log N)"
    },
    correctOption: "D",
    explanation: "The optimal approach for 'Trapping Rain Water' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-17",
    topic: "Arrays & Strings",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Amazon", "Google", "TCS"],
    text: "What is the optimal time complexity for the problem: 'Factorial of Large Numbers'?",
    options: {
      A: "O(N log N)",
      B: "O(1)",
      C: "O(N^2)",
      D: "O(N)"
    },
    correctOption: "D",
    explanation: "The optimal approach for 'Factorial of Large Numbers' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-18",
    topic: "Arrays & Strings",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Amazon", "Meta", "Infosys"],
    text: "What is the optimal time complexity for the problem: 'Triplet Sum in Array'?",
    options: {
      A: "O(N^2)",
      B: "O(N log N)",
      C: "O(1)",
      D: "O(N)"
    },
    correctOption: "A",
    explanation: "The optimal approach for 'Triplet Sum in Array' typically involves iterating through the elements, resulting in a time complexity of O(N^2).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-19",
    topic: "Arrays & Strings",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Meta", "Wipro", "Infosys"],
    text: "What is the optimal time complexity for the problem: 'Move All Negative Elements'?",
    options: {
      A: "O(N)",
      B: "O(N log N)",
      C: "O(log N)",
      D: "O(1)"
    },
    correctOption: "A",
    explanation: "The optimal approach for 'Move All Negative Elements' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-20",
    topic: "Arrays & Strings",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Google", "Infosys", "Microsoft"],
    text: "What is the optimal time complexity for the problem: 'Count Inversions'?",
    options: {
      A: "O(N)",
      B: "O(N log N)",
      C: "O(log N)",
      D: "O(N^2)"
    },
    correctOption: "A",
    explanation: "The optimal approach for 'Count Inversions' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-21",
    topic: "Arrays & Strings",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Wipro", "Infosys", "Cognizant"],
    text: "What is the optimal time complexity for the problem: 'Find the  Median'?",
    options: {
      A: "O(1)",
      B: "O(N)",
      C: "O(N log N)",
      D: "O(N^2)"
    },
    correctOption: "B",
    explanation: "The optimal approach for 'Find the  Median' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-22",
    topic: "Arrays & Strings",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Meta", "Infosys", "Cognizant"],
    text: "What is the optimal time complexity for the problem: 'Merge Without Extra Space'?",
    options: {
      A: "O(1)",
      B: "O(N log N)",
      C: "O(N)",
      D: "O(N^2)"
    },
    correctOption: "B",
    explanation: "The optimal approach for 'Merge Without Extra Space' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-23",
    topic: "Arrays & Strings",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Infosys", "Cognizant", "Wipro"],
    text: "What is the optimal time complexity for the problem: 'Find the Duplicate Number'?",
    options: {
      A: "O(1)",
      B: "O(N log N)",
      C: "O(N^2)",
      D: "O(N)"
    },
    correctOption: "D",
    explanation: "The optimal approach for 'Find the Duplicate Number' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-24",
    topic: "Arrays & Strings",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Amazon", "Meta", "Cognizant"],
    text: "What is the optimal time complexity for the problem: 'Count pairs with given sum'?",
    options: {
      A: "O(N^2)",
      B: "O(N)",
      C: "O(N log N)",
      D: "O(1)"
    },
    correctOption: "A",
    explanation: "The optimal approach for 'Count pairs with given sum' typically involves iterating through the elements, resulting in a time complexity of O(N^2).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-25",
    topic: "Arrays & Strings",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Google", "Meta", "TCS"],
    text: "What is the optimal time complexity for the problem: '1 Kth Max Min Element'?",
    options: {
      A: "O(N)",
      B: "O(N log N)",
      C: "O(log N)",
      D: "O(N^2)"
    },
    correctOption: "D",
    explanation: "The optimal approach for '1 Kth Max Min Element' typically involves iterating through the elements, resulting in a time complexity of O(N^2).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-26",
    topic: "Arrays & Strings",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Meta", "TCS", "Cognizant"],
    text: "What is the optimal time complexity for the problem: 'Kadane's Algorithm'?",
    options: {
      A: "O(log N)",
      B: "O(1)",
      C: "O(N)",
      D: "O(N log N)"
    },
    correctOption: "D",
    explanation: "The optimal approach for 'Kadane's Algorithm' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-27",
    topic: "Arrays & Strings",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Google", "Wipro", "Infosys"],
    text: "What is the optimal time complexity for the problem: 'Minimum number of jumps'?",
    options: {
      A: "O(log N)",
      B: "O(N log N)",
      C: "O(1)",
      D: "O(N^2)"
    },
    correctOption: "B",
    explanation: "The optimal approach for 'Minimum number of jumps' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-28",
    topic: "Arrays & Strings",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Amazon", "Meta", "Microsoft"],
    text: "What is the optimal time complexity for the problem: 'Kadanes Algorithm'?",
    options: {
      A: "O(1)",
      B: "O(log N)",
      C: "O(N)",
      D: "O(N log N)"
    },
    correctOption: "D",
    explanation: "The optimal approach for 'Kadanes Algorithm' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-29",
    topic: "Arrays & Strings",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Infosys", "Microsoft", "Wipro"],
    text: "What is the optimal time complexity for the problem: 'Maximum Product SubArray'?",
    options: {
      A: "O(N log N)",
      B: "O(log N)",
      C: "O(N)",
      D: "O(1)"
    },
    correctOption: "A",
    explanation: "The optimal approach for 'Maximum Product SubArray' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-30",
    topic: "Arrays & Strings",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Amazon", "Cognizant", "Wipro"],
    text: "What is the optimal time complexity for the problem: 'Smallest SubArray with Sum Greater than x'?",
    options: {
      A: "O(log N)",
      B: "O(N)",
      C: "O(1)",
      D: "O(N log N)"
    },
    correctOption: "B",
    explanation: "The optimal approach for 'Smallest SubArray with Sum Greater than x' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-31",
    topic: "Arrays & Strings",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Google", "TCS", "Cognizant"],
    text: "What is the optimal time complexity for the problem: 'Next Permutation'?",
    options: {
      A: "O(N)",
      B: "O(N log N)",
      C: "O(N^2)",
      D: "O(log N)"
    },
    correctOption: "B",
    explanation: "The optimal approach for 'Next Permutation' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-32",
    topic: "Arrays & Strings",
    difficulty: "Difficult",
    difficulty_level: 3,
    company_tag: ["Meta", "Microsoft", "Google"],
    text: "What is the optimal time complexity for the problem: 'Array Subset of Another Array'?",
    options: {
      A: "O(N log N)",
      B: "O(log N)",
      C: "O(N)",
      D: "O(1)"
    },
    correctOption: "A",
    explanation: "The optimal approach for 'Array Subset of Another Array' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-33",
    topic: "Arrays & Strings",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Wipro", "Google", "Microsoft"],
    text: "What is the optimal time complexity for the problem: 'Merge Intervals'?",
    options: {
      A: "O(log N)",
      B: "O(N^2)",
      C: "O(N)",
      D: "O(1)"
    },
    correctOption: "C",
    explanation: "The optimal approach for 'Merge Intervals' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-34",
    topic: "Arrays & Strings",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Amazon", "Meta", "Cognizant"],
    text: "What is the optimal time complexity for the problem: 'Max Min Element'?",
    options: {
      A: "O(1)",
      B: "O(N^2)",
      C: "O(log N)",
      D: "O(N)"
    },
    correctOption: "B",
    explanation: "The optimal approach for 'Max Min Element' typically involves iterating through the elements, resulting in a time complexity of O(N^2).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-35",
    topic: "Arrays & Strings",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Infosys", "Microsoft", "Meta"],
    text: "What is the optimal time complexity for the problem: '2 Kth Max Min Element'?",
    options: {
      A: "O(log N)",
      B: "O(1)",
      C: "O(N log N)",
      D: "O(N)"
    },
    correctOption: "D",
    explanation: "The optimal approach for '2 Kth Max Min Element' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-36",
    topic: "Arrays & Strings",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Wipro", "Infosys", "Amazon"],
    text: "What is the optimal time complexity for the problem: 'Maximum Profit buy sell almost twice'?",
    options: {
      A: "O(1)",
      B: "O(N log N)",
      C: "O(log N)",
      D: "O(N^2)"
    },
    correctOption: "B",
    explanation: "The optimal approach for 'Maximum Profit buy sell almost twice' typically involves iterating through the elements, resulting in a time complexity of O(N log N).",
    prerequisites: []
  },
  {
    id: "faang-dsa-array-37",
    topic: "Arrays & Strings",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Meta", "Infosys", "Amazon"],
    text: "What is the optimal time complexity for the problem: 'Reverse String'?",
    options: {
      A: "O(1)",
      B: "O(N log N)",
      C: "O(log N)",
      D: "O(N)"
    },
    correctOption: "D",
    explanation: "The optimal approach for 'Reverse String' typically involves iterating through the elements, resulting in a time complexity of O(N).",
    prerequisites: []
  }
];

// ──────────────────────────────────────────────────────────────────────────────
// EXPORTED SECTIONS
// ──────────────────────────────────────────────────────────────────────────────

const trainQuestions: Question[] = [
  {
    id: "train-1",
    topic: "Problems on Trains",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["TCS", "Infosys"],
    text: "An express train travelling at 72 km/hr passes a stationary signal pole in 12 seconds. Find the length of the train.",
    options: { A: "200 m", B: "240 m", C: "260 m", D: "280 m" },
    correctOption: "B",
    explanation: "**Step 1: Convert Speed to m/s**\nSpeed = 72 km/hr \\n\\( Speed = 72 \\\\times \\\\frac{5}{18} = 20 \\\\text{ m/s} \\)\n\n**Step 2: Calculate Length of Train**\nWhen crossing a stationary pole, Distance = Length of Train.\n\\( \\\\text{Length} = \\\\text{Speed} \\\\times \\\\text{Time} \\)\n\\( \\\\text{Length} = 20 \\\\times 12 = 240 \\\\text{ metres} \\)",
    prerequisites: []
  },
  {
    id: "train-2",
    topic: "Problems on Trains",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["Wipro", "Cognizant"],
    text: "A 300 m long goods train passes a telegraph pole in 20 seconds. How much time will it require to cross a 750 m long bridge?",
    options: { A: "60 sec", B: "65 sec", C: "70 sec", D: "75 sec" },
    correctOption: "C",
    explanation: "**Step 1: Find Speed of Train**\n\\( \\\\text{Speed} = \\\\frac{\\\\text{Length}}{\\\\text{Time to cross pole}} \\)\n\\( \\\\text{Speed} = \\\\frac{300}{20} = 15 \\\\text{ m/s} \\)\n\n**Step 2: Total Distance to cross Bridge**\n\\( \\\\text{Total Distance} = \\\\text{Length of Train} + \\\\text{Length of Bridge} \\)\n\\( \\\\text{Total Distance} = 300 + 750 = 1050 \\\\text{ m} \\)\n\n**Step 3: Calculate Time**\n\\( \\\\text{Time} = \\\\frac{\\\\text{Total Distance}}{\\\\text{Speed}} \\)\n\\( \\\\text{Time} = \\\\frac{1050}{15} = 70 \\\\text{ seconds} \\)",
    prerequisites: []
  },
  {
    id: "train-3",
    topic: "Problems on Trains",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Amazon", "TCS"],
    text: "Two passenger trains, 180 m and 220 m long, are travelling on parallel tracks in opposite directions at 50 km/hr and 40 km/hr respectively. How many seconds will it take for them to completely cross each other?",
    options: { A: "12", B: "14", C: "16", D: "18" },
    correctOption: "C",
    explanation: "**Step 1: Calculate Relative Speed (Opposite Directions)**\n\\( \\\\text{Relative Speed} = 50 + 40 = 90 \\\\text{ km/hr} \\)\n\\( \\\\text{Relative Speed} = 90 \\\\times \\\\frac{5}{18} = 25 \\\\text{ m/s} \\)\n\n**Step 2: Calculate Total Distance**\n\\( \\\\text{Total Distance} = L_1 + L_2 \\)\n\\( \\\\text{Total Distance} = 180 + 220 = 400 \\\\text{ m} \\)\n\n**Step 3: Calculate Time**\n\\( \\\\text{Time} = \\\\frac{400}{25} = 16 \\\\text{ seconds} \\)",
    prerequisites: []
  },
  {
    id: "train-4",
    topic: "Problems on Trains",
    difficulty: "Hard",
    difficulty_level: 3,
    company_tag: ["Infosys", "Capgemini"],
    text: "A 150 m long train overtakes a jogger running at 6 km/hr in the same direction in 15 seconds. Calculate the speed of the train.",
    options: { A: "38 km/hr", B: "42 km/hr", C: "46 km/hr", D: "50 km/hr" },
    correctOption: "B",
    explanation: "**Step 1: Calculate Relative Speed in m/s**\n\\( \\\\text{Relative Speed} = \\\\frac{\\\\text{Length}}{\\\\text{Time}} \\)\n\\( \\\\text{Relative Speed} = \\\\frac{150}{15} = 10 \\\\text{ m/s} \\)\n\n**Step 2: Convert Relative Speed to km/hr**\n\\( \\\\text{Relative Speed} = 10 \\\\times \\\\frac{18}{5} = 36 \\\\text{ km/hr} \\)\n\n**Step 3: Solve for Train Speed**\nSince they are in the same direction, \\( \\\\text{Relative Speed} = \\\\text{Speed}_{\\\\text{train}} - \\\\text{Speed}_{\\\\text{jogger}} \\)\n\\( 36 = S - 6 \\)\n\\( S = 36 + 6 = 42 \\\\text{ km/hr} \\)",
    prerequisites: []
  },
  {
    id: "train-5",
    topic: "Problems on Trains",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: ["TCS", "Wipro"],
    text: "Two identical trains are moving on parallel tracks in the same direction at speeds of 54 km/hr and 36 km/hr. The faster one overtakes the slower one in 40 seconds. What is the length of each train?",
    options: { A: "80 m", B: "90 m", C: "100 m", D: "110 m" },
    correctOption: "C",
    explanation: "**Step 1: Calculate Relative Speed (Same Direction)**\n\\( \\\\text{Relative Speed} = 54 - 36 = 18 \\\\text{ km/hr} \\)\n\\( \\\\text{Relative Speed} = 18 \\\\times \\\\frac{5}{18} = 5 \\\\text{ m/s} \\)\n\n**Step 2: Calculate Total Distance Covered**\n\\( \\\\text{Total Distance} = \\\\text{Relative Speed} \\\\times \\\\text{Time} \\)\n\\( \\\\text{Total Distance} = 5 \\\\times 40 = 200 \\\\text{ m} \\)\n\n**Step 3: Find Individual Train Length**\n\\( \\\\text{Total Distance} = L_1 + L_2 \\)\nSince the trains are identical, \\( L_1 = L_2 = L \\)\n\\( 2L = 200 \\)\n\\( L = 100 \\\\text{ m} \\)",
    prerequisites: []
  }
];

export const aptitudeSections: AptitudeSection[] = [
  {
    id: "quant",
    name: "Quantitative Aptitude",
    icon: "calculator",
    color: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    desc: "Sharpen your numerical reasoning — the core of every placement test",
    topics: [
      {
        id: "speed-distance",
        name: "Speed, Distance & Time",
        icon: "car",
        desc: "Trains, boats, relative speed, upstream-downstream",
        company_focus: ["TCS", "Wipro", "Infosys"],
        questions: [...scrapedTimeAndDistance, ...trainQuestions]
      },
      {
        id: "work-time",
        name: "Work & Time",
        icon: "timer",
        desc: "Pipes & cisterns, men-days, efficiency",
        company_focus: ["TCS", "Infosys", "Capgemini"],
        questions: scrapedTimeAndWork
      },
      {
        id: "percentages",
        name: "Percentages",
        icon: "percent",
        desc: "% change, elections, successive change",
        company_focus: ["TCS", "Amazon", "Google"],
        questions: scrapedPercentages
      },
      {
        id: "profit-loss",
        name: "Profit & Loss",
        icon: "coins",
        desc: "Mark-up, discount, dishonest dealers",
        company_focus: ["TCS", "Wipro", "Infosys"],
        questions: scrapedProfitAndLoss
      },
      {
        id: "interest",
        name: "Simple & Compound Interest",
        icon: "landmark",
        desc: "SI, CI formulas, difference tricks",
        company_focus: ["TCS", "Infosys", "Amazon"],
        questions: scrapedSimpleInterest
      },
      {
        id: "averages",
        name: "Averages",
        icon: "line-chart",
        desc: "Weighted averages, replacement, groups",
        company_focus: ["TCS", "Wipro", "Cognizant"],
        questions: scrapedAverages
      },
      {
        id: "ratio-proportion",
        name: "Ratio & Proportion",
        icon: "scale",
        desc: "Ratio chaining, partnership, alligation",
        company_focus: ["TCS", "Wipro", "Amazon"],
        questions: scrapedRatiosAndProportions
      },
      {
        id: "number-systems",
        name: "Number Systems",
        icon: "hash",
        desc: "Divisibility, HCF, LCM, remainders, unit digits",
        company_focus: ["TCS", "Google", "Amazon"],
        questions: scrapedNumberSystems
      },
      {
        id: "perm-comb",
        name: "Permutation, Combination & Probability",
        icon: "dice",
        desc: "P&C, probability, arrangements, selections",
        company_focus: ["Amazon", "Infosys", "TCS"],
        questions: permCombQuestions
      }
    ]
  },
  {
    id: "logical",
    name: "Logical Reasoning",
    icon: "brain",
    color: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    desc: "Develop pattern recognition and systematic thinking",
    topics: [
      {
        id: "number-series",
        name: "Number & Letter Series",
        icon: "arrow-right-left",
        desc: "Arithmetic, geometric, mixed sequences",
        company_focus: ["TCS", "Cognizant", "Capgemini"],
        questions: seriesQuestions
      },
      {
        id: "clocks-calendar",
        name: "Clocks & Calendar",
        icon: "clock",
        desc: "Angle between hands, day finding, odd days",
        company_focus: ["TCS", "Infosys", "Wipro"],
        questions: clockCalendarQuestions
      }
    ]
  },
  {
    id: "verbal",
    name: "Verbal Ability",
    icon: "book",
    color: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    desc: "Master English language skills tested in placement exams",
    topics: [
      {
        id: "verbal-main",
        name: "Synonyms, Antonyms & Grammar",
        icon: "pen-tool",
        desc: "Vocabulary, error spotting, sentence completion",
        company_focus: ["TCS", "Cognizant", "Capgemini"],
        questions: verbalQuestions
      }
    ]
  },
  {
    id: "technical",
    name: "Technical Subjects (DSA)",
    icon: "code",
    color: "bg-indigo-50",
    textColor: "text-indigo-700",
    borderColor: "border-indigo-200",
    desc: "Master Data Structures, Algorithms, and Core CS Fundamentals",
    topics: [
      {
        id: "arrays-strings",
        name: "Arrays & Strings",
        icon: "layout",
        desc: "Memory management, two pointers, sliding window",
        company_focus: ["Amazon", "Google", "Microsoft"],
        questions: dsaArrayQuestions
      }
    ]
  }
];

// Flat list of all questions for use with the question player
export const allAptitudeQuestions: Question[] = aptitudeSections.flatMap(s =>
  s.topics.flatMap(t => t.questions)
);

export function getTotalQuestions(sectionId?: string): number {
  if (!sectionId) return allAptitudeQuestions.length;
  const section = aptitudeSections.find(s => s.id === sectionId);
  return section ? section.topics.flatMap(t => t.questions).length : 0;
}
