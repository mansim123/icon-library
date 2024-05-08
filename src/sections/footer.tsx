"use client"
import Image from "next/image";


export default function Footer() {

  return (
    <section className=" py-6 px-6 md:py-6 bg-secondary w-full bg-[#272D38] shadow-md">
      <div className="max-w-5xl flex flex-row items-center justify-between m-auto">
        <div className="w-1/2 flex flex-row gap-4">
         
          
          <a href="/" className="text-xl font-bold">
          <Image
           className="hidden dark:block"
            src="/Shinko_Dark.svg"
            width={160}
            height={160}
            alt="Shinko Logo Dark"
          />
          <Image
            className="block dark:hidden"
            src="/Shinko_Footer_Logo_Light.svg"
            width={120}
            height={120}
            alt="Shinko Logo Light"
          />
          </a>
        </div>
        <div className="flex flex-row items-center justify-end gap-6 w-1/2">
          <div className="p-5 bg-white"></div>
          <div className="p-5 bg-white"></div>
          <div className="p-5 bg-white"></div>
        </div>
      </div>
    </section>
  );
}
