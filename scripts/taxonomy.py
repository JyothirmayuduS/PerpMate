"""
Taxonomy definition for PrepMate's aptitude question generator.

Each entry: category -> { topic -> [difficulties] }
Edit this file to add/remove topics without touching generator.py.
"""

TAXONOMY = {
    "Quantitative Aptitude": {
        "Number System": ["Easy", "Medium", "Hard"],
        "Percentages": ["Easy", "Medium", "Hard"],
        "Profit & Loss": ["Easy", "Medium", "Hard"],
        "Ratio & Proportion": ["Easy", "Medium", "Hard"],
        "Time & Work": ["Easy", "Medium", "Hard"],
        "Time, Speed & Distance": ["Easy", "Medium", "Hard"],
        "Simple & Compound Interest": ["Easy", "Medium", "Hard"],
        "Averages": ["Easy", "Medium", "Hard"],
        "Mixtures & Alligations": ["Medium", "Hard"],
        "Permutations & Combinations": ["Medium", "Hard"],
        "Probability": ["Medium", "Hard"],
        "Algebra": ["Easy", "Medium", "Hard"],
        "Geometry & Mensuration": ["Easy", "Medium", "Hard"],
        "Data Sufficiency (Quant)": ["Medium", "Hard"],
    },
    "Logical Reasoning": {
        "Number/Letter Series": ["Easy", "Medium", "Hard"],
        "Coding-Decoding": ["Easy", "Medium"],
        "Blood Relations": ["Easy", "Medium", "Hard"],
        "Direction Sense": ["Easy", "Medium"],
        "Syllogisms": ["Medium", "Hard"],
        "Seating Arrangement": ["Medium", "Hard"],
        "Puzzles (Grid/Logic)": ["Medium", "Hard"],
        "Clocks": ["Easy", "Medium"],
        "Calendars": ["Easy", "Medium"],
        "Statement & Conclusion": ["Medium", "Hard"],
        "Venn Diagrams": ["Medium", "Hard"],
    },
    "Verbal Ability": {
        "Reading Comprehension": ["Medium", "Hard"],
        "Synonyms/Antonyms": ["Easy", "Medium"],
        "Sentence Correction": ["Easy", "Medium", "Hard"],
        "Fill in the Blanks": ["Easy", "Medium"],
        "Para Jumbles": ["Medium", "Hard"],
        "Error Spotting": ["Medium", "Hard"],
        "One-word Substitution": ["Easy", "Medium"],
        "Cloze Test": ["Medium", "Hard"],
    },
    "Data Interpretation": {
        "Tables": ["Medium", "Hard"],
        "Bar Graphs": ["Medium", "Hard"],
        "Line Graphs": ["Medium", "Hard"],
        "Pie Charts": ["Medium", "Hard"],
        "Caselets": ["Hard"],
    },
    "Technical (CS Fundamentals)": {
        "OOPs": ["Easy", "Medium", "Hard"],
        "DBMS": ["Easy", "Medium", "Hard"],
        "Operating Systems": ["Easy", "Medium", "Hard"],
        "Computer Networks": ["Easy", "Medium", "Hard"],
        "Data Structures": ["Easy", "Medium", "Hard"],
        "Output Prediction (Code)": ["Medium", "Hard"],
    },
}

# Used only to tag generated questions with which companies' patterns
# emphasize that topic -- NOT used to copy any company's actual questions.
COMPANY_EMPHASIS = {
    "Time, Speed & Distance": ["TCS", "Infosys"],
    "Probability": ["TCS", "Cognizant"],
    "Permutations & Combinations": ["TCS", "Accenture"],
    "Puzzles (Grid/Logic)": ["Infosys", "Capgemini"],
    "Reading Comprehension": ["Infosys", "Wipro"],
    "OOPs": ["Cognizant", "Accenture"],
    "DBMS": ["Cognizant"],
    "Output Prediction (Code)": ["Accenture", "Cognizant"],
}
