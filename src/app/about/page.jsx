export default function About() {
    const members = [
        {
            name: "John Doe",
            studentId: "12345678",
            position: "Leader",
        },
        {
            name: "Jane Smith",
            studentId: "23456789",
            position: "Designer",
        },
        {
            name: "Alice Brown",
            studentId: "34567890",
            position: "Developer",
        },
        {
            name: "Bob White",
            studentId: "45678901",
            position: "Tester",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About Us</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {members.map((member, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
                        <p className="text-gray-600 mt-2">Student ID: {member.studentId}</p>
                        <p className="text-gray-500 mt-1">Position: {member.position}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
