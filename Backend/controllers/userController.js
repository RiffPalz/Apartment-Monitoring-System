import userAccount from "../models/userAccount.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const {
      fullName,
      emailAdd,
      username,
      password,
      phoneNumber,
      unitNumber,
      numberOfTenants,
      role, // optional - default 'user'
    } = req.body;

    // Basic validation
    if (!fullName || !emailAdd || !username || !password || !phoneNumber || !unitNumber || !numberOfTenants) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create new user
    const newUser = await userAccount.create({
      fullName,
      emailAdd,
      username,
      password,
      phoneNumber,
      unitNumber,
      numberOfTenants,
      role: role || "user", // default to 'user' if not provided
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });

  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create account",
      error: error.message, // <== See exact error here
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userAccount.findAll();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

