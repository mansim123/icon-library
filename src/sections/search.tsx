"use client"
import React, { useState, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Searching } from "@/redux/features/search-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ModeToggle } from "@/components/ui/toggle-mode";


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

  return (
    <section className="pb-6 bg-secondary w-full flex items-center justify-center flex-col">
      <h1 className="text-[26px] pb-4 font-roboto-light">Welcome to ShinkōLabs. Select your icons, download them, have fun creating.</h1>
      <div className="flex w-full max-w-[50rem] rounded-sm overflow-hidden">
        <button className="flex bg-primary-foreground  items-center px-3 text-sm">
          <MagnifyingGlassIcon />
        </button>
        <Input
          onChange={handleInputChange}
          className="w-full font-roboto-light !ring-0 !ring-offset-0 rounded-none border-none"
          placeholder="Search all the icons we have in our database"
          type="search"
        />
      </div>
      <p className="py-6 text-[18px] text-center font-roboto-light">
      Over 1000 icons created in various styles (pixel, line, filled and hand Drawn) This is to give user<br></br> a diverse range of style they can use these for. 
      </p>
      <ModeToggle />
    </section>
  );
}

