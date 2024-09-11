export const downloadSvg = (svgContent: string, fileName: string) => {
    // Create a Blob object from the SVG content
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    // Create a link element and set the download attribute
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by revoking the object URL
    URL.revokeObjectURL(url);
  };