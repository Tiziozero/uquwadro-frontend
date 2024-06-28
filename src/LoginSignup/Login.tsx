import { useEffect, useState } from "react";

const LogIn = () => {
    useEffect( () => {
        fetch("http://localhost:8081/logout");
    }, []);

    return <LogInPage />
}

const LogInPage = () => {
    return <>
    <div className="flex-1 flex flex-col justify-center items-center h-screen w-screen">
        <LogInForm />
    </div>
    </>;
}

const LogInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // sendData(username, password)
  };


  return (
    <div className="flex flex-col w-[30rem] px-4 pt-10 pb-1 mb-5 justify-center items-center rounded-lg border border-white">
        <div className="mb-4"><h1 className="text-white text-4xl">Log In</h1></div>
        <form onSubmit={handleSubmit} >
          <label htmlFor="username-or-email" className="text-gray-400">Username/Email</label>
          <input
            type="text"
            id="username-or-email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border-white rounded-full bg-gray-900 p-1 m-1 w-full"
          />
          <label htmlFor="password" className="text-gray-400">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-white rounded-full bg-gray-900 p-1 m-1 w-full"
          />
          <button type="submit" className="bg-[#f9f9f9] p-1 m-1 w-full flex flex-row justify-center items-center">
            <span className="text-black">Log In</span>
          </button>
        </form>
        <div className="flex flex-row pt-10 w-full">
            <a href="/forgor-login-details" className="text-sm text-gray-50 mr-auto">Forgot Username/Password?</a>
            <a href="/forgor-login-details" className="text-sm text-gray-50">Create an account</a>
        </div>
    </div>
  );
};

export default LogIn;
