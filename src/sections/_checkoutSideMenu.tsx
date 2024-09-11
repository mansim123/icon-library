import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBasketIcon } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { AppDispatch } from "@/redux/store";
import { CheckoutToggle } from "@/redux/features/checkout-slice";
import { useDispatch } from "react-redux";
import ZipDownloadComponent, { ZipDownloadRef } from "@/lib/zipDownload";
import Image from "next/image";

interface Icon {
  name: string;
  svg:string;
  id: number;
}

interface Props {
  svgPaths: Icon[];
  onRemoveItem: (id: number) => void;
}

export function CheckoutSide({ svgPaths, onRemoveItem }: Props) {
  const checkoutNumber = useAppSelector(
    (state) => state.checkOutSlice.value.checkOutField
  );

  const dispatch = useDispatch<AppDispatch>();

  const checkoutToggleField = useAppSelector(
    (state) => state.checkOutSlice.value.checkoutToggleField
  );

  const toggleCheckout = () => {
    dispatch(CheckoutToggle());
  }

  // Inside your CheckoutSide component
  const zipDownloaderRef = useRef<ZipDownloadRef>(null);

  // Function to handle download button click
  const handleDownloadClick = (whichDownload:string) => {

    if(whichDownload == "svg") {
      if (zipDownloaderRef.current) {
        zipDownloaderRef.current.handleDownloadSvg();
      }
    }
    if(whichDownload == "png") {
      if (zipDownloaderRef.current) {
        zipDownloaderRef.current.handleDownloadPng();
      }
    }
    if(whichDownload == "zip") {
      if (zipDownloaderRef.current) {
        zipDownloaderRef.current.handleDownloadZip();
      }
    }
    // Call the handleDownload function from the ZipDownloadComponent
    
  };

  return (
    <div className={`h-full absolute top-0 ${checkoutToggleField} flex items-start justify-end transition-all duration-600`}>
      <div className="w-[20rem] max-w-[50rem] h-full bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {" "}
            {/* Wrap contents in a flex container */}
            <h2 className="text-lg font-semibold mr-2">Checkout</h2>{" "}
            {/* Add margin to create space between text and icon */}
            <ShoppingBasketIcon />
            <div className="p-1 bg-white dark:bg-card rounded text-[0.8rem]">
              {checkoutNumber}
            </div>
          </div>
          <div>
            <Button onClick={() => toggleCheckout()} size="icon" variant="ghost">
              X<span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
        <div className="border-t py-2 border-gray-200 dark:border-gray-800 overflow-auto grid gap-px">
          {/* Map over svgPaths and render icons */}
          {svgPaths.map(({ name, id, srcLight, srcDark  }) => (
            <div key={id} className="p-4 flex items-center justify-between">
              {/* Assuming src contains the path to the SVG */}

              <div className="w-12 h-12">
              <Image
                  className="inline-block dark:hidden"
                  src={srcLight}
                  width={75}
                  height={75}
                  alt={name}
                />
                <Image
                  className="hidden dark:inline-block"
                  src={srcDark}
                  width={75}
                  height={75}
                  alt={name}
                />
            </div>
              {/* Display name as icon name */}
              <small>{name}</small>
              {/* X button to remove item */}
              <button
                onClick={() => onRemoveItem(id)}
                className="text-primary rounded-full w-6 h-6 flex items-center justify-center"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className="p-4 grid gap-2">
          <Button
          onClick={() => handleDownloadClick("png")}
          className="w-full" variant="outline">
            PNG
          </Button>
          {/* Pass svgPaths to ZipDownloadComponent */}
          <ZipDownloadComponent ref={zipDownloaderRef} svgPaths={svgPaths} />
          {/* Button to trigger download */}
          <Button
            onClick={() => handleDownloadClick("svg")}
            className="w-full"
            variant="outline"
          >
            SVG
          </Button>
          <Button onClick={() => handleDownloadClick("zip")} className="w-full" variant="outline">
            Zip (icon pack)
          </Button>
        </div>
      </div>
    </div>
  );
}
