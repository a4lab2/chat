// createChat
// getUserChat
// findChat

const messageModel = require("../Models/messageModel");

const createMessage = async (req, res) => {
  
    const {chatId, senderId, text} = req.body;
    const message = new messageModel({
        chatId,
        senderId,
        text
    })

    try {
       const response=await message.save()
       res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
};


const getMessage = async (req, res) => {
  const { chatId } = req.params;
try {
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
} catch (error) {
    console.log(error)
    res.status(500).json(error)
}
  
};

// 6591394736de5f4782c1f99d

// 6592fdfc69f42e9f2ac8348b
module.exports ={ createMessage, getMessage};