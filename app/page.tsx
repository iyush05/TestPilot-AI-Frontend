"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [repoUrl, setRepoUrl] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    if (!repoUrl || !prompt) return;

    const runId = Date.now().toString();

    // store in session (simple approach)
    sessionStorage.setItem(
      "runData",
      JSON.stringify({ repoUrl, prompt })
    );

    router.push(`/run/${runId}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
      <h1 className="text-3xl font-bold">AI Test Generator</h1>

      <input
        type="text"
        placeholder="GitHub Repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        className="border p-3 w-[400px] rounded"
      />

      <textarea
        placeholder="Enter prompt (e.g. generate Jest tests)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border p-3 w-[400px] rounded h-[120px]"
      />

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Run
      </button>
    </main>
  );
}