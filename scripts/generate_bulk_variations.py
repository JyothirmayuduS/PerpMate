import random
import json
import time

FILE_PATH = "src/data/aptitudeData.ts"

names = ["Rahul", "Amit", "Priya", "Sneha", "Karan", "Vikram", "Rohan", "Neha", "Pooja", "Arjun", "Ravi", "Anjali"]
companies = ["TCS NQT", "Infosys", "Wipro", "Cognizant", "Accenture", "Tech Mahindra", "Capgemini", "IBM", "L&T"]
items = ["cycle", "laptop", "mobile", "watch", "camera", "tablet", "bike", "refrigerator"]

def generate_time_work():
    questions = []
    for i in range(20):
        # A takes x days, B takes y days
        n1 = random.choice(names)
        n2 = random.choice([n for n in names if n != n1])
        x = random.choice([10, 12, 15, 20, 24, 30, 40, 60])
        
        # Pick y such that (x*y)/(x+y) is somewhat clean
        y_choices = [c for c in [10, 12, 15, 20, 24, 30, 40, 60] if c != x]
        y = random.choice(y_choices)
        
        ans = (x * y) / (x + y)
        if ans.is_integer():
            ans_str = f"{int(ans)} days"
        else:
            ans_str = f"{ans:.2f} days"
            
        # Wrong options
        wrong1 = f"{max(x, y) - min(x,y)} days"
        wrong2 = f"{int((x+y)/2)} days"
        wrong3 = f"{x+y} days"
        
        opts = [ans_str, wrong1, wrong2, wrong3]
        random.shuffle(opts)
        
        correct_opt = chr(65 + opts.index(ans_str))
        
        comp = random.sample(companies, 2)
        
        q_str = f"""  {{
    id: "gen-tw-{int(time.time()*1000)}-{i}",
    topic: "Time and Work",
    difficulty: "Medium",
    difficulty_level: 2,
    company_tag: {json.dumps(comp)},
    text: "{n1} can do a piece of work in {x} days and {n2} alone can do it in {y} days. If they work together, in how many days will they complete the work?",
    options: {{ A: "{opts[0]}", B: "{opts[1]}", C: "{opts[2]}", D: "{opts[3]}" }},
    correctOption: "{correct_opt}",
    explanation: "\\\\text{{Combined efficiency: }} \\\\frac{{1}}{{{x}}} + \\\\frac{{1}}{{{y}}} = \\\\frac{{{x+y}}}{{{x*y}}} \\\\ \\\\text{{Time taken = }} \\\\frac{{{x*y}}}{{{x+y}}} \\\\approx {ans_str}.",
    prerequisites: [{{ slug: "lcm-method", title: "LCM Method", summary: "Use LCM to find total work." }}],
    simple_explanation: "Use the formula (A × B) / (A + B). So ({x} × {y}) / ({x} + {y}) = {x*y} / {x+y} = {ans_str}.",
    formulas: ["Time(A+B) = (A × B) / (A + B)"],
    tips: "For 2 people working together, just multiply their days and divide by the sum of their days!"
  }}"""
        questions.append(q_str)
    return questions

def generate_profit_loss():
    questions = []
    for i in range(20):
        item = random.choice(items)
        cp = random.choice([500, 800, 1000, 1200, 1500, 2000, 2500, 4000, 5000])
        loss_pct = random.choice([10, 15, 20, 25])
        
        sp = cp * (1 - (loss_pct/100))
        
        ans_str = f"Rs. {int(sp)}"
        
        wrong1 = f"Rs. {int(cp * (1 + (loss_pct/100)))}"
        wrong2 = f"Rs. {int(cp - (cp * 0.05))}"
        wrong3 = f"Rs. {int(sp - 100)}"
        
        opts = [ans_str, wrong1, wrong2, wrong3]
        random.shuffle(opts)
        
        correct_opt = chr(65 + opts.index(ans_str))
        
        comp = random.sample(companies, 2)
        
        q_str = f"""  {{
    id: "gen-pl-{int(time.time()*1000)}-{i}",
    topic: "Profit and Loss",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: {json.dumps(comp)},
    text: "A man buys a {item} for Rs. {cp} and sells it at a loss of {loss_pct}%. What is the selling price of the {item}?",
    options: {{ A: "{opts[0]}", B: "{opts[1]}", C: "{opts[2]}", D: "{opts[3]}" }},
    correctOption: "{correct_opt}",
    explanation: "\\\\text{{Cost Price (CP)}} = {cp} \\\\ \\\\text{{Loss Percentage}} = {loss_pct}\\\\% \\\\ \\\\text{{Selling Price (SP)}} = CP \\\\times \\\\left(1 - \\\\frac{{\\\\text{{Loss}}\\\\%}}{{100}}\\\\%\\\\right) \\\\ \\\\text{{SP}} = {cp} \\\\times (1 - 0.{loss_pct}) = {int(sp)}",
    prerequisites: [{{ slug: "loss-percent", title: "Loss Percentage", summary: "SP = CP - Loss" }}],
    simple_explanation: "He lost {loss_pct}% of his investment of Rs. {cp}. The loss is {int(cp * (loss_pct/100))} rupees. Subtract that from {cp} to get {int(sp)}.",
    formulas: ["SP = CP × (100 - Loss%)/100"],
    tips: "Always calculate 10% first by dropping a zero! It makes finding other percentages incredibly fast."
  }}"""
        questions.append(q_str)
    return questions

def generate_si():
    questions = []
    for i in range(20):
        p = random.choice([2000, 3000, 4500, 5000, 7500, 10000, 12000])
        r = random.choice([4, 5, 6, 8, 10, 12, 15])
        t = random.choice([2, 3, 4, 5, 6])
        
        si = (p * r * t) / 100
        
        ans_str = f"Rs. {int(si)}"
        wrong1 = f"Rs. {int((p * (r+2) * t)/100)}"
        wrong2 = f"Rs. {int((p * r * (t+1))/100)}"
        wrong3 = f"Rs. {int(si + p)}"
        
        opts = [ans_str, wrong1, wrong2, wrong3]
        random.shuffle(opts)
        
        correct_opt = chr(65 + opts.index(ans_str))
        comp = random.sample(companies, 2)
        
        q_str = f"""  {{
    id: "gen-si-{int(time.time()*1000)}-{i}",
    topic: "Simple and Compound Interest",
    difficulty: "Easy",
    difficulty_level: 1,
    company_tag: {json.dumps(comp)},
    text: "What is the simple interest on Rs. {p} at {r}% per annum for {t} years?",
    options: {{ A: "{opts[0]}", B: "{opts[1]}", C: "{opts[2]}", D: "{opts[3]}" }},
    correctOption: "{correct_opt}",
    explanation: "\\\\text{{Simple Interest (SI)}} = \\\\frac{{P \\\\times R \\\\times T}}{{100}} \\\\ \\\\text{{SI}} = \\\\frac{{{p} \\\\times {r} \\\\times {t}}}{{100}} = {int(si)}",
    prerequisites: [{{ slug: "si-formula", title: "Simple Interest Formula", summary: "SI = (P × R × T) / 100" }}],
    simple_explanation: "{r}% of {p} is {int((p*r)/100)}. That's the interest for one year. For {t} years, that's {int((p*r)/100)} × {t} = {int(si)}.",
    formulas: ["SI = PRT/100"],
    tips: "Always calculate 1 year of interest first, then just multiply by the number of years!"
  }}"""
        questions.append(q_str)
    return questions

def inject_generated_questions():
    with open(FILE_PATH, "r") as f:
        content = f.read()

    generators = {
        "scrapedTimeAndWork": generate_time_work,
        "scrapedProfitAndLoss": generate_profit_loss,
        "scrapedSimpleInterest": generate_si
    }

    modified = False
    total_added = 0

    for array_name, gen_func in generators.items():
        start_idx = content.find(f"const {array_name}: Question[] = [")
        if start_idx == -1:
            print(f"Array {array_name} not found!")
            continue
            
        end_idx = content.find("];", start_idx)
        if end_idx == -1:
            continue
            
        new_qs = gen_func()
        
        if len(new_qs) > 0:
            # Join with comma
            injection = ",\n" + ",\n".join(new_qs)
            # Insert before ];
            content = content[:end_idx] + injection + "\n" + content[end_idx:]
            modified = True
            total_added += len(new_qs)
            print(f"Added {len(new_qs)} to {array_name}")

    if modified:
        with open(FILE_PATH, "w") as f:
            f.write(content)
        print(f"Success! Injected {total_added} generated questions.")

if __name__ == "__main__":
    inject_generated_questions()
