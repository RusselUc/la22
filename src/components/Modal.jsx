import React from "react";
import { UilMultiply } from "@iconscout/react-unicons";


const Modal = ({ product, setOpen, children }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="flex w-full justify-end pr-3 pt-2">
              <UilMultiply
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
