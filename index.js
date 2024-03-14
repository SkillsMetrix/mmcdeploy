const express = require("express");
require('dotenv').config()
const rateLimit= require('express-rate-limit')
const cors = require("cors");


const app = express();
app.use(express.static('public'))
const limiter= rateLimit({
  windowMs: 10*60*1000, //10 mins
  max:5
})

app.use(cors());
app.use(limiter)
app.set('trust proxy',1)

app.use("/api", require("./routes"));

app.listen(4000, () => {
  console.log("server is ready");
});
