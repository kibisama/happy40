const Branch = require("../schemas/branch");

/**
 * @param {string} name
 * @returns {}
 */
exports.createBranch = async (name) => {
  try {
    return await Branch.create({ name });
  } catch (e) {
    throw e;
  }
};
