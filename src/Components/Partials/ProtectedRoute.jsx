import React, { useEffect } from "react";
// Dependency
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
// Context
import { UrlState } from "@/Context";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && loading === false) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading]);

  if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
