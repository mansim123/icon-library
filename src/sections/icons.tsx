"use client";
import { useState, useEffect } from "react";
// import { useAppSelector } from "@/redux/store";
import iconsData from "@/data/icons.json";
import {
  CheckoutNumber,
  CheckoutToggle,
} from "@/redux/features/checkout-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useAppSelector } from "@/redux/store";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster, toast } from "sonner";
import { CheckoutSide } from "@/sections/checkoutSideMenu";

interface Icon {
  name: string;
  srcLight: string;
  srcDark: string;
  id: number;
  svg: string;
}

export default function Icons() {
  const searchName = useAppSelector(
    (state) => state.searchSlice.value.searchField
  );

  const dispatch = useDispatch<AppDispatch>();

  const { theme } = useTheme();
  const [category, setCategory] = useState("all");
  const [shape, setShape] = useState("all");
  const [checkoutNumber, setCheckoutNumber] = useState<number>(0);

  const [animationCode, setAnimationCode] = useState("opacity-0");
  const [svgPaths, setSvgPaths] = useState<Icon[]>([]);

  useEffect(() => {
    // Dispatch the action after the state has been updated
    dispatch(CheckoutNumber(checkoutNumber));
  }, [checkoutNumber, dispatch]);

  const changeSVGColor = (color: string) => {
    const styleElement = document.createElement("style");
    const styleElement2 = document.createElement("style");
    styleElement.innerHTML = `.custom-svg { fill: ${color} !important; stroke: ${color} !important;  }`;
    styleElement2.innerHTML = `.custom-svg-new { fill: ${color} !important; stroke: ${color} !important;  }`;
    document.head.appendChild(styleElement);
    document.head.appendChild(styleElement2);
  };

  useEffect(() => {
    const color = theme === "dark" ? "#ffffff" : "#000000";
    changeSVGColor(color);

    const timeoutId = setTimeout(() => {
      setAnimationCode("transition duration-200 opacity-1");
    }, 200);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [theme]); // Only run this effect when the theme changes

  // Function to toggle selection
  function toggleSelection(
    name: string,
    id: number,
    svg: string,
    srcLight: string,
    srcDark: string
  ) {
    const exists = svgPaths.some((item) => item.id === id);

    if (exists) {
      console.log("Icon is already added.");

      toast("Icon has already been added to basket", {
        description: "Go to checkout to view all items",
        action: {
          label: "Checkout",
          onClick: () => {
            toggleCheckout();
          },
        },
      });

      return;
    }

    // Update svgPaths state by adding the new item
    setSvgPaths((prevState) => [
      ...prevState,
      { name, id, svg, srcLight, srcDark },
    ]);

    // Increment checkoutNumber
    setCheckoutNumber((prevCheckoutNumber) => prevCheckoutNumber + 1);

    // Run toast function
    toast("Icon has been added to basket", {
      description: "Go to checkout to view all items",
      action: {
        label: "Checkout",
        onClick: () => {
          toggleCheckout();
        },
      },
    });
  }

  const removeItemFromSvgPaths = (idToRemove: number) => {
    // Check if the item with the given id exists in svgPaths
    const indexToRemove = svgPaths.findIndex((item) => item.id === idToRemove);

    toast("Icon has been remove from your basket", {
      description: "Go to checkout to view all items",
      action: {
        label: "Checkout",
        onClick: () => {
          toggleCheckout();
        },
      },
    });

    // If the item is found, remove it from svgPaths
    if (indexToRemove !== -1) {
      setSvgPaths((prevState) => {
        const newState = [...prevState];
        newState.splice(indexToRemove, 1); // Remove the item at the found index
        return newState;
      });

      // Decrement checkoutNumber
      setCheckoutNumber((prevCheckoutNumber) => prevCheckoutNumber - 1);
    }
  };

  // const checkoutToggleField = useAppSelector(
  //   (state) => state.checkOutSlice.value.checkoutToggleField
  // );

  const toggleCheckout = () => {
    dispatch(CheckoutToggle());
  };

  const [filteredIcons, setFilteredIcons] = useState<typeof iconsData>([]);

  // Filter icons based on category when category changes
  // Filter icons based on category, shape, and searchName
  useEffect(() => {
    const filtered = iconsData.filter((icon) => {
      const matchesCategory = category === "all" || icon.category === category;
      const matchesShape = shape === "all" || icon.shape === shape;
      const matchesSearch = icon.name
        .toLowerCase()
        .includes(searchName.toLowerCase());

      return matchesCategory && matchesShape && matchesSearch;
    });

    setFilteredIcons(filtered);
  }, [category, shape, searchName]);

  const onCategoryChange = (value: string) => {
    setCategory(value);
    // console.log(value);
  };

  const onShapeChange = (value: string) => {
    setShape(value);
    // console.log(value);
  };

  return (
    <section className="py-14 w-full h-full pb-[20rem]">
      <div className="flex item-center justify-center flex-row flex-wrap w-full gap-5 md:gap-10 pb-12 px-6">
        <div className="flex flex-row items-center gap-2 sm:gap-5">
          <h3 className="font-roboto-bold font-bold">Style</h3>
          <Tabs
            defaultValue="all"
            value={category}
            onValueChange={onCategoryChange}
            className=""
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="outlined">Outlined</TabsTrigger>
              <TabsTrigger value="filled">Filled</TabsTrigger>
              <TabsTrigger value="misc">Misc</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex flex-row items-center gap-2 sm:gap-5">
          <h3 className="font-roboto-bold font-bold">Container</h3>
          <Tabs
            defaultValue="all"
            value={shape}
            onValueChange={onShapeChange}
            className=""
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="square">Square</TabsTrigger>
              <TabsTrigger value="circle">Circle</TabsTrigger>
              <TabsTrigger value="misc">Misc</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        <div
          className={`grid px-6 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 ${animationCode}`}
        >
          {filteredIcons.map((icon, index) => (
            <button
              key={index}
              className="p-4 bg-secondary rounded-xl border border-secondary flex flex-col justify-center items-center hover:inner-border-2 focus:inner-border-2"
              onClick={() =>
                toggleSelection(
                  icon.name,
                  icon.id,
                  icon.svg,
                  icon.srcDark,
                  icon.srcLight
                )
              }
              style={{ minWidth: "8rem", minHeight: "8rem" }}
            >
              <div className="w-[75px] h-[75px]">
                <div dangerouslySetInnerHTML={{ __html: icon.svg }} />
              </div>
              {/* <Image src={icon.src} width={75} height={75} alt={icon.name} /> */}
              <small className="text-center">{icon.name}</small>
            </button>
          ))}
        </div>
      </div>

      <Toaster />
      <CheckoutSide svgPaths={svgPaths} onRemoveItem={removeItemFromSvgPaths} />
    </section>
  );
}
