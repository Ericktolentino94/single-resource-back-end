const express = require("express");

const { getAllMakeups, getOneMakeup } = require("../queries/makeups");

const makeups = express.Router();

makeups.get("/", async (req, res) => {
  const allMakeups = await getAllMakeups();
  if (allMakeups[0]) {
    res.status(200).json({ success: true, data: { payload: allMakeups } });
  } else {
    res.status(404).json({ success: false, data: { error: "error" } });
  }
});

makeups.get("/:id", async (req, res) => {
  const { id } = req.params;
  const oneMakeup = await getOneMakeup(id);
  if (oneMakeup) {
    res.json(oneMakeup);
  } else {
    res.status(404).json({ error: "not-found!" });
  }
});

makeups.post("/", checkName, checkBoolean, async (req, res) => {
  try {
    const createMakeup = await createMakeup(req.body);
    res.json(createMakeup);
  } catch (error) {
    res.status(400).json({ error: "Error" });
  }
});

makeups.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMakeup = await deleteMakeup(id);
    if (deletedMakeup) {
      res.status(200).jsom({ success: true, payload: { data: deletedMakeup } });
    } else {
      res.status(404).json("item could not be found");
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = makeups;
