const TempCode = require('../Model/tempcode');
const crypto = require('crypto');

exports.temcodegen = (req, res) => {
    const uniqueId = crypto.randomUUID().substr(0, 6);
    console.log('Generated UUID:', uniqueId);
    const userid= req.body.user_id
    const tempCode = new TempCode({ uniqueId: uniqueId ,user_id:userid});

    tempCode.save()
        .then(savedTempCode => {
            console.log("Added successfully:", savedTempCode);
            return res.status(201).json({ msg: 'Added successfully', tempCode: savedTempCode });
        })
        .catch(error => {
            console.error('Error saving temp code:', error);
            return res.status(500).json({ error: 'Internal server error' });
        });
};
