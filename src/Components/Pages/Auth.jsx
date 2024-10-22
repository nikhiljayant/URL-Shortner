import React, { useEffect } from "react";
// Dependency
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Components
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
// Context
import { UrlState } from "@/Context";

const Auth = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(
        `/dashboard?${
          searchParams.get("createNew")
            ? `createNew=${searchParams.get("createNew")}`
            : ""
        }`
      );
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="mt-20 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold text-white">
        {searchParams.get("createNew")
          ? "Hold up! Let's Login first.."
          : "Login / Signup"}
      </h1>

      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
