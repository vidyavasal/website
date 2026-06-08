"use client";

import React from "react";

export default function ReceiptPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-10 px-3 sm:px-4 print:bg-white print:py-0 print:px-0">
      {/* Action Bar - Hidden on print */}
      <div className="max-w-3xl mx-auto mb-6 flex justify-center sm:justify-end print:hidden">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors text-lg sm:text-base"
        >
          Print / Download PDF
        </button>
      </div>

      {/* Receipt Container */}
      <div className="max-w-3xl mx-auto bg-white p-5 sm:p-10 shadow-lg border border-gray-300 text-gray-800 print:shadow-none print:border-none print:p-0 print:max-w-none">
        
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 border-b-2 border-gray-800 pb-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider uppercase text-gray-900">
            Vidyavasal
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Kerala, India | Ph: +91 70347 60995
          </p>
        </div>

        {/* Receipt Meta (No., Title, Date) */}
        <div className="flex flex-col sm:flex-row print:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 font-bold w-full sm:w-auto print:w-auto">
            <span className="whitespace-nowrap">Sl. No.</span>
            <input 
              type="text" 
              className="flex-grow sm:w-24 text-red-600 font-bold border-b border-gray-300 sm:border-gray-400 focus:outline-none focus:border-indigo-600 bg-gray-50 print:bg-transparent px-2 py-2 sm:py-1 text-base print:border-gray-400" 
              placeholder="001"
            />
          </div>
          
          <div className="bg-gray-800 text-white px-6 py-1.5 rounded font-bold tracking-widest text-lg order-first sm:order-none print:order-none w-full sm:w-auto text-center">
            RECEIPT
          </div>

          <div className="flex items-center space-x-2 font-bold w-full sm:w-auto print:w-auto">
            <span className="whitespace-nowrap">Date:</span>
            <input 
              type="date" 
              className="flex-grow sm:w-36 border-b border-gray-300 sm:border-gray-400 focus:outline-none focus:border-indigo-600 bg-gray-50 print:bg-transparent px-2 py-2 sm:py-1 text-base print:border-gray-400" 
            />
          </div>
        </div>

        {/* Student Details */}
        <div className="space-y-4 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row print:flex-row sm:items-center print:items-center gap-1 sm:gap-4 print:gap-4">
            <span className="font-semibold whitespace-nowrap">Name of the Student:</span>
            <input 
              type="text" 
              className="w-full sm:flex-grow border-b border-gray-300 sm:border-gray-400 focus:outline-none focus:border-indigo-600 bg-gray-50 print:bg-transparent px-2 py-2 sm:py-1 text-base print:border-gray-400" 
            />
          </div>
          <div className="flex flex-col sm:flex-row print:flex-row gap-4">
            <div className="flex flex-col sm:flex-row print:flex-row sm:items-center print:items-center gap-1 sm:gap-4 print:gap-4 flex-grow">
              <span className="font-semibold whitespace-nowrap">Admission Number:</span>
              <input 
                type="text" 
                className="w-full sm:flex-grow border-b border-gray-300 sm:border-gray-400 focus:outline-none focus:border-indigo-600 bg-gray-50 print:bg-transparent px-2 py-2 sm:py-1 text-base print:border-gray-400" 
              />
            </div>
            <div className="flex flex-col sm:flex-row print:flex-row sm:items-center print:items-center gap-1 sm:gap-4 print:gap-4 flex-grow">
              <span className="font-semibold whitespace-nowrap">Course:</span>
              <input 
                type="text" 
                className="w-full sm:flex-grow border-b border-gray-300 sm:border-gray-400 focus:outline-none focus:border-indigo-600 bg-gray-50 print:bg-transparent px-2 py-2 sm:py-1 text-base print:border-gray-400" 
              />
            </div>
          </div>
        </div>

        {/* Fee Table */}
        <div className="mb-6 sm:mb-8 border-2 border-gray-800 rounded overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-800">
                <th className="py-2 px-3 sm:py-3 sm:px-4 font-bold border-r-2 border-gray-800 w-2/3 text-sm sm:text-base">PARTICULARS</th>
                <th className="py-2 px-3 sm:py-3 sm:px-4 font-bold text-sm sm:text-base">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-400">
                <td className="py-2 px-3 sm:py-3 sm:px-4 font-semibold border-r-2 border-gray-800 text-sm sm:text-base">TUITION FEE</td>
                <td className="p-1 sm:p-2">
                  <input type="text" className="w-full focus:outline-none bg-gray-50 print:bg-transparent px-2 py-2 sm:py-1 text-base rounded-sm" placeholder="₹" />
                </td>
              </tr>
              <tr className="border-b border-gray-400">
                <td className="py-2 px-3 sm:py-3 sm:px-4 font-semibold border-r-2 border-gray-800 text-sm sm:text-base">OTHERS</td>
                <td className="p-1 sm:p-2">
                  <input type="text" className="w-full focus:outline-none bg-gray-50 print:bg-transparent px-2 py-2 sm:py-1 text-base rounded-sm" placeholder="₹" />
                </td>
              </tr>
              <tr className="bg-gray-50 font-bold border-t-2 border-gray-800">
                <td className="py-2 px-3 sm:py-3 sm:px-4 text-right border-r-2 border-gray-800 text-sm sm:text-base">TOTAL</td>
                <td className="p-1 sm:p-2">
                  <input type="text" className="w-full focus:outline-none bg-gray-100 print:bg-transparent px-2 py-2 sm:py-1 font-bold text-base rounded-sm" placeholder="₹" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Details */}
        <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row print:flex-row sm:items-center print:items-center gap-1 sm:gap-4 print:gap-4">
            <span className="whitespace-nowrap">Received with thanks the sum of Rupees</span>
            <input 
              type="text" 
              className="w-full sm:flex-grow border-b border-dashed border-gray-400 focus:outline-none focus:border-solid focus:border-indigo-600 bg-gray-50 print:bg-transparent px-2 py-2 sm:py-1 text-base" 
            />
          </div>
          
          <div className="flex flex-col sm:flex-row print:flex-row sm:items-center print:items-center gap-1 sm:gap-4 print:gap-4">
            <span className="whitespace-nowrap">paid by cash / cheque / UPI</span>
            <input 
              type="text" 
              className="w-full sm:flex-grow border-b border-dashed border-gray-400 focus:outline-none focus:border-solid focus:border-indigo-600 bg-gray-50 print:bg-transparent px-2 py-2 sm:py-1 text-base" 
            />
          </div>

          <div className="flex flex-col sm:flex-row print:flex-row gap-4">
            <div className="flex flex-col sm:flex-row print:flex-row sm:items-center print:items-center gap-1 sm:gap-4 print:gap-4 flex-grow">
              <span className="whitespace-nowrap">Drawn on</span>
              <input 
                type="text" 
                className="w-full sm:flex-grow border-b border-dashed border-gray-400 focus:outline-none focus:border-solid focus:border-indigo-600 bg-gray-50 print:bg-transparent px-2 py-2 sm:py-1 text-base" 
              />
            </div>
            <div className="flex flex-col sm:flex-row print:flex-row sm:items-center print:items-center gap-1 sm:gap-4 print:gap-4 w-full sm:w-1/3 print:w-1/3">
              <span className="whitespace-nowrap">Dated</span>
              <input 
                type="date" 
                className="w-full sm:flex-grow border-b border-dashed border-gray-400 focus:outline-none focus:border-solid focus:border-indigo-600 bg-gray-50 print:bg-transparent px-2 py-2 sm:py-1 text-base" 
              />
            </div>
          </div>
        </div>

        {/* Footer & Signature */}
        <div className="flex flex-col sm:flex-row print:flex-row justify-between items-center sm:items-end print:items-end gap-8 mt-8 sm:mt-12">
          <div className="text-sm italic text-gray-600 text-center sm:text-left">
            *Fee once paid will not be refunded
          </div>
          <div className="text-center w-full sm:w-auto print:w-auto">
            <div className="w-full sm:w-48 print:w-48 border-b-2 border-gray-800 mb-2"></div>
            <span className="font-semibold text-gray-800">Authorised Signature</span>
          </div>
        </div>

      </div>
    </div>
  );
}