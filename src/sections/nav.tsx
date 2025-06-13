"use client";
import { useState } from "react";
import { ModeToggle } from "@/components/ui/toggle-mode";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Nav() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <section className="py-4 px-4 md:py-6 bg-secondary w-full bg-white dark:bg-black shadow-md border-b-[1px] border-[#d7d7d7]">
      <div className="max-w-[1400px] flex flex-row items-center m-auto gap-4">
        <div className="flex items-center w-auto">
          <a href="/" className="flex items-center">
          <div className="flex flex-row dark:hidden">
              <Image
                src="/Shinko_Icon_Light.svg"
                width={60}
                height={60}
                alt="Shinko Icon Dark"
              />
              <Image
                className="ml-4 hidden lg:block"
                src="/Shinko_Logo_Light.svg"
                width={110}
                height={110}
                alt="Shinko Icon Dark"
              />
            </div>
            <div className="hidden flex-row dark:flex">
              <Image
                src="/Shinko_Icon_Dark.svg"
                width={60}
                height={60}
                alt="Shinko Icon Dark"
              />
              <Image
                className="ml-4 hidden lg:block"
                src="/Shinko_Logo_Dark.svg"
                width={110}
                height={110}
                alt="Shinko Icon Dark"
              />
            </div>
          </a>
        </div>

        <div className="flex-grow flex items-center justify-end md:justify-between gap-4">
          <div className="hidden md:flex flex-col md:flex-row items-center gap-4 lg:gap-8">
            {/* <a href="/" className="uppercase inter text-[0.9rem] text-[#3D3D3D] dark:text-[#B0B6BE]">DOCS</a>
            <a href="/" className="uppercase inter text-[0.9rem] text-[#3D3D3D] dark:text-[#B0B6BE]">components</a>
            <a href="/" className="uppercase inter text-[0.9rem] text-[#3D3D3D] dark:text-[#B0B6BE]">ICONS</a>
            <a href="/" className="uppercase inter text-[0.9rem] text-[#3D3D3D] dark:text-[#B0B6BE]">themes</a>
            <a href="/" className="uppercase inter text-[0.9rem] text-[#3D3D3D] dark:text-[#B0B6BE]">pages</a>
            <a href="/" className="uppercase inter text-[0.9rem] text-[#3D3D3D] dark:text-[#B0B6BE]">Mods</a>
            <a href="/" className="uppercase inter text-[0.9rem] text-[#3D3D3D] dark:text-[#B0B6BE]">github</a>
            <a href="/" className="uppercase inter text-[0.9rem] text-[#3D3D3D] dark:text-[#B0B6BE]">about</a> */}
          </div>

          <div className="flex items-center gap-4">
            <div className="w-full md:w-1/4">
              <ModeToggle />
            </div>
            <div className="block md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button>Menu</Button>
              </SheetTrigger>
              <SheetContent>
                <div className="grid grid-cols-1 gap-4 p-4">
                  <a href="/" className="uppercase inter text-[1.1rem] text-[#3D3D3D] dark:text-[#B0B6BE]">DOCS</a>
                  <a href="/" className="uppercase inter text-[1.1rem] text-[#3D3D3D] dark:text-[#B0B6BE]">components</a>
                  <a href="/" className="uppercase inter text-[1.1rem] text-[#3D3D3D] dark:text-[#B0B6BE]">ICONS</a>
                  <a href="/" className="uppercase inter text-[1.1rem] text-[#3D3D3D] dark:text-[#B0B6BE]">themes</a>
                  <a href="/" className="uppercase inter text-[1.1rem] text-[#3D3D3D] dark:text-[#B0B6BE]">pages</a>
                  <a href="/" className="uppercase inter text-[1.1rem] text-[#3D3D3D] dark:text-[#B0B6BE]">Mods</a>
                  <a href="/" className="uppercase inter text-[1.1rem] text-[#3D3D3D] dark:text-[#B0B6BE]">github</a>
                  <a href="/" className="uppercase inter text-[1.1rem] text-[#3D3D3D] dark:text-[#B0B6BE]">about</a>
                </div>
                <SheetFooter>
                  {/* <SheetClose asChild>
                    <Button type="submit">Close</Button>
                  </SheetClose> */}
                </SheetFooter>
              </SheetContent>
            </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
