with open(r'C:\Users\Siam\.gemini\antigravity\brain\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\.system_generated\logs\transcript.jsonl', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if 'coco-max' in line or 'netlify' in line.lower():
            import json
            try:
                obj = json.loads(line)
                content = str(obj.get('content', ''))
                if 'coco-max' in content or 'netlify.app' in content:
                    print(content[:300])
                    print('---')
            except:
                pass
