import { Sketch } from "@uiw/react-color";
import SVG from "react-inlinesvg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
} from "@/components/ui/drawer";

interface PopupIconValues {
  IconSvg: string;
  IconName: string;
  IconStroke: string;
  IconSize: string;
  IconColor: string;
}

interface CustomDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  popupIconSrc: PopupIconValues;
  onStrokeChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onHexChange: (color: any) => void;
  copyToClipboard: () => void;
  handleDownloadClick: (whichDownload: string) => void;
  placeholderColor: string;
  hex: string;
  addToBasket: (icon: PopupIconValues) => void; // New prop to add icons to the basket
}

export const CustomDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  popupIconSrc,
  onStrokeChange,
  onSizeChange,
  onHexChange,
  copyToClipboard,
  handleDownloadClick,
  placeholderColor,
  hex,
  addToBasket, // Destructure the new prop
}: CustomDrawerProps) => {
  // Parse the selected size and increase it by 10px for display in the drawer
  const displayIconSize = parseInt(popupIconSrc.IconSize) + 40;

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent className="">
        <div className="flex flex-col md:flex-row w-auto items-center justify-center z-[10] rounded-xl p-4">
          <div className="w-full md:w-1/4">
            <div className="w-full h-[160px] p-6 bg-gray-100 dark:bg-gray-600 flex justify-center items-center">
              {/* Set the SVG size for display purposes */}
              <SVG
                className="fill-red-50"
                src={popupIconSrc.IconSvg}
                width={`${displayIconSize}px`} // Increase by 10px for display
                height={`${displayIconSize}px`} // Increase by 10px for display
              />
            </div>
          </div>
          <div className="w-full md:w-[450px] flex flex-col gap-3 px-2 md:pl-4 md:pr-0">
            <h2>{popupIconSrc.IconName}</h2>
            <p>Stroke</p>
            <div className="flex flex-row gap-2">
              {/* Stroke Width Select */}
              <Select onValueChange={onStrokeChange}>
                <SelectTrigger className="w-[120px] h-[30px] bg-none">
                  <SelectValue placeholder="Stroke 1.5" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.5">1.5</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="2.5">2.5</SelectItem>
                </SelectContent>
              </Select>

              {/* Icon Size Select */}
              <Select onValueChange={onSizeChange}>
                <SelectTrigger className="w-[120px] h-[30px] bg-none">
                  <SelectValue placeholder="24px" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24px">24px</SelectItem>
                  <SelectItem value="26px">26px</SelectItem>
                  <SelectItem value="28px">28px</SelectItem>
                  <SelectItem value="30px">30px</SelectItem>
                  <SelectItem value="32px">32px</SelectItem>
                  <SelectItem value="34px">34px</SelectItem>
                  <SelectItem value="36px">36px</SelectItem>
                  <SelectItem value="38px">38px</SelectItem>
                </SelectContent>
              </Select>

              {/* Icon Colour Select */}
              <Select>
                <SelectTrigger className="w-[120px] h-[30px] bg-none">
                  <SelectValue placeholder={placeholderColor} />
                </SelectTrigger>
                <SelectContent className="bg-transparent border-transparent shadow-none">
                  <Sketch
                    style={{ marginLeft: 20 }}
                    color={hex}
                    onChange={onHexChange}
                  />
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col md:flex-row w-full gap-4">
              <Button onClick={copyToClipboard}>Copy SVG</Button>
              <Button onClick={() => handleDownloadClick("svg")}>
                Download SVG
              </Button>
              <Button onClick={() => addToBasket(popupIconSrc)}>
                Add to Basket
              </Button>{" "}
              {/* Add to Basket Button */}
            </div>
          </div>
          <div className="mt-10 absolute top-0 right-10">
            <DrawerClose asChild>
              <button
                className="text-[1.2rem]"
                onClick={() => setIsDrawerOpen(false)}
              >
                Close X
              </button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

