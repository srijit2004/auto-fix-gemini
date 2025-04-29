
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGeminiResponse } from "@/services/geminiService";
import { useToast } from "@/hooks/use-toast";

const AutoRepairAdvisor = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast({
        title: "Empty Question",
        description: "Please enter a car problem to get help.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await getGeminiResponse(question);
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
            🚗 Auto Repair Advisor
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="car-problem" className="font-medium text-gray-700">
                Describe your car problem:
              </label>
              <div className="flex space-x-2">
                <Input
                  id="car-problem"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g., My car makes a grinding noise when braking"
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Diagnose"}
                </Button>
              </div>
            </div>
          </form>

          {(isLoading || response) && (
            <div className="mt-6 border rounded-md p-4 bg-gray-50">
              <h3 className="font-medium text-gray-700 mb-2">
                Diagnosis & Repair Advice:
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
            Powered by Google Gemini AI • Ask about any car problem
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutoRepairAdvisor;
