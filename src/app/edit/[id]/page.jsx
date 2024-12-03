"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function EditPostPage({ params }) {
    const { id } = params;
    const router = useRouter();

    const [customername, setCustomername] = useState("");
    const [company, setCompany] = useState("");
    const [customerdetail, setCustomerdetail] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Fetch post data by ID
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/${id}`);
                if (!res.ok) throw new Error("Failed to fetch post");

                const { post } = await res.json();
                setCustomername(post.Customername || "");
                setCompany(post.Company || "");
                setCustomerdetail(post.Customerdetail || "");
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPost();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    newCustomername: customername,
                    newCompany: company,
                    newCustomerdetail: customerdetail,
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "Failed to update post");
            }

            alert("Post updated successfully!");
            router.push("/");
        } catch (error) {
            console.error(error);
            alert("Failed to update post");
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto py-10">
            <h3 className="text-3xl font-bold">Edit Post</h3>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    value={customername}
                    onChange={(e) => setCustomername(e.target.value)}
                    placeholder="Customer Name"
                    className="block w-[300px] bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                />
                <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company Name"
                    className="block w-[300px] bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                />
                <textarea
                    value={customerdetail}
                    onChange={(e) => setCustomerdetail(e.target.value)}
                    placeholder="Customer Details"
                    className="block w-[300px] bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                ></textarea>
                <button
                    type="submit"
                    className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
}

export default EditPostPage;
