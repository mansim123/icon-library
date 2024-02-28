"use client"
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import { saveAs } from "file-saver";
import Image from "next/image";
import { useTheme } from "next-themes";

interface Icon {
  name: string;
  src: string;
}

export default function Icons() {
  const searchName = useAppSelector(
    (state) => state.searchSlice.value.searchField
  );

  const { theme } = useTheme();
  const [folderPath, setFolderPath] = useState("");
  
  const [animationCode, setAnimationCode] = useState("opacity-0");
  

  useEffect(() => {
    // Set folderPath based on the theme
    if (theme === "dark") {
      setFolderPath("dark"); // Adjust this to match your folder structure
    } else {
      setFolderPath("light"); // Adjust this to match your folder structure
    }

    const timeoutId = setTimeout(() => {
      setAnimationCode("transition duration-200 opacity-1")
    }, 200);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [theme]); // Only run this effect when the theme changes


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
    { name: "Burger Menu Circle", src: `/icons/SVG/${folderPath}/Icons_ES_Burger_Menu_Circle.svg` },
    { name: "Burger Menu Square", src: `/icons/SVG/${folderPath}/Icons_ES_Burger_Menu_Square_Verticle.svg` },
    { name: "Close Button Square", src: `/icons/SVG/${folderPath}/Icons_ES_Close_01.svg` },
    { name: "Close Button Circle", src: `/icons/SVG/${folderPath}/Icons_ES_Close_02.svg` },
    { name: "Close Button Square", src: `/icons/SVG/${folderPath}/Icons_ES_Close_03.svg` },
    { name: "Dotted Menu Circles", src: `/icons/SVG/${folderPath}/Icons_ES_Dottled_Menu_Circle_Horizontal_Hollow_01.svg` },
    
    
    // Add more icon data as needed
  ];

  // Filter icons based on searchName
  const filteredIcons = iconsData.filter((icon) =>
    icon.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <section className="py-14 w-full">
      <div className={`max-w-5xl sm:flex sm:flex-row items-center gap-6 px-6 lg:px-0 m-auto ${animationCode}`}>
        {filteredIcons.map((icon, index) => (
          <button
            key={index}
            className="w-40 h-40 bg-secondary rounded-xl border border-secondary flex flex-col justify-center items-center p-4"
            onClick={() => handleDownload(icon.src, icon.name)}
          >
            <div className="flex-grow flex justify-center items-center">
              <Image src={icon.src} width={75} height={75} alt={icon.name} />
            </div>
            <small className="text-center">{icon.name}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
