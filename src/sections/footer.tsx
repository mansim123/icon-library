"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <section className="py-6 px-6 md:py-12 w-full dark:bg-[#000000] bg-[#F9F9FA] border-t border-[#AEAEAE] shadow-md">
      <div className="max-w-7xl w-full grid grid-cols-2 lg:grid-cols-5 gap-[4rem] lg:gap-6 m-auto items-start lg:justify-items-center">
        {/* Column 1: Logo and description */}
        <div className="flex flex-col gap-4">
          <a href="/" className="text-xl font-bold">
            <Image
              className="hidden dark:block"
              src="/Shinko_Footer_Logo_Dark.svg"
              width={160}
              height={160}
              alt="Shinko Logo Dark"
            />
            <Image
              className="block dark:hidden"
              src="/Shinko_Footer_Logo_Light.svg"
              width={160}
              height={160}
              alt="Shinko Logo Light"
            />
          </a>
          <p className="poppins">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
          <a href="#" className="poppins underline">
            Hello@shinkonymae.com
          </a>
        </div>

        {/* Column 2: Header with list of links */}
        <div className="flex flex-col gap-4 text-left">
          <h2 className="font-bold poppins text-[1.1rem]">Services</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="poppins">
                Icons
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Components
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Modules
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Mockups
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Templates
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Wallpapers
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Header with list of links */}
        <div className="flex flex-col gap-4 text-left">
          <h2 className="font-bold poppins text-[1.1rem]">Shinko Lab</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="poppins">
                About
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Book a Call
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Header with list of links */}
        <div className="flex flex-col gap-4 text-left">
          <h2 className="font-bold poppins text-[1.1rem]">Community</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="poppins">
                Work
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Dribble
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Behance
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Medium
              </a>
            </li>
          </ul>
        </div>

        {/* Column 5: Header with list of links */}
        <div className="flex flex-col gap-4 text-left">
          <h2 className="font-bold poppins text-[1.1rem]">Services</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="poppins">
                Shinko Nyame Studio
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Web Design
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Web Development
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                Branding
              </a>
            </li>
            <li>
              <a href="#" className="poppins">
                SEO
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl m-auto mt-12 text-left flex justify-between flex-col lg:flex-row">
        <p className="text-[#7A7A7A] text-[1rem]">
          All Icons and Digital Content copyright © Shinkō Nyame Studio 2023.
          Website build by Shinkō Nyame Studio.
        </p>
        <div className="flex gap-4 mt-6 md:mt-0 dark:hidden">
          <Image
            className=""
            src="/instagram.svg"
            width={25}
            height={25}
            alt="Shinko Logo Dark"
          />
          <Image
            className=""
            src="/facebook.svg"
            width={25}
            height={25}
            alt="Shinko Logo Dark"
          />
          <Image
            className=""
            src="/x.svg"
            width={25}
            height={25}
            alt="Shinko Logo Dark"
          />
        </div>
        <div className="hidden gap-4 mt-6 md:mt-0 dark:flex">
          <Image
            className=""
            src="/instagram_dark.svg"
            width={25}
            height={25}
            alt="Shinko Logo Dark"
          />
          <Image
            className=""
            src="/facebook_dark.svg"
            width={25}
            height={25}
            alt="Shinko Logo Dark"
          />
          <Image
            className=""
            src="/x_dark.svg"
            width={25}
            height={25}
            alt="Shinko Logo Dark"
          />
        </div>
      </div>
    </section>
  );
}
