import React from "react";

const SkeletonLoader = () => {
  const skeletonItems = Array.from({ length: 18 }, (_, index) => (
    <div
      key={index}
      className="w-64 h-80 bg-gray-700 rounded-lg animate-pulse flex flex-col items-center space-y-4"
    >
      <div className="w-20 h-20 rounded-full bg-gray-600"></div>
      <div className="w-32 h-4 bg-gray-600 rounded"></div>
      <div className="w-24 h-4 bg-gray-600 rounded"></div>
      <div className="w-24 h-4 bg-gray-600 rounded"></div>
    </div>
  ));

  return <div className="flex flex-wrap justify-center gap-6">{skeletonItems}</div>;
};

export default SkeletonLoader;
