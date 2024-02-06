const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        statusId: {
            type: String,
            ref: "Status",
            //suppose we havr model with name of status
            //in status model we can store all status like (todo, inProgress, pending,complete,done)
            //if we have to add card then we can pass ref of status model,because if we directly set status then it occupy memory for string, in our case this will ocupy memory only for refId
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        priority: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("card", CardSchema);
