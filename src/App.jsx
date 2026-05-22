import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import BoxOverview from "./pages/BoxOverview";
import Checkout from "./pages/Checkout";
import Container from "./components/Container";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background-primary text-[#2b160e]">
      <Navbar />
      <main className="flex-1 flex">
        <Container className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/box" element={<BoxOverview />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
