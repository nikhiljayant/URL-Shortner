import React from "react";
// Dependency
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
// Context
import { UrlState } from "@/Context";
// Components
import ErrorMessageDisplay from "@/Components/Partials/ErrorMessageDisplay";

const CreateLinkModal = () => {
  const { user } = UrlState();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive">Create New Link</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New</DialogTitle>

            <Input id="title" placeholder="Short Link's Title" />
            <ErrorMessageDisplay message={"Something went wrong"} />

            <Input id="title" placeholder="Enter your looooong URL" />
            <ErrorMessageDisplay message={"Something went wrong"} />

            <Input id="title" placeholder="Custom link (Optional)" />
            <ErrorMessageDisplay message={"Something went wrong"} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLinkModal;
