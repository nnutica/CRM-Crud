"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";

export default function Home() {
  const [postData, setPostData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // สถานะในการเปิดปิด Modal
  const [Customername, setCustomername] = useState("");
  const [Company, setCompany] = useState("");
  const [Customerdetail, setCustomerdetail] = useState("");

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPostData(data.posts);
    } catch (error) {
      console.log("Error loading posts: ", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Customername || !Company || !Customerdetail) {
      alert("Please complete all inputs.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Customername, Company, Customerdetail }),
      });

      if (res.ok) {
        setIsModalOpen(false); // ปิด Modal หลังจากเพิ่มข้อมูลสำเร็จ
        getPosts(); // รีเฟรชข้อมูล
      } else {
        throw new Error("Failed to create a post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h3 className="text-3xl font-bold mb-6">Customer List</h3>

      {/* Table Layout */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Customer Name</th>
            <th className="border px-4 py-2 text-left">Company</th>
            <th className="border px-4 py-2 text-left">Details</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {postData.length > 0 ? (
            postData.map((val) => (
              <tr key={val._id}>
                <td className="border px-4 py-2">{val.Customername}</td>
                <td className="border px-4 py-2">{val.Company}</td>
                <td className="border px-4 py-2">{val.Customerdetail}</td>
                <td className="border px-4 py-2 text-center">
                  <Link
                    href={`/edit/${val._id}`}
                    className="bg-gray-500 text-white py-1 px-3 rounded-md mx-2"
                  >
                    Edit
                  </Link>
                  <DeleteBtn id={val._id} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border px-4 py-2 text-center">
                No customers available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ปุ่มเปิด Modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white py-2 px-4 rounded text-lg mb-4 inline-block mt-5"
      >
        Create Post
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-3xl font-bold text-center mb-6">Add Customer</h3>
            <hr className="my-3" />
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                onChange={(e) => setCustomername(e.target.value)}
                type="text"
                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg"
                placeholder="Customername"
              />
              <input
                onChange={(e) => setCompany(e.target.value)}
                type="text"
                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg"
                placeholder="Company"
              />
              <textarea
                onChange={(e) => setCustomerdetail(e.target.value)}
                className="w-full bg-gray-200 border py-2 px-3 rounded text-lg"
                placeholder="Customer detail"
              />
              <button
                type="submit"
                className="w-5/6 bg-green-500 text-white border py-2 px-3 rounded text-lg"
              >
                Add Customer
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-1/6 bg-red-500 text-white border py-2 px-3 rounded text-lg"
              >
                Close
              </button>
            </form>

            {/* ปุ่มปิด Modal */}

          </div>
        </div>
      )}
    </div>
  );
}
