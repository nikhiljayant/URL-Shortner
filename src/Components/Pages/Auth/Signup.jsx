import React, { useEffect, useState } from "react";
// Dependency
import { BeatLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
// Components
import ErrorMessageDisplay from "@/Components/Partials/ErrorMessageDisplay";
// DB
import { signup } from "@/db/apiAuth";
// Custom Hook
import useFetchData from "@/Hooks/useFetchData";
// Context
import { UrlState } from "@/Context";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [signupDetails, setSignupDetails] = useState({});
  const [error, setError] = useState([]);

  const {
    data,
    loading,
    error: err,
    handleMakeGetCall,
  } = useFetchData(signup, signupDetails);
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
    setSignupDetails({
      ...signupDetails,
      [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
    });
  };

  const handleSignup = async () => {
    setError([]);

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(signupDetails, { abortEarly: false });

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
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven&rsquo;t already
        </CardDescription>
        {err && <ErrorMessageDisplay message={err?.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            className="bg-[#030817] border-[#1F2937]"
            value={signupDetails?.name ?? ""}
            onChange={handleLoginDetailChange}
          />
          {error.name && <ErrorMessageDisplay message={error.name} />}
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            className="bg-[#030817] border-[#1F2937]"
            value={signupDetails?.email ?? ""}
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
            value={signupDetails?.password ?? ""}
            onChange={handleLoginDetailChange}
          />
          {error.password && <ErrorMessageDisplay message={error.password} />}
        </div>
        <div className="space-y-1">
          <Input
            name="profile_pic"
            type="file"
            accept="image/*"
            className="bg-[#030817] border-[#1F2937]"
            onChange={handleLoginDetailChange}
          />
          {error.profile_pic && (
            <ErrorMessageDisplay message={error.profile_pic} />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleSignup}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Signup"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
