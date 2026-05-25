// COLLEGE SEEDS FILE HERE - CONNECT THE DATABASE USING YOUR OWN DB STRING
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const College = require("../model/collegeModel");
dotenv.config({ path: "../.env" });

// Connect our database
const DB = process.env.MONGO_URI;
mongoose.connect(DB)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.log(err));

// Your college list
const colleges = [
  "Indian Institute of Technology Bombay",
  "Indian Institute of Technology Delhi",
  "Indian Institute of Technology Madras",
  "Indian Institute of Technology Kanpur",
  "Indian Institute of Technology Kharagpur",
  "Indian Institute of Technology Roorkee",
  "Indian Institute of Technology Hyderabad",
  "Indian Institute of Technology Guwahati",
  "Indian Institute of Technology BHU Varanasi",
  "Indian Institute of Technology Indore",
  "National Institute of Technology Trichy",
  "National Institute of Technology Surathkal",
  "National Institute of Technology Warangal",
  "National Institute of Technology Calicut",
  "National Institute of Technology Rourkela",
  "National Institute of Technology Allahabad",
  "National Institute of Technology Jaipur",
  "National Institute of Technology Kurukshetra",
  "National Institute of Technology Nagpur",
  "National Institute of Technology Silchar",

  // IIMs
  "Indian Institute of Management Ahmedabad",
  "Indian Institute of Management Bangalore",
  "Indian Institute of Management Calcutta",
  "Indian Institute of Management Lucknow",
  "Indian Institute of Management Kozhikode",
  "Indian Institute of Management Indore",
  "Indian Institute of Management Shillong",
  "Indian Institute of Management Udaipur",
  "Indian Institute of Management Rohtak",
  "Indian Institute of Management Tiruchirappalli",
  "University of Delhi",
  "Jawaharlal Nehru University",
  "Banaras Hindu University",
  "Aligarh Muslim University",
  "Hyderabad Central University",
  "Jadavpur University",
  "Jamia Millia Islamia",
  "Pondicherry University",
  "Tezpur University",
  "Visva-Bharati University",
  "BITS Pilani",
  "BITS Goa",
  "BITS Hyderabad",
  "Manipal Academy of Higher Education",
  "VIT Vellore",
  "Amity University Noida",
  "SRM Institute of Science and Technology",
  "Symbiosis International University",
  "Christ University Bangalore",
  "Lovely Professional University",
  "St. Stephen's College Delhi",
  "Miranda House Delhi",
  "Lady Shri Ram College Delhi",
  "Hindu College Delhi",
  "Presidency College Chennai",
  "Loyola College Chennai",
  "St. Xavier's College Mumbai",
  "Fergusson College Pune",
  "Mount Carmel College Bangalore",
  "Bishop Heber College Tiruchirappalli",
  "All India Institute of Medical Sciences Delhi",
  "Armed Forces Medical College Pune",
  "Maulana Azad Medical College Delhi",
  "Grant Medical College Mumbai",
  "National Law School of India University Bangalore",
  "NALSAR University of Law Hyderabad",
  "National Law University Delhi",
  "Symbiosis Law School Pune",
  "Government Law College Mumbai",
  "Faculty of Law BHU Varanasi",
  "Indian Institute of Science Bangalore",
  "TIFR Mumbai",
  "Indian Statistical Institute Kolkata",
];

const addColleges = async () => {
  try {
    const formatted = colleges.map((name) => ({
      name: name.trim(),
      totalReviews: 0,
      positiveCount: 0,
      negativeCount: 0,
      nutralCount: 0,
      reviews: [],
    }));

    let added = 0;
    for (const college of formatted) {
      const exists = await College.findOne({ name: college.name });
      if (!exists) {
        await College.create(college);
        added++;
      }
    }

    console.log(`${added} new colleges added. Duplicates skipped.`);
    process.exit();
  } catch (error) {
    console.log("Error Adding colleges", error);
    process.exit(1);
  }
};

const deleteColleges = async () => {
  try {
    await College.deleteMany();
    console.log("All Colleges Deleted successfully");
    process.exit();
  } catch (error) {
    console.log("Error Deleting colleges", error);
    process.exit(1);
  }
};

const run = async () => {
  const arg = process.argv[2];
  if (arg === "--add") {
    await addColleges();
  } else if (arg === "--delete") {
    await deleteColleges();
  } else {
    console.log("Use --add to add colleges or --delete to delete colleges");
    process.exit(0);
  }
};

run();