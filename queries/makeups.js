const db = require("../db/dbConfig.js");

const getAllMakeups = async () => {
    try {
        const allMakeups = await db.any("SELECT * FROM makeups");
        return allMakeups;
    } catch(err) {
        return err
    }
};

const getOneMakeup = async (id) => {
    try {
        const oneMakeup = await db.one("SELECT * FROM makeups WHERE id=$1", id)
        return oneMakeup
    } catch(err) {
        return err
    }
}

const createMakeup = async (makeup) => {
    try {
        const createdMakeup = await db.one("INSERT INTO makeups (name, image, link, category, cost) VALUES ($1, $2, $3, $4, $5) RETURNING *", [makeup.name, makeup.image, makeup.link, makeup.category, makeup.cost])
        return createdMakeup
    } catch (err){
        return err
    }
}

const deleteMakeup = async (id) => {
    try {
        const deletedMakeup = await db.one("DELETE from makeups where id= $1 RETURNING *", id)
        return deletedMakeup
    } catch (err) {
        return err
    }
};

const updateMakeup = async (id, makeup) => {
    try {
    const {name, image, link, category, cost } = makeup;
    const updatedMakeup = await db.one("UPDATE makeups SET name=$1, image=$2,link=$3, category=$4, cost=$5 WHERE id=$6 RETURNING *",
    [name, image, link, category, cost, id]
    );
    return updatedMakeup
    } catch (err) {
        return err
    }
};

module.exports = {
    getAllMakeups,
    getOneMakeup, 
    createMakeup,
    deleteMakeup,
    updateMakeup
}