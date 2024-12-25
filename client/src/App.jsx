import { useState } from "react";
import "./App.css";
import { useSocket } from "./context/SocketProvider";
import { Routes, Route } from "react-router-dom";
import Room from "./screens/Room";
import Lobby from "./screens/Lobby";

export function App() {
  const socket = useSocket();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
