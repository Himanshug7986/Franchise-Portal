import mongoose from "mongoose";

const salesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    numberOfCustomers: {
        type: Number,
        required: true,
        min: 0
    },
    totalRevenue: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Sales', salesSchema);
