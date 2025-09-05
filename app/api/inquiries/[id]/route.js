// app/api/inquiries/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Inquiry from '../../../models/inquiry';

/**
 * Handles PATCH requests to update status, remarks, or mark as read.
 */
export async function PATCH(request, { params }) {
  const { id } = params;
  
  try {
    await dbConnect();
    const body = await request.json();
    
    // Initialize update operations.
    const updateOperations = {
      $set: { isRead: true }, // Always mark as read on any interaction
      $push: {} // For adding to arrays like remarks
    };

    // Handle status update
    if (body.status) {
      if (!['Pending', 'Follow Up', 'Complete'].includes(body.status)) {
        return NextResponse.json({ message: 'Invalid status value.' }, { status: 400 });
      }
      updateOperations.$set.status = body.status;
    }
    
    // Handle remark addition using $push
    // The frontend sends { remark: "new text" }, so we push that single string.
    if (body.remark) { // Changed from body.remarks to body.remark to match frontend
      updateOperations.$push.remarks = body.remark;
    }

    // Clean up empty $push if no remarks were added, otherwise Mongoose might complain
    if (Object.keys(updateOperations.$push).length === 0) {
      delete updateOperations.$push;
    }

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      updateOperations, // Use the dynamically built updateOperations
      { new: true, runValidators: true } // { new: true } is crucial for returning the updated document
    );

    if (!updatedInquiry) {
      return NextResponse.json({ message: 'Inquiry not found.' }, { status: 404 });
    }

    // Return the full, updated inquiry object to the frontend
    return NextResponse.json(updatedInquiry, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Error updating inquiry." }, { status: 500 });
  }
}

/**
 * Handles DELETE requests to remove an inquiry.
 */
export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        await dbConnect();
        const deletedInquiry = await Inquiry.findByIdAndDelete(id);
        if (!deletedInquiry) {
            return NextResponse.json({ message: 'Inquiry not found.' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Inquiry deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Error deleting inquiry." }, { status: 500 });
    }
}