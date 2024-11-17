const Vehicle = require('./models/vehicleModel.js');


const getVehicleData = async (req, res) => {
    const { model } = req.params;
    if (!model)
        return res.status(404).json({ error: 'No such model found' });

    try {
        const vehicles = await Vehicle.find({ model });
         res.status(200).json(vehicles);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getVehicleData,
}
