import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  employer: mongoose.Types.ObjectId;
  createdAt: Date;
}

const JobSchema: Schema<IJob> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  employer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const JobModel: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);

export default JobModel;