const branch = require("../../services/branch");

exports.postBranch = async (req, res, next) => {
  try {
    return res.send(await branch.createBranch(req.body));
  } catch (e) {
    next(e);
  }
};
