
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "@/contexts/FirebaseContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut, Settings, FileText, BarChart } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Safely access Firebase context
  let currentUser = null;
  let logout = async () => {
    console.log("Logout function not available yet");
    navigate("/login");
  };
  
  try {
    const firebase = useFirebase();
    currentUser = firebase?.currentUser;
    if (firebase?.logout) {
      logout = firebase.logout;
    }
  } catch (error) {
    console.error("Firebase context not available:", error);
  }
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-display font-bold">
              Annual Report Portal
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex space-x-4 items-center">
              <Link to="/" className="hover:text-primary/80 transition-colors px-3 py-2">
                Dashboard
              </Link>
              <Link to="/reports" className="hover:text-primary/80 transition-colors px-3 py-2">
                Reports
              </Link>
              <Link to="/settings" className="hover:text-primary/80 transition-colors px-3 py-2">
                Settings
              </Link>
              
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {currentUser.displayName || currentUser.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="ghost" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button onClick={() => navigate("/register")}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMobile && isOpen && (
          <div className="py-4 px-2 border-t">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="px-3 py-2 rounded-md hover:bg-muted transition-colors"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/reports"
                className="px-3 py-2 rounded-md hover:bg-muted transition-colors"
                onClick={toggleMenu}
              >
                Reports
              </Link>
              <Link
                to="/settings"
                className="px-3 py-2 rounded-md hover:bg-muted transition-colors"
                onClick={toggleMenu}
              >
                Settings
              </Link>
              
              {currentUser ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                    {currentUser.displayName || currentUser.email}
                  </div>
                  <Button variant="outline" onClick={handleLogout} className="justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Button variant="outline" onClick={() => { navigate("/login"); toggleMenu(); }}>
                    Login
                  </Button>
                  <Button onClick={() => { navigate("/register"); toggleMenu(); }}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
