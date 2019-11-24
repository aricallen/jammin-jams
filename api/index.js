const express = require('express');
const path = require('path');

const staticDirPath = path.join(__dirname, 'dist');

const app = express();
app.use(express.static(staticDirPath));
const port = process.env.PORT || 5000;
console.log(`listening on ${port}`);
app.listen(port);

app.get('*', (req, res) => {
  res.sendFile(path.join(staticDirPath, 'index.html'));
});
