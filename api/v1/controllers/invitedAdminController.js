import { InvitedAdmin } from "../../../models/Invitedadmin.js";

export const getAllAdminInvites = async (req, res, next) => {
  try {
    const allInvitedAdmins = await InvitedAdmin.find().sort({ invitedAt: -1 });
    res.status(200).json({ error: false, data: allInvitedAdmins });
  } catch (error) {
    console.error("Error fetching all invitations:", error);
    res
      .status(500)
      .json({ error: true, message: "Server error", details: error.message });
  }
};

export const getAdminInviteByEmail = async (req, res, next) => {
  const { email } = req.params;

  try {
    const invitedAdmin = await InvitedAdmin.findOne({ email });
    if (invitedAdmin) {
      res.status(200).json({ error: false, data: invitedAdmin });
    } else {
      res.status(404).json({
        error: true,
        message: "Invitation data not found for this email",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createAdminInvite = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  try {
    const existingInvitation = await InvitedAdmin.findOne({ email });
    if (existingInvitation) {
      return res
        .status(409)
        .json({ error: true, message: "This email has already been invited" });
    }

    const newInvitation = new InvitedAdmin({ email });
    const savedInvitation = await newInvitation.save();

    res.status(201).json({
      error: false,
      message: "Admin invited successfully",
      data: savedInvitation,
    });
  } catch (error) {
    next(error);
  }
};