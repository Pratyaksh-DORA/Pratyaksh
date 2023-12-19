import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { Landing, Signup, Login, Main, AddProject, Analysis, Chat, Task, Team, Update, Home, Admin, GIS, Report, Setting } from "./pages";

import Milestone from "./pages/Milestone";

import { Provider } from "react-redux";
import { store } from "./store/store"

function App() {

  return (
    <Provider store={store} >
      <div className="h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/onboarding" element={<AddProject />} />
            <Route path="/milestone" element={<Milestone />} />
            <Route path="/:id" element={<Main />} >
              <Route path="" element={<Home />} />
              <Route path="task" element={<Task />} />
              <Route path="admin" element={<Admin />} />
              <Route path="team" element={<Team />} />
              <Route path="update" element={<Update />} />
              <Route path="analysis" element={<Analysis />} />
              <Route path="GIS" element={<GIS />} />
              <Route path="simulator" element={<Analysis />} />
              <Route path="chat" element={<Chat />} />
              <Route path="report" element={<Report />} />
              <Route path="setting" element={<Setting />} />
            </Route>

          </Routes>
        </Router>
      </div>
    </Provider >

  );
}

export default App;
