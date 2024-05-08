"use client"
import Image from "next/image";
import { ShoppingBasketIcon } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { CheckoutToggle } from "@/redux/features/checkout-slice";
import { useDispatch } from "react-redux";


export default function Nav() {

  const checkoutNumber = useAppSelector(
    (state) => state.checkOutSlice.value.checkOutField
  );

  const dispatch = useDispatch<AppDispatch>();

  const toggleCheckout = () => {
    dispatch(CheckoutToggle());
  }

  return (
    <section className=" py-6 px-6 md:py-6 bg-secondary w-full bg-white shadow-md">
      <div className="max-w-5xl flex flex-row items-center justify-between m-auto">
        <div className="w-1/2 flex flex-row gap-4">
          <a href="/" className="text-xl font-bold">
          <Image
           className="hidden dark:block"
            src="/Shinko_Icon_Dark.svg"
            width={55}
            height={55}
            alt="Shinko Icon Dark"
          />
          <Image
            className="block dark:hidden"
            src="/Shinko_Icon_Light.svg"
            width={55}
            height={55}
            alt="Shinko Icon Light"
          />
          </a>
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
            src="/Shinko_Logo_Light.svg"
            width={160}
            height={160}
            alt="Shinko Logo Light"
          />
          </a>
        </div>
        <div className="flex flex-row items-center justify-end gap-1 w-1/2">
          <ShoppingBasketIcon className="cursor-pointer" onClick={() => toggleCheckout()}/>
          <div className="p-1 bg-white dark:bg-card rounded text-[0.8rem]">{checkoutNumber}</div>
        </div>
      </div>
    </section>
  );
}
