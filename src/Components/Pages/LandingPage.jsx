import React, { useState } from "react";
// Shadcn UI Components
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// Dependency
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const [longUrl, setLongUrl] = useState("");

  const handleShortenURL = (e) => {
    e.preventDefault();

    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortner <br /> you&rsquo;ll ever need ! 👇
      </h2>
      <form
        onSubmit={handleShortenURL}
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          type="url"
          placeholder="Enter your looong URL"
          className="h-full flex-1 py-4 px-4"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button className="h-full" type="submit" variant="destructive">
          Shorten!
        </Button>
      </form>
      <img src="/banner.jpeg" alt="banner" className="w-full my-11 md:px-11" />

      <Accordion
        type="multiple"
        collapsible
        className="w-full my-11 md:px-11 text-white"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does Trimrr URL shortner works?
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long url, our system generates a shortner version
            of that URL. This shortned URL redirects to the original long URL
            when accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do you need an account to use the app?
          </AccordionTrigger>
          <AccordionContent>
            Yes, Creating an account allows you to manage your URLs, view
            analytics, and customize you short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What analytics are available for my shortned URLs?
          </AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, geolocation data of the clicks
            and device types (mobile/desktop) for each of your shortned URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
