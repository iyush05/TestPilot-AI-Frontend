"use client";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
  ws.send(
    JSON.stringify({
      repoUrl: "https://github.com/iyush05/attendance-system.git",
    })
  );
};
    ws.onmessage = (e) => console.log(e.data);
    ws.onerror = (e) => console.log("❌ error", e);

    return () => ws.close();
  }, []);

  return <div>Check console</div>;
}
