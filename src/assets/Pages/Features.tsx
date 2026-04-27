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
                    
                    {features.map((feature, index) => (
                        <div key={index} className={`flex ${feature.imagePosition === 'left' ? 'flex-row' : 'flex-row-reverse'} items-center mb-12`}>
                            <img src={`/images/${feature.image}.png`} alt={feature.title} className="w-16 h-16 mr-4" />
                            <div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}