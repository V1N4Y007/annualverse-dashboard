
import React, { useState } from "react";
import { Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

interface CustomizationPanelProps {
  onExportPDF?: () => void;
  onExportExcel?: () => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  onExportPDF,
  onExportExcel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chartType, setChartType] = useState("bar");
  const [includeImages, setIncludeImages] = useState(true);
  const [fontSize, setFontSize] = useState([14]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 w-72 bg-white/90 backdrop-blur-md shadow-medium rounded-lg border p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Customize Report</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Separator className="mb-3" />
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chart-type">Chart Type</Label>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger id="chart-type">
                    <SelectValue placeholder="Select chart type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size">Font Size</Label>
                  <span className="text-xs text-muted-foreground">{fontSize}px</span>
                </div>
                <Slider
                  id="font-size"
                  min={10}
                  max={20}
                  step={1}
                  value={fontSize}
                  onValueChange={setFontSize}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-images">Include Images</Label>
                  <Switch
                    id="include-images"
                    checked={includeImages}
                    onCheckedChange={setIncludeImages}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={onExportPDF}
                >
                  Export as PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={onExportExcel}
                >
                  Export as Excel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon"
          className="rounded-full shadow-soft h-12 w-12"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
};
