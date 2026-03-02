const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

exports.markAttendance = async (req, res, next) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const attendance = await Attendance.create({
      employee: employee._id,
      date,
      status,
    });

    res.status(201).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Attendance already marked for this date",
      });
    }
    next(error);
  }
};

exports.getAttendanceByEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      employeeId: req.params.employeeId,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const records = await Attendance.find({
      employee: employee._id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};