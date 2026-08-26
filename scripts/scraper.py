import os
import re
import json
import random
from pathlib import Path

def extract_questions_from_md(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Regex to match the Question, Solution, Answer blocks
    pattern = re.compile(
        r"\*\*Question\*\*:\s*(.*?)\s*\*\*Solution\*\*:\s*(.*?)\s*\*\*Answer\*\*:\s*(.*?)(?=\d+\.\s*\*\*Question|$)",
        re.DOTALL
    )
    
    matches = pattern.findall(content)
    parsed = []
    for q, s, a in matches:
        parsed.append({
            "question": q.strip(),
            "solution": s.strip(),
            "answer": a.strip()
        })
    return parsed

def generate_distractors(answer_str):
    """Naively generate distractors for numeric answers to bypass the broken API key."""
    # Try to extract the main number from the answer
    num_match = re.search(r'\d+(\.\d+)?', answer_str)
    
    if not num_match:
        # Fallback for non-numeric answers
        return [answer_str + " (Approx)", "None of the above", "Cannot be determined"]
        
    num_str = num_match.group()
    is_float = '.' in num_str
    num_val = float(num_str) if is_float else int(num_str)
    
    # Generate variations
    if num_val == 0:
        variants = [1, 2, 5]
    else:
        variants = [
            num_val * 0.8,
            num_val * 1.2,
            num_val + (10 if num_val > 10 else 2),
            num_val - (10 if num_val > 10 else 2),
            num_val * 2
        ]
    
    distractors = []
    for v in variants:
        if len(distractors) >= 3:
            break
        v = round(v, 2) if is_float else int(v)
        if v != num_val and v > 0:
            # Reconstruct the string with the new number
            distractors.append(answer_str.replace(num_str, str(v)))
            
    # Pad if we couldn't generate 3
    while len(distractors) < 3:
        distractors.append("None of the above")
        
    return distractors

def main():
    repo_path = Path("/Users/s.jyothirmayudu/.gemini/antigravity-ide/brain/654b0a03-17fa-4128-9977-abd07633e780/scratch/repos/CSE-Aptitude-Test-Practice-Hub/01 Quantitative Aptitude (Numerical Ability)/01 Basic/README.md")
    
    print(f"Parsing {repo_path}...")
    questions = extract_questions_from_md(repo_path)
    print(f"Extracted {len(questions)} questions.")

    if not questions:
        print("No questions found. Check regex.")
        return

    # Process first 10 questions
    test_batch = questions[:10]
    
    final_questions = []
    for idx, q in enumerate(test_batch):
        distractors = generate_distractors(q["answer"])
        
        # Combine correct answer with distractors and shuffle
        options = distractors + [q["answer"]]
        random.shuffle(options)
        correct_idx = options.index(q["answer"])
        
        final_questions.append({
            "id": f"scraped-quant-basic-{idx+1}",
            "topic": "Percentages",
            "difficulty": "Easy",
            "question": q["question"],
            "options": options,
            "correct_option": correct_idx,
            "explanation": q["solution"],
            "source": "scraped-github"
        })
        
    out_file = Path("scraped_questions.json")
    with open(out_file, "w") as f:
        json.dump(final_questions, f, indent=2)
        
    print(f"Success! Saved to {out_file}")

if __name__ == "__main__":
    main()
