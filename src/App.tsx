import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Test from "./Test/Test";

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route index element={<Home />} />
                <Route path="about" element={<p>about</p>} />
                <Route path="test" element={<Test />} />
                <Route path="*" element={<p>404</p>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
