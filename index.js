const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(require("./routes/lessonRoutes"));
app.use(require("./routes/userRoutes"));

const port = process.env.PORT || 4040
app.listen(port, () => {
  console.log('app is listening on:', port)
})