import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import JSZip from 'jszip';
import axios from 'axios';
import FileSaver from 'file-saver';

interface SvgPath {
  name: string;
  srcDark: string;
  srcLight: string;
  id: number;
}

interface Props {
  svgPaths: SvgPath[];
}

// Define the type of the exposed methods
export interface ZipDownloadRef {
  handleDownload: () => void;
}

// Use forwardRef to forward the ref to the functional component
const ZipDownloadComponent: React.ForwardRefRenderFunction<ZipDownloadRef, Props> = ({ svgPaths }, ref) => {
  // Define the handleDownload method

  
  const handleDownload = async () => {
    if (svgPaths.length === 0) {
      console.log("No items in basket");
      return;
    }
  
    const zip = new JSZip();
    const promises: Promise<void>[] = [];
  
    svgPaths.forEach((svgPath) => {
      // Fetch dark mode SVG
      const darkPromise = axios.get(svgPath.srcDark, { responseType: 'blob' })
        .then((response) => {
          zip.file(`${svgPath.name}_light.svg`, response.data);
        })
        .catch((error) => {
          console.error('Error fetching dark mode SVG:', error);
        });
  
      promises.push(darkPromise);
  
      // Fetch light mode SVG
      const lightPromise = axios.get(svgPath.srcLight, { responseType: 'blob' })
        .then((response) => {
          zip.file(`${svgPath.name}_dark.svg`, response.data);
        })
        .catch((error) => {
          console.error('Error fetching light mode SVG:', error);
        });
  
      promises.push(lightPromise);
    });
  
    await Promise.all(promises);
  
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'svg_files.zip');
    });
  };

  // Expose the handleDownload method using useImperativeHandle
  useImperativeHandle(ref, () => ({
    handleDownload,
  }));

  return null; // Return null since this component doesn't render anything
};

// Forward the ref to the functional component
export default forwardRef(ZipDownloadComponent);
