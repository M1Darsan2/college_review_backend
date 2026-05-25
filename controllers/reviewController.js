const crypto = require("crypto");
const Story = require("../model/reviewModel");
const AppError = require("../utils/appError");
const College = require("../model/collegeModel");
const catchAsync = require("../utils/catchAsync")
function generateAnonymousId() {
  return "Anon-" + crypto.randomBytes(3).toString("hex");
}

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const {
    collegeName = "",
    vibe = "",
    search = "",
    sort = "newest",
    page = 1,
    limit = 4,
  } = req.query;

  const filter = {};

    if (collegeName) {
    filter.collegeName = { $regex: collegeName, $options: "i" };
  }

  if (vibe) {
    filter.vibe = vibe;
  }
if (search) {
    filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { story: { $regex: search, $options: "i" } },
    ];
}
  const sortOption = sort === "oldest" ? "createdAt" : "-createdAt";
  const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
    Story.find(filter).sort(sortOption).skip(skip).limit(Number(limit)),
    Story.countDocuments(filter),
  ]);

  res.status(200).json({
    status: "success",
    results: reviews.length,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    data: { reviews },
  });
})

exports.createStory = catchAsync(async (req, res, next) => {
  const { vibe, collegeName, isAnonymous, name, userType, title, story } =
    req.body;
  if (!isAnonymous && !name) {
    return next(new AppError("Name is required when not anonymous", 400));
  }
   const college = await College.findOne({ name: collegeName.trim() });
   if (!college) {
    return next(
      new AppError("Please select a valid college from the list", 400)
    );
  }
    const newStory = await Story.create({
    vibe,
    collegeName: college.name, 
    isAnonymous,
    name: isAnonymous ? undefined : name,
    anonymousId: isAnonymous ? generateAnonymousId() : undefined,
    userType,
    title,
    story,
  });
    const update = {
    $push: { reviews: newStory._id },
    $inc: { totalReviews: 1 },
  };

  if (vibe === "positive") {
    update.$inc.positiveCount = 1;
  } else if (vibe === "negative") {
    update.$inc.negativeCount = 1;
  } else if (vibe === "neutral") {
    update.$inc.nutralCount = 1;
  }

  await College.findByIdAndUpdate(college._id, update);

  res.status(201).json({
    status: "success",
    message: "Story submitted successfully",
    data: {
      story: newStory,
    },
  });
}) 