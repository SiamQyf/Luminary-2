with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('scholarly-press')
while idx != -1:
    line_start = text.rfind('\n', 0, idx)
    rule_end = text.find('}', idx)
    print(text[line_start:rule_end+1].strip())
    print('---')
    idx = text.find('scholarly-press', rule_end + 1 if rule_end != -1 else idx + 1)
