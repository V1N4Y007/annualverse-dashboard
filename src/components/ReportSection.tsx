
import React, { useState } from "react";
import { ChevronDown, FileText, Download, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion, AnimatePresence } from "framer-motion";

interface ReportSectionProps {
  title: string;
  content: string;
  charts?: React.ReactNode;
}

export const ReportSection: React.FC<ReportSectionProps> = ({
  title,
  content,
  charts,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Card className="overflow-hidden border">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full"
        >
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <CardTitle className="text-lg font-display">{title}</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="w-4 h-4 mr-1" />
                  <span className="text-xs">Export</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Edit className="w-4 h-4 mr-1" />
                  <span className="text-xs">Edit</span>
                </Button>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
          </CardHeader>

          <CollapsibleContent>
            <CardContent className="pt-4">
              <div className="prose prose-sm max-w-none">
                <p className="text-sm text-muted-foreground">{content}</p>

                {charts && (
                  <div className="mt-4">
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {charts}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </motion.div>
  );
};
