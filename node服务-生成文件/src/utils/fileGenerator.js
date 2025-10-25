const fs = require('fs');
const path = require('path');

function generateFiles(folderName,fileName) {
  const folderPath = path.join(__dirname, '../', folderName);

  // 定义文件内容
  const files = [
    { name: `${fileName.html}`, content: '<!DOCTYPE html>\n<html>\n<head>\n<title>HTML File</title>\n</head>\n<body>\n<h1>Hello, World!</h1>\n</body>\n</html>' },
    { name: `${fileName.scss}`, content: 'body {\n  background-color: #f0f0f0;\n  color: #333;\n}' },
    { name: `${fileName.ts}`, content: 'console.log("Hello, TypeScript!");' }
  ];

  // 创建文件
  files.forEach(file => {
    const filePath = path.join(folderPath, file.name);
    fs.writeFile(filePath, file.content, (err) => {
      if (err) {
        console.error(`Failed to create ${file.name}:`, err);
      } else {
        console.log(`${file.name} created successfully!`);
      }
    });
  });
}

module.exports = { generateFiles };