import { Routes, Route } from "react-router-dom";
import { Home, Dashboard } from "./pages"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
