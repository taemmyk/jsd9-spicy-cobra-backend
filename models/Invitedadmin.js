import { Schema, model } from "mongoose";

const UserInvitedAdmin = new Schema({
  email: { type: String, required: true, unique: true },
  invitedAt: { type: Date, default: new Date().getTime() },
});

export const InvitedAdmin = model("UserInviteAdmin", UserInvitedAdmin);