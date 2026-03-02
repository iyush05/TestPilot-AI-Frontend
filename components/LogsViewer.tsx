"use client";

import { LogMessage } from "@/types";

interface Props {
  logs: LogMessage[];
}

export default function LogsViewer({ logs }: Props) {
  return (
    <div className="bg-black text-green-400 p-4 rounded w-full h-[400px] overflow-y-auto font-mono text-sm">
      {logs.map((log, i) => (
        <div key={i}>
          {log.type === "error" && (
            <span className="text-red-400">[ERROR]</span>
          )}
          {log.message}
        </div>
      ))}
    </div>
  );
}