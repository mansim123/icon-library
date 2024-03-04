import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import JSZip from 'jszip';
import axios from 'axios';
import FileSaver from 'file-saver';

interface SvgPath {
  name: string;
  src: string;
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
    const zip = new JSZip();
    const promises: Promise<void>[] = [];

    // Iterate over each SVG path object
    svgPaths.forEach((svgPath) => {
      // Fetch SVG content
      const promise = axios.get(svgPath.src, { responseType: 'blob' })
        .then((response) => {
          // Add SVG file to the zip
          zip.file(`${svgPath.name}.svg`, response.data);
        })
        .catch((error) => {
          console.error('Error fetching SVG:', error);
        });

      promises.push(promise);
    });

    // Wait for all SVGs to be fetched and added to the zip
    await Promise.all(promises);

    // Generate the zip file asynchronously
    zip.generateAsync({ type: 'blob' }).then((content) => {
      // Save the zip file using FileSaver.js
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
