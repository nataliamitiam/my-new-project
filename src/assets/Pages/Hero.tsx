import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { codeExamples } from "../../Data/CodeExample";
import SyntaxHighlighter from "react-syntax-highlighter";
import { FloatingCard } from "../../components/cards/FloatingCard";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("App.tsx");

  useEffect(() => {
    function handleMouseMove(e) {
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

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="text-center">
        
      </div>
    <div>
        <div className="absolute w-5 h-5 bg-blue-500 rounded-full blur-xl animated-pulse"
          style={{
            backgroundColor: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.5), transparent 0%)`,
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
          }}
        />
      </div>
      <div className="relative order-2 w-full">
        <div className="relative bg-white/5 backdrop-blur-xl rounder-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10">
          <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 backdrop-blur-small rounded-lg overflow-hidden h-[280px] w-full lg:h[450px] border border-white/5">
            </div>
            {/*IDE HEADER*/}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex gap-2 item-center">
              <span className="text=xs sm:text-sm text-red-500">
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
                className={`px-3 py-2 backdrop-blur-sm text-xs sm:text-sm rounded-t-lg border ${activeTab === 'App.tsx' ? 'bg-white/5' : 'hover:bg-white/10 text-gray-300'}`} 
                transition-all duration-200 whitespace-nowrap
              >
                App.tsx
              </button> 
              <button 
              onClick={() => {
                setActiveTab("Navbar.tsx");
              }}
                className={`px-3 py-2 backdrop-blur-sm text-xs sm:text-sm rounded-t-lg border ${activeTab === 'Navbar.tsx' ? 'bg-white/5' : 'hover:bg-white/10 text-gray-300'}`} 
                transition-all duration-200 whitespace-nowrap
              >
                Navbar.tsx
              </button>
              <button 
              onClick={() => {
                setActiveTab("Hero.tsx");
              }}
                className={`px-3 py-2 backdrop-blur-sm text-xs sm:text-sm rounded-t-lg border ${activeTab === 'Hero.tsx' ? 'bg-white/5' : 'hover:bg-white/10 text-gray-300'}`} 
                transition-all duration-200 whitespace-nowrap
              >
                Hero.tsx
              </button>
              </div>

              {/*code content*/}
              <div className="relative overflow-hidden flex-grow">
                <SyntaxHighlighter language="javascript" style={{ background: 'transparent' }} 
                customStyle={{ margin: 0,
                  borderradius: "8px",
                  fontSize: "11px", 
                  lineHeight: "1.4",
                  height: "100%",
                  border: "1px solid #c3c3c3c",
                  width: "100%" }}
                className="h-full w-full">
                 {codeExamples[activeTab] || "Not Found"}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
           {/*Floating Cards*/}
           <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
           <FloatingCard title="AI Suggestions">
             Get real-time code suggestions and improvements.
           </FloatingCard>
           <FloatingCard title="Error Detection">
              Identify and fix errors as you code.
            </FloatingCard>
           <FloatingCard title="Smart Completion">
              Dynamic code examples that update with your interactions.
            </FloatingCard>
            </div>
      </div>
    </section>
  );
}