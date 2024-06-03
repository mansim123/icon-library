"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { CheckoutNumber, CheckoutToggle } from "@/redux/features/checkout-slice";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster, toast } from "sonner";
import { CheckoutSide } from "@/sections/checkoutSideMenu";
import Image from "next/image";

interface IconData {
  id: number;
  attributes: {
    Icon_Description: string;
    Dark_Icon: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    Light_Icon: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    Dark_Icon_Png: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    Light_Icon_Png: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    Icon_Pack: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    Shape: string;
    Style: string;
  };
}

interface Icon {
  name: string;
  id: number;
  srcLight: string;
  srcDark: string;
  srcLightPng: string;
  srcDarkPng: string;
  iconPack: string;
  category: string;
  style: string;
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

  const [iconPosts, setIconPosts] = useState<Icon[]>([]);

  useEffect(() => {
    const fetchIconPosts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/icons-mains?populate=*`);
        const json = await res.json();
        if (Array.isArray(json.data) && json.data.length > 0) {
          const transformedData = json.data.map((item: IconData) => ({
            name: item.attributes.Icon_Description,
            id: item.id,
            srcDark: `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.Dark_Icon.data.attributes.url.startsWith('/') ? '' : '/'}${item.attributes.Dark_Icon.data.attributes.url}`,
            srcLight: `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.Light_Icon.data.attributes.url.startsWith('/') ? '' : '/'}${item.attributes.Light_Icon.data.attributes.url}`,
            srcDarkPng: `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.Dark_Icon_Png.data.attributes.url.startsWith('/') ? '' : '/'}${item.attributes.Dark_Icon_Png.data.attributes.url}`,
            srcLightPng: `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.Light_Icon_Png.data.attributes.url.startsWith('/') ? '' : '/'}${item.attributes.Light_Icon_Png.data.attributes.url}`,
            iconPack: `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.Icon_Pack.data.attributes.url.startsWith('/') ? '' : '/'}${item.attributes.Icon_Pack.data.attributes.url}`,
            category: item.attributes.Shape,
            style: item.attributes.Style
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

  function toggleSelection(
    name: string,
    id: number,
    srcLight: string,
    srcDark: string,
    srcDarkPng: string,
    srcLightPng: string,
    iconPack: string,
    category: string,
    style: string
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

    setSvgPaths((prevState) => [
      ...prevState,
      { name, id, srcLight, srcDark, srcDarkPng, srcLightPng, iconPack, category, style }
    ]);

    setCheckoutNumber((prevCheckoutNumber) => prevCheckoutNumber + 1);

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
    const indexToRemove = svgPaths.findIndex((item) => item.id === idToRemove);

    toast("Icon has been removed from your basket", {
      description: "Go to checkout to view all items",
      action: {
        label: "Checkout",
        onClick: () => {
          toggleCheckout();
        },
      },
    });

    if (indexToRemove !== -1) {
      setSvgPaths((prevState) => {
        const newState = [...prevState];
        newState.splice(indexToRemove, 1);
        return newState;
      });

      setCheckoutNumber((prevCheckoutNumber) => prevCheckoutNumber - 1);
    }
  };

  const toggleCheckout = () => {
    dispatch(CheckoutToggle());
  };

  const [filteredIcons, setFilteredIcons] = useState<Icon[]>([]);

  useEffect(() => {
    const filtered = iconPosts.filter((icon) => {
      const matchesCategory = category === "all" || icon.category === category;
      const matchesShape = shape === "all" || icon.style === shape;
      const matchesSearch = icon.name.toLowerCase().includes(searchName.toLowerCase());

      return matchesCategory && matchesShape && matchesSearch;
    });

    setFilteredIcons(filtered);
  }, [iconPosts, category, shape, searchName]);

  const onCategoryChange = (value: string) => {
    setCategory(value);
  };

  const onShapeChange = (value: string) => {
    setShape(value);
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
                  icon.srcDark,
                  icon.srcLight,
                  icon.srcLightPng,
                  icon.srcDarkPng,
                  icon.iconPack,
                  icon.category,
                  icon.style
                )
              }
              style={{ minWidth: "8rem", minHeight: "8rem" }}
            >
              <div className="w-[75px] h-[75px]">
                <Image
                  className="inline-block dark:hidden"
                  src={icon.srcDark}
                  width={75}
                  height={75}
                  alt={icon.name}
                />
                <Image
                  className="hidden dark:inline-block"
                  src={icon.srcLight}
                  width={75}
                  height={75}
                  alt={icon.name}
                />
              </div>
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
