import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeEditor } from "./CodeEditor";
import { AnalysisResults } from "./AnalysisResults";
import { Upload, Play, RotateCcw, FileCode, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DetectTab = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const sampleCodes = {
    javascript: `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (i === Math.floor(arr.length / 2)) continue;
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    python: `def fibonacci(n):
    if n <= 1:
        return n
    
    # Initialize first two fibonacci numbers
    a, b = 0, 1
    
    # Calculate fibonacci number iteratively
    for i in range(2, n + 1):
        c = a + b
        a = b
        b = c
    
    return b`,
    java: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1; // Element not found
    }
}`
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        aiProbability: Math.floor(Math.random() * 100),
        confidence: Math.random() > 0.5 ? "High" : "Medium",
        processingTime: (Math.random() * 3 + 0.5).toFixed(1),
        features: {
          stylistic: {
            score: Math.floor(Math.random() * 100),
            details: ["Consistent formatting", "Generic variable naming", "Perfect indentation"]
          },
          structural: {
            score: Math.floor(Math.random() * 100),
            details: ["Complex nested structures", "Optimal algorithm choice", "Standard patterns"]
          },
          statistical: {
            score: Math.floor(Math.random() * 100),
            details: ["Low perplexity", "High token predictability", "Uniform complexity"]
          }
        }
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Analysis completed in ${mockResult.processingTime}s`
      });
    }, 2000);
  };

  const handleSampleCode = (lang: string) => {
    setLanguage(lang);
    setCode(sampleCodes[lang as keyof typeof sampleCodes] || "");
    setAnalysisResult(null);
  };

  const handleClear = () => {
    setCode("");
    setAnalysisResult(null);
  };

  const charCount = code.length;
  const lineCount = code.split('\n').length;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Panel - Code Input */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-primary" />
              Code Input
            </CardTitle>
            
            {/* Controls */}
            <div className="flex flex-wrap gap-4">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={handleSampleCode}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Try Sample Code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">QuickSort (JS)</SelectItem>
                  <SelectItem value="python">Fibonacci (Python)</SelectItem>
                  <SelectItem value="java">Binary Search (Java)</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload File
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="h-[500px] flex flex-col">
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
              className="flex-1"
            />
            
            {/* Stats & Actions */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{charCount} characters</span>
                <span>{lineCount} lines</span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleClear}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || !code.trim()}
                  className="button-gradient"
                >
                  {isAnalyzing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Analyze Code
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Right Panel - Analysis Results */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnalysisResults 
          result={analysisResult} 
          isAnalyzing={isAnalyzing}
        />
      </motion.div>
    </div>
  );
};