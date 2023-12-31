const Events = require("../../api/v1/events/model");
const { BadRequestError, NotFoundError } = require("../../errors");
const { checkingCategories } = require("./categories");
const { checkingImage } = require("./image");
const { checkingTalents } = require("./talent");

const createEvent = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  const check = await Events.findOne({ title, organizer: req.user.organizer });

  if (check) throw new BadRequestError("Judul event duplikat");

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
    organizer: req.user.organizer,
  });
  return result;
};

const getAllEvents = async (req) => {
  const { keyword, category, talent } = req.query;
  let condition = { organizer: req.user.organizer };

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: "i" } };
  }
  if (category) {
    condition = { ...condition, category: category };
  }
  if (talent) {
    condition = { ...condition, talent: talent };
  }

  const result = await Events.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });
  return result;
};

const getOneEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({ path: "image", select: "_id name" })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });
  if (!result) {
    throw new NotFoundError(`Tidak ada id dengan id : ${id}`);
  }
  return result;
};

const updateEvents = async (req) => {
  const { id } = req.params;

  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  const check = await Events.findOne({
    title,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("Judul event duplikat");
  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
      organizer: req.user.organizer,
    },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada event dengan id : ${id}`);
  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!result) throw new NotFoundError(`Tidak ada event dengan id : ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

module.exports = {
  createEvent,
  getAllEvents,
  getOneEvents,
  deleteEvents,
  updateEvents,
};
