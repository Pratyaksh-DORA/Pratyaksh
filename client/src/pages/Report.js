import React, { useEffect, useState } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import hex from "../assets/Screenshot 2023-12-09 050957.png";
const date = new Date();
const today = date.toLocaleDateString("en-GB", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const Report = () => {
  const [projectManagerName, setProjectManagerName] = useState(
    "sample cashier name"
  );
  const [customerName, setCustomerName] = useState("sample customer name");
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [total, setTotal] = useState();

  const [items, setItems] = useState([
    {
      id: 1,
      name: "first",
      qty: 1,
      price: "1.00",
    },
    {
      id: 1,
      name: "first",
      qty: 1,
      price: "1.00",
    },
    {
      id: 2,
      name: "second",
      qty: 2,
      price: "2.00",
    },
    {
      id: 3,
      name: "third",
      qty: 3,
      price: "3.00",
    },
  ]);

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById("print");

    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = dataUrl;
        img.onload = () => {
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: [5.5, 8.5],
          });
          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);
          let pageHeight = pdf.internal.pageSize.getHeight();
          const pageCanvas = document.createElement("canvas");
          const pageCtx = pageCanvas.getContext("2d");
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = "white";
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          pdf.save(`invoice-${invoiceNumber}.pdf`);
        };
      })
      .catch((error) => {
        console.error("Oops, something went wrong!", error);
      });
  };

  useEffect(() => {
    const calcTotal = items.reduce((acc, item) => {
      return acc + item.qty * parseFloat(item.price);
    }, 0);
    setTotal(calcTotal);
  }, [items]);

  return (
    <div className="md:flex">
      
      <form
        className="flex flex-col bg-white shadow-md px-2 md:flex-row"
        id="print"
      >
        <div className="my-6 flex-1 space-y-2  rounded-md p-4 shadow-sm sm:space-y-4 md:p-6">
          <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
            <div className="flex space-x-2">
              <span className="font-bold">Current Date: </span>
              <span>{today}</span>
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-bold" htmlFor="invoiceNumber">
                Invoice Number:
              </label>
              <input
                required
                className="max-w-[130px]"
                type="number"
                name="invoiceNumber"
                id="invoiceNumber"
                min="1"
                step="1"
                value={invoiceNumber}
                onChange={(event) => setInvoiceNumber(event.target.value)}
              />
            </div>
          </div>
          <h1 className="text-center text-lg font-bold">REPORT</h1>
          <div className="grid grid-cols-2 gap-2 pt-4 pb-8">
            <div className="text-sm font-bold sm:text-base">
              Cashier: {projectManagerName}
            </div>
            <div className="col-start-2 row-start-1 text-sm font-bold md:text-base">
              Customer: {customerName}
            </div>
          </div>
          <table className="w-full p-4 text-left">
            <thead>
              <tr className="border-b border-gray-900/10 text-sm md:text-base">
                <th>ITEM</th>
                <th>QTY</th>
                <th className="text-center">PRICE</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            {items.map((item) => (
              <tbody key={item.id}>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th className="text-center">{item.qty}</th>
                <th className="text-center">{item.price}</th>
              </tbody>
            ))}
          </table>

          <div className="flex flex-col items-end space-y-2 pt-6">
            <div className="flex w-full  md:w-1/2">
              <span className="font-bold">Subtotal:</span>
              <span className="px-10 font-bold"> $ {total}</span>
            </div>
          </div>

          <div className="flex justify-around flex-wrap gap-2 ">
            <img
              className="w-1/6 py-4 max-w-full max-h-full"
              src={hex}
              alt="hi gir;"
            />
            <img
              className="w-1/6 py-4 max-w-full max-h-full"
              src={hex}
              alt="hi gir;"
            />
          </div>
        </div>
      </form>
      <div className="flex flex-col py-10 w-1/2 items-center">
        <button className="w-2/3 rounded-md my-8 bg-blue-500 p-2 text-sm text-white shadow-sm hover:bg-blue-600">
          Preview
        </button>
        <button
          onClick={SaveAsPDFHandler}
          className="w-2/3 rounded-md my-8 bg-blue-500 p-2 text-sm text-white shadow-sm hover:bg-blue-600"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Report;
