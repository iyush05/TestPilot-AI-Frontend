const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://127.0.0.1:3001";

export function createWebSocket(
  onMessage: (data: any) => void,
  onPRCreated?: (url: string) => void,
  onOpen?: () => void
) {
  const ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log("WS connected");
    onOpen?.();
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "pr") {
        onPRCreated?.(data.message);
      } else {
        onMessage(data);
      }
    } catch {
      console.log("Raw:", event.data);
    }
  };

  ws.onerror = (err) => console.error("WS error", err);

  return ws;
}