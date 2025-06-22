// const fs = require('fs');

// fs.readFile('file1.txt', 'utf8', (err, data1) => {
//   if (err) return console.error('Error reading file1:', err);
//   fs.readFile('file2.txt', 'utf8', (err, data2) => {
//     if (err) return console.error('Error reading file2:', err);
//     console.log('Combined Content:', data1 + data2);
//   });
// });



const fs = require('fs').promises;

async function readFiles() {
  try {
    const data1 = await fs.readFile('file1.txt', 'utf8');
    const data2 = await fs.readFile('file2.txt', 'utf8');
    console.log('Combined Content:', data1 + data2);
  } catch (err) {
    console.error('Error reading files:', err);
  }
}

readFiles();
