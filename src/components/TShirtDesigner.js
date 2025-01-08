import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import tshirt from '../images/tshirt.jpeg'

const TShirtDesigner = () => {
  const [logo, setLogo] = useState(null); // Store the uploaded logo
  const [logoSize, setLogoSize] = useState(100); // Default logo size
  const tshirtRef = useRef(null); // Ref for the T-shirt container

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Generate final image
  const generateFinalImage = () => {
    const tshirt = tshirtRef.current;
    if (!tshirt) return;

    // Create a canvas and draw the T-shirt and logo
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = tshirt.offsetWidth;
    canvas.height = tshirt.offsetHeight;

    // Draw the T-shirt
    const tshirtImage = new Image();
    tshirtImage.src = "/tshirt.png"; // Replace with your T-shirt image path
    tshirtImage.onload = () => {
      ctx.drawImage(
        tshirtImage,
        0,
        0,
        tshirt.offsetWidth,
        tshirt.offsetHeight
      );

      // Draw the logo if it exists
      if (logo) {
        const logoImage = new Image();
        logoImage.src = logo;
        logoImage.onload = () => {
          const draggableElement = document.querySelector(".react-draggable");
          const logoPosition = draggableElement.getBoundingClientRect();
          const tshirtPosition = tshirt.getBoundingClientRect();

          const x = logoPosition.x - tshirtPosition.x;
          const y = logoPosition.y - tshirtPosition.y;

          ctx.drawImage(logoImage, x, y, logoSize, logoSize);

          // Generate final image URL
          const finalImageURL = canvas.toDataURL("image/png");

          // Download the final image
          const link = document.createElement("a");
          link.download = "final-tshirt.png";
          link.href = finalImageURL;
          link.click();
        };
      }
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  h-screen p-6 h-96 bg-black text-white pt-28">
      {/* Left Section: T-Shirt Image */}
      <div
        ref={tshirtRef}
        className="relative w-[300px] h-[400px] border bg-gray-200 mx-auto lg:mx-0 "
      >
        {/* Predefined T-shirt Image */}
        <img
          src={tshirt}
          alt="T-Shirt"
          className="w-full h-full object-cover"
        />

        {/* Draggable Logo */}
        {logo && (
          <Draggable>
            <div
              className="absolute"
              style={{
                width: `${logoSize}px`,
                height: `${logoSize}px`,
              }}
            >
              <img
                src={logo}
                alt="Logo"
                className="w-16 h-16 object-contain"
               
              />
            </div>
          </Draggable>
        )}
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center space-y-4 mt-6 lg:mt-0 relative">
        {/* Logo Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="p-2 bg-gray-800 border border-gray-600 rounded text-white mt-4  "
        />

        {/* Submit Button */}
        <button
          onClick={generateFinalImage}
          className="absolute bottom-16 mt-4 px-6 py-2 bg-black text-white rounded hover:bg-black-500 border p-4 ]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TShirtDesigner;
