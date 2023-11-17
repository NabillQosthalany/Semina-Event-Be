const { BadRequestError, NotFoundError } = require("../../errors");
const { checkingImage } = require("./image");
const Payments = require("../../api/v1/payments/model");

const getAllPayments = async (req) => {
  let condition = { organizer: req.user.organizer };

  const result = await Payments.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id type status image");

  return result;
};
const createPayments = async (req) => {
  const { type, image } = req.body;

  await checkingImage(image);

  const check = await Payments.findOne({ type, organizer: req.user.organizer });

  if (check) throw new BadRequestError("Jenis pembayaran duplikat");

  const result = await Payments.create({
    image,
    type,
    organizer: req.user.organizer,
  });
  return result;
};

const getOnePayments = async (req) => {
  const { id } = req.params;

  const result = await Payments.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id type status image");

  if (!result)
    throw new BadRequestError(`Pembayaran tidak ditemukan dengan id : ${id}`);

  return result;
};

const updatePayments = async (req) => {
  const { id } = req.params;
  const { type, image } = req.body;

  await checkingImage(image);

  const check = await Payments.findOne({
    type,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("Jenis pembayaran duplikat");

  const result = await Payments.findOneAndUpdate(
    { _id: id },
    {
      type,
      image,
      organizer: req.user.organizer,
    },
    { new: true, runValidators: true }
  );

  if (!result)
    throw new NotFoundError(`Pembayaran tidak ditemukan dengan id : ${id}`);
  return result;
};

const deletePayments = async (req) => {
  const { id } = req.params;
  const result = await Payments.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result)
    throw new NotFoundError(`Pembayaran tidak ditemukan dengan id : ${id}`);

  await result.deleteOne({ _id: id });
  return result;
};

module.exports = {
  getAllPayments,
  createPayments,
  getOnePayments,
  updatePayments,
  deletePayments,
};
