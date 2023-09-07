import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative text-gray-600 text-xl font-bold">
        Loading
        <span className="absolute top-0 -right-8 animate-loadingDots">...</span>
      </div>

      {/* Styling for the animated dots */}
      <style>
        {`
          @keyframes loadingDots {
            0% { content: '.'; }
            25% { content: '..'; }
            50% { content: '...'; }
            75% { content: '....'; }
            100% { content: '.'; }
          }

          .animate-loadingDots {
            animation: loadingDots 1s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
