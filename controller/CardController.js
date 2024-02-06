const uuid = require("uuid");
const Cards = require('../models/Card')
module.exports = {
    //create card with default status : todo
    createCard: async (req, res) => {
        try {
            const { title, description, priority, statusID } = req.body;
            if (!title || !description || !priority || !statusID) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Card details are required.",
                    error: "Card details are required.",
                });
            }

            //add card data in db with new id
            const addCard = new Cards({
                id: uuid.v4(),
                ...req.body
            });

            //save data
            await addCard.save();

            //card resp
            return res.json({
                status: 200,
                data: addCard,
                message: "Card Created Successfully",
                error: null,
            });
        } catch (error) {
            //err resp
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error,
            });
        }
    },

    //get single card by id 
    getSingleCard: async (req, res) => {
        try {
            const { id } = req.query;
            if (!id) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Card details are required.",
                    error: "Card details are required.",
                });
            }
            //check card is exist or not
            const findExist = await Cards.findById({ _id: id });
            if (!findExist) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Card not found",
                    error: "Card not found",
                });
            }
            return res.json({
                status: 200,
                data: findExist,
                message: "",
                error: null,
            });
        } catch (error) {
            //err resp
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error,
            });
        }
    },

    //edit single card by id 
    editCard: async (req, res) => {
        try {
            const { id, title, description, priority } = req.body;
            if (!id || !title || !description || !priority) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Card details are required.",
                    error: "Card details are required.",
                });
            }
            //check card is exist or not
            const findExist = await Cards.findById({ _id: id });
            if (!findExist) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Card not found",
                    error: "Card not found",
                });
            }

            //update card details based on id
            const updateCard = await Cards.findOneAndUpdate(
                { _id: id },
                req.body,
                {
                    returnOriginal: false, //always return updated values
                }
            );
            return res.json({
                status: 200,
                data: updateCard,
                message: "",
                error: null,
            });
        } catch (error) {
            //err resp
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error,
            });
        }
    },

    //edit single card by id 
    deleteCard: async (req, res) => {
        try {
            const { id } = req.query;
            if (!id) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Card details are required.",
                    error: "Card details are required.",
                });
            }
            //check card is exist or not
            const findExist = await Cards.findById({ _id: id });
            if (!findExist) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Card not found",
                    error: "Card not found",
                });
            }
            //delete card from db
            await Cards.deleteOne({ _id: id });
            return res.json({
                status: 200,
                data: {},
                message: "Card deleted successfully",
                error: null,
            });
        } catch (error) {
            //err resp
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error,
            });
        }
    },

    //get call card with pagination and latest card first
    cardListing: async (req, res) => {
        try {
            const { limit, skip } = req.query;
            let cardList = [];

            //if skip and limit comes then find from if block else find from else block(without skip and limit).
            if (limit > 0 || skip > 0) {
                cardList = await Cards.find()
                    .limit(limit)
                    .skip(skip)
                    .sort({ createdAt: -1 })
                // .populate('Status')
            } else {
                cardList = await Cards.find().sort({
                    createdAt: -1,
                });
                // .populate('Status')
            }

            //finc count of all cards
            const cardCounts = await Cards.count();
            return res.json({
                status: 200,
                count: cardCounts || 0,
                data: cardList || [],
                message: null,
                error: null,
            });
        } catch (error) {
            //err resp
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error,
            });
        }
    },
    //when we want to move card then need to pass cardId and destination statusId 
    moveCard: async (req, res) => {
        try {
            const { id, statusID } = req.query;
            if (!id || !statusID) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Card details are required.",
                    error: "Card details are required.",
                });
            }
            //check card is exist or not
            const findExist = await Cards.findById({ _id: id });
            if (!findExist) {
                return res.json({
                    status: 400,
                    data: null,
                    message: "Card not found",
                    error: "Card not found",
                });
            }
            //update card details based on id
            await Cards.findOneAndUpdate(
                { _id: id },
                { statusID: statusID },
                {
                    returnOriginal: false, //always return updated values
                }
            );
            return res.json({
                status: 200,
                data: {},
                message: "Card moved successfully",
                error: null,
            });
        } catch (error) {
            //err resp
            return res.json({
                status: 500,
                data: null,
                message: "Something went wrong",
                error: error,
            });
        }
    },
};