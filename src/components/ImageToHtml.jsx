import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

const ImageToHtml = ({ imageSrc, onConversionComplete }) => {
  const [htmlMarkup, setHtmlMarkup] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef(null);

  const convertToHtml = async () => {
    if (!imageRef.current) return;
    setIsLoading(true);
    setError(null);

    try {
      const canvas = await html2canvas(imageRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });

      const dataUrl = canvas.toDataURL("image/png");
      
      // Create semantic HTML structure
      const htmlStructure = `
        <div class="converted-image-wrapper" style="max-width: 100%;">
          <img src="${dataUrl}" alt="Converted image" style="width: 100%; height: auto;" />
        </div>
      `;

      setHtmlMarkup(htmlStructure);
      if (onConversionComplete) {
        onConversionComplete(htmlStructure);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (imageSrc) {
      // Wait for image to load before converting
      const img = new Image();
      img.onload = convertToHtml;
      img.src = imageSrc;
    }
  }, [imageSrc]);

  return (
    <div className="image-to-html-converter">
      <div className="original-image" ref={imageRef}>
        {imageSrc && (
          <img 
            src={imageSrc} 
            alt="Original" 
            style={{ maxWidth: '100%', height: 'auto' }}
            crossOrigin="anonymous"
          />
        )}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 bg-red-50 p-4 rounded-md">
          Error: {error}
        </div>
      )}

      {!isLoading && !error && htmlMarkup && (
        <div className="converted-output mt-4">
          <button
            onClick={() => navigator.clipboard.writeText(htmlMarkup)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Copy HTML
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageToHtml;
