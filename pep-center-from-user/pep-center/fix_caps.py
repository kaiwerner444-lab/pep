import sys

with open('src/pages/Home.jsx', 'r') as f:
    lines = f.readlines()

# Replace lines 145-147 (index 144-146)
lines[144] = '                <span className="text-white block">RESEARCH</span>\n'
lines[145] = '                <span className="text-[#f97316] block">GRADE</span>{\' \'}\n'  
lines[146] = '                <span className="text-[#fb923c] block">PEPTIDES</span>\n'

with open('src/pages/Home.jsx', 'w') as f:
    f.writelines(lines)

print('Fixed!')
