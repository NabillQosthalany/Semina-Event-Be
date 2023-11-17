const { createImages } = require("../../../services/mongoose/image");
const { StatusCodes } = require("http-status-codes");

const create = async (req, res) => {
  try {
    const result = await createImages(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
