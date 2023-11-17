const { StatusCodes } = require("http-status-codes");
const { signIn } = require("../../../services/mongoose/auth");

const signInCms = async (req, res, next) => {
  try {
    const result = await signIn(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { signInCms };
