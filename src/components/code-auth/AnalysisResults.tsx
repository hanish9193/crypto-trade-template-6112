import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock, Download, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AnalysisResultsProps {
  result: any;
  isAnalyzing: boolean;
}

export const AnalysisResults = ({ result, isAnalyzing }: AnalysisResultsProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["stylistic"]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getAIStatusColor = (probability: number) => {
    if (probability < 30) return "text-green-400";
    if (probability < 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getAIStatusBg = (probability: number) => {
    if (probability < 30) return "bg-green-500/20";
    if (probability < 70) return "bg-yellow-500/20";
    return "bg-red-500/20";
  };

  const getAIStatusLabel = (probability: number) => {
    if (probability < 30) return "Likely Human";
    if (probability < 70) return "Human Review Needed";
    return "Likely AI Generated";
  };

  const getAIStatusIcon = (probability: number) => {
    if (probability < 30) return CheckCircle;
    if (probability < 70) return AlertTriangle;
    return AlertTriangle;
  };

  if (isAnalyzing) {
    return (
      <Card className="glass h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-4"
            />
            <p className="text-lg font-medium mb-2">Analyzing Code...</p>
            <p className="text-muted-foreground">This may take a few seconds</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="glass h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <Eye className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Ready for Analysis</p>
            <p className="text-muted-foreground">Enter code and click "Analyze Code" to get started</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const StatusIcon = getAIStatusIcon(result.aiProbability);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StatusIcon className={cn("w-5 h-5", getAIStatusColor(result.aiProbability))} />
            Analysis Results
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* AI Probability Gauge */}
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted-foreground/20"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(result.aiProbability / 100) * 351.86} 351.86`}
                  className={getAIStatusColor(result.aiProbability)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={cn("text-2xl font-bold", getAIStatusColor(result.aiProbability))}>
                    {result.aiProbability}%
                  </div>
                  <div className="text-xs text-muted-foreground">AI Probability</div>
                </div>
              </div>
            </div>
            
            <Badge className={cn("mb-2", getAIStatusBg(result.aiProbability))}>
              {getAIStatusLabel(result.aiProbability)}
            </Badge>
            
            {result.aiProbability >= 30 && result.aiProbability < 70 && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-3">
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  Human Review Recommended
                </div>
              </div>
            )}
          </div>

          {/* Confidence & Processing Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Confidence</div>
              <div className="text-lg font-semibold">{result.confidence}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Processing Time</div>
              <div className="text-lg font-semibold">{result.processingTime}s</div>
            </div>
          </div>

          {/* Feature Breakdown */}
          <div className="space-y-4">
            <h3 className="font-semibold">Feature Analysis</h3>
            
            {Object.entries(result.features).map(([key, feature]: [string, any]) => (
              <div key={key} className="border border-border rounded-lg">
                <button
                  onClick={() => toggleSection(key)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="capitalize font-medium">{key} Analysis</div>
                    <Badge variant="outline">{feature.score}%</Badge>
                  </div>
                  {expandedSections.includes(key) ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                
                {expandedSections.includes(key) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-4 pb-4"
                  >
                    <Progress value={feature.score} className="mb-3" />
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {feature.details.map((detail: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};