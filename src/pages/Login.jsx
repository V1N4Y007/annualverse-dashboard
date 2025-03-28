
import { Layout } from "@/components/Layout";
import { LoginForm } from "@/components/auth/LoginForm";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-display font-bold">Sign In</h1>
          <p className="text-muted-foreground mt-1">
            Access your account to manage reports and departments
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LoginForm />
        </motion.div>
      </div>
    </Layout>
  );
};

export default Login;
