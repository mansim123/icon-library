"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Searching } from "@/redux/features/search-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

export default function Search() {
  const [searchName, setSearchName] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setSearchName(newName);
  };

  useEffect(() => {
    // Dispatch the action after the state has been updated
    dispatch(Searching(searchName));
  }, [searchName, dispatch]);

  const { setTheme } = useTheme();
  const [whichMode, setWhichMode] = useState("light");
  setTheme(whichMode);

  const onDarkModeToggle = (value: string) => {
    setWhichMode(value);
    setTheme(whichMode);
  };

  return (
    <section className="py-6 px-6 bg-secondary w-full flex items-center justify-center flex-col">
      <h2 className="text-[0.9rem] pb-1 inter font-bold text-center text-[#596DED] tracking-[0.4rem] uppercase">
        <span className="text-[#5B5B5B]">Welcome to</span> SHINKō LABS?
      </h2>
      <h1 className="text-[1.6rem] inter font-bold text-center text-[#000000]">
        Unleash Your Creativity: 1,000+ Professionally Designed<br></br> Icons
        for UI and Game Design.{" "}
      </h1>
      <p className="py-6 text-[1rem] text-center poppins font-light max-w-[900px]">
        Elevate your designs with our curated library of handcrafted icons.
        <br></br>
        Choose from a diverse range of styles, from pixel perfect hand-drawn
        options to suit any UI or Game Design.<br></br>
        Find the perfect icon to match your vision, straight from Shinko Lab.
      </p>
      <h2 className="text-[0.9rem] pb-1 inter font-bold text-center text-[#596DED] tracking-[0.4rem] uppercase">
        <span className="text-[#000000]">Try some now</span> for free!
      </h2>
      <div className="px-10 min-w-[700px] bg-white rounded-[1rem] flex items-center gap-2 mt-4">
        <div className="flex w-full rounded-xl justify-center items-center py-0 overflow-hidden border-[1px] border-[#CBCBCB]">
          <button className="flex items-center px-3 text-sm">
            <MagnifyingGlassIcon />
          </button>
          <Input
            onChange={handleInputChange}
            className="w-full inter font-light !ring-0 !ring-offset-0 rounded-none border-none"
            placeholder="Search icons..."
            type="search"
          />
        </div>
        <div>
          <Tabs
            defaultValue="light"
            value={whichMode}
            onValueChange={onDarkModeToggle}
            className="py-4 rounded-xl"
          >
            <TabsList className="rounded-xl">
              <TabsTrigger className="rounded-xl" value="light">Light Mode</TabsTrigger>
              <TabsTrigger className="rounded-xl" value="dark">Dark Mode</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      {/* <ModeToggle /> */}
    </section>
  );
}
