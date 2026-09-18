const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = {
  '#2d5a27': '#755928',
  '#3f7a39': '#967436',
  '#61a85c': '#b89047',
  '#a2c5a0': '#d6b778',
  '#dcebe1': '#f2e6cf',
  '#52b788': '#b89047',
  '#1b4332': '#4a3717',
  '#1a5c4a': '#5c451e',
  '#fae9cb': '#ffffff',
  '#f3f3f3': '#faf8f5',
  '#87937a': '#967436',
  'bg-emerald-50': 'bg-[#f2e6cf]',
  'text-emerald-600': 'text-[#967436]',
};

for (const [oldColor, newColor] of Object.entries(replacements)) {
  const regex = new RegExp(oldColor, 'gi');
  content = content.replace(regex, newColor);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Colors updated successfully.');
