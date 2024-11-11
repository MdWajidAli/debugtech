// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// POST method to handle subscriptions
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Use the singleton MongoDB client
    const client = await clientPromise;
    const database = client.db("newsletter");
    const collection = database.collection("subscribers");

    // Check if email is already subscribed
    const existingSubscriber = await collection.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { message: "Email already subscribed" },
        { status: 400 }
      );
    }

    // Add new subscriber
    await collection.insertOne({ email, subscriptionDate: new Date() });
    return NextResponse.json(
      { message: "Successfully subscribed to the newsletter!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "An error occurred while subscribing" },
      { status: 500 }
    );
  }
}
