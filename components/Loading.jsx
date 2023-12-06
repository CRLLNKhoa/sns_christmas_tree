import React from "react";

export default function Loading() {

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <img src="/loading.svg" alt="loading" className="w-24 animate-spin" />
    </div>
  );
}
