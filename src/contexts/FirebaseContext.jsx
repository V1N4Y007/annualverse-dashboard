
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  auth, 
  db 
} from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from "firebase/firestore";
import { toast } from "@/hooks/use-toast";

const FirebaseContext = createContext();

export function useFirebase() {
  return useContext(FirebaseContext);
}

export function FirebaseProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Authentication functions
  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      
      // Create a user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        displayName,
        role: "user",
        createdAt: new Date().toISOString()
      });
      
      toast({
        title: "Success",
        description: "Your account has been created"
      });
      
      return userCredential.user;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Success",
        description: "You have successfully logged in"
      });
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Success",
        description: "You have successfully logged out"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    }
  };
  
  // Department data functions
  const getDepartments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "departments"));
      const departments = [];
      querySnapshot.forEach((doc) => {
        departments.push({ id: doc.id, ...doc.data() });
      });
      return departments;
    } catch (error) {
      console.error("Error getting departments:", error);
      toast({
        title: "Error",
        description: "Failed to fetch departments",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const addDepartment = async (departmentData) => {
    try {
      const docRef = await addDoc(collection(db, "departments"), {
        ...departmentData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      toast({
        title: "Success",
        description: "Department added successfully"
      });
      
      return { id: docRef.id, ...departmentData };
    } catch (error) {
      console.error("Error adding department:", error);
      toast({
        title: "Error",
        description: "Failed to add department",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  // Report data functions
  const getReports = async (departmentId = null) => {
    try {
      let reportsQuery;
      
      if (departmentId) {
        reportsQuery = query(collection(db, "reports"), where("departmentId", "==", departmentId));
      } else {
        reportsQuery = collection(db, "reports");
      }
      
      const querySnapshot = await getDocs(reportsQuery);
      const reports = [];
      querySnapshot.forEach((doc) => {
        reports.push({ id: doc.id, ...doc.data() });
      });
      return reports;
    } catch (error) {
      console.error("Error getting reports:", error);
      toast({
        title: "Error",
        description: "Failed to fetch reports",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const addReport = async (reportData) => {
    try {
      const docRef = await addDoc(collection(db, "reports"), {
        ...reportData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      toast({
        title: "Success",
        description: "Report added successfully"
      });
      
      return { id: docRef.id, ...reportData };
    } catch (error) {
      console.error("Error adding report:", error);
      toast({
        title: "Error",
        description: "Failed to add report",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const updateReport = async (reportId, reportData) => {
    try {
      const reportRef = doc(db, "reports", reportId);
      await updateDoc(reportRef, {
        ...reportData,
        updatedAt: new Date().toISOString()
      });
      
      toast({
        title: "Success",
        description: "Report updated successfully"
      });
      
      return { id: reportId, ...reportData };
    } catch (error) {
      console.error("Error updating report:", error);
      toast({
        title: "Error",
        description: "Failed to update report",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  const deleteReport = async (reportId) => {
    try {
      await deleteDoc(doc(db, "reports", reportId));
      
      toast({
        title: "Success",
        description: "Report deleted successfully"
      });
      
      return true;
    } catch (error) {
      console.error("Error deleting report:", error);
      toast({
        title: "Error",
        description: "Failed to delete report",
        variant: "destructive"
      });
      throw error;
    }
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);
  
  const value = {
    currentUser,
    signup,
    login,
    logout,
    getDepartments,
    addDepartment,
    getReports,
    addReport,
    updateReport,
    deleteReport
  };
  
  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}
