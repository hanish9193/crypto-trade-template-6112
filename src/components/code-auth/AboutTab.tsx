import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Brain, 
  Target, 
  AlertTriangle, 
  BookOpen, 
  Mail, 
  ExternalLink,
  TrendingUp,
  Users,
  Code,
  Clock
} from "lucide-react";

export const AboutTab = () => {
  const accuracyMetrics = [
    { language: "JavaScript", accuracy: 94 },
    { language: "Python", accuracy: 92 },
    { language: "Java", accuracy: 90 },
    { language: "C++", accuracy: 88 },
    { language: "Go", accuracy: 85 }
  ];

  const features = [
    {
      icon: Brain,
      title: "Machine Learning Detection",
      description: "Advanced ML models trained on millions of code samples to identify AI patterns."
    },
    {
      icon: Code,
      title: "Multi-Language Support",
      description: "Supports JavaScript, Python, Java, C++, Go, and more programming languages."
    },
    {
      icon: Target,
      title: "High Accuracy",
      description: "90%+ accuracy rates across all supported programming languages."
    },
    {
      icon: Clock,
      title: "Real-time Analysis",
      description: "Get results in seconds with our optimized analysis pipeline."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your code is never stored permanently and is processed securely."
    },
    {
      icon: Users,
      title: "Enterprise Ready",
      description: "Scalable solution for teams, educational institutions, and enterprises."
    }
  ];

  const limitations = [
    "Detection accuracy may vary with code complexity and length",
    "False positives can occur with very standardized or tutorial-like human code",
    "Limited effectiveness on heavily obfuscated or minimized code",
    "Requires sufficient code context (minimum 10-20 lines recommended)",
    "Performance may vary across different coding styles and paradigms"
  ];

  const ethicalConsiderations = [
    "Should not be the sole factor in academic or employment decisions",
    "Human review is always recommended for important determinations",
    "Consider context and purpose of code analysis",
    "Respect privacy and consent when analyzing others' code",
    "Use as a supplementary tool, not a replacement for judgment"
  ];

  return (
    <div className="space-y-8">
      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              How It Works
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Code Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our system analyzes syntax patterns, naming conventions, and structural characteristics
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">ML Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning models trained on vast datasets identify AI-generated patterns
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Confidence Score</h3>
                <p className="text-sm text-muted-foreground">
                  Generate probability scores with detailed feature breakdown and confidence levels
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-muted/5 border border-border"
                  >
                    <Icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Accuracy Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Accuracy Benchmarks
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {accuracyMetrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium">{metric.language}</div>
                  <div className="flex-1">
                    <Progress value={metric.accuracy} className="h-2" />
                  </div>
                  <div className="w-12 text-sm text-muted-foreground">{metric.accuracy}%</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-400">
                <strong>Note:</strong> Accuracy metrics based on controlled testing with diverse code samples. 
                Real-world performance may vary depending on code characteristics and context.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Limitations & Ethics */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Limitations
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3">
                {limitations.map((limitation, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{limitation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="glass h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Ethical Considerations
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3">
                {ethicalConsiderations.map((consideration, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{consideration}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* API Documentation & Contact */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                API Documentation
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Integrate our AI detection capabilities into your applications with our RESTful API.
              </p>
              
              <div className="space-y-2">
                <Badge variant="outline">POST /api/v1/detect</Badge>
                <Badge variant="outline">POST /api/v1/humanize</Badge>
                <Badge variant="outline">POST /api/v1/batch-analyze</Badge>
              </div>
              
              <Button variant="outline" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Full Documentation
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Contact & Feedback
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Have questions, feedback, or need enterprise support? We'd love to hear from you.
              </p>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  support@codeauthenticator.com
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Enterprise Solutions
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};