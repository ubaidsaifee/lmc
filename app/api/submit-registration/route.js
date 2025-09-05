import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Parse the incoming request body
    const formData = await request.json();

    // 2. Server-side validation (optional but recommended)
    if (!formData.email || !formData.name || !formData.phone) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // 3. Process the data
    //    - Save the order to your database
    //    - Integrate with a payment gateway (Stripe, Razorpay, etc.)
    //    - Send confirmation emails
    console.log('Received registration data on server:', formData);

    // 4. Return a success response
    return NextResponse.json(
      { 
        message: 'Registration form submitted successfully!',
        orderId: `ORD-${Date.now()}` // Example order ID
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.' }, 
      { status: 500 }
    );
  }
}