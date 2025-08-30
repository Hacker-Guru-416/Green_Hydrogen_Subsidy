import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  subsidy: { type: Number, required: true },
  approvals: {
    government: { type: Boolean, default: false },
    auditor: { type: Boolean, default: false },
    bank: { type: Boolean, default: false },
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Funded"],
    default: "Pending",
  },
}, { timestamps: true });

const Project = models.Project || model("Project", ProjectSchema);
export default Project;
