import { useState } from "react";
import Image from "next/image";
import iconsData from "@/data/icons.json";

interface Icon {
  name: string;
  src: string;
  theme: string;
  category: string;
  shape: string;
}

interface Props {
  theme: string;
  category: string;
  shape: string;
  getButtonClasses: (index: number, selectedIndices: number[]) => string;
  toggleSelection: (index: number, selectedIndices: number[], setSelectedIndices: React.Dispatch<React.SetStateAction<number[]>>) => void;
}

export default function IconList({ theme, category, shape, getButtonClasses, toggleSelection }: Props) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  return (
    <div className="max-w-5xl sm:flex sm:flex-row items-center gap-6 px-6 lg:px-0 m-auto">
        
      {iconsData.map((icon: Icon, index: number) => {
        console.log(icon)
        if (
          icon.theme === theme &&
          icon.category === category &&
          icon.shape === shape
        ) {
          return (
            <button
              key={index}
              className={getButtonClasses(index, selectedIndices)}
              onClick={() => toggleSelection(index, selectedIndices, setSelectedIndices)}
            >
              <div className="flex-grow flex justify-center items-center">
                <Image src={icon.src} width={75} height={75} alt={icon.name} />
              </div>
              <small className="text-center">{icon.name}</small>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}
