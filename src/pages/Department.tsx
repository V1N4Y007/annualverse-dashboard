
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ReportSection } from "@/components/ReportSection";
import { ChartComponent } from "@/components/ChartComponent";
import { CustomizationPanel } from "@/components/CustomizationPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, FileText, Share, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

// Sample data
const departmentsData = {
  engineering: {
    name: "Engineering Department",
    description: "Technical innovations and infrastructure development",
    color: "bg-blue-100",
    sections: [
      {
        id: "overview",
        title: "Engineering Overview",
        content: "The Engineering Department focused on three key areas this year: infrastructure scalability, innovation in product development, and technical debt reduction. Our team of 125 engineers delivered 48 major features across our product suite while maintaining a 99.9% uptime for all services.",
        chartType: "bar",
        chartData: [
          { name: "Infrastructure", value: 42 },
          { name: "Product Dev", value: 28 },
          { name: "Research", value: 18 },
          { name: "Tech Debt", value: 12 },
        ],
        chartTitle: "Engineering Focus Distribution",
      },
      {
        id: "achievements",
        title: "Key Achievements",
        content: "Successfully migrated our core infrastructure to a microservices architecture, resulting in a 35% improvement in deployment frequency and a 42% reduction in mean time to recovery (MTTR). Launched 5 new product features that increased user engagement by 28% and reduced churn by 15%.",
        chartType: "line",
        chartData: [
          { name: "Q1", value: 35 },
          { name: "Q2", value: 42 },
          { name: "Q3", value: 58 },
          { name: "Q4", value: 75 },
        ],
        chartTitle: "Quarterly Performance Metrics",
      },
      {
        id: "innovation",
        title: "Innovation Initiatives",
        content: "The department initiated 12 research projects exploring emerging technologies including AI-assisted development, quantum computing applications, and advanced cryptography. Three projects have already been integrated into our product roadmap for the coming year.",
        chartType: "pie",
        chartData: [
          { name: "AI Development", value: 45 },
          { name: "Quantum Computing", value: 20 },
          { name: "Cryptography", value: 25 },
          { name: "Other", value: 10 },
        ],
        chartTitle: "Research Project Distribution",
      },
    ],
  },
  marketing: {
    name: "Marketing Department",
    description: "Brand campaigns, market analysis and promotional activities",
    color: "bg-green-100",
    sections: [
      {
        id: "overview",
        title: "Marketing Overview",
        content: "The Marketing Department executed 15 major campaigns across digital and traditional channels, resulting in a 22% increase in brand awareness and a 18% growth in qualified leads. Our team of 45 marketing professionals managed a budget of $3.8M with an average ROI of 215%.",
        chartType: "bar",
        chartData: [
          { name: "Digital", value: 65 },
          { name: "Print", value: 15 },
          { name: "Events", value: 12 },
          { name: "Other", value: 8 },
        ],
        chartTitle: "Marketing Budget Allocation",
      },
      {
        id: "campaigns",
        title: "Campaign Performance",
        content: "Our flagship product launch campaign generated 85,000 new leads and contributed to a 32% increase in sales within the first quarter. Social media engagement increased by 45% year-over-year, with our content reaching over 2.5 million unique users.",
        chartType: "line",
        chartData: [
          { name: "Jan", value: 30 },
          { name: "Feb", value: 35 },
          { name: "Mar", value: 45 },
          { name: "Apr", value: 72 },
          { name: "May", value: 56 },
          { name: "Jun", value: 48 },
        ],
        chartTitle: "Campaign Performance Trend",
      },
    ],
  },
  finance: {
    name: "Finance Department",
    description: "Financial statements, budgets, and fiscal performance analytics",
    color: "bg-amber-100",
    sections: [
      {
        id: "overview",
        title: "Financial Overview",
        content: "The Finance Department oversaw a total operating budget of $127M, achieving a 5.8% reduction in overhead costs while supporting a 18% growth in company operations. The department implemented new automated reporting systems that reduced month-end closing time by 40%.",
        chartType: "bar",
        chartData: [
          { name: "Q1", value: 28 },
          { name: "Q2", value: 32 },
          { name: "Q3", value: 35 },
          { name: "Q4", value: 42 },
        ],
        chartTitle: "Quarterly Revenue (in $M)",
      },
    ],
  },
  hr: {
    name: "Human Resources",
    description: "Workforce statistics, recruitment metrics, and employee development",
    color: "bg-purple-100",
    sections: [
      {
        id: "overview",
        title: "HR Overview",
        content: "The Human Resources department successfully managed talent acquisition and retention for our growing workforce of 850 employees. We implemented new diversity and inclusion initiatives that increased diversity hiring by 28% and improved employee satisfaction scores by 15 points.",
        chartType: "pie",
        chartData: [
          { name: "Engineering", value: 40 },
          { name: "Sales", value: 25 },
          { name: "Marketing", value: 15 },
          { name: "Operations", value: 12 },
          { name: "Other", value: 8 },
        ],
        chartTitle: "Employee Distribution by Department",
      },
    ],
  },
  research: {
    name: "Research Department",
    description: "Academic papers, research findings, and innovation metrics",
    color: "bg-pink-100",
    sections: [
      {
        id: "overview",
        title: "Research Overview",
        content: "The Research Department produced 28 peer-reviewed publications and filed 15 patent applications. Our team of 35 researchers collaborated with 8 leading universities and research institutions on cutting-edge projects in artificial intelligence, materials science, and quantum computing.",
        chartType: "bar",
        chartData: [
          { name: "AI", value: 45 },
          { name: "Materials", value: 25 },
          { name: "Quantum", value: 20 },
          { name: "Other", value: 10 },
        ],
        chartTitle: "Research Focus Areas",
      },
    ],
  },
  operations: {
    name: "Operations Department",
    description: "Operational efficiency, process improvements, and logistics",
    color: "bg-indigo-100",
    sections: [
      {
        id: "overview",
        title: "Operations Overview",
        content: "The Operations Department improved supply chain efficiency by 23% through the implementation of advanced logistics software and process reengineering. Our team managed 12 global facilities and reduced operational costs by 8.5% while improving delivery times by 17%.",
        chartType: "line",
        chartData: [
          { name: "Jan", value: 80 },
          { name: "Feb", value: 82 },
          { name: "Mar", value: 85 },
          { name: "Apr", value: 90 },
          { name: "May", value: 92 },
          { name: "Jun", value: 95 },
        ],
        chartTitle: "Operational Efficiency Score",
      },
    ],
  },
};

const Department = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [department, setDepartment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      if (id && departmentsData[id as keyof typeof departmentsData]) {
        setDepartment(departmentsData[id as keyof typeof departmentsData]);
      }
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleExportPDF = () => {
    toast({
      title: "Export Started",
      description: "Preparing PDF export of the report",
    });
    // In a real application, this would trigger a PDF export
  };

  const handleExportExcel = () => {
    toast({
      title: "Export Started",
      description: "Preparing Excel export of the report data",
    });
    // In a real application, this would trigger an Excel export
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-64 rounded-md bg-muted"></div>
            <div className="h-4 w-96 rounded-md bg-muted"></div>
            <div className="h-64 w-full max-w-4xl rounded-md bg-muted"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!department) {
    return (
      <Layout>
        <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Department Not Found</h1>
          <p className="text-muted-foreground mb-8">The department you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link to="/">Return to Dashboard</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="flex flex-col space-y-1">
            <Badge variant="outline" className={`mb-2 ${department.color} w-fit`}>
              Department Report
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">{department.name}</h1>
            <p className="text-muted-foreground">{department.description}</p>
          </div>

          <Card className="mt-6 shadow-soft bg-white/70 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Report
                </Button>
                <Button variant="outline" size="sm" className="h-9">
                  <Share className="mr-2 h-4 w-4" />
                  Share Report
                </Button>
                <Button variant="outline" size="sm" className="h-9">
                  <Edit className="mr-2 h-4 w-4" />
                  Request Edit Access
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6 pb-12">
          {department.sections.map((section: any) => (
            <ReportSection
              key={section.id}
              title={section.title}
              content={section.content}
              charts={
                <div className="mt-6">
                  <ChartComponent
                    type={section.chartType}
                    data={section.chartData}
                    title={section.chartTitle}
                  />
                </div>
              }
            />
          ))}
        </div>
      </div>

      <CustomizationPanel
        onExportPDF={handleExportPDF}
        onExportExcel={handleExportExcel}
      />
    </Layout>
  );
};

export default Department;
