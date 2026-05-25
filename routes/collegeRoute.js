const express = require("express")
const { getAllColleges, getAllCollegesTotalStats, getAllCollegesStats, getCollegeById} = require("../controllers/collegeController")

const router = express.Router()

router.get("/all",getAllColleges);
router.get("/total-stats", getAllCollegesTotalStats);
router.get("/stats", getAllCollegesStats);
router.get("/:id", getCollegeById);

module.exports = router;