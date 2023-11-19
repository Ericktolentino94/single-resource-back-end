const express = require("express");
const cors = require("cors");
const app = express();
const makeupsController = require("./controllers/makeupsController");



app.use(cors());
app.use(express.json());

app.use("/makeups", makeupsController);

app.get("*", (req, res) => {
    res.status(404).json({success: false, data: {error: "page not found"}});
})

module.exports = app;