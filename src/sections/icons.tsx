"use client"
import { useState } from "react";
import { saveAs } from 'file-saver';
import Image from "next/image";

interface Icon {
  name: string;
  src: string;
}

export default function Icons() {
  const handleDownload = async (imageUrl: string, iconName: string) => {
    try {
      // Fetch the image file
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Use file-saver to save the Blob as a file
      saveAs(blob, `${iconName}.svg`);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  // Sample data for multiple icons
  const iconsData: Icon[] = [
    { name: "Search", src: "/icons/icons-search.svg" },
    
    // Add more icon data as needed
  ];

  return (
    <section className="py-14 w-full">
      <div className="max-w-5xl sm:flex sm:flex-row items-center justify-between px-6 lg:px-0 m-auto">
        {iconsData.map((icon, index) => (
          <button key={index} className="w-40 h-40 bg-secondary rounded-xl border border-secondary flex flex-col justify-center items-center p-4" onClick={() => handleDownload(icon.src, icon.name)}>
            <div className="flex-grow flex justify-center items-center">
              <Image
                src={icon.src}
                width={50}
                height={50}
                alt={icon.name}
              />
            </div>
            <small className="text-center">
              {icon.name}
            </small>
          </button>
        ))}
      </div>
    </section>
  );
}
