import React from "react";
import {Circles} from "react-loader-spinner";

const Spinner = ({m}) => {
    const message='We are Adding New Ideas To your Feed'
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p className="text-lg text-center px-2">{m}</p>
    </div>
  );
};

export default Spinner;
