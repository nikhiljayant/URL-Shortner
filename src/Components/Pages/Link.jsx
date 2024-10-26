import React, { useEffect } from "react";
// Dependency
import { BarLoader, BeatLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
// Custom Hook
import useFetchData from "@/Hooks/useFetchData";
// DB
import { getClickForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
// Context
import { UrlState } from "@/Context";
// Icons
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// Components
import LocationStats from "../Partials/LocationStats";
import DeviceStats from "../Partials/DeviceStats";

const Link = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { user } = UrlState();

  const {
    loading,
    data: url,
    handleMakeGetCall: fn,
    error,
  } = useFetchData(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    handleMakeGetCall: fnStats,
  } = useFetchData(getClickForUrl, id);

  const { loading: loadingDelete, handleMakeGetCall: fnDelete } = useFetchData(
    deleteUrl,
    id
  );

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div className="text-white flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
            href={`https://trimrr.in/${link}`}
            target="_blank"
          >
            https://trimrr.in/{link}
          </a>
          <a
            className="flex items-center gap-1 hover:underline cursor-pointer"
            href={url?.original_url}
            target="_blank"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://trimrr.in/${url?.short_url}`
                )
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
              <Download />
            </Button>
            <Button variant="ghost" onClick={() => fnDelete()}>
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>

          <img
            src={url?.qr}
            alt="qr code"
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
          />
        </div>

        <Card className="sm:w-3/5 bg-[#030817] text-white border-[#1F2937]">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card className="bg-[#030817] border-[#1F2937] text-white">
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <LocationStats stats={stats} />
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Statistics yet"
                : "Loading Statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
