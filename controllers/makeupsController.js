const express = require("express");

const { getAllMakeups, getOneMakeup } = require("../queries/makeups");

const makeups = express.Router();

makeups.get("/", async (req,res) => {
    const allMakeups = await getAllMakeups();
    if(allMakeups[0]){
        res.status(200).json({success: true, data: {payload: allMakeups}});
    } else {
        res.status(404).json({success:false, data: {error:"error"}})
    }
});

makeups.get("/:id", async (req, res) => {
    const { id } = req.params
    const oneMakeup = await getOneMakeup(id)
    if(oneMakeup){
        res.json(oneMakeup)
    } else {
        res.status(404).json({error:"not-found!"})
    }
})

module.exports = makeups;