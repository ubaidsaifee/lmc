// app/api/inquiries/notifications/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Inquiry from '../../../models/inquiry';

/**
 * Handles GET requests to fetch recent unread inquiries.
 */
export async function GET() {
  try {
    await dbConnect();
    const unreadInquiries = await Inquiry.find({ isRead: false })
      .sort({ createdAt: -1 }) // Get the newest ones first
      .limit(10); // Limit to the 10 most recent

    return NextResponse.json(unreadInquiries, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Error fetching notifications." }, { status: 500 });
  }
}

/**
 * Handles POST requests to mark all inquiries as read.
 */
export async function POST() {
    try {
        await dbConnect();
        await Inquiry.updateMany({ isRead: false }, { $set: { isRead: true } });
        return NextResponse.json({ message: 'All notifications marked as read.' }, { status: 200 });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Error marking notifications as read." }, { status: 500 });
    }
}