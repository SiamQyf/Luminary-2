const http = require('http');

function testTheme(theme) {
  return new Promise((resolve) => {
    http.get(`http://localhost:5173/preview.html?theme=${theme}`, (res) => {
      resolve({ theme, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ theme, error: err.message });
    });
  });
}

async function run() {
  const themes = ['tourbillon-skeleton', 'chronograph-racing', 'quantum-computing', 'prism-rainbow', 'bamboo-grove'];
  for (const t of themes) {
    const res = await testTheme(t);
    console.log(`Theme ${t.padEnd(25)} -> Status:`, res.status || res.error);
  }
}

run();
