// File: src/app/api/generate-payment-link/route.js

import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { randomBytes } from "crypto";

// Initialize Razorpay client
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { amount, name, phone } = await request.json();

    // Basic validation
    if (!amount || !name || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const amountInPaise = Math.round(parseFloat(amount) * 100);
    const uniqueReceiptId = `receipt_${randomBytes(8).toString("hex")}`;
    
    // Set expiry for the link (e.g., 24 hours from now)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const expireBy = Math.floor(tomorrow.getTime() / 1000);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      accept_partial: false,
      description: `Payment link for ${name}`,
      customer: {
        name: name,
        contact: phone,
      },
      notify: {
        sms: true,
        email: false, // Set to true if you collect email
      },
      reminder_enable: true,
      receipt: uniqueReceiptId,
      expire_by: expireBy,
      callback_url: "https://letsmakecompany.com/payment-success", // Replace with your actual success page
      callback_method: "get",
    };

    const paymentLink = await razorpay.paymentLink.create(options);

    return NextResponse.json({
      status: "success",
      paymentLink: paymentLink.short_url,
    });
  } catch (error) {
    console.error("Razorpay API Error:", error);
    return NextResponse.json(
      { error: "Failed to create payment link.", details: error.message },
      { status: 500 }
    );
  }
}