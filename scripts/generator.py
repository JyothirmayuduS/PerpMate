"""
PrepMate Aptitude Question Generator
=====================================

Generates ORIGINAL aptitude questions (not scraped/copied from any site)
covering every category/topic/difficulty in taxonomy.py, using the Gemini API.

Setup:
    pip install requests
    export GEMINI_API_KEY="your_api_key_here"

Usage:
    python generator.py --per-topic 5 --out questions.json
    python generator.py --category "Quantitative Aptitude" --per-topic 10
    python generator.py --resume questions.json --per-topic 5   # top up an existing bank

Output format: a single JSON file, a flat list of question objects matching
the schema PrepMate expects.
"""

import argparse
import hashlib
import json
import os
import sys
import time
import requests
from pathlib import Path

from taxonomy import TAXONOMY, COMPANY_EMPHASIS

MODEL = "gemini-1.5-flash"
MAX_RETRIES = 3
RETRY_BACKOFF_SECONDS = 5
REQUEST_PAUSE_SECONDS = 1  # be polite to the API between calls

def build_prompt(category: str, topic: str, difficulty: str, count: int) -> str:
    return f"""Generate {count} ORIGINAL multiple-choice aptitude questions for a campus
placement prep app. Do not reproduce or closely paraphrase any question you
may recall from IndiaBix, PrepInsta, GeeksforGeeks, or any other site --
write genuinely new questions in the style and difficulty of real campus
placement tests (TCS, Infosys, Wipro, Accenture, Capgemini, Cognizant).

Category: {category}
Topic: {topic}
Difficulty: {difficulty}

Each question needs exactly 4 options with exactly one correct answer, and a
short explanation of the solution method (not just the final answer).

Respond with ONLY a JSON array, no markdown fences, no preamble, no
commentary. Each array element must have this exact shape:

{{
  "question": "<question text>",
  "options": ["<option A>", "<option B>", "<option C>", "<option D>"],
  "correct_option": <0-3 index into options>,
  "explanation": "<brief solution method>"
}}

Return exactly {count} elements."""


def call_model(api_key: str, prompt: str):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={api_key}"
    headers = {"Content-Type": "application/json"}
    data = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseMimeType": "application/json",
        }
    }
    
    last_err = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            response = requests.post(url, headers=headers, json=data)
            response.raise_for_status()
            
            result = response.json()
            text = result["candidates"][0]["content"]["parts"][0]["text"].strip()
            return json.loads(text)
        except Exception as e:
            last_err = e
            print(f"  attempt {attempt} failed ({e}); retrying...", file=sys.stderr)
            time.sleep(RETRY_BACKOFF_SECONDS * attempt)
    raise RuntimeError(f"Failed after {MAX_RETRIES} attempts: {last_err}")


def question_hash(q: dict) -> str:
    """Used to skip near-duplicate questions across runs."""
    return hashlib.sha256(q["question"].strip().lower().encode()).hexdigest()


def make_id(category: str, topic: str, index: int) -> str:
    slug = lambda s: (
        s.lower()
        .replace(",", "")
        .replace(" ", "-")
        .replace("/", "-")
        .replace("&", "and")
        .replace("(", "")
        .replace(")", "")
    )
    return f"{slug(category)}--{slug(topic)}--{index:04d}"


def load_existing(path: Path):
    if not path.exists():
        return [], set()
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    seen = {question_hash(q) for q in data}
    return data, seen


def save(path: Path, data: list):
    tmp = path.with_suffix(".tmp")
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    tmp.replace(path)  # atomic-ish write so a crash mid-run can't corrupt the file


def main():
    parser = argparse.ArgumentParser(description="Generate original aptitude questions for PrepMate")
    parser.add_argument("--per-topic", type=int, default=5, help="Questions to generate per (topic, difficulty) pair")
    parser.add_argument("--category", type=str, default=None, help="Limit to one category (default: all)")
    parser.add_argument("--out", type=str, default="questions.json", help="Output JSON file")
    args = parser.parse_args()

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Set GEMINI_API_KEY in your environment first.", file=sys.stderr)
        sys.exit(1)

    out_path = Path(args.out)
    bank, seen_hashes = load_existing(out_path)
    print(f"Starting with {len(bank)} existing questions in {out_path}")

    categories = (
        {args.category: TAXONOMY[args.category]}
        if args.category
        else TAXONOMY
    )
    if args.category and args.category not in TAXONOMY:
        print(f"Unknown category '{args.category}'. Options: {list(TAXONOMY)}", file=sys.stderr)
        sys.exit(1)

    counter_per_topic = {}

    for category, topics in categories.items():
        for topic, difficulties in topics.items():
            for difficulty in difficulties:
                print(f"Generating {args.per_topic}x [{category} / {topic} / {difficulty}]...")
                prompt = build_prompt(category, topic, difficulty, args.per_topic)
                try:
                    generated = call_model(api_key, prompt)
                except RuntimeError as e:
                    print(f"  SKIPPED (giving up): {e}", file=sys.stderr)
                    continue

                key = (category, topic)
                counter_per_topic.setdefault(key, 0)

                added = 0
                for raw in generated:
                    if not all(k in raw for k in ("question", "options", "correct_option", "explanation")):
                        continue
                    h = question_hash(raw)
                    if h in seen_hashes:
                        continue  # duplicate/near-duplicate, skip
                    seen_hashes.add(h)
                    counter_per_topic[key] += 1
                    bank.append({
                        "id": make_id(category, topic, counter_per_topic[key]),
                        "category": category,
                        "topic": topic,
                        "difficulty": difficulty,
                        "question": raw["question"],
                        "options": raw["options"],
                        "correct_option": raw["correct_option"],
                        "explanation": raw["explanation"],
                        "company_tags": COMPANY_EMPHASIS.get(topic, []),
                        "source": "original",
                    })
                    added += 1

                print(f"  +{added} new (total bank: {len(bank)})")
                save(out_path, bank)  # save after every topic, not just at the end
                time.sleep(REQUEST_PAUSE_SECONDS)

    print(f"\nDone. {len(bank)} total questions saved to {out_path}")


if __name__ == "__main__":
    main()
