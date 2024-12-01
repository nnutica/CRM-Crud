import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const post = await Post.findOne({ _id: id });
    return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { newCustomername: Customername, newCompany: Company, newCustomerdetail: Customerdetail } = await req.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, { newCustomername, newCompany, newCustomerdetail });
    return NextResponse.json({ message: "Post updated" }, { status: 200 });
}
