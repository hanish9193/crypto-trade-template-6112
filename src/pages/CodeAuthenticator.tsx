import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DetectTab } from "@/components/code-auth/DetectTab";
import { HumanizeTab } from "@/components/code-auth/HumanizeTab";
import { BatchAnalysisTab } from "@/components/code-auth/BatchAnalysisTab";
import { AboutTab } from "@/components/code-auth/AboutTab";
import { Shield, Bot, FileSearch, Info } from "lucide-react";

const CodeAuthenticator = () => {
  const [activeTab, setActiveTab] = useState("detect");

  // Handle tab deep-linking from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['detect', 'humanize', 'batch', 'about'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  // Update URL when tab changes
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', newTab);
    window.history.replaceState({}, '', url.toString());
  };

  const tabItems = [
    { id: "detect", label: "Detect", icon: Shield },
    { id: "humanize", label: "Humanize", icon: Bot },
    { id: "batch", label: "Batch Analysis", icon: FileSearch },
    { id: "about", label: "About", icon: Info }
  ];

  return (
    <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative container px-4 pt-40 pb-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 px-4 py-2 rounded-full glass"
          >
            <span className="text-sm font-medium">
              <Shield className="w-4 h-4 inline-block mr-2" />
              AI Code Detection & Humanization
            </span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            Code Authenticator
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Advanced AI detection and humanization for code authenticity analysis. 
            Perfect for developers, educators, and hiring managers.
          </motion.p>
        </div>
      </motion.section>

      {/* Main Application */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="container px-4 pb-20"
      >
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4 glass mb-8">
              {tabItems.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.id}
                    value={tab.id} 
                    className="flex items-center gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="detect" className="mt-8">
              <DetectTab />
            </TabsContent>
            
            <TabsContent value="humanize" className="mt-8">
              <HumanizeTab />
            </TabsContent>
            
            <TabsContent value="batch" className="mt-8">
              <BatchAnalysisTab />
            </TabsContent>
            
            <TabsContent value="about" className="mt-8">
              <AboutTab />
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default CodeAuthenticator;