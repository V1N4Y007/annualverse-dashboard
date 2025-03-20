
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { DepartmentCard } from "@/components/DepartmentCard";
import { ChartComponent } from "@/components/ChartComponent";
import { CustomizationPanel } from "@/components/CustomizationPanel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Users, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

// Sample data
const departments = [
  {
    id: "engineering",
    name: "Engineering",
    description: "Technical innovations and infrastructure development reports",
    reportCount: 8,
    lastUpdated: "2 days ago",
    color: "bg-blue-100",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Brand campaigns, market analysis and promotional activities",
    reportCount: 5,
    lastUpdated: "1 week ago",
    color: "bg-green-100",
  },
  {
    id: "finance",
    name: "Finance",
    description: "Financial statements, budgets, and fiscal performance analytics",
    reportCount: 12,
    lastUpdated: "3 days ago",
    color: "bg-amber-100",
  },
  {
    id: "hr",
    name: "Human Resources",
    description: "Workforce statistics, recruitment metrics, and employee development",
    reportCount: 7,
    lastUpdated: "1 day ago",
    color: "bg-purple-100",
  },
  {
    id: "research",
    name: "Research",
    description: "Academic papers, research findings, and innovation metrics",
    reportCount: 15,
    lastUpdated: "5 days ago",
    color: "bg-pink-100",
  },
  {
    id: "operations",
    name: "Operations",
    description: "Operational efficiency, process improvements, and logistics",
    reportCount: 9,
    lastUpdated: "2 weeks ago",
    color: "bg-indigo-100",
  },
];

const overviewData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
  { name: "Jun", value: 900 },
  { name: "Jul", value: 1000 },
  { name: "Aug", value: 1200 },
  { name: "Sep", value: 1100 },
  { name: "Oct", value: 1300 },
  { name: "Nov", value: 1500 },
  { name: "Dec", value: 1700 },
];

const departmentDistribution = [
  { name: "Engineering", value: 25 },
  { name: "Marketing", value: 15 },
  { name: "Finance", value: 20 },
  { name: "HR", value: 10 },
  { name: "Research", value: 30 },
];

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDepartments, setFilteredDepartments] = useState(departments);

  useEffect(() => {
    const filtered = departments.filter((dept) =>
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [searchQuery]);

  // Simulating loading complete
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Welcome to Annual Report Portal",
        description: "All data is loaded and ready for your review",
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <Layout>
      <div className="min-h-screen pt-16">
        <div className="mb-8">
          <div className="flex flex-col space-y-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge variant="outline" className="mb-2">Dashboard</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold tracking-tight"
            >
              Annual Report Portal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground"
            >
              Access, customize and integrate departmental reports in one place
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border shadow-soft">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center mb-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-display">Total Reports</CardTitle>
                  <CardDescription>All departmental reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">56</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">↑ 12%</span> from last year
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border shadow-soft">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg font-display">Departments</CardTitle>
                  <CardDescription>Active reporting departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">↑ 2</span> new this year
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="border shadow-soft">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-md bg-amber-100 flex items-center justify-center mb-2">
                    <BarChart className="w-5 h-5 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg font-display">Data Points</CardTitle>
                  <CardDescription>Total metrics analyzed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,284</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">↑ 18%</span> from last year
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="mb-8">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ChartComponent 
                    type="line" 
                    data={overviewData} 
                    title="Annual Reporting Activity" 
                  />
                  <ChartComponent 
                    type="pie" 
                    data={departmentDistribution} 
                    title="Department Distribution" 
                  />
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="departments" className="space-y-6">
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search departments or reports..."
                    className="w-full pl-10 pr-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                  {filteredDepartments.map((department, index) => (
                    <DepartmentCard
                      key={department.id}
                      id={department.id}
                      name={department.name}
                      description={department.description}
                      reportCount={department.reportCount}
                      lastUpdated={department.lastUpdated}
                      color={department.color}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <CustomizationPanel />
    </Layout>
  );
};

export default Index;
