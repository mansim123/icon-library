"use client"
import React from "react";
import { useAppSelector } from "@/redux/store";
import { saveAs } from "file-saver";
import Image from "next/image";

interface Icon {
  name: string;
  src: string;
}

export default function Icons() {
  const searchName = useAppSelector(
    (state) => state.searchSlice.value.searchField
  );

  const handleDownload = async (imageUrl: string, iconName: string) => {
    try {
      // Fetch the image file
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Use file-saver to save the Blob as a file
      saveAs(blob, `${iconName}.svg`);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  // Sample data for multiple icons
  const iconsData: Icon[] = [
    { name: "Burger Menu Circle", src: "/icons/svg/Burger_Menu_Circle_01.svg" },
    { name: "Sandwich Menu Circle", src: "/icons/svg/Burger_Menu_Circle_01.svg" },
    // Add more icon data as needed
  ];

  // Filter icons based on searchName
  const filteredIcons = iconsData.filter((icon) =>
    icon.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <section className="py-14 w-full">
      <div className="max-w-5xl sm:flex sm:flex-row items-center gap-6 px-6 lg:px-0 m-auto">
        {filteredIcons.map((icon, index) => (
          <button
            key={index}
            className="w-40 h-40 bg-secondary rounded-xl border border-secondary flex flex-col justify-center items-center p-4"
            onClick={() => handleDownload(icon.src, icon.name)}
          >
            <div className="flex-grow flex justify-center items-center">
              <Image src={icon.src} width={50} height={50} alt={icon.name} />
            </div>
            <small className="text-center">{icon.name}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
