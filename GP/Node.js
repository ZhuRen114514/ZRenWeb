const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const rootDir = __dirname; // 使用你的根目录路径

app.use(express.static(path.join(__dirname, 'public')));

app.get('/list-directory', (req, res) => {
    const dirPath = path.join(rootDir, req.query.path || "");
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return res.status(500).json({ error: '无法读取目录' });
        }
        const fileList = files.map(file => ({
            name: file.name,
            path: path.join(req.query.path || "", file.name),
            isDirectory: file.isDirectory(),
        }));
        res.json(fileList);
    });
});

app.get('/open-file', (req, res) => {
    const filePath = path.join(rootDir, req.query.path);
    res.sendFile(filePath);
});

app.listen(3000, () => {
    console.log('文件浏览器运行在 http://localhost:3000');
});
