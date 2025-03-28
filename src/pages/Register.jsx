
import { Layout } from "@/components/Layout";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { motion } from "framer-motion";

const Register = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-display font-bold">Create an Account</h1>
          <p className="text-muted-foreground mt-1">
            Register to access the annual report portal
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RegisterForm />
        </motion.div>
      </div>
    </Layout>
  );
};

export default Register;
