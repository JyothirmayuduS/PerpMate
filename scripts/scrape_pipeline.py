import requests
from bs4 import BeautifulSoup
import json
import time
import os

API_KEY = "887d552546073ba4d5be54ef4a676ac9"

def get_proxy_url(url):
    return f"http://api.scraperapi.com?api_key={API_KEY}&url={url}"

def scrape_indiabix_page(url, topic, company):
    print(f"Scraping {url}...")
    try:
        response = requests.get(get_proxy_url(url), timeout=30)
        if response.status_code != 200:
            print(f"Failed to fetch {url}. Status: {response.status_code}")
            return []
            
        soup = BeautifulSoup(response.text, 'html.parser')
        questions = []
        
        # IndiaBix specific selectors
        question_blocks = soup.select('.bix-div-container')
        
        for idx, block in enumerate(question_blocks):
            q_text_elem = block.select_one('.bix-td-qtxt')
            if not q_text_elem:
                continue
            q_text = q_text_elem.get_text(strip=True)
            
            options = {}
            opt_elems = block.select('.bix-td-option-val')
            if len(opt_elems) >= 4:
                options['A'] = opt_elems[0].get_text(strip=True)
                options['B'] = opt_elems[1].get_text(strip=True)
                options['C'] = opt_elems[2].get_text(strip=True)
                options['D'] = opt_elems[3].get_text(strip=True)
            else:
                continue
                
            ans_elem = block.select_one('.jq-hdnakq')
            correct_option = ans_elem.get('value', '') if ans_elem else ''
            
            exp_elem = block.select_one('.bix-ans-description')
            explanation = exp_elem.get_text(strip=True) if exp_elem else "Explanation not available."
            
            questions.append({
                "id": f"scraped-{company}-{topic}-{int(time.time())}-{idx}",
                "topic": topic,
                "difficulty": "Medium",
                "difficulty_level": 2,
                "company_tag": [company, "RS Aggarwal"],
                "text": q_text,
                "options": options,
                "correctOption": correct_option,
                "explanation": explanation,
                "prerequisites": [{"slug": "general", "title": "General", "summary": "Basic concepts"}],
                "simple_explanation": explanation[:100] + "...",
                "formulas": [],
                "tips": "Practice regularly!"
            })
            
        return questions
        
    except Exception as e:
        print(f"Error scraping {url}: {str(e)}")
        return []

def main():
    targets = [
        {"url": "https://www.indiabix.com/aptitude/time-and-work/", "topic": "Time and Work", "company": "TCS"},
        {"url": "https://www.indiabix.com/aptitude/profit-and-loss/", "topic": "Profit and Loss", "company": "Infosys"},
        {"url": "https://www.indiabix.com/aptitude/percentage/", "topic": "Percentages", "company": "Wipro"}
    ]
    
    all_questions = []
    
    for target in targets:
        qs = scrape_indiabix_page(target["url"], target["topic"], target["company"])
        all_questions.extend(qs)
        print(f"Got {len(qs)} questions for {target['topic']}")
        
    # Ensure dir exists
    os.makedirs("src/data", exist_ok=True)
    
    # Save to JSON
    with open("src/data/scraped_company_questions.json", "w") as f:
        json.dump(all_questions, f, indent=2)
        
    print(f"Successfully saved {len(all_questions)} questions to src/data/scraped_company_questions.json")

if __name__ == "__main__":
    main()
