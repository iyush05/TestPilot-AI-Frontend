"use client";

import { useEffect, useState } from "react";
import { createWebSocket } from "@/lib/websocket";
import LogsViewer from "@/components/LogsViewer";
import { LogMessage } from "@/types";

export default function RunPage() {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [prUrl, setPrUrl] = useState<string | null>(null);

  useEffect(() => {
    const runData = sessionStorage.getItem("runData");

    if (!runData) return;

    const { repoUrl, prompt } = JSON.parse(runData);

    const ws = createWebSocket(
      (data: LogMessage) => {
        if (data.type === "done") {
          setPrUrl(data.prUrl || null);
        }

        setLogs((prev) => [...prev, data]);
      },
      (prUrl) => setPrUrl(prUrl),
      () => {
        ws.send(
          JSON.stringify({
            repoUrl,
            prompt,
          })
        );
      }
    );

    return () => ws.close();
  }, []);

  return (
    <main className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Execution Logs</h1>

      <LogsViewer logs={logs} />

      {prUrl && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Pull Request</h2>
          <a
            href={prUrl}
            target="_blank"
            className="text-blue-600 underline"
          >
            {prUrl}
          </a>
        </div>
      )}
    </main>
  );
}