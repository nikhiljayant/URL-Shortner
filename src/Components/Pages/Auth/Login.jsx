import React, { useEffect, useState } from "react";
// Dependency
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import * as Yup from "yup";
import { BeatLoader } from "react-spinners";
import { useNavigate, useSearchParams } from "react-router-dom";
// Components
import ErrorMessageDisplay from "@/Components/Partials/ErrorMessageDisplay";
// Custom Hook
import useFetchData from "@/Hooks/useFetchData";
// DB
import { login } from "@/db/apiAuth";
import { UrlState } from "@/Context";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loginDetails, setLoginDetails] = useState({});
  const [error, setError] = useState([]);

  const {
    data,
    loading,
    error: err,
    handleMakeGetCall,
  } = useFetchData(login, loginDetails);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (err === null && data) {
      navigate(
        `/dashboard?${
          searchParams.get("createNew")
            ? `createNew=${searchParams.get("createNew")}`
            : ""
        }`
      );
      fetchUser();
    }
  }, [data, err]);

  const handleLoginDetailChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError([]);

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be 6 characters")
          .required("Password is required"),
      });

      await schema.validate(loginDetails, { abortEarly: false });

      // API Call
      await handleMakeGetCall();
    } catch (err) {
      const newErrors = {};

      err?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setError(newErrors);
    }
  };

  return (
    <Card className="bg-[#030817] text-white border-[#1F2937]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you already have one
        </CardDescription>
        {err && <ErrorMessageDisplay message={err?.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            className="bg-[#030817] border-[#1F2937]"
            value={loginDetails?.email ?? ""}
            onChange={handleLoginDetailChange}
          />
          {error.email && <ErrorMessageDisplay message={error.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            className="bg-[#030817] border-[#1F2937]"
            value={loginDetails?.password ?? ""}
            onChange={handleLoginDetailChange}
          />
          {error.password && <ErrorMessageDisplay message={error.password} />}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleLogin}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
