import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Landing, Signup, Login } from "./pages";
function App() {
  return (
    <div className="bg-secondary h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
    // <div>hello</div>
  );
}

export default App;
