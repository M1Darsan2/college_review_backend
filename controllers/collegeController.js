const College = require("../model/collegeModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.getAllColleges = catchAsync(async(req,res,next)=>{
    const colleges = await College.find().sort({name:1});
    res.status(200).json({
        status:"success",
        results:colleges.length,
        data:{colleges}
    })
})

exports.getAllCollegesTotalStats = catchAsync(async(req,res,next)=>{
    const colleges = await College.find();
    const totalColleges = colleges.length;
    const totalReviews = colleges.reduce((acc,c)=>acc+(c.totalReviews || 0),0);
    const totalComplaints = colleges.reduce((acc,c)=>acc+(c.negativeCount || 0),0);
    const averageComplaintRate =  totalReviews === 0 ? 0 : ((totalComplaints/totalReviews)*100).toFixed(2);
    const stats = {totalColleges,totalReviews,averageComplaintRate:Number(averageComplaintRate)}
    res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
})

exports.getAllCollegesStats = catchAsync(async(req,res,next)=>{
    const {sort,page=1,limit=10,search=""} = req.query;
    const pageNumber =parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber-1)*limitNumber;
    let allColleges = await College.find({
    name: { $regex: search, $options: "i" },
  }).lean();
     allColleges = allColleges.map((college) => {
    const { negativeCount, totalReviews } = college;
    const complaintRate =
      totalReviews === 0
        ? 0
        : parseFloat(((negativeCount / totalReviews) * 100).toFixed(2));
    return {
      ...college,
      complaintRate,
    };
  });
    switch (sort) {
    case "reviews_asc":
      allColleges.sort((a, b) => a.totalReviews - b.totalReviews);
      break;
    case "reviews_desc":
      allColleges.sort((a, b) => b.totalReviews - a.totalReviews);
      break;
    case "complaints_asc":
      allColleges.sort((a, b) => a.complaintRate - b.complaintRate);
      break;
    case "complaints_desc":
      allColleges.sort((a, b) => b.complaintRate - a.complaintRate);
      break;
    default:
      allColleges.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
  }
    const totalColleges = allColleges.length;
  const totalPages = Math.ceil(totalColleges / limitNumber);
  const paginatedColleges = allColleges.slice(skip, skip + limitNumber);
  res.status(200).json({
    status: "success",
    totalColleges,
    totalPages,
    currentPage: pageNumber,
    count: paginatedColleges.length,
    data: {
      colleges: paginatedColleges,
    },
  });
})

exports.getCollegeById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const college = await College.findById(id)
    .populate({
      path: "reviews",
    })
    .lean();

  if (!college) {
    return next(new AppError("No college found with that ID", 404));
  }

  const { totalReviews, negativeCount } = college;

  const complaintRate =
    totalReviews === 0
      ? 0
      : parseFloat(((negativeCount / totalReviews) * 100).toFixed(2));

  const collegeWithStats = {
    ...college,
    complaintRate,
  };

  res.status(200).json({
    status: "success",
    message: "College details retrieved successfully",
    data: {
      college: collegeWithStats,
    },
  });
})