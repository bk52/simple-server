const mongoose = require("mongoose");
const { Schema } = mongoose;

const dataSchema = new Schema(
    {
      ip:String,
      appKey:String,
      payload:String
      //payload:mongoose.Mixed
    },
    {
      timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
    }
);

dataSchema.statics.insertData=function(data){
    let _data = new dataModel(data);
    return _data.save()
}

const dataModel = mongoose.model("datas", dataSchema);
module.exports = dataModel;