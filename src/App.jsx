import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import BoxOverview from "./pages/BoxOverview";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div className="min-h-screen bg-[#f8f1e8] text-[#2b160e]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/box" element={<BoxOverview />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
