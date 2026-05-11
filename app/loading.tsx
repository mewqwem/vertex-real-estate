import React from "react";
import { TailSpin } from "react-loader-spinner";

function loading() {
  return (
    <div className="loadingWrapper">
      <TailSpin color="var(--primary)" width="80" height="80" />
    </div>
  );
}

export default loading;
