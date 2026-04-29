const features = [
  {
    title: "AI Code Completion",
    description:
      "Intelligent code suggestions powered by advanced AI that learns from you.",
    image: "code-completion",
    imagePosition: "left",
  },
  {
    title: "Automated Testing",
    description:
      "Generate comprehensive test suites automatically. Our AI analyzes your code.",
    image: "testing",
    imagePosition: "right",
  },
  {
    title: "Smart Debugging",
    description:
      "Identify and fix bugs before they reach production. AI-powered error detection.",
    image: "debugging",
    imagePosition: "left",
  },
];


export default function Features() {
  return (
    <section
      id="features"
      className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative"
    >
      <div>
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              Your Complete Development</span>
            <br />
            <span className="bg-gradient-to-b from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Workflow</span>
          </h2>
        </div>
      </div>
    </section>
  );
}