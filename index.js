// script.js

// Global items array
let items = [];

// File input change handler
document.getElementById('file').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const text = reader.result;
    items = parseItems(text);
    showTick();
  };
  reader.readAsText(file);
});

// Parse CSV text into items array
function parseItems(text) {
  const seen = new Set();
  const result = [];
  text.split(/\r?\n/).forEach(line => {
    if (!line.includes(',')) return;
    let [name, val] = line.split(',', 2);
    name = name.trim();
    val = parseInt(val.trim(), 10);
    if (isNaN(val)) return;
    const key = `${name}|${val}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push({ name, value: val });
    }
  });
  result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}

// Mode toggle logic
function toggleMode() {
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const limitsBox = document.getElementById('limitsBox');
  const amountInput = document.getElementById('amount');
  const lower = document.getElementById('lower');
  const upper = document.getElementById('upper');

  if (mode === 'with') {
    limitsBox.style.display = 'flex';
    amountInput.disabled = true;
    amountInput.removeAttribute('required');
    lower.disabled = false;
    upper.disabled = false;
    lower.setAttribute('required', 'true');
    upper.setAttribute('required', 'true');
  } else {
    limitsBox.style.display = 'none';
    amountInput.disabled = false;
    amountInput.setAttribute('required', 'true');
    lower.disabled = true;
    upper.disabled = true;
    lower.removeAttribute('required');
    upper.removeAttribute('required');
  }
}

// Hide placeholder when typing amount
function hidePlaceholder() {
  const amountInput = document.getElementById('amount');
  amountInput.placeholder = amountInput.value ? '' : 'Enter Amount';
}

// Show tick when file selected
function showTick() {
  document.getElementById('tick').style.display = 'inline';
}

// Form submission handling
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const amount = parseInt(document.getElementById('amount').value, 10);
  const lower = parseInt(document.getElementById('lower').value, 10);
  const upper = parseInt(document.getElementById('upper').value, 10);

  if (items.length === 0) {
    alert('Please select a valid file first.');
    return;
  }

  let combos = [];
  if (mode === 'without') {
    if (isNaN(amount)) {
      alert('Invalid total amount entered.');
      return;
    }
    combos = findCombosExact(items, amount);
  } else {
    if (isNaN(lower) || isNaN(upper)) {
      alert('Invalid limit values.');
      return;
    }
    combos = findCombosWithin(items, lower, upper);
  }

  downloadResultsCSV(combos);
});

// Find exact combos
function findCombosExact(items, target) {
  const result = [];
  function backtrack(start, path, sum) {
    if (sum === target) {
      result.push(path.slice());
      return;
    }
    for (let i = start; i < items.length; i++) {
      if (sum + items[i].value > target) continue;
      path.push(items[i]);
      backtrack(i + 1, path, sum + items[i].value);
      path.pop();
    }
  }
  backtrack(0, [], 0);
  return result;
}

// Find combos within limits
function findCombosWithin(items, low, high) {
  const result = [];
  function backtrack(idx, combo, sum) {
    if (sum >= low && sum <= high) {
      result.push(combo.slice());
    }
    if (sum > high || idx === items.length) return;
    combo.push(items[idx]);
    backtrack(idx + 1, combo, sum + items[idx].value);
    combo.pop();
    backtrack(idx + 1, combo, sum);
  }
  backtrack(0, [], 0);
  return result;
}

// Download results as CSV file for Excel compatibility
function downloadResultsCSV(combos) {
  const lines = ['Items,Total Price'];
  const seen = new Set();

  combos.forEach(combo => {
    const sorted = combo.slice().sort((a, b) => a.name.localeCompare(b.name));
    const key = sorted.map(i => `${i.name}|${i.value}`).join(',');
    if (seen.has(key)) return;
    seen.add(key);
    const names = sorted.map(i => i.name).join('; ');
    const total = sorted.reduce((sum, i) => sum + i.value, 0);
    lines.push(`${names},${total}`);
  });

  if (lines.length === 1) lines.push('No combinations found.,');

  // Add BOM for Excel to recognize UTF-8
  const csvContent = '\uFEFF' + lines.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'combo_results.csv';
  a.click();
  URL.revokeObjectURL(url);
}
