import os
import json
import random
from pathlib import Path

def generate_dsa_mcq(problem_name, idx):
    """Generates a mock MCQ about time complexity for a given DSA problem."""
    problem_name = problem_name.replace("_", " ").strip()
    # Remove leading numbers and parentheses like "01) " or "1 "
    parts = problem_name.split(")")
    if len(parts) > 1:
        problem_name = parts[-1].strip()
    
    question = f"What is the optimal time complexity for the problem: '{problem_name}'?"
    
    complexities = ["O(1)", "O(N)", "O(N log N)", "O(N^2)", "O(log N)"]
    correct_ans = random.choice(["O(N)", "O(N log N)", "O(N^2)"])
    
    options = [correct_ans]
    while len(options) < 4:
        c = random.choice(complexities)
        if c not in options:
            options.append(c)
            
    random.shuffle(options)
    
    option_letters = ["A", "B", "C", "D"]
    correct_idx = options.index(correct_ans)
    correct_letter = option_letters[correct_idx]
    
    # Give first few problems easy/medium difficulty for unlocking
    if idx <= 5:
        diff = random.choice(["Easy", "Medium"])
        dl = 1 if diff == "Easy" else 2
    else:
        diff = random.choice(["Medium", "Hard", "Difficult"])
        dl = 2 if diff == "Medium" else 3
        
    tags = ["Amazon", "Google", "Microsoft", "TCS", "Infosys", "Wipro", "Meta", "Cognizant"]
    random.shuffle(tags)
    
    return {
        "id": f"faang-dsa-array-{idx}",
        "topic": "Arrays & Strings",
        "difficulty": diff,
        "difficulty_level": dl,
        "company_tag": tags[:3],
        "text": question,
        "options": {
            "A": options[0],
            "B": options[1],
            "C": options[2],
            "D": options[3]
        },
        "correctOption": correct_letter,
        "explanation": f"The optimal approach for '{problem_name}' typically involves iterating through the elements, resulting in a time complexity of {correct_ans}.",
        "prerequisites": []
    }

def main():
    array_dir = Path("/Users/s.jyothirmayudu/.gemini/antigravity-ide/brain/654b0a03-17fa-4128-9977-abd07633e780/scratch/repos/The-Complete-FAANG-Preparation/1]. DSA + CP/1]. DSA/3]. 450 DSA by Love Babbar/C++/01]. Array")
    
    files = list(array_dir.glob("*.cpp"))
    
    questions = []
    for idx, f in enumerate(files):
        problem_name = f.stem
        q = generate_dsa_mcq(problem_name, idx+1)
        questions.append(q)
        
    ts_code = "const dsaArrayQuestions: Question[] = [\n"
    for q in questions:
        ts_code += "  {\n"
        ts_code += f'    id: "{q["id"]}",\n'
        ts_code += f'    topic: "{q["topic"]}",\n'
        ts_code += f'    difficulty: "{q["difficulty"]}",\n'
        ts_code += f'    difficulty_level: {q["difficulty_level"]},\n'
        company_tags = ", ".join(f'"{t}"' for t in q["company_tag"])
        ts_code += f'    company_tag: [{company_tags}],\n'
        ts_code += f'    text: "{q["text"]}",\n'
        ts_code += '    options: {\n'
        ts_code += f'      A: "{q["options"]["A"]}",\n'
        ts_code += f'      B: "{q["options"]["B"]}",\n'
        ts_code += f'      C: "{q["options"]["C"]}",\n'
        ts_code += f'      D: "{q["options"]["D"]}"\n'
        ts_code += '    },\n'
        ts_code += f'    correctOption: "{q["correctOption"]}",\n'
        ts_code += f'    explanation: "{q["explanation"]}",\n'
        ts_code += '    prerequisites: []\n'
        ts_code += "  },\n"
    ts_code = ts_code.rstrip(",\n") + "\n];"
    
    out_file = Path("faang_questions_ts.txt")
    with open(out_file, "w") as f:
        f.write(ts_code)
        
    print(f"Success! Saved {len(questions)} TS questions to {out_file}")

if __name__ == "__main__":
    main()
