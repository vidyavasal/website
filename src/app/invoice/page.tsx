"use client";

import React, { useRef } from "react";

export default function ReceiptPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 print:bg-white print:py-0 print:px-0">
      {/* Action Bar - Hidden on print */}
      <div className="max-w-3xl mx-auto mb-6 flex justify-end print:hidden">
        <button
          onClick={handlePrint}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded shadow transition-colors"
        >
          Print / Download PDF
        </button>
      </div>

      {/* Receipt Container */}
      <div className="max-w-3xl mx-auto bg-white p-10 shadow-lg border border-gray-300 text-gray-800 print:shadow-none print:border-none print:p-4">
        
        {/* Header Section */}
        <div className="text-center mb-8 border-b-2 border-gray-800 pb-4">
          <h1 className="text-4xl font-extrabold tracking-wider uppercase text-gray-900">
            iode edu
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Wayanad, Kerala | Ph: +91 98765 43210
          </p>
        </div>

        {/* Receipt Meta (No., Title, Date) */}
        <div className="flex justify-between items-end mb-8">
          <div className="flex items-center space-x-2 font-bold">
            <span>Sl. No.</span>
            <input 
              type="text" 
              className="w-24 text-red-600 font-bold border-b border-gray-400 focus:outline-none focus:border-gray-800 bg-transparent px-1" 
              placeholder="001"
            />
          </div>
          
          <div className="bg-gray-800 text-white px-6 py-1 rounded font-bold tracking-widest text-lg">
            RECEIPT
          </div>

          <div className="flex items-center space-x-2 font-bold">
            <span>Date:</span>
            <input 
              type="date" 
              className="w-36 border-b border-gray-400 focus:outline-none focus:border-gray-800 bg-transparent px-1" 
            />
          </div>
        </div>

        {/* Student Details */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center">
            <span className="whitespace-nowrap font-semibold mr-4">Name of the Student:</span>
            <input 
              type="text" 
              className="flex-grow border-b border-gray-400 focus:outline-none focus:border-gray-800 bg-transparent px-2 py-1" 
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center flex-grow">
              <span className="whitespace-nowrap font-semibold mr-4">Admission Number:</span>
              <input 
                type="text" 
                className="flex-grow border-b border-gray-400 focus:outline-none focus:border-gray-800 bg-transparent px-2 py-1" 
              />
            </div>
            <div className="flex items-center flex-grow">
              <span className="whitespace-nowrap font-semibold mr-4">Course:</span>
              <input 
                type="text" 
                className="flex-grow border-b border-gray-400 focus:outline-none focus:border-gray-800 bg-transparent px-2 py-1" 
              />
            </div>
          </div>
        </div>

        {/* Fee Table */}
        <div className="mb-8 border-2 border-gray-800 rounded overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-800">
                <th className="py-3 px-4 font-bold border-r-2 border-gray-800 w-2/3">PARTICULARS</th>
                <th className="py-3 px-4 font-bold">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-400">
                <td className="py-3 px-4 font-semibold border-r-2 border-gray-800">TUITION FEE</td>
                <td className="py-2 px-4">
                  <input type="text" className="w-full focus:outline-none bg-transparent" placeholder="₹" />
                </td>
              </tr>
              <tr className="border-b border-gray-400">
                <td className="py-3 px-4 font-semibold border-r-2 border-gray-800">OTHERS</td>
                <td className="py-2 px-4">
                  <input type="text" className="w-full focus:outline-none bg-transparent" placeholder="₹" />
                </td>
              </tr>
              <tr className="bg-gray-50 font-bold border-t-2 border-gray-800">
                <td className="py-3 px-4 text-right border-r-2 border-gray-800">TOTAL</td>
                <td className="py-2 px-4">
                  <input type="text" className="w-full focus:outline-none bg-transparent font-bold" placeholder="₹" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Details */}
        <div className="space-y-6 mb-16">
          <div className="flex items-center">
            <span className="whitespace-nowrap mr-4">Received with thanks the sum of Rupees</span>
            <input 
              type="text" 
              className="flex-grow border-b border-dashed border-gray-400 focus:outline-none focus:border-solid focus:border-gray-800 bg-transparent px-2" 
            />
          </div>
          
          <div className="flex items-center">
            <span className="whitespace-nowrap mr-4">paid by cash / cheque / UPI</span>
            <input 
              type="text" 
              className="flex-grow border-b border-dashed border-gray-400 focus:outline-none focus:border-solid focus:border-gray-800 bg-transparent px-2" 
            />
          </div>

          <div className="flex gap-4">
            <div className="flex items-center flex-grow">
              <span className="whitespace-nowrap mr-4">Drawn on</span>
              <input 
                type="text" 
                className="flex-grow border-b border-dashed border-gray-400 focus:outline-none focus:border-solid focus:border-gray-800 bg-transparent px-2" 
              />
            </div>
            <div className="flex items-center w-1/3">
              <span className="whitespace-nowrap mr-4">Dated</span>
              <input 
                type="date" 
                className="flex-grow border-b border-dashed border-gray-400 focus:outline-none focus:border-solid focus:border-gray-800 bg-transparent px-2" 
              />
            </div>
          </div>
        </div>

        {/* Footer & Signature */}
        <div className="flex justify-between items-end mt-12">
          <div className="text-sm italic text-gray-600">
            *Fee once paid will not be refunded
          </div>
          <div className="text-center">
            <div className="w-48 border-b-2 border-gray-800 mb-2"></div>
            <span className="font-semibold text-gray-800">Authorised Signature</span>
          </div>
        </div>

      </div>
    </div>
  );
}