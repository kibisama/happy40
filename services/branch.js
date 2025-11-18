const Branch = require("../schemas/branch");

/**
 * @param {Branch.BranchSchema} branch_schema
 * @returns {Promise<Branch.Branch>}
 */
exports.createBranch = async (branch_schema) => {
  if (!(branch_schema.name && branch_schema.address && branch_schema.contact)) {
    throw { status: 400 };
  }
  return await Branch.create(branch_schema);
};
