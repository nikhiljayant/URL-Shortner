import React, { useEffect } from "react";
// Dependency
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
// DB
import { getLongUrl } from "@/db/apiUrls";
import { storeClicks } from "@/db/apiClicks";
// Custom Hook
import useFetchData from "@/Hooks/useFetchData";

const RedirectLink = () => {
  const { id } = useParams();

  const { loading, data, handleMakeGetCall: fn } = useFetchData(getLongUrl, id);

  const { loading: loadingStats, handleMakeGetCall: fnStats } = useFetchData(
    storeClicks,
    {
      id: data?.id,
      originalUrl: data?.original_url,
    }
  );

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <div className="text-white">
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </div>
    );
  }

  return null;
};

export default RedirectLink;
