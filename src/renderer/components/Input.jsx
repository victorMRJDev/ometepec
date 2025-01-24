import React from "react";

const Input = ({ label, type = "text", icon: Icon, ...props }) => {
  return (
    <div className="flex flex-col gap-2 lg:w-9/12 sm:w-10/12">
      {/* Etiqueta */}
      {label && (
        <label className="text-pantoneCoolGray11C font-kanit-regular">
          {label}
        </label>
      )}

      {/* Contenedor del input e icono */}
      <div className="relative">
        {/* Icono */}
        {Icon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Icon />
          </span>
        )}

        {/* Input */}
        <input
          type={type} 
          className={`w-full ${Icon ? "pl-10" : "pl-3"} pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pantoneCoolGray11C focus:border-pantoneCoolGray11C font-kanit-light`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
