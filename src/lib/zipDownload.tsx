import React from 'react';
import JSZip from 'jszip';
import axios from 'axios';
import FileSaver from 'file-saver';
import { Button } from '@/components/ui/button';

interface SvgPath {
  name: string;
  src: string;
  id: number;
}

interface Props {
  svgPaths: SvgPath[];
}

const ZipDownloadComponent: React.FC<Props> = ({ svgPaths }) => {
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

  return (
    <Button onClick={handleDownload} className="w-full" variant="outline">
      SVG
      <span className="text-sm">(original)</span>
    </Button>
  );
};

export default ZipDownloadComponent;
