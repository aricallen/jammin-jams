const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { apiRouter } = require('./api-router');

const staticDirPath = path.resolve(__dirname, '..', 'dist');

const app = express();
const staticServer = express.static(staticDirPath);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);
app.use('/', staticServer);

app.get('*', (req, res) => {
  res.sendFile(path.join(staticDirPath, 'index.html'));
});

const port = process.env.PORT || 5000;
console.log(`listening on ${port}`);
app.listen(port);