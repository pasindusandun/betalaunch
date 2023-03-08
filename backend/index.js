//  import express from "express";

//  const app = express();

//  app.use()
//  app.listen(5000);
const PORT = process.env.PORT || 5000;
const app = require('./app');

app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
});