import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";

// GET: ดึงข้อมูลโพสต์ตาม ID
export async function GET(req, { params }) {
    const { id } = params;

    try {
        await connectMongoDB();
        const post = await Post.findById(id);

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// PUT: อัปเดตข้อมูลโพสต์ตาม ID
export async function PUT(req, { params }) {
    const { id } = params;

    try {
        const { newCustomername, newCompany, newCustomerdetail } = await req.json();

        // ตรวจสอบข้อมูลที่ส่งมา
        if (!newCustomername || !newCompany || !newCustomerdetail) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        await connectMongoDB();
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { Customername: newCustomername, Company: newCompany, Customerdetail: newCustomerdetail },
            { new: true } // Return updated document
        );

        if (!updatedPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post updated successfully", post: updatedPost }, { status: 200 });
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

