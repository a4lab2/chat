// createChat
// getUserChat
// findChat

const chatModel = require("../Models/chatModel");

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  // console.log(firstId, secondId);
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = new chatModel({
      members: [firstId, secondId],
    });
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUserChat = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chat = await chatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

// 6591394736de5f4782c1f99d

// 6592fdfc69f42e9f2ac8348b
module.exports ={ createChat, findUserChat, findChat };