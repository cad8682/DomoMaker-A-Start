//const models = require('../models'); //DomoMakerB
//const Domo = models.Domo; //DomoMakerB

//ADD AN ASYNC DomoMaker B
const makerPage = (req, res) => {
    //REMOVE COME DomoMakerB
    res.render('app');
    /*
    try {
        const query = {owner: req.session.account._id};
        const docs = await Domo.find(query).select('name age').lean().exec();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving domos!' });
    }*/
};

/* //DomoMakerB
const makeDomo = async (req, res) => {
    if (!req.body.name || !req.body.age) {
        return res.status(400).json({ error: 'Both name and age are required!' });
    }

    const domoData = {
        name: req.body.name,
        age: req.body.age,
        owner: req.session.account._id,
    };

    try {
        const newDomo = new Domo(domoData);
        await newDomo.save();
        return res.json({ redirect: '/maker' });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Domo already exists!' });
        }
        return res.status(500).json({ error: 'An error occured making domo! '});
    }
} */

module.exports = {
    makerPage,
    //makeDomo, //DomoMakerB
}