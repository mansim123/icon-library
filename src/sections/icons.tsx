"use client";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  CheckoutNumber,
  CheckoutToggle,
} from "@/redux/features/checkout-slice";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster, toast } from "sonner";
import SVG from "react-inlinesvg";
import { Button } from "@/components/ui/button";
import { downloadSvg } from "@/components/icons/download";

import { CustomDrawer } from "@/components/icons/CustomDrawer";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface IconData {
  id: number;
  attributes: {
    Icon_Description: string;
    Svg_Code: string;
    Shape: string;
    Style: string;
  };
}

interface Icon {
  name: string;
  id: number;
  svg: string;
  category: string;
  style: string;
}

export default function Icons() {
  const searchName = useAppSelector(
    (state) => state.searchSlice.value.searchField
  );

  const [hex, setHex] = useState("#000000");
  const [placeholderColor, setPlaceholderColor] = useState("#000000");
  const [basket, setBasket] = useState<PopupIconValues[]>([]); // Array to store basket items
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to control sheet visibility

  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const [category, setCategory] = useState("all");
  const [shape, setShape] = useState("all");
  const [checkoutNumber, setCheckoutNumber] = useState<number>(0);
  const [basketCount, setBasketCount] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [animationCode, setAnimationCode] = useState("opacity-0");
  const [iconPosts, setIconPosts] = useState<Icon[]>([]);
  const [iconSize, setIconSize] = useState<number>(24);
  const [strokeWidth, setStrokeWidth] = useState<number>(1.5);

  interface PopupIconValues {
    IconSvg: string;
    IconName: string;
    IconStroke: string;
    IconSize: string;
    IconColor: string;
  }

  const popupIconInitialValues: PopupIconValues = {
    IconSvg: "",
    IconName: "",
    IconStroke: "",
    IconSize: "",
    IconColor: "",
  };

  const [popupIconSrc, setPopupIconSrc] = useState<PopupIconValues>(
    popupIconInitialValues
  );

  const updatePopupIconSrc = (newValues: Partial<PopupIconValues>) => {
    setPopupIconSrc((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));

    console.log("popupIconSrc --->", popupIconSrc);
  };

  useEffect(() => {
    const fetchIconPosts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/icons-mains?populate=*`
        );
        const json = await res.json();

        console.log(json.data);

        if (Array.isArray(json.data) && json.data.length > 0) {
          const transformedData = json.data.map((item: IconData) => ({
            name: item.attributes.Icon_Description,
            id: item.id,
            svg: item.attributes.Svg_Code,
            category: item.attributes.Shape,
            style: item.attributes.Style,
          }));
          setIconPosts(transformedData);
        }
      } catch (error) {
        console.error("Error fetching icon posts:", error);
      }
    };

    fetchIconPosts();
  }, []);

  useEffect(() => {
    if (iconPosts.length > 0) {
      console.log(iconPosts);
    }
  }, [iconPosts]);

  useEffect(() => {
    dispatch(CheckoutNumber(checkoutNumber));
  }, [checkoutNumber, dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimationCode("transition duration-200 opacity-1");
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [theme]);

  const [filteredIcons, setFilteredIcons] = useState<Icon[]>([]);

  useEffect(() => {
    const filtered = iconPosts.filter((icon) => {
      const matchesCategory = category === "all" || icon.category === category;
      const matchesShape = shape === "all" || icon.style === shape;
      const matchesSearch = icon.name
        .toLowerCase()
        .includes(searchName.toLowerCase());

      return matchesCategory && matchesShape && matchesSearch;
    });

    setFilteredIcons(filtered);
  }, [iconPosts, category, shape, searchName]);

  const onCategoryChange = (value: string) => {
    setCategory(value);
  };

  // const onShapeChange = (value: string) => {
  //   setShape(value);
  // };

  const onSizeChange = (value: string) => {
    const newValue = value.slice(0, -2);
    const newSize = Number(newValue);
    setIconSize(newSize);

    let modifiedSvg = popupIconSrc.IconSvg;
    modifiedSvg = modifiedSvg.replace(/width="\d+"/, `width="${newSize}"`);
    modifiedSvg = modifiedSvg.replace(/height="\d+"/, `height="${newSize}"`);

    // Update the popupIconSrc state with the modified SVG
    updatePopupIconSrc({ IconSvg: modifiedSvg, IconSize: newValue });
  };

  const onStrokeChange = (value: string) => {
    const newStrokeWidth = Number(value);
    setStrokeWidth(newStrokeWidth);

    let modifiedSvg = popupIconSrc.IconSvg;
    modifiedSvg = modifiedSvg.replace(
      /stroke-width="\d+(\.\d+)?"/g,
      `stroke-width="${newStrokeWidth}"`
    );

    // Update the popupIconSrc state with the modified SVG
    updatePopupIconSrc({ IconSvg: modifiedSvg, IconStroke: value });
  };

  const onHexChange = (color: any) => {
    const newHex = color.hex;
    setHex(newHex);
    setPlaceholderColor(newHex);

    let modifiedSvg = popupIconSrc.IconSvg;

    // Replace the stroke and fill attributes with the new color
    modifiedSvg = modifiedSvg.replace(/stroke="[^"]*"/g, `stroke="${newHex}"`);
    modifiedSvg = modifiedSvg.replace(/fill="[^"]*"/g, `fill="${newHex}"`);

    console.log("Modified SVG:", modifiedSvg);

    // Update the popupIconSrc state with the modified SVG
    updatePopupIconSrc({ IconSvg: modifiedSvg, IconColor: newHex });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(popupIconSrc.IconSvg);
      toast("SVG code copied to clipboard");
    } catch (err) {
      console.error("Failed to copy SVG code to clipboard", err);
    }
  };

  // Inside your CheckoutSide component
  // const zipDownloaderRef = useRef<ZipDownloadRef>(null);

  const handleDownloadClick = (whichDownload: string) => {
    if (whichDownload === "svg") {
      // Generate the SVG content with the current settings
      const svgContent = popupIconSrc.IconSvg;

      // Download the SVG file
      downloadSvg(svgContent, `${popupIconSrc.IconName}.svg`);
    }
  };

  // Function to add an icon to the basket
  const addToBasket = (icon: PopupIconValues) => {
    const isAlreadyInBasket = basket.some(
      (item) => item.IconName === icon.IconName
    );

    if (isAlreadyInBasket) {
      // Toaster message for already added icon
      toast("Icon is already added to the basket", {
        description: "Check the basket to view items",
      });
      return;
    }

    setBasket((prevBasket) => [...prevBasket, icon]);

    let newBasketNumber = basketCount + 1;

    setBasketCount(newBasketNumber);

    // Toaster message for newly added icon
    toast("Icon added to the basket", {
      description: "Check the basket to view items",
    });
  };

  // Function to remove an icon from the basket
  const removeFromBasket = (iconName: string) => {
    const updatedBasket = basket.filter((item) => item.IconName !== iconName);
    setBasket(updatedBasket);

    let newBasketNumber = basketCount - 1;

    setBasketCount(newBasketNumber);

    // Toaster message for removed icon
    toast("Icon has been removed from the basket");
  };

  const downloadAllIconsAsZip = async () => {
    const zip = new JSZip();
    basket.forEach((icon, index) => {
      zip.file(`${icon.IconName}.svg`, icon.IconSvg); // Add SVG content to zip
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "icons.zip"); // Trigger the download
  };

  const tabCSS = `px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base text-gray-600 data-[state=active]:bg-blue-500 data-[state=active]:text-white bg-[#F2F2F2]`;

  return (
    <section className="relative py-8 w-full h-full pb-[20rem] bg-[#F9F9FA] dark:bg-black">
      <div className="flex item-center justify-center flex-row flex-wrap w-full gap-5 md:gap-10 pb-12 px-6">
        <div className="flex flex-col md:flex-row items-center justify-center flex-wrap w-full gap-4 md:gap-10 pb-6 px-4 md:px-6 ">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 p-">
            <h3 className="font-roboto-bold font-bold text-base sm:text-lg md:text-xl mt-8 md:mt-0">
              Style
            </h3>
            <Tabs
              defaultValue="all"
              value={category}
              onValueChange={onCategoryChange}
              className="w-full sm:w-auto "
            >
              <TabsList className="flex flex-wrap gap-2 dark:bg-black">
                <TabsTrigger className={tabCSS} value="all">
                  Stroke
                </TabsTrigger>
                <TabsTrigger className={tabCSS} value="solid">
                  Solid
                </TabsTrigger>
                <TabsTrigger className={tabCSS} value="dual">
                  Dual
                </TabsTrigger>
                <TabsTrigger className={tabCSS} value="2tone">
                  2-Tone
                </TabsTrigger>
                <TabsTrigger className={tabCSS} value="sharp">
                  Stroke (sharp)
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        <div
          className={`grid px-6 grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 ${animationCode}`}
        >
          {filteredIcons.map((icon, index) => (
            <button
              key={index}
              className="p-4 bg-gray-200 dark:bg-white rounded-xl border border-secondary flex flex-col justify-center items-center hover:inner-border-2 focus:inner-border-2 hover:border-black dark:hover:border-primary"
              onClick={() => {
                console.log("Icon button clicked");
                console.log("SVG Code:", icon.svg);
                setIsDrawerOpen(true);

                let modifiedSvg = icon.svg;
                modifiedSvg = modifiedSvg.replace(
                  /width="\d+"/,
                  `width="${iconSize}"`
                );
                modifiedSvg = modifiedSvg.replace(
                  /height="\d+"/,
                  `height="${iconSize}"`
                );
                modifiedSvg = modifiedSvg.replace(
                  /stroke-width="\d+(\.\d+)?"/g,
                  `stroke-width="${strokeWidth}"`
                );
                modifiedSvg = modifiedSvg.replace(
                  /stroke="[^"]*"/g,
                  `stroke="${hex}"`
                );
                modifiedSvg = modifiedSvg.replace(
                  /fill="[^"]*"/g,
                  `fill="${hex}"`
                );

                updatePopupIconSrc({
                  IconSvg: modifiedSvg,
                  IconName: icon.name,
                  IconStroke: strokeWidth.toString(),
                  IconSize: `${iconSize}px`,
                  IconColor: hex,
                });
              }}
              style={{ minWidth: "4rem", minHeight: "4rem" }}
            >
              <div className="w-[30px] h-[30px]">
                <SVG src={icon.svg} />
              </div>
            </button>
          ))}
        </div>
      </div>
      <Toaster />
      <CustomDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        popupIconSrc={popupIconSrc}
        onStrokeChange={onStrokeChange}
        onSizeChange={onSizeChange}
        onHexChange={onHexChange}
        copyToClipboard={copyToClipboard}
        handleDownloadClick={handleDownloadClick}
        placeholderColor={placeholderColor}
        hex={hex}
        addToBasket={addToBasket}
      />

      {/* Sheet Component */}
      <div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              className="dark:text-white absolute top-2 right-2 sans text-[1.1rem]"
              onClick={() => setIsSheetOpen(true)}
            >
              <svg
                className="mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"#ffffff"}
                fill={"none"}
              >
                <path
                  d="M3.87289 17.0194L2.66933 9.83981C2.48735 8.75428 2.39637 8.21152 2.68773 7.85576C2.9791 7.5 3.51461 7.5 4.58564 7.5H19.4144C20.4854 7.5 21.0209 7.5 21.3123 7.85576C21.6036 8.21152 21.5126 8.75428 21.3307 9.83981L20.1271 17.0194C19.7282 19.3991 19.5287 20.5889 18.7143 21.2945C17.9 22 16.726 22 14.3782 22H9.62182C7.27396 22 6.10003 22 5.28565 21.2945C4.47127 20.5889 4.27181 19.3991 3.87289 17.0194Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>{" "}
              {basketCount}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Basket</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              {basket.length === 0 ? (
                <p>No items in basket</p>
              ) : (
                <ul>
                  {basket.map((icon, index) => (
                    <div key={index}>
                      <li className="mb-2 flex items-center justify-between w-full">
                        <SVG
                          src={icon.IconSvg}
                          className="w-8 h-8 inline-block"
                        />
                        <span className="ml-2">{icon.IconName}</span>
                        <Button
                          variant="ghost"
                          className="ml-2"
                          onClick={() => removeFromBasket(icon.IconName)} // Remove icon from basket
                        >
                          ✕
                        </Button>
                      </li>
                      <hr className="border-t-1 mb-2 border-gray-300" />{" "}
                      {/* Underline after each item */}
                    </div>
                  ))}
                </ul>
              )}
              {basket.length > 0 && (
                <Button onClick={downloadAllIconsAsZip} className="mt-4">
                  Download All as Zip
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
