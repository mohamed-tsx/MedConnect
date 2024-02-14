const SignUp = () => {
  return (
    // <div className="flex">
    <div className="p-24 max-w-xl mx-auto">
      <h1 className="text-xl text-center">∆edConnect</h1>
      <div>
        <p className="font-semibold mt-10">Create your account</p>
        <form action="" className="mt-5 space-y-2 flex flex-col">
          <div className="flex flex-col">
            <label>
              username <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="username"
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label>
              email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="p-2 border rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label>
              password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="p-2 border rounded-lg"
            />
          </div>
          <button className="bg-blue-500 p-2 text-white rounded-lg">
            Register
          </button>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default SignUp;
