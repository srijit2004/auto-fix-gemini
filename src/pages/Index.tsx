
import React from "react";
import AutoRepairAdvisor from "@/components/AutoRepairAdvisor";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            AI Chatbot
          </h1>
          <p className="text-gray-600">
            Ask any question and get intelligent answers
          </p>
        </header>
        
        <AutoRepairAdvisor />
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 AI Chatbot - College Project</p>
          <p className="text-xs mt-1">Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
