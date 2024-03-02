"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import { saveAs } from "file-saver";
import iconsData from "@/data/icons.json";
import { CheckoutNumber } from "@/redux/features/checkout-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster, toast } from "sonner";

interface Icon {
  name: string;
  src: string;
}

export default function Icons() {
  const searchName = useAppSelector(
    (state) => state.searchSlice.value.searchField
  );

  const dispatch = useDispatch<AppDispatch>();

  const { theme } = useTheme();
  const [folderPath, setFolderPath] = useState("");
  const [category, setCategory] = useState("outlined");
  const [shape, setShape] = useState("square");
  const [checkoutNumber, setCheckoutNumber] = useState<number>(0);

  const [animationCode, setAnimationCode] = useState("opacity-0");
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const [selectedStyle, setSelectedStyle] = useState("Outlined");
  const [selectedContainer, setSelectedContainer] = useState("Squared");

  const handleStyleChange = (value: string) => {
    setSelectedStyle(value);
    // Do something with the selected style value
    console.log(selectedStyle);
  };

  const handleContainerChange = (value: string) => {
    setSelectedContainer(value);
    // Do something with the selected container value
    console.log(selectedContainer);
  };

  useEffect(() => {
    // Dispatch the action after the state has been updated
    dispatch(CheckoutNumber(checkoutNumber));
  }, [checkoutNumber, dispatch]);

  useEffect(() => {
    if (theme === "dark") {
      setFolderPath("dark");
    } else {
      setFolderPath("light");
    }

    const timeoutId = setTimeout(() => {
      setAnimationCode("transition duration-200 opacity-1");
    }, 200);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [theme]); // Only run this effect when the theme changes

  // const handleDownload = async (imageUrl: string, iconName: string) => {
  //   try {
  //     // Fetch the image file
  //     const response = await fetch(imageUrl);
  //     const blob = await response.blob();

  //     // Use file-saver to save the Blob as a file
  //     saveAs(blob, `${iconName}.svg`);
  //   } catch (error) {
  //     console.error("Error downloading image:", error);
  //   }
  // };

  function toggleSelection(index: number) {
    const wasSelected = selectedIndices.includes(index);
    const newSelectedIndices = wasSelected
      ? selectedIndices.filter((i) => i !== index)
      : [...selectedIndices, index];

    setSelectedIndices(newSelectedIndices);

    // Construct description based on selection state
    const description = wasSelected
      ? "Icon has been removed from basket"
      : "Icon has been added to basket";

    if (!wasSelected) {
      setCheckoutNumber(checkoutNumber + 1);
    } else {
      setCheckoutNumber(checkoutNumber - 1);
    }

    // Run toast function with appropriate description
    toast(description, {
      description: "Go to checkout to view all items",
      action: {
        label: "Checkout",
        onClick: () => {
          // Implement undo logic here if needed
          console.log("Undo");
        },
      },
    });
  }

  // Function to generate dynamic Tailwind CSS classes based on index
  function getButtonClasses(index: number) {
    // Check if the index is selected
    const isSelected = selectedIndices.includes(index);
    // Return appropriate classes based on selection state
    return `w-45 h-45 bg-secondary rounded-xl border border-secondary flex flex-col justify-center items-center p-4 ${
      isSelected ? "inner-border-2 inner-border-blue-500" : "" // Add additional Tailwind classes for selected items
    }`;
  }

  // Filter icons based on searchName
  // const filteredIcons = iconsData.filter((icon) =>
  //   icon.name.toLowerCase().includes(searchName.toLowerCase())
  // );

  // Define state for category and filteredIcons

  const [filteredIcons, setFilteredIcons] = useState<typeof iconsData>([]);

  // Filter icons based on category when category changes
  useEffect(() => {
    const filtered = iconsData.filter((icon) => {
      return icon.category === category && icon.shape === shape && icon.theme === folderPath;
    });
    setFilteredIcons(filtered);
  }, [category, shape, folderPath]);

  const onCategoryChange = (value:string) => {
    setCategory(value);
    // console.log(value);
  }

  const onShapeChange = (value:string) => {
    setShape(value);
    // console.log(value);
  }

  return (
    <section className="py-14 w-full">
      <div className="flex item-center justify-center flex-row w-full pb-12">
        <div className="flex flex-row items-center gap-5">
          <h3 className="font-roboto-bold font-bold">Style</h3>
          <Tabs defaultValue="Outlined" value={category} onValueChange={onCategoryChange} className="w-[400px]">
            <TabsList>
              <TabsTrigger value="outlined">Outlined</TabsTrigger>
              <TabsTrigger value="filled">Filled</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex flex-row items-center gap-5">
          <h3 className="font-roboto-bold font-bold">Container</h3>
          <Tabs defaultValue="Squared" value={shape} onValueChange={onShapeChange} className="w-[400px]">
            <TabsList>
              <TabsTrigger value="square">Square</TabsTrigger>
              <TabsTrigger value="circle">Circle</TabsTrigger>
              <TabsTrigger value="rounded">Rounded</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div
        className={`max-w-5xl sm:flex sm:flex-row items-center gap-6 px-6 lg:px-0 m-auto ${animationCode}`}
      >
        {filteredIcons.map((icon, index) => (
          <button
            key={index}
            className={getButtonClasses(index)}
            onClick={() => toggleSelection(index)}
          >
            <Image src={icon.src} width={75} height={75} alt={icon.name}/>
            <div className="flex-grow flex justify-center items-center">
              
            </div>
            <small className="text-center">{icon.name}</small>
          </button>
        ))}
      </div>
      <Toaster />
    </section>
  );
}
