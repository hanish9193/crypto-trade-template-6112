import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CodeEditor } from "./CodeEditor";
import { Bot, User, Download, RefreshCw, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const HumanizeTab = () => {
  const [originalCode, setOriginalCode] = useState("");
  const [humanizedCode, setHumanizedCode] = useState("");
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [humanizationStrength, setHumanizationStrength] = useState([50]);
  const [preserveFunctionality, setPreserveFunctionality] = useState(true);
  const [language, setLanguage] = useState("javascript");
  const { toast } = useToast();

  const sampleAICode = `function calculateFactorial(number) {
  if (number === 0 || number === 1) {
    return 1;
  }
  
  let result = 1;
  for (let i = 2; i <= number; i++) {
    result = result * i;
  }
  
  return result;
}

function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  
  return true;
}`;

  const handleHumanize = async () => {
    if (!originalCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to humanize",
        variant: "destructive"
      });
      return;
    }

    setIsHumanizing(true);
    
    // Simulate API call
    setTimeout(() => {
      const humanizedSample = `function calculateFactorial(n) {
  // Edge case: factorial of 0 and 1 is 1
  if (n <= 1) return 1;
  
  let factorial = 1;
  
  // Calculate factorial iteratively 
  for (let count = 2; count <= n; count++) {
    factorial *= count;
  }
  
  return factorial;
}

function isPrime(number) {
  // Numbers less than 2 are not prime
  if (number < 2) return false;
  
  // Check for factors up to square root
  const limit = Math.sqrt(number);
  for (let divisor = 2; divisor <= limit; divisor++) {
    if (number % divisor === 0) {
      return false;
    }
  }
  
  return true;
}`;
      
      setHumanizedCode(humanizedSample);
      setIsHumanizing(false);
      
      toast({
        title: "Humanization Complete",
        description: "Your code has been successfully humanized"
      });
    }, 3000);
  };

  const handleLoadSample = () => {
    setOriginalCode(sampleAICode);
    setHumanizedCode("");
  };

  const getStrengthLabel = (value: number) => {
    if (value < 33) return "Light";
    if (value < 66) return "Medium";
    return "Aggressive";
  };

  const getStrengthDescription = (value: number) => {
    if (value < 33) return "Minimal changes, subtle human touches";
    if (value < 66) return "Moderate changes, variable naming and comments";
    return "Significant changes, restructuring and style variations";
  };

  return (
    <div className="space-y-8">
      {/* Controls Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              Humanization Settings
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Humanization Strength */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Humanization Strength</label>
                  <Badge variant="outline">
                    {getStrengthLabel(humanizationStrength[0])}
                  </Badge>
                </div>
                <Slider
                  value={humanizationStrength}
                  onValueChange={setHumanizationStrength}
                  max={100}
                  step={1}
                  className="mb-2"
                />
                <p className="text-xs text-muted-foreground">
                  {getStrengthDescription(humanizationStrength[0])}
                </p>
              </div>

              {/* Preserve Functionality */}
              <div className="flex items-center space-x-3">
                <Switch
                  checked={preserveFunctionality}
                  onCheckedChange={setPreserveFunctionality}
                  disabled
                />
                <div>
                  <label className="text-sm font-medium">Preserve Functionality</label>
                  <p className="text-xs text-muted-foreground">Always enabled for safety</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleHumanize}
                disabled={isHumanizing || !originalCode.trim()}
                className="button-gradient"
              >
                {isHumanizing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Humanizing...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Humanize Code
                  </>
                )}
              </Button>
              
              <Button variant="outline" onClick={handleLoadSample}>
                Load Sample AI Code
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Code Comparison Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Original Code */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-red-400" />
                Original AI Code
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <CodeEditor
                value={originalCode}
                onChange={setOriginalCode}
                language={language}
                className="h-[500px]"
              />
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  {originalCode.split('\n').length} lines
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Humanized Code */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-green-400" />
                Humanized Code
                {humanizedCode && (
                  <Badge className="bg-green-500/20 text-green-400 ml-auto">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Ready
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {humanizedCode ? (
                <>
                  <CodeEditor
                    value={humanizedCode}
                    onChange={() => {}} // Read only
                    language={language}
                    className="h-[500px]"
                    readOnly
                  />
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      {humanizedCode.split('\n').length} lines
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" className="button-gradient">
                        Test with Detector
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-[500px] flex items-center justify-center border border-border rounded-lg bg-muted/5">
                  <div className="text-center">
                    <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Humanized Code Will Appear Here</p>
                    <p className="text-muted-foreground">
                      Enter code on the left and click "Humanize Code"
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};