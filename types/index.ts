export interface RunRequest {
  repoUrl: string;
  prompt: string;
}

export interface LogMessage {
  type: "log" | "error" | "done";
  message: string;
  prUrl?: string;
}