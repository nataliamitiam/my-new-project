import { ChevronDownIcon, SparklesIcon, ArrowRightIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { codeExamples, floatingCards } from "../../Data/CodeExample";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<keyof typeof floatingCards>("App.tsx");

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const currentFloatingCard = floatingCards[activeTab];
  return (
    <section className="flex items-center justify-center min-h-screen relative overflow-hidden p-6">
     
      <div className="text-center">
        
        <div className="absolute w-5 h-5 bg-blue-500 rounded-full blur-xl animated-pulse"
          style={{
            backgroundColor: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.5), transparent 0%)`,
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
          }}
        />
        
      </div>
      
      <div className="mx-auto text-center relative w-full">
       <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-6 lg:gap-12 items-center relative">
        <div className="col-span-1 w-full text-blue-400">
 <div className="space-y-4"> 
  <div>
        <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-500/15 border border-blue-500/20 rounded-full mb-4 sm:mb-6 animate-in slide-in-from-bottom duration-700">
          <SparklesIcon className="w-6 h-6" />
          <span className="text-sm sm:text-base font-medium text-blue-300">
            Introducing Codeflow AI
          </span>
        </div>

        <h1 className="text-5xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6 animate-in slide-in-from-bottom duration-700 delay-100 leading-tight"> 
          <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block mb-1 sm:mb-2">Code Faster</span>

          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent block mb-1 sm:mb-2">Build Better</span>

          <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent block">With Codeflow AI</span>
        </h1>
        
        <p className="text-md sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 animate-in slide-in-from-bottom duration-700 delay-200 leading-relaxed">
          Accelerate your development with AI-powered code suggestions, error detection, and smart completion.
        </p>
</div>
<div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 animate-in slide-in-from-bottom duration-700 delay-300">
  <button type="button" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-blue-500 text-white">
    <span>Start Coding Free</span>
    <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
  </button>

  <button type="button" className="inline-flex items-center justify-center gap-2 px-4 py-3 bg:white/5 backdrop-blur-sm rounded-lg border border-white/10 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white/10">
    <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
    <span>Watch Demo</span>
  </button>
</div>

       </div>
      </div>
       <div>
        <div>
      <div className="col-span-1 w-fulltext-blue-400"></div>
      
      </div>

      {/* codeflow ai */}
       <div className="bg-white/5 backdrop-blur-xl rounder-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10 relative">
           <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 backdrop-blur-small rounded-lg overflow-hidden h-[280px] w-full lg:h-[450px] border border-white/5">
            {/*IDE HEADER*/}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex gap-2 items-center">
              <span className="text-xs sm:text-sm text-red-500">
                CodeFlow AI
                </span>
                <ChevronDownIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"/>
              </div>
            </div>
      
            <div className="p-3 sm:p-4 h-full relative">
              {/*file tabs*/}
              <div className="flex space-x-1 sm:space-x-2 mb-3 sm:mb-4 overflow-x-auto">
              <button
                onClick={() => {
                  setActiveTab("App.tsx");
                }}
                className={`px-3 py-2 backdrop-blur-sm text-xs sm:text-sm rounded-t-lg border ${activeTab === 'App.tsx' ? 'bg-white/5' : 'hover:bg-white/10 text-gray-300'} transition-all duration-200 whitespace-nowrap`}
              >
                App.tsx
              </button> 
              <button 
                onClick={() => {
                  setActiveTab("Navbar.tsx");
                }}
                className={`px-3 py-2 backdrop-blur-sm text-xs sm:text-sm rounded-t-lg border ${activeTab === 'Navbar.tsx' ? 'bg-white/5' : 'hover:bg-white/10 text-gray-300'} transition-all duration-200 whitespace-nowrap`}
              >
                Navbar.tsx
              </button>
              <button 
                onClick={() => {
                  setActiveTab("Hero.tsx");
                }}
                className={`px-3 py-2 backdrop-blur-sm text-xs sm:text-sm rounded-t-lg border ${activeTab === 'Hero.tsx' ? 'bg-white/5' : 'hover:bg-white/10 text-gray-300'} transition-all duration-200 whitespace-nowrap`}
              >
                Hero.tsx
              </button>
              </div>

              {/*code content*/}
              <div className="relative overflow-hidden flex-grow">
                <SyntaxHighlighter language="javascript" style={vs2015}
                customStyle={{ margin: 0,
                  borderRadius: "8px",
                  fontSize: "11px",
                  lineHeight: "1.4",
                  height: "100%",
                  border: "1px solid #c3c3c3c",
                  width: "100%" }}
                className="h-full w-full">
                 {codeExamples[activeTab as keyof typeof codeExamples] || "Not Found"}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
           {/*Floating Cards*/}
           <div className={`hidden lg:block absolute bottom-4 right-4 transform translate-x-8 translate-y-8 w-72 ${currentFloatingCard.bgColor} backdrop-blur-xl rounded-lg p-4 shadow-2xl border border-white/20`}>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentFloatingCard.iconColor} mb-2`}>
                {currentFloatingCard.icon}
              </div>
              <h3 className={`text-sm font-semibold ${currentFloatingCard.textColor} mb-1`}>
                {currentFloatingCard.title}
              </h3>
              <p className={`text-xs ${currentFloatingCard.contentColor}`}>
                {currentFloatingCard.content}
              </p>
           </div>
        </div>
      </div>
      </div>
       </div>
    </section>
  );
}