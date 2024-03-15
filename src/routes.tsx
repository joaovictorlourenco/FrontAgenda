import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route />
        <Route />
      </Routes>
    </Router>
  );
}

export default App;
