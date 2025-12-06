import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  locationOwnership: {
    type: String,
    enum: ['owned', 'rented'],
    required: true
  },
  hasOtherFranchises: {
    type: Boolean,
    default: false
  },
  otherFranchiseLocations: {
    type: String,
    default: '[]'
  },
  franchiseRequestStatus: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  adminNotes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.virtual('otherFranchiseLocationsDisplay').get(function () {
  try {
    const locations = typeof this.otherFranchiseLocations === 'string'
      ? JSON.parse(this.otherFranchiseLocations || '[]')
      : (this.otherFranchiseLocations || []);
    if (Array.isArray(locations) && locations.length > 0) {
      return locations.join(', ');
    }
    return 'None';
  } catch {
    return 'None';
  }
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

export default mongoose.model('User', userSchema);
