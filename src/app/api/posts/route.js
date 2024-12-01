import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { Customername, Company, Customerdetail } = await req.json();
    console.log(Customername, Company, Customerdetail)
    await connectMongoDB();
    await Post.create({ Customername, Company, Customerdetail });
    return NextResponse.json({ message: "Customer Added" }, { status: 201 })
}

export async function GET() {
    await connectMongoDB();
    const posts = await Post.find({});
    return NextResponse.json({ posts });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Customer Deleted" }, { status: 200 });
}