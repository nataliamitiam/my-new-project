
export const codeExamples = {
  "App.tsx": `
import { useState } from "react";
import { CodeFlow } from "@codeflow/ai";

function App() {
  const [code, setCode] = useState("");

  const handleAICompletion = async () => {
    const suggestion = await CodeFlow.complete(code);
    setCode(suggestion);
  };

  return (
    <div className="app">
      <CodeEditor
        onChange={setCode}
        onAI={handleAICompletion}
      />
    </div>
  );
}
`,

"Hero.tsx": `
import { useState } from "react";
import { CodeFlow } from "@codeflow/ai";

function App() {
  const [code, setCode] = useState("");

  const handleAICompletion = async () => {
    const suggestion = await CodeFlow.complete(code);
    setCode(suggestion);
  };

  return (
    <div className="app">
      <CodeEditor
        onChange={setCode}
        onAI={handleAICompletion}
      />
    </div>
  );
}
`,

"Navbar.tsx": `
import { useState } from "react";
import { CodeFlow } from "@codeflow/ai";

function App() {
  const [code, setCode] = useState("");

  const handleAICompletion = async () => {
    const suggestion = await CodeFlow.complete(code);
    setCode(suggestion);
  };

  return (
    <div className="app">
      <CodeEditor
        onChange={setCode}
        onAI={handleAICompletion}
      />
    </div>
  );
}
`
};

export const floatingCards = {
  "App.tsx": {
    bgColor: "bg-blue-500/70",
    iconColor: "text-blue-400",
    textColor: "text-blue-200",
    contentColor: "text-blue-300",
    icon: "AI",
    title: "Smart Completion",
    content: "AI-powered code suggestions in real-time",
  },
  "Hero.tsx": {
    bgColor: "bg-blue-500/70",
    iconColor: "text-blue-400",
    textColor: "text-blue-200",
    contentColor: "text-blue-300",
    icon: "AI",
    title: "Smart Completion",
    content: "Dynamic code examples that update with your interactions",
  },
  "Navbar.tsx": {
    bgColor: "bg-blue-500/70",
    iconColor: "text-blue-400",
    textColor: "text-blue-200",
    contentColor: "text-blue-300",
    icon: "AI",
    title: "Smart Completion",
    content: "Intelligent code insights that adapt to your coding styles",
  },
}