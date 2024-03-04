import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingBasketIcon } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import ZipDownloadComponent from "@/lib/zipDownload";

interface Icon {
  name: string;
  src: string;
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

  // Ref for accessing methods of ZipDownloadComponent
  const zipDownloaderRef = useRef<any>(null);

  // Function to handle download button click
  const handleDownloadClick = () => {
    // Call the handleDownload function from the ZipDownloadComponent
    if (zipDownloaderRef.current) {
      zipDownloaderRef.current.handleDownload();
    }
  };

  return (
    <div className="h-screen w-[15vw] absolute top-0 right-0 flex items-start justify-end">
      <div className="w-full max-w-sm h-full bg-gray-50 dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Checkout</h2>
          <ShoppingBasketIcon />
          <div className="p-1 bg-white dark:bg-card rounded text-[0.8rem]">
            {checkoutNumber}
          </div>
          <Button size="icon" variant="ghost">
            X<span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="border-t py-2 border-gray-200 dark:border-gray-800 overflow-auto grid gap-px">
          {/* Map over svgPaths and render icons */}
          {svgPaths.map(({ name, src, id }) => (
            <div key={id} className="p-4 flex items-center justify-between">
              {/* Assuming src contains the path to the SVG */}
              <img src={src} alt="icon" className="w-12 h-12 mr-2" />
              {/* Display name as icon name */}
              <span>{name}</span>
              {/* X button to remove item */}
              <button
                onClick={() => onRemoveItem(id)}
                className="text-black rounded-full w-6 h-6 flex items-center justify-center"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className="p-4 grid gap-2">
          <Button className="w-full" variant="outline">
            PNG
            <span className="text-sm">(24x24)</span>
          </Button>
          {/* Pass svgPaths to ZipDownloadComponent */}
          <ZipDownloadComponent ref={zipDownloaderRef} svgPaths={svgPaths} />
          {/* Button to trigger download */}
          
        </div>
      </div>
    </div>
  );
}
