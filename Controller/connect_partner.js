const TempCode = require('../Model/tempcode');
const Connect = require('../Model/connectpartner');

exports.connectUserAndPartner = async (req, res) => {
    try {
        // Extract the generated code from the request body
        const code  = req.body.uniqueId;
        // Query the database to find the corresponding record with the generated code
        const tempCode = await TempCode.findOne({ uniqueId: code });

        if (!tempCode) {
            return res.status(404).json({ error: 'Invalid code' });
        }

        // Suppose the user ID and partner ID are also provided in the request body
        const userid = tempCode.user_id
        const  partnerid = req.body.userId;
        //here we need to save userid and partner id in connect model
        const connect = new Connect({
            userId: userid,
            partnerId: partnerid
        });
        Connect.findOne( { $or: [{ userId: userid }, { partnerId: partnerid }] },) .then(async (data)=>{
            if (data) {
                console.log(data)
                //res.status(200).json(data);
                return res.status(400).json({ 'msg': "Already connected" });               
            }else {
                await connect.save();

        // Optionally, you can delete the tempCode document after it's been used
                await TempCode.findOneAndDelete({ uniqueId: code });

                return res.status(200).json({ message: 'Connection successful' });
            }
        });
        // Save the new instance to the database
        
    } catch (error) {
        console.error('Error connecting user and partner:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getconnectdetails = async (req, res) => {
    try {
        console.log(1)
        // Extract the generated code from the request body
        Connect.findOne( { $or: [{ userId: req.body.userId }, { partnerId: req.body.userId }] },) .then((data)=>{
            if (data) {
                console.log(data)
                return res.status(200).json(data);
               
            }else {
                return res.status(400).json({ 'msg': "internalserver" });
            }
        });
    } catch (error) {
        console.error('Error connecting user and partner:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

