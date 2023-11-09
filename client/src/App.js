import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { Landing } from "./pages";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
    // <div>hello</div>
  );
}

export default App;
