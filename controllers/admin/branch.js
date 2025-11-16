const branch = require("../../services/branch");

exports.postBranch = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await branch.createBranch(name);
    return res.send({ result });
  } catch (e) {
    next(e);
  }
};
