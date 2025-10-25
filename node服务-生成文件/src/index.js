const fs = require('fs');
const path = require('path');
const { generateFiles } = require('./utils/fileGenerator');
const config = require('../config/default.json');

const folderName = config.folderName;

// 创建文件夹
fs.mkdir(path.join(__dirname, folderName), { recursive: true }, (err) => {
  if (err) throw err;
  console.log('Directory created successfully!');
  const fineName = {
    html : 'index.html',
    scss : 'index.scss',
    ts : 'index.ts',
  }
  generateFiles(folderName,fineName);
});