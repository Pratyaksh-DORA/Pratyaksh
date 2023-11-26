import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Landing, Signup, Login, Main, AddProject } from "./pages";
import { Provider } from "react-redux";
import { store } from "./store/store"

function App() {

  return (
    <Provider store={store} >
      <div className="bg-secondary h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<AddProject />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </Router>
      </div>
    </Provider>

  );
}

export default App;
