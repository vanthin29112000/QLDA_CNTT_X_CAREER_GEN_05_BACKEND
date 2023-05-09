import * as mongoose from 'mongoose';
export const StaffSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: false },
  gender: { type: Number, required: false, default: -1 }, // 0 : female, 1 : male , -1 : orther
  birthday: { type: Date, required: false, default: Date().toString() },
  phone: { type: String, required: false },
  avatar: { type: String, required: false },
  dateCreated: { type: Date, default: Date().toString() },
  role: { type: Number }, //0 : user , 1 : admin,
  address: {
    type: Object({
      mainAddress: String,
      district: { id: String, name: String },
      ward: { id: String, name: String },
      city: { id: String, name: String }
    }),
    default: {
      mainAddress: '',
      district: { id: '', name: '' },
      ward: { id: '', name: '' },
      city: { id: '', name: '' }
    }
  },
  block: {
    type: Object({
      isBLocking: Boolean,
      dateBLock: Date,
      isUserBlock: mongoose.Schema.Types.ObjectId
    }),
    default: { isBLocking: false }
  }
});
export interface Staff extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  gender: number;
  birthday: Date;
  phone: string;
  avatar: string;
  dateCreated: Date;
  role: number; //0 : user , 1 : admin
  nationality: string;
  address: {
    mainAddress: string;
    district: { id: string; name: string };
    ward: { id: string; name: string };
    city: { id: string; name: string };
  };
  block: {
    isBLocking: boolean;
    dateBLock: Date;
    isUserBlock: mongoose.Schema.Types.ObjectId;
  };
}
