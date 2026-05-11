import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Contacts } from "./Contacts";
import { Organization } from "./Organizations";
import { Products } from "./Products";
import { Category } from "./Category";
import { Estimates } from "./Estimates";

const tabs = [
    { title: "Contacts", element: <Contacts/> },
    { title: "Organizations", element: <Organization /> },
    { title: "Products", element: <Products /> },
    { title: "Category", element: <Category /> },
    { title: "Estimates", element: <Estimates /> }

]

export const Forms = () => {
      const [activeTab, setActiveTab] = useState<any>("Contacts");

      const currentTabData = tabs.find(tab => tab.title === activeTab);

    return (
    <div className="flex justify-center py-8">
        <div className="w-full">
            <div className="bg-white/5 backdrop-blur-xl rounder-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10 relative">
                <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 backdrop-blur-small rounded-lg overflow-hidden h-full w-full border border-white/5">
                    <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">
                                Rendering: {activeTab}
                            </span>
                        <div className="flex gap-2 items-center">
                            <span className="text-xs sm:text-sm text-red-500">
                                This is the Forms tabs
                            </span>
                            <ChevronDownIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"/>
                        </div>
                    </div>

                    <div className="p-3 h-full relative">
                        <div className="flex space-x-1 overflow-x-auto border-b">
                            {tabs.map((tabs) => (
                                <button
                                    onClick={() => setActiveTab(tabs.title)}
                                    className={`px-3 py-2 backdrop-blur-sm text-xs rounded-t-lg border-x border-t ${activeTab === tabs.title
                                    ? 'bg-white/5'
                                    : 'hover:bg-white/10 text-gray-300'}
                                    transition-all durattion-200 whitespace-nowrap`}>
                                        {tabs.title}
                                </button>
                            ))}
                        </div>

                        <div className="relative overflow-hiddeen flex-grow">
                            <div className="flex-grow overflow-y-auto p-6 bg-white/5">
                            {currentTabData ? currentTabData.element : <div className="text-white">Not Found</div>}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}