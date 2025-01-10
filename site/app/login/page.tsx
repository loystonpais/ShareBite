
import Link from "next/link";

const LoginPage = () => {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className=" bg-gray-100 p-8 rounded-lg shadow-lg w-full sm:w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          
          {/* Form */}
          <form className="space-y-4">
            {/* Email input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
            </div>
  
            {/* Password input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter your password"
              />
            </div>
  
            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>
  
          {/* Signup redirect */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginPage;
