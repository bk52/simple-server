const mongoose = require("mongoose");
const { Schema } = mongoose;

const deviceSchema = new Schema(
    {
        deviceName:String,
        deviceId:String,
        active: { type: Boolean, default: true },
        ip:String,
        deviceType:Number,
        lastActive:Date,
        lastData:String,
        isDeleted:{ type: Boolean, default: false },
        //lastData:mongoose.Mixed
    },
    {
        timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
    }
)

deviceSchema.statics.setDevice = function (device) {
    if (device._id && device._id !== "") {
        this.findById(device._id, (err, res) => {
            if (err) return Promise.reject({ message: "Device Not Found" });
            else {
                res.set(device);
                res.save((saveErr, queryRes) => {
                    if (saveErr) { return Promise.reject({ message: "Device Update Fail" }) }
                    else { return Promise.resolve(queryRes) }
                })
            }
        })
    }
    else {
        let newDevice = new ProjectModel(device);
        newDevice.save((saveErr, queryRes) => {
            if (saveErr) { return Promise.reject({ message: "Device Save Fail" }) }
            else { return Promise.resolve(queryRes) }
        });
    }
}

projectSchema.statics.deleteDevice=function (_id) {
    if(_id && _id!==""){
        return this.findOneAndUpdate(
            { _id: _id },
            { isDeleted: true },
            { fields: { _id: 1 }, new: true }
          ).lean();
    }
    else{
        Promise.reject({message:"id not found"});
    }
}

projectSchema.statics.getDevices=function(){
    return this.aggregate([
        { $match:{isDeleted:false} }
    ])
}

const DeviceModel = mongoose.model("devices", deviceSchema);
module.exports = DeviceModel;