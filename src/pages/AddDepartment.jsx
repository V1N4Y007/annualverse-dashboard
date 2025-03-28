
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useFirebase } from "@/contexts/FirebaseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { motion } from "framer-motion";

const colorOptions = [
  { name: "Blue", value: "bg-blue-100" },
  { name: "Green", value: "bg-green-100" },
  { name: "Amber", value: "bg-amber-100" },
  { name: "Purple", value: "bg-purple-100" },
  { name: "Pink", value: "bg-pink-100" },
  { name: "Indigo", value: "bg-indigo-100" },
  { name: "Red", value: "bg-red-100" },
  { name: "Orange", value: "bg-orange-100" },
];

const AddDepartment = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("bg-blue-100");
  const [loading, setLoading] = useState(false);
  const { addDepartment, currentUser } = useFirebase();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !description) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Generate a URL-friendly ID from the name
      const id = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      
      await addDepartment({
        id,
        name,
        description,
        color,
        createdBy: currentUser.uid,
      });
      
      navigate("/reports");
    } catch (error) {
      console.error("Error adding department:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-display font-bold"
          >
            Add New Department
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Create a new department to organize reports
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Department Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Department Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Engineering"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the department"
                    required
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`h-12 rounded-md cursor-pointer transition-all ${
                          option.value
                        } ${
                          color === option.value
                            ? "ring-2 ring-primary ring-offset-2"
                            : "hover:ring-1 hover:ring-primary/50"
                        }`}
                        onClick={() => setColor(option.value)}
                        title={option.name}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    "Creating Department..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Department
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AddDepartment;
