const Branch = require("../schemas/branch");

/**
 * @param {Branch.Branch} branch
 * @returns {Promise<Branch.BranchDocument>}
 */
exports.createBranch = async (branch) => {
  if (!(branch.name && branch.address && branch.contact)) {
    throw { status: 400 };
  }
  return await Branch.create(branch);
};

/**
 * @returns {Promise<[Branch.BranchDocument]>}
 */
exports.getBranches = async () => {
  return await Branch.find();
};
