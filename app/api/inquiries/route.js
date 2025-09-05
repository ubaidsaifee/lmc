// app/api/inquiries/route.js

import { NextResponse } from 'next/server';
// FIX: Use explicit relative paths for server-side code to ensure module resolution.
import dbConnect from '../../lib/mongodb';
import Inquiry from '../../models/inquiry';

/**
 * Handles POST requests to create a new inquiry.
 * @param {Request} request - The incoming request object.
 * @returns {Response} A response object.
 */
export async function POST(request) {
  try {
    await dbConnect();

    const data = await request.json();
    
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json({ message: "Missing required fields: name, email, and phone are required." }, { status: 400 });
    }
    
    const newInquiry = await Inquiry.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      state: data.state || '',
      message: data.message || '',
    });

    return NextResponse.json(newInquiry, { status: 201 });

  } catch (error) {
    console.error("API Error:", error);
    if (error.name === 'ValidationError') {
        return NextResponse.json({ message: "Validation Error", errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: "Error submitting inquiry.", error: error.message }, { status: 500 });
  }
}

/**
 * Handles GET requests to fetch all inquiries.
 * @returns {Response} A response object with the list of inquiries.
 */
export async function GET() {
  try {
    await dbConnect();
    
    const inquiries = await Inquiry.find({}).sort({ createdAt: 'desc' });
    
    return NextResponse.json(inquiries, { status: 200 });

  } catch (error)
 {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Error fetching inquiries.", error: error.message }, { status: 500 });
  }
}
