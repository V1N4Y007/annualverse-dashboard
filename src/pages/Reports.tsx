
import { Layout } from "@/components/Layout";
import { DepartmentCard } from "@/components/DepartmentCard";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Filter } from "lucide-react";
import { motion } from "framer-motion";

// Sample data for departments
const departments = [
  {
    id: "eng",
    name: "Engineering",
    description: "Reports from the Engineering department covering research projects and technical achievements.",
    reportCount: 12,
    lastUpdated: "2 days ago",
    color: "bg-blue-100"
  },
  {
    id: "sci",
    name: "Science",
    description: "Annual publications and research outcomes from all Science disciplines.",
    reportCount: 8,
    lastUpdated: "5 days ago",
    color: "bg-green-100"
  },
  {
    id: "med",
    name: "Medical",
    description: "Clinical research reports and healthcare initiatives from the Medical faculty.",
    reportCount: 15,
    lastUpdated: "1 day ago",
    color: "bg-red-100"
  },
  {
    id: "hum",
    name: "Humanities",
    description: "Publications, conferences and cultural activities from the Humanities departments.",
    reportCount: 6,
    lastUpdated: "1 week ago",
    color: "bg-yellow-100"
  },
  {
    id: "bus",
    name: "Business",
    description: "Economic analysis, business case studies and financial reports.",
    reportCount: 10,
    lastUpdated: "3 days ago",
    color: "bg-purple-100"
  },
  {
    id: "art",
    name: "Arts",
    description: "Creative exhibitions, performances and cultural contributions.",
    reportCount: 7,
    lastUpdated: "4 days ago",
    color: "bg-orange-100"
  }
];

const Reports = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-display font-bold">Department Reports</h1>
            <p className="text-muted-foreground mt-1">
              Access and manage reports from all departments
            </p>
          </motion.div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
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
    </Layout>
  );
};

export default Reports;
