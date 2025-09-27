import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileText, Download, BarChart3, Play, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BatchFile {
  id: string;
  name: string;
  size: string;
  status: "pending" | "analyzing" | "completed" | "error";
  aiProbability?: number;
  processingTime?: string;
}

export const BatchAnalysisTab = () => {
  const [files, setFiles] = useState<BatchFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = () => {
    // Simulate file upload
    const mockFiles: BatchFile[] = [
      { id: "1", name: "quicksort.js", size: "2.1 KB", status: "pending" },
      { id: "2", name: "fibonacci.py", size: "1.8 KB", status: "pending" },
      { id: "3", name: "BinarySearch.java", size: "3.2 KB", status: "pending" },
      { id: "4", name: "hashmap.cpp", size: "4.5 KB", status: "pending" },
      { id: "5", name: "linkedlist.go", size: "2.9 KB", status: "pending" }
    ];
    
    setFiles(mockFiles);
    toast({
      title: "Files Uploaded",
      description: `${mockFiles.length} files ready for analysis`
    });
  };

  const handleStartAnalysis = async () => {
    if (files.length === 0) return;
    
    setIsProcessing(true);
    setOverallProgress(0);
    
    // Simulate processing each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Update file status to analyzing
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: "analyzing" } : f
      ));
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Complete the file
      const aiProbability = Math.floor(Math.random() * 100);
      const processingTime = (Math.random() * 3 + 0.5).toFixed(1);
      
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { 
          ...f, 
          status: "completed",
          aiProbability,
          processingTime
        } : f
      ));
      
      setOverallProgress(((i + 1) / files.length) * 100);
    }
    
    setIsProcessing(false);
    toast({
      title: "Analysis Complete",
      description: "All files have been analyzed successfully"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "analyzing":
        return <Clock className="w-4 h-4 text-blue-400 animate-spin" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getAIStatusBadge = (probability?: number) => {
    if (probability === undefined) return null;
    
    if (probability < 30) {
      return <Badge className="bg-green-500/20 text-green-400">Human</Badge>;
    } else if (probability < 70) {
      return <Badge className="bg-yellow-500/20 text-yellow-400">Review</Badge>;
    } else {
      return <Badge className="bg-red-500/20 text-red-400">AI</Badge>;
    }
  };

  const completedFiles = files.filter(f => f.status === "completed");
  const avgAIProbability = completedFiles.length > 0 
    ? completedFiles.reduce((sum, f) => sum + (f.aiProbability || 0), 0) / completedFiles.length 
    : 0;

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Batch File Upload
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Drop files here or click to upload</p>
              <p className="text-muted-foreground mb-4">
                Supports .py, .js, .java, .cpp, .go files up to 10MB each
              </p>
              <Button onClick={handleFileUpload} className="button-gradient">
                Select Files
              </Button>
            </div>
            
            {files.length > 0 && (
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-muted-foreground">
                  {files.length} file(s) ready for analysis
                </p>
                <Button 
                  onClick={handleStartAnalysis}
                  disabled={isProcessing || files.length === 0}
                  className="button-gradient"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Analysis
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress Section */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle>Processing Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} />
                <p className="text-sm text-muted-foreground">
                  {completedFiles.length} of {files.length} files completed
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Summary Statistics */}
      {completedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="glass">
              <CardContent className="p-4 text-center">
                <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{completedFiles.length}</div>
                <div className="text-sm text-muted-foreground">Files Analyzed</div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{avgAIProbability.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Avg AI Probability</div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {completedFiles.filter(f => (f.aiProbability || 0) < 30).length}
                </div>
                <div className="text-sm text-muted-foreground">Likely Human</div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-400">
                  {completedFiles.filter(f => (f.aiProbability || 0) >= 70).length}
                </div>
                <div className="text-sm text-muted-foreground">Likely AI</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Results Table */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Analysis Results</CardTitle>
              {completedFiles.length > 0 && (
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export All Results
                </Button>
              )}
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>AI Probability</TableHead>
                    <TableHead>Processing Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="flex items-center gap-2">
                        {getStatusIcon(file.status)}
                        {file.name}
                      </TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {file.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {file.aiProbability !== undefined ? (
                          <div className="flex items-center gap-2">
                            <span>{file.aiProbability}%</span>
                            {getAIStatusBadge(file.aiProbability)}
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        {file.processingTime ? `${file.processingTime}s` : "-"}
                      </TableCell>
                      <TableCell>
                        {file.status === "completed" && (
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};