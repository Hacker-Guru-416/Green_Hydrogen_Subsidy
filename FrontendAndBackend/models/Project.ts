import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User'; // Assuming IUser is exported from your User model

// Define the interface for a Project document
export interface IProject extends Document {
  projectName: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Funding' | 'Auditing' | 'Completed';
  createdBy: IUser['_id']; // Reference to the Startup User who created it
}

const projectSchema: Schema<IProject> = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Funding', 'Auditing', 'Completed'],
    default: 'Pending',
  },
  // Link to the user who created the project
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);

export default Project;