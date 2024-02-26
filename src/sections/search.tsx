import React from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Search() {
  return (
    <section className="pb-6 bg-secondary w-full flex items-center justify-center flex-col">
      <h1 className="text-[26px] pb-4 font-roboto-light">Welcome to Iconographic. Select your icons, download them, have fun creating.</h1>
      <div className="flex w-full max-w-[50rem] rounded-sm overflow-hidden">
        <button className="flex bg-primary-foreground  items-center px-3 text-sm">
          <MagnifyingGlassIcon />
        </button>
        <Input
          className="w-full font-roboto-light !ring-0 !ring-offset-0 rounded-none border-none"
          placeholder="Search all the icons we have in our database"
          type="search"
        />
      </div>
      <p className="py-6 text-[18px] text-center font-roboto-light">
      Over 1000 icons created in various styles (pixel, line, filled and hand Drawn) This is to give user<br></br> a diverse rang of style they can use these for. 
      </p>
    </section>
  );
}
