

const AuthLayouts = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-primary-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default AuthLayouts;
