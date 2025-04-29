
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGeminiResponse } from "@/services/geminiService";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const AutoRepairAdvisor = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please enter a prompt to get a response.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await getGeminiResponse(prompt);
      setResponse(result);
    } catch (error) {
      console.error("Error getting response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-center text-2xl text-blue-800">
            AI Chatbot
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="user-prompt" className="font-medium text-gray-700">
                Enter your prompt:
              </label>
              <Textarea
                id="user-prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask me anything..."
                className="min-h-[100px]"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="self-end flex items-center gap-2"
              >
                <Send size={16} />
                {isLoading ? "Processing..." : "Send"}
              </Button>
            </div>
          </form>

          {(isLoading || response) && (
            <div className="mt-6 border rounded-md p-4 bg-gray-50">
              <h3 className="font-medium text-gray-700 mb-2">
                Response:
              </h3>
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="text-gray-700 whitespace-pre-line">
                  {response}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 text-sm text-gray-500 text-center">
            Powered by Google Gemini AI
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoRepairAdvisor;
