import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

const features = [
  {
    title: "",
    description: "",
    image: "",
    imgaePosition: "",
  },
]

export default function Features() {

  return (
    <section
      id="features"
      className="relative px-6 sm:px-8 lg:px-10 py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              Your Complete Development
            </span>
            <br />
            <span className="bg-gradient-to-b from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Workflow
            </span>
          </h2>
        </div>

        <div className="space-y-16 sm:space-y-28 lg:space-y-32">
        {features.map((row, index) => {
          return (
            <div key={index}>
              {/* Code Section */}
        <div className="bg-gray-900 rounded-xl p-4 shadow-lg">
          {/* IDE Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>

            {/* Title */}
            <span className="text-gray-400 text-xs sm:text-sm">
              {row.title}
            </span>
          </div>

          {/* Code Preview */}
          <SyntaxHighlighter
            language="javascript"
            style={vs2015}
            customStyle={{
              margin: 0,
              borderRadius: "8px",
              fontSize: "11px",
              lineHeight: "1.4",
              border: "1px solid #3c3c3c",
              width: "100%",
            }}
            className="w-full">
           {row.title}
          </SyntaxHighlighter>
        </div>
            </div>
          )
        })}
        </div>
      </div>
    </section>
  );
}