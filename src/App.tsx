import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './User/userSlice';
import { User } from './User/userSlice';
import { Provider } from 'react-redux';
import { store } from "./store/store"

import Home from "./Home/Home";
import Test from "./Test/Test";
import LogIn from "./LoginSignup/Login";

function App() {
  return (
    <>
        <Provider store={store}>
            <FetchUserComponent />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route index element={<Home />} />
                    <Route path="about" element={<>
                        <div className="flex-1 flex flex-col justify-center items-center">
                            <h1 className="text-white text-7xl mb-10">About</h1>
                            <p className="text-white">About Page</p>
                        </div>
                    </>} />
                    <Route path="login" element={<LogIn />} />
                    <Route path="test" element={<Test />} />
                    <Route path="*" element={<>
                        <div className="flex-1 flex flex-col justify-center items-center">
                            <h1 className="text-white text-7xl mb-10">404</h1>
                            <p className="text-white">Page not Found</p>
                        </div>
                    </>} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </>
  )
}
const FetchUserComponent: React.FC = () => {
    const dispatch = useDispatch();
    console.log("Fetching user data")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    'http://localhost:8081/api/get-user-login-data'
                );
                console.log(response.status)
                console.log(response.body)
                if (!response.ok || response.status != 200) {
                    throw new Error('Network response was not ok');
                }
                const data: User = await response.json();
                dispatch(setUser(data));
            } catch (error) {
                console.error('Error fetching user data:', error);
                const u: User = {
                    id: "",
                    username: "",
                    email: "",
                    pfp: "",
                    isLoggedIn: false
                };
                dispatch(setUser(u));
            }
        };

    fetchUser();

    }, [dispatch]);

    return null; // This component doesn't render anything
};

export default App
