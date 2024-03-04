"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";
import iconsData from "@/data/icons.json";
import { CheckoutNumber } from "@/redux/features/checkout-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster, toast } from "sonner";
import {CheckoutSide} from "@/components/ui/checkoutSideMenu"

interface Icon {
  name: string;
  src: string;
  id: number; 
}

export default function Icons() {
  const searchName = useAppSelector(
    (state) => state.searchSlice.value.searchField
  );

  const dispatch = useDispatch<AppDispatch>();

  const { theme } = useTheme();
  const [folderPath, setFolderPath] = useState("");
  const [category, setCategory] = useState("all");
  const [shape, setShape] = useState("all");
  const [checkoutNumber, setCheckoutNumber] = useState<number>(0);

  const [animationCode, setAnimationCode] = useState("opacity-0");
  const [svgPaths, setSvgPaths] = useState<Icon[]>([]);


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

  // Function to toggle selection
  function toggleSelection(name: string, src: string, id: number) {

    const exists = svgPaths.some(item => item.id === id);

    if (exists) {
      console.log("Icon is already added.");

      toast("Icon has already been added to basket", {
        description: "Go to checkout to view all items",
        action: {
          label: "Checkout",
          onClick: () => {
            console.log("Undo");
          },
        },
      });

      return;
    }

    // Update svgPaths state by adding the new item
    setSvgPaths(prevState => [
      ...prevState,
      { name, src, id }
    ]);
  
    // Increment checkoutNumber
    setCheckoutNumber(prevCheckoutNumber => prevCheckoutNumber + 1);
  
    // Run toast function
    toast("Icon has been added to basket", {
      description: "Go to checkout to view all items",
      action: {
        label: "Checkout",
        onClick: () => {
          console.log("Undo");
        },
      },
    });
  }


  const removeItemFromSvgPaths = (idToRemove: number) => {
    // Check if the item with the given id exists in svgPaths
    const indexToRemove = svgPaths.findIndex(item => item.id === idToRemove);

    toast("Icon has been remove from your basket", {
      description: "Go to checkout to view all items",
      action: {
        label: "Checkout",
        onClick: () => {
          console.log("Undo");
        },
      },
    });
    
    // If the item is found, remove it from svgPaths
    if (indexToRemove !== -1) {
      setSvgPaths(prevState => {
        const newState = [...prevState];
        newState.splice(indexToRemove, 1); // Remove the item at the found index
        return newState;
      });
    
      // Decrement checkoutNumber
      setCheckoutNumber(prevCheckoutNumber => prevCheckoutNumber - 1);
    }
  };



  // Filter icons based on searchName
  // const filteredIcons = iconsData.filter((icon) =>
  //   icon.name.toLowerCase().includes(searchName.toLowerCase())
  // );

  // Define state for category and filteredIcons

  const [filteredIcons, setFilteredIcons] = useState<typeof iconsData>([]);

  // Filter icons based on category when category changes
  useEffect(() => {
    const filtered = iconsData.filter((icon) => {
      if (category !== "all" && shape !== "all") {
        return icon.category === category && icon.shape === shape && icon.theme === folderPath;
      } else if (category !== "all") {
        return icon.category === category && icon.theme === folderPath;
      } else if (shape !== "all") {
        return icon.shape === shape && icon.theme === folderPath;
      } else {
        return icon.theme === folderPath;
      }
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
          <Tabs defaultValue="all" value={category} onValueChange={onCategoryChange} className="w-[400px]">
            <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="outlined">Outlined</TabsTrigger>
              <TabsTrigger value="filled">Filled</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex flex-row items-center gap-5">
          <h3 className="font-roboto-bold font-bold">Container</h3>
          <Tabs defaultValue="all" value={shape} onValueChange={onShapeChange} className="w-[400px]">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
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
            className="w-45 h-45 bg-secondary rounded-xl border border-secondary flex flex-col justify-center items-center p-4 hover:inner-border-2 focus:inner-border-2"
            onClick={() => toggleSelection(icon.name , icon.src, icon.id)}
          >
            <Image src={icon.src} width={75} height={75} alt={icon.name}/>
            <small className="text-center">{icon.name}</small>
          </button>
        ))}
      </div>
      <Toaster />
      <CheckoutSide svgPaths={svgPaths} onRemoveItem={removeItemFromSvgPaths}/>
    </section>
  );
}
