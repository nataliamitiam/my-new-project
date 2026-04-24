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
        <section id="features" className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative">
            <div>
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8">
                        Key Features
                    </h2>
                    <span className="text-center text-gray-400 max-w-2xl mx-auto mb-12 sm:mb-16">
                        Discover the powerful features that make Codeflow AI your ultimate coding companion.
                    </span>
                    
                    <span className="text-center text-gray-400 max-w-2xl mx-auto mb-12 sm:mb-16">
                        Work Overflow
                    </span>
                </div>
            </div>
        </section>
    );
}