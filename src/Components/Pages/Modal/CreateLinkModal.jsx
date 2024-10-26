import React, { useEffect, useRef, useState } from "react";
// Dependency
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card } from "@/Components/ui/card";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
// Context
import { UrlState } from "@/Context";
// Components
import ErrorMessageDisplay from "@/Components/Partials/ErrorMessageDisplay";
// Custom Hook
import useFetchData from "@/Hooks/useFetchData";
// DB
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const CreateLinkModal = () => {
  const { user } = UrlState();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const ref = useRef();

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longURL: longLink ? longLink : "",
    customURL: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longURL: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customURL: yup.string(),
  });

  const handleChange = (e) => {
    // e.target.id works the same way as e.target.name
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    handleMakeGetCall: fnCreateURL,
  } = useFetchData(createUrl, { ...formValues, user_id: user.id });

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  const createNewLink = async () => {
    setErrors([]);

    try {
      await schema.validate(formValues, { abortEarly: false });

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateURL(blob);
    } catch (error) {
      const newErrors = {};

      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#030817] text-white">
        <DialogHeader className="space-y-4">
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>

        {formValues.longURL && (
          <QRCode value={formValues?.longURL} size={250} ref={ref} />
        )}

        <Input
          id="title"
          placeholder="Short Link's Title"
          className="bg-[#030817] outline-none border-[#1F2937]"
          value={formValues.title}
          onChange={handleChange}
        />
        {errors.title && <ErrorMessageDisplay message={errors.title} />}

        <Input
          id="longURL"
          placeholder="Enter your looooong URL"
          className="bg-[#030817] outline-none border-[#1F2937]"
          value={formValues.longURL}
          onChange={handleChange}
        />
        {errors.longURL && <ErrorMessageDisplay message={errors.longURL} />}

        <div className="flex items-center gap-2 text-white">
          <Card className="bg-[#030817] text-white p-2 border-[#1F2937]">
            trimrr.in
          </Card>{" "}
          /
          <Input
            id="customURL"
            placeholder="Custom link (Optional)"
            className="bg-[#030817] outline-none border-[#1F2937]"
            value={formValues.customURL}
            onChange={handleChange}
          />
        </div>
        {error && <ErrorMessageDisplay message={error.message} />}

        <DialogFooter className="sm:justify-start">
          <Button
            disabled={loading}
            onClick={createNewLink}
            variant="destructive"
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLinkModal;
