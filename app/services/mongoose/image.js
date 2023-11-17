const images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

const createImages = async (req) => {
  const result = await images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpg`,
  });
  return result;
};

const checkingImage = async (id) => {
  const result = await images.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada gambar dengan id ${id}`);
  return result;
};

module.exports = { createImages, checkingImage };
