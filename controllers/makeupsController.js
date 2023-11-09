const express = require("express");
const { getAllMakeups, getOneMakeup, createMakeup, deleteMakeup, updateMakeup } = require("../queries/makeups");


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

makeups.post("/", async (req, res) => {
    try {
        const createdMakeup = await createMakeup(req.body)
        res.json(createdMakeup)
    } catch (err) {
        return err
    }
});

makeups.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMakeup = await deleteMakeup(id);
        if(deletedMakeup) {
            res.status(200).json({success: true, payload: {data: deletedMakeup}})
        } else {
            res.status(404).json("Makeup with that id not found")
        }
        
    } catch (err) {
        return err
    }
})

makeups.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedMakeup = await updateMakeup(id, req.body);
  if (updatedMakeup.id) {
    res.status(200).json(updateMakeup);
  } else res.status(404).json("No makeup found matching that id");
});

module.exports = makeups;
