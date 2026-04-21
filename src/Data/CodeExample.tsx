
export const codeExamples = {
  "App.tsx": `

  const App = () => {
  return (
    <div>
    This is a simple React component that demonstrates how to use the CodeFlow AI library to get code suggestions in real-time.
    The component maintains a piece of state called "code" which represents the current code in the editor. When the user triggers the AI completion (e.g., by clicking a button), the handleAICompletion function is called, which uses the CodeFlow.complete method to get a suggestion based on the current code. The suggested code is then set back into the state, which can be displayed in the code editor.
    </div>
    )
  }
`,

"Hero.tsx": `
const Hero = () => {
  return (
  <div>
    This is a Hero component that showcases dynamic code examples. It uses the useState hook to manage the active tab state, allowing users to switch between different code examples (e.g., App.tsx, Navbar.tsx, Hero.tsx). The SyntaxHighlighter component is used to display the code with syntax highlighting. The code examples are stored in an object called codeExamples, which maps each tab name to its corresponding code snippet. When a user clicks on a tab, the activeTab state is updated, and the corresponding code example is displayed in the SyntaxHighlighter.
  </div>
  )
}
`,

"Navbar.tsx": `
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><a href="#app">App</a></li>
        <li><a href="#hero">Hero</a></li>
        <li><a href="#navbar">Navbar</a></li>
      </ul>
    </nav>
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