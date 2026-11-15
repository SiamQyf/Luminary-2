import re, glob

logs = [
    r'C:\Users\Siam\.gemini\antigravity\brain\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\.system_generated\logs\transcript.jsonl'
]

pattern = re.compile(r'https?://[^\s"\'<>]+\.(?:netlify\.app|vercel\.app|pages\.dev|github\.io)[^\s"\'<>]*', re.IGNORECASE)

urls = set()
for log in logs:
    with open(log, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            for m in pattern.findall(line):
                urls.add(m)

print("Found URLs:", urls)
