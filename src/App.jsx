import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Builder from "./pages/Builder";
import SharedPass from "./pages/SharedPass";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/pass/:builderId" element={<SharedPass />} />
      </Routes>
    </BrowserRouter>
  );
}