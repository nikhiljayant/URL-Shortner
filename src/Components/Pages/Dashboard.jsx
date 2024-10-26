import React, { useEffect, useState } from "react";
// Dependency
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
// Icons
import { Filter } from "lucide-react";
// Components
import ErrorMessageDisplay from "../Partials/ErrorMessageDisplay";
import LinkCard from "../Partials/LinkCard";
// Context
import { UrlState } from "@/Context";
// Custom Hook
import useFetchData from "@/Hooks/useFetchData";
// DB
import { getUrls } from "@/db/apiUrls";
import { getClicksForUrls } from "@/db/apiClicks";
import CreateLinkModal from "./Modal/CreateLinkModal";

const Dashboard = () => {
  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    handleMakeGetCall: fnUrls,
  } = useFetchData(getUrls, user?.id);
  const {
    loading: loadingClicks,
    data: clicks,
    handleMakeGetCall: fnClicks,
  } = useFetchData(
    getClicksForUrls,
    urls?.map((url) => url?.id)
  );

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) {
      fnClicks();
    }
  }, [urls?.length]);

  const filteredURLs = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {loading ||
        (loadingClicks && <BarLoader width={"100%"} color="#36d7b7" />)}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-[#030817] text-white border-[#1F2937]">
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#030817] text-white border-[#1F2937]">
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold text-white">My Links</h1>
        {/* <Button>Create Link</Button> */}
        <CreateLinkModal />
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          className="bg-[#030817] border-[#1F2937] text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <ErrorMessageDisplay message={error?.message} />}

      {(filteredURLs || []).map((url, i) => {
        return <LinkCard key={i} url={url} fetchUrls={fnUrls} />;
      })}
    </div>
  );
};

export default Dashboard;
