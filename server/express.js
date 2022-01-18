import express from "express";
import renderResult from "./renderResult";
var bodyParser = require("body-parser");
require("dotenv").config();

let PORT = process.env.ALTRP_SETTING_SSR_PORT || 9000;

const app = express();
app.use(bodyParser.json({limit: "500mb", extended: true}));
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true
  })
);

app.use(express.static("public"));
app.get("/*", (req, res) => {
  return res.json({success: true});

});
app.post("/", (req, res) => {
  return res.json(renderResult(
    {
      json: JSON.parse(req.body.json),
      protocol: req.protocol,
      host: req.get('host'),
      originalUrl: req.originalUrl,
    }
  ));
});


app.use(express.static("../server-build"));

app.listen(PORT, () => {
  console.log(`Express server started at http://localhost:${PORT}`);
});
