const room = require("../../services/room");

exports.postRoom = async (req, res, next) => {
  try {
    //
    const result = await room.createRoom(req.body);
    return res.send(result);
  } catch (e) {
    next(e);
  }
};
