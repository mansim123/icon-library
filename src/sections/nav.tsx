"use client"
import Image from "next/image";
import { ShoppingBasketIcon } from "lucide-react";
import { useAppSelector } from "@/redux/store";

export default function Nav() {

  const checkoutNumber = useAppSelector(
    (state) => state.checkOutSlice.value.checkOutField
  );

  return (
    <section className="py-14 bg-secondary w-full">
      <div className="max-w-5xl sm:flex sm:flex-row items-center justify-between px-6 lg:px-0 m-auto">
        <div className="w-full sm:w-1/2">
          <a href="/" className="text-xl font-bold">
          <Image
           className="hidden dark:block"
            src="/Shinko_Dark.svg"
            width={180}
            height={180}
            alt="Picture of the author"
          />
          <Image
            className="block dark:hidden"
            src="/Shinko_Light.svg"
            width={180}
            height={180}
            alt="Picture of the author"
          />
          </a>
        </div>
        <div className="flex flex-row items-center gap-1">
          
          <ShoppingBasketIcon/>
          <div className="p-1 bg-white dark:bg-card rounded text-[0.8rem]">{checkoutNumber}</div>
        </div>
      </div>
    </section>
  );
}
