const branch = require("../services/branch");

exports.getBranches = async (req, res, next) => {
  try {
    const branches = await branch.getBranches();
    return res.send(
      branches.map(({ name, address, contact, description }) => ({
        name,
        address,
        contact,
        description,
      }))
    );
  } catch (e) {
    next(e);
  }
};
