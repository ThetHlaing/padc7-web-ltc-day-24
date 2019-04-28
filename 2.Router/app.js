const express = require('express');
const app = express();

const articleRouter = require('./routers/article');

app.use("/article",articleRouter);

app.listen(3001);