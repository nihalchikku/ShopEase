import { Link } from "react-router-dom";

function ServerError() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-7xl font-bold text-red-600">500</h1>
            <h2 className="text-3xl font-semibold mt-4">Internal Server Error</h2>
            <p className="text-gray-600 mt-2 text-center">Something went wrong on our server.
                <br />
                Please try again later.
            </p>
            <Link to="/" className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">Go Back Home</Link>
        </div>
    );

}

export default ServerError;