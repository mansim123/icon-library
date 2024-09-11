"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Searching } from "@/redux/features/search-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";

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

  // const { setTheme } = useTheme();
  // const [whichMode, setWhichMode] = useState("light");
  // setTheme(whichMode);

  // const onDarkModeToggle = (value: string) => {
  //   setWhichMode(value);
  //   setTheme(whichMode);
  // };

  return (
    <section className="py-6 pb-12 px-6 bg-secondary w-full flex items-center justify-center flex-col bg-white dark:bg-black">
      <h2 className="text-[0.8rem] pt-6 inter font-bold text-center text-[#596DED] tracking-[0.3rem] uppercase">
        <div className="flex items-center inter font-bold justify-center mx-auto bg-white dark:bg-black border-[#596DED] border-[1px] rounded-2xl py-1 pl-4 pr-2">
          <span className="text-[#5B5B5B] inter font-bold">ICON</span>
          &nbsp;LIBRARY
        </div>
      </h2>

      <h1 className=" max-w-[750px] text-[1.5rem] md:text-[3rem] md:leading-[3.5rem] pt-6 inter font-bold text-center text-black dark:text-white">
        Unleash Your Creativity:<br></br> 1,000+ Professionally<br></br>{" "}
        Designed Icons for UI and<br></br> Game Design.{" "}
      </h1>
      <p className="py-6 text-[1rem] text-center poppins font-light max-w-[900px]">
        Elevate your designs with our curated library of handcrafted icons.
        <br className="hidden md:block"></br>
        Choose from a diverse range of styles, from pixel perfect hand-drawn
        options to suit any UI or Game Design.<br className="hidden md:block"></br>
        Find the perfect icon to match your vision, straight from Shinko Lab.
      </p>
      <h2 className="text-[0.9rem] pb-1 inter font-bold text-center text-[#596DED] tracking-[0.4rem] uppercase">
        <span className="text-[#000000] dark:text-white">Try some now</span> for free!
      </h2>
      <div className="px-4 md:px-10 min-w-auto w-full md:w-[800px] xl:w-[1000px] bg-white rounded-[1rem] flex flex-col md:flex-row items-center gap-2 mt-8 p-4 shadow-custom-shadow">
        <Select>
          <SelectTrigger className="w-[180px] bg-white dark:bg-black dark:text-white">
            <SelectValue placeholder="All Icons" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem className="" value="All Icons">All Icons</SelectItem>
            <SelectItem value="Square">Square</SelectItem>
            <SelectItem value="Circle">Circle</SelectItem>
            <SelectItem value="Misc">Misc</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex w-full rounded-md justify-center items-center py-0 overflow-hidden border-[1px] border-[#CBCBCB] dark:bg-black">
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
        <Button className="dark:text-white">Selected</Button>
      </div>
      {/* <ModeToggle /> */}
    </section>
  );
}
