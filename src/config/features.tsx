import { Shield, Bot, FileSearch, BarChart3 } from "lucide-react";

export const features = [
  {
    title: "AI Code Detection",
    description: "Advanced machine learning algorithms analyze code patterns to identify AI-generated content with high accuracy.",
    icon: <Shield className="w-6 h-6" />,
    image: "/lovable-uploads/86329743-ee49-4f2e-96f7-50508436273d.png"
  },
  {
    title: "Code Humanization",
    description: "Transform AI-generated code to appear human-written while preserving functionality and performance.",
    icon: <Bot className="w-6 h-6" />,
    image: "/lovable-uploads/7335619d-58a9-41ad-a233-f7826f56f3e9.png"
  },
  {
    title: "Batch Analysis",
    description: "Process multiple files simultaneously with comprehensive reports and detailed analysis for large codebases.",
    icon: <FileSearch className="w-6 h-6" />,
    image: "/lovable-uploads/b6436838-5c1a-419a-9cdc-1f9867df073d.png"
  },
  {
    title: "Detailed Analytics",
    description: "In-depth analysis reports with confidence scores, feature breakdowns, and exportable results.",
    icon: <BarChart3 className="w-6 h-6" />,
    image: "/lovable-uploads/79f2b901-8a4e-42a5-939f-fae0828e0aef.png"
  }
];