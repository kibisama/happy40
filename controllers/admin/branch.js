const branch = require("../../services/branch");

exports.postBranch = async (req, res, next) => {
  try {
    const new_branch = await branch.createBranch(req.body);
    //
    return res.send(new_branch);
  } catch (e) {
    next(e);
  }
};

exports.getBranches = async (req, res, next) => {
  try {
    const branches = await branch.getBranches();
    //
    return res.send(branches);
  } catch (e) {
    next(e);
  }
};
