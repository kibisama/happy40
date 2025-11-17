const room = require("../../services/room");

exports.postRoom = async (req, res, next) => {
  try {
    const { name, branch } = req.body;
    const result = await room.createRoom(name, branch);
    return res.send({ result });
  } catch (e) {
    next(e);
  }
};
