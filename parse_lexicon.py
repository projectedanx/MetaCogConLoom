import json
import re

def parse_lexicon():
    with open('LEXICON.md', 'r') as f:
        content = f.read()

    data = {
        "Lexicon_Name": "DRP-LEXICON-992",
        "Metadata": {
            "Schema": "DRP-LEXICON-992-v1.0",
            "Standard": "2026",
            "Timestamp": "2026-03-31T18:12:00+11:00",
            "Progressive_Disclosure_Level": 2,
            "PDL_Version": "v1.0"
        },
        "Core_Pattern_Definitions": {},
        "PDL_v1_0_Decorator_Registry": [],
        "Pluriversal_Model_Guardrails": [],
        "Emergent_Use_Cases": [],
        "Falsification_Conditions": []
    }

    # Extract Core Patterns
    patterns_section = re.search(r'## SECTION I — CORE PATTERN DEFINITIONS.*?(?=## SECTION II)', content, re.DOTALL)
    if patterns_section:
        pattern_blocks = re.findall(r'### (PAT-\d{3} · [^\n]+)\n(.*?)(?=\n---|\n### |$)', patterns_section.group(0), re.DOTALL)
        for title, body in pattern_blocks:
            pattern_data = {}
            for line in body.strip().split('\n'):
                if '**' in line:
                    parts = line.split('**: ', 1)
                    if len(parts) == 2:
                        key = parts[0].replace('**', '').strip().replace(' ', '_')
                        val = parts[1].strip()
                        pattern_data[key] = val
                    else:
                        parts = line.split(': ', 1)
                        if len(parts) == 2:
                            key = parts[0].replace('**', '').strip().replace(' ', '_')
                            val = parts[1].strip()
                            pattern_data[key] = val
            data["Core_Pattern_Definitions"][title] = pattern_data

    # Extract Decorator Registry
    registry_section = re.search(r'## SECTION II — PDL v1.0 DECORATOR REGISTRY.*?(?=## SECTION III)', content, re.DOTALL)
    if registry_section:
        lines = registry_section.group(0).strip().split('\n')
        # Skip headers and separator
        for line in lines[4:]:
            if line.startswith('|') and len(line.strip()) > 1:
                parts = [p.strip() for p in line.split('|')[1:-1]]
                if len(parts) >= 4:
                    data["PDL_v1_0_Decorator_Registry"].append({
                        "Decorator": parts[0].replace('`', ''),
                        "Layer": parts[1],
                        "Primary_Remediation": parts[2],
                        "Key_Parameter": parts[3].replace('`', '')
                    })

    # Extract Guardrails
    guardrails_section = re.search(r'## SECTION III — PLURIVERSAL MODEL GUARDRAILS.*?(?=## SECTION IV)', content, re.DOTALL)
    if guardrails_section:
        lines = guardrails_section.group(0).strip().split('\n')
        # Skip headers and separator
        for line in lines[4:]:
            if line.startswith('|') and len(line.strip()) > 1:
                parts = [p.strip() for p in line.split('|')[1:-1]]
                if len(parts) >= 3:
                    data["Pluriversal_Model_Guardrails"].append({
                        "Model": parts[0],
                        "Pathology": parts[1],
                        "PDL_Mitigation": parts[2].replace('`', '')
                    })

    # Extract Emergent Use Cases
    use_cases_section = re.search(r'## SECTION IV — EMERGENT USE CASES.*?(?=## SECTION V)', content, re.DOTALL)
    if use_cases_section:
         lines = use_cases_section.group(0).strip().split('\n')
         for line in lines:
             if line.startswith(tuple(str(i)+'.' for i in range(1,10))):
                 # Extract standard use case format
                 parts = line.split('**: ', 1)
                 if len(parts) == 2:
                     name = parts[0].split('. **')[1] if '. **' in parts[0] else parts[0].split('. ')[1]
                     desc = parts[1]
                     data["Emergent_Use_Cases"].append({
                         "Name": name,
                         "Description": desc
                     })

    # Extract Falsification Conditions
    falsification_section = re.search(r'## SECTION V — FALSIFICATION CONDITIONS(.*?)$', content, re.DOTALL)
    if falsification_section:
        lines = falsification_section.group(1).strip().split('\n')
        for line in lines:
            if line.startswith('- '):
                data["Falsification_Conditions"].append(line[2:].strip())

    with open('lexicon_data.json', 'w') as f:
        json.dump(data, f, indent=2)

if __name__ == '__main__':
    parse_lexicon()
