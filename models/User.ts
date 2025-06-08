import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole = 'employee' | 'employer';

export interface IUser extends Document {
  name: string;
  email: string;
  role: UserRole;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['employee', 'employer'],
    required: true,
  },
});

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;