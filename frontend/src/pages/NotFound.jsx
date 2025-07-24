export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-screen bg-[#121212] text-white px-4 py-20">
            <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1E88E5] to-[#8E24AA]">
                404
            </h1>

            <div className="h-1 w-40 bg-gradient-to-r from-[#8E24AA] to-[#1E88E5] rounded-full my-6"></div>

            <p className="text-lg md:text-xl text-gray-400 max-w-md">
                The page you’re looking for doesn’t exist, has been moved, or might be under construction.
            </p>

            <a
                href="/"
                className="mt-8 px-6 py-3 rounded-md bg-[#1E88E5] hover:bg-[#1565C0] transition duration-300 text-white font-semibold"
            >
                Go Back Home
            </a>
        </div>
    );
};
