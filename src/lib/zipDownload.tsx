import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import JSZip from 'jszip';
import axios from 'axios';
import FileSaver from 'file-saver';

interface SvgPath {
  name: string;
  srcDark: string;
  srcLight: string;
  id: number;
  srcDarkPng?: string; // Assuming the structure includes these paths
  srcLightPng?: string;
  iconPack?: string;
}

interface Props {
  svgPaths: SvgPath[];
}

// Define the type of the exposed methods
export interface ZipDownloadRef {
  handleDownloadSvg: () => void;
  handleDownloadPng: () => void;
  handleDownloadZip: () => void;
}

// Use forwardRef to forward the ref to the functional component
const ZipDownloadComponent: React.ForwardRefRenderFunction<ZipDownloadRef, Props> = ({ svgPaths }, ref) => {

  // Define the handleDownloadSvg method
  const handleDownloadSvg = async () => {
    if (svgPaths.length === 0) {
      console.log("No items in basket");
      return;
    }

    console.log(svgPaths);

    const zip = new JSZip();
    const promises: Promise<void>[] = [];

    svgPaths.forEach((svgPath) => {
      // Fetch dark mode SVG
      const darkPromise = axios.get(svgPath.srcDark, { responseType: 'blob' })
        .then((response) => {
          zip.file(`${svgPath.name}_dark.svg`, response.data);
        })
        .catch((error) => {
          console.error('Error fetching dark mode SVG:', error);
        });

      promises.push(darkPromise);

      // Fetch light mode SVG
      const lightPromise = axios.get(svgPath.srcLight, { responseType: 'blob' })
        .then((response) => {
          zip.file(`${svgPath.name}_light.svg`, response.data);
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

  // Define the handleDownloadPng method
  const handleDownloadPng = async () => {
    if (svgPaths.length === 0) {
      console.log("No items in basket");
      return;
    }

    console.log(svgPaths);

    const zip = new JSZip();
    const promises: Promise<void>[] = [];

    svgPaths.forEach((svgPath) => {

      if (svgPath.srcDarkPng && svgPath.srcLightPng) {
        // Fetch dark mode PNG
        const darkPngPromise = axios.get(svgPath.srcDarkPng, { responseType: 'blob' })
          .then((response) => {
            zip.file(`${svgPath.name}_dark.png`, response.data);
            console.log(`${svgPath.name}_dark.png`, response.data)
          })
          .catch((error) => {
            console.error('Error fetching dark mode PNG:', error);
          });

        promises.push(darkPngPromise);

        // Fetch light mode PNG
        const lightPngPromise = axios.get(svgPath.srcLightPng, { responseType: 'blob' })
          .then((response) => {
            zip.file(`${svgPath.name}_light.png`, response.data);
          })
          .catch((error) => {
            console.error('Error fetching light mode PNG:', error);
          });

        promises.push(lightPngPromise);
      }
    });

    await Promise.all(promises);

    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'png_files.zip');
    });
  };

  // Define the handleDownloadZip method
  const handleDownloadZip = async () => {
    if (svgPaths.length === 0) {
      console.log("No items in basket");
      return;
    }

    const promises: Promise<void>[] = [];

    svgPaths.forEach((svgPath) => {

      console.log(svgPath)

      if (svgPath.iconPack) {
        const zipPromise = axios.get(svgPath.iconPack, { responseType: 'blob' })
          .then((response) => {
            FileSaver.saveAs(response.data, `${svgPath.name}.zip`);
          })
          .catch((error) => {
            console.error('Error fetching iconPack zip file:', error);
          });

        promises.push(zipPromise);
      }
    });

    await Promise.all(promises);
  };

  // Expose the handleDownloadSvg, handleDownloadPng, and handleDownloadZip methods using useImperativeHandle
  useImperativeHandle(ref, () => ({
    handleDownloadSvg,
    handleDownloadPng,
    handleDownloadZip,
  }));

  return null; // Return null since this component doesn't render anything
};

// Forward the ref to the functional component
export default forwardRef(ZipDownloadComponent);
