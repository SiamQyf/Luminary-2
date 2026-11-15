f1 = r'd:\video player\custom-skin\apps\preview\src\frame\usage-guide.tsx'
f2 = r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\usage-guide.tsx'

with open(f1, 'r', encoding='utf-8') as a, open(f2, 'r', encoding='utf-8') as b:
    c1, c2 = a.read(), b.read()

print(f'f1 len: {len(c1)}, f2 len: {len(c2)}, identical: {c1 == c2}')
