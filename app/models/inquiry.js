// app/models/inquiry.js
import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email.'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number.'],
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Follow Up', 'Complete'],
        default: 'Pending',
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    // NEW FIELD for internal notes
    remarks: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);