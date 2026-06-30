'use client';

import { ToastContainer } from 'react-toastify';

export default function DynamicToastContainer() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        draggable={false}
        theme="light"
        style={{ zIndex: 100001 }}
      />
      {/* Normal top-right toast — session expired & alerts */}
      <ToastContainer
        containerId="normal"
        position="top-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        draggable={false}
        theme="light"
        style={{ zIndex: 100002 }}
      />
    </>
  );
}
