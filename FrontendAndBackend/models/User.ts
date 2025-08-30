import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the interface for the User document
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: 'government' | 'startup' | 'bank' | 'auditor';
  organizationName?: string; // Optional field for company/organization name
  status?: 'pending' | 'approved' | 'rejected'; // For startups to track application status
  comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false, // Do not return password by default on queries
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['government', 'startup', 'bank', 'auditor'],
  },
  organizationName: {
    type: String,
    trim: true,
    // Make this field required if the role is 'startup' or 'bank'
    required: function(this: IUser) {
        return this.role === 'startup' || this.role === 'bank';
    },
  },
  status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: function(this: IUser) {
          // Set a default status of 'pending' only for startups
          if (this.role === 'startup') {
              return 'pending';
          }
          return undefined;
      }
  }
}, { timestamps: true });

// Hash password before saving the user model
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// If the model is already defined, use it. Otherwise, define a new one.
// This is important for Next.js hot-reloading.
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User