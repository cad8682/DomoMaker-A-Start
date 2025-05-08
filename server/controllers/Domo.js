const models = require('../models'); //DomoMakerB
const Domo = models.Domo; //DomoMakerB

const makerPage = async (req, res) => {
    return res.render('app');
};

const makeDomo = async (req, res) => {
    if (!req.body.name || !req.body.age) {
        return res.status(400).json({ error: 'Both name and age are required!' });
    }

    const domoData = {
        name: req.body.name,
        age: req.body.age,
        outfit: 'domoface',
        availableCostume: 'duckyDomo',
        owner: req.session.account._id,
    };

    try {
        const newDomo = new Domo(domoData);
        await newDomo.save();
        return res.status(201).json({name: newDomo.name, age: newDomo.age, outfit: newDomo.outfit, availableCostume: newDomo.availableCostume});
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Domo already exists!' });
        }
        return res.status(500).json({ error: 'An error occured making domo! '});
    }
}

const getDomos = async (req, res) => {
    try {
        const query = {owner: req.session.account._id};
        const docs = await Domo.find(query).select('name age outfit availableCostume').lean().exec();

        return res.json({domos: docs});
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Error retrieving domos!'});
    }
};

//From Project 2
const encostumeDomo = async (req, res) => {
    try {
        const domo = await Domo.findOne({
            _id: req.params.id,
            owner: req.session.account._id,
        });
    
        domo.outfit = domo.availableCostume;
        domo.availableCostume = null;
    
        await domo.save();
    
        return res.json(domo);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'An error occurred encostuming your Domo!' });
    }
};

module.exports = {
    makerPage,
    makeDomo,
    getDomos,
    encostumeDomo,
}