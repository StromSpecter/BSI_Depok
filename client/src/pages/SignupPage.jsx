import AuthLayouts from "../layouts/AuthLayouts";
import logo from "../assets/logo.svg";

const SignupPage = () => {
  return (
    <AuthLayouts>
      <form className="relative space-y-4">
        <div className="absolute top-0 left-0 w-10 h-10">
          <img src={logo} alt="logo" className="object-cover w-full h-full" />
        </div>
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Confirm Password"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white transition-colors rounded-lg bg-primary-500 hover:bg-primary-600"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <a href="/signin" className="text-primary-500">
          Sign In
        </a>
      </p>
    </AuthLayouts>
  );
};

export default SignupPage;
