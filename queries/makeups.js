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

module.exports = {
    getAllMakeups,
    getOneMakeup
}