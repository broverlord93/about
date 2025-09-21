import { FC } from "react";

const Brand: FC<{ className: string }> = ({ className }) => {
  return (
    <div className={`${className} flex items-center justify-center p-4`}>
      <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
        Limani.dev
      </h1>
    </div>
  );
};

export default Brand;
