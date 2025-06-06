// models/Job.js
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User (Employer)
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);