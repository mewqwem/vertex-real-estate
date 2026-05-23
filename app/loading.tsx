import Spinner from "@/components/UI/Spinner/Spinner";
import React from "react";

function loading() {
  return (
    <div className="loadingWrapper">
      <Spinner size={40} />
    </div>
  );
}

export default loading;
