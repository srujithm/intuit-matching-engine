import express from "express";
import bodyParser from "body-parser";
import mailRoute from "./routes/mailRoute";
var cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({"limit": "20mb", extended: true}));
app.use(bodyParser.json({"limit": "20mb"}));

app.use("/sendmail", mailRoute);

const NODE_PORT = process.env.NODE_PORT || 8030;
app.listen(NODE_PORT, () => {
  console.log("INTUIT-MATEN-API server is up and running");
  console.log("Max body size accepted: 20 MB!!!");
});