import React, { useEffect, useState } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const date = new Date();
const today = date.toLocaleDateString("en-GB", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const Report = () => {
  const [selectedReport, setSelectedReport] = useState("daily");
  const [reportData, setReportData] = useState([
    {
      projectName: "SIH1",
      location: "Ks layout, Bangalore",
      sector: "construction",
      projectManager: "Ishika Jain",
      contractor: "Dinesh A",
      date: today,
      reportingTimeStart: "6:00pm",
      reportingTimeEnd: "8:00pm",
      Weather: "Sunny",
      Temp: "25-27 °C",
      description:
        "We made a llot of progress Today and it was  great and the building was half completed and we are great moving forward and terrace is done and next scans for paints and bim and something will be done",
      summary: [
        {
          activity: "wall work",
          comments:
            "bricks were bought but not enough half wall was built and then something happened",
          photos: ["link1", "link2", "link3"],
          status: "completed",
        },
        {
          activity: "foundation work",
          comments:
            "technically foundation ho gaya but thoda aur kaam hai toh woh karna hai but ho jayega aur baaki ham dekh lenge",
          photos: ["link1", "link2", "link3"],
          status: "in progress",
        },
        {
          activity: "ceiling work",
          comments:
            "worker nahi aaye kaam shuru nahi hua ye baad mein dekh lenge jaldi jaldi karlenge",
          photos: ["link1", "link2", "link3"],
          status: "to-be started",
        },
      ],
      delay: [
        {
          description: "wo aadmi nahi aaya jo kaam karne wala tha",
          status: "urgent",
        },
        {
          description: "ye kaam toh bohot zaroori tha par hua nahi",
          status: "moderate",
        },
      ],
      crew: [
        { name: "namrata", type: "painter", hours: "70" },
        { name: "sidhanti", type: "painter", hours: "20" },
        { name: "prince", type: "site worker", hours: "50" },
        { name: "gagan", type: "engineer", hours: "30" },
      ],
      equipment: [
        {
          name: "bull dozer",
          type: "being used",
          status: "being used",
          hours: "70",
        },
        {
          name: "mixer",
          type: "not being used",
          status: "being used",
          hours: "20",
        },
        {
          name: "driller",
          type: "done",
          status: "being used",
          hours: "50",
        },
        { name: "newmixer", type: "used", status: "being used", hours: "30" },
      ],
      materials: [
        {
          type: "bricks",
          usedToday: "2kgs",
          minNeed: "20kgs",
          maxPresent: "3kgs",
          need: "urgent",
        },
        {
          type: "poles",
          usedToday: "4kgs",
          minNeed: "60kgs",
          maxPresent: "2kgs",
          need: "not urgent",
        },
      ],
      accidentOrOtherEvents: "no events today",
      siteVisitor: [
        {
          name: "muniswamy",
          type: "strength tester",
          purpose: "structural tests for foundation",
          comments: "gave this this feedback",
        },
      ],
      images: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1", "https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg"]
    },
  ]);
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

  const handleDropdownChange = (event) => {
    setSelectedReport(event.target.value);
  };

  useEffect(() => {
    switch (selectedReport) {
      case "daily":
        setProjectManagerName("sample cashier name");
        setCustomerName("sample customer name");
        setInvoiceNumber(1);
        setItems([
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
        break;
      case "weekly":
        setProjectManagerName("another cashier name");
        setCustomerName("another customer name");
        setInvoiceNumber(2);
        setItems([
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
        break;
      case "monthly":
        setProjectManagerName("yet another cashier name");
        setCustomerName("yet another customer name");
        setInvoiceNumber(3);
        setItems([
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
        break;
      default:
        break;
    }
  }, [selectedReport]);

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
    <div className="md:flex ml-12">
      {/* <form
        className="flex flex-col bg-white shadow-md px-4 md:flex-row py-2 w-1/2"
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
          <h1 className="text-center text-lg font-bold">
            <span className="px-2 uppercase">{selectedReport}</span>
            REPORT
          </h1>
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
              className="w-1/6 my-4

 bg-gray-100
 max-w-full max-h-full"
              src={hex}
              alt="hi gir;"
            />
            <img
              className="w-1/6 my-4

 bg-gray-100
 max-w-full max-h-full"
              src={hex}
              alt="hi gir;"
            />
          </div>
        </div>
      </form> */}
      <div className="w-1/2 bg-white shadow-md mb-12" id="print">
        <div className="w-full h-0.5 bg-black mt-4"></div>
        <div className="p-2 flex flex-row w-full justify-around py-4  bg-gray-100">
          <div className="flex flex-col">
            <p>
              <span className="font-bold">Project Name: </span>{" "}
              {reportData[0].projectName}
            </p>
            <p>
              <span className="font-bold">Location: </span>
              {reportData[0].location}
            </p>
            <p>
              <span className="font-bold">Project Manager: </span>
              {reportData[0].projectManager}
            </p>
            <p>
              <span className="font-bold">Sector: </span>
              {reportData[0].sector}
            </p>
            <p>
              <span className="font-bold">Contractor: </span>
              {reportData[0].contractor}
            </p>
          </div>
          <div className="flex flex-col">
            <p>
              <span className="font-bold">Reporting Time Start: </span>
              {reportData[0].reportingTimeStart}
            </p>
            <p>
              <span className="font-bold">Reporting Time End: </span>
              {reportData[0].reportingTimeEnd}
            </p>
            <p>
              <span className="font-bold">Date: </span>
              {reportData[0].date}
            </p>
            <p>
              <span className="font-bold">Weather: </span>
              {reportData[0].Weather}
            </p>
            <p>
              <span className="font-bold">Temperature: </span>
              {reportData[0].Temp}
            </p>
          </div>
          <div></div>
        </div>
        <div className="w-full h-0.5 bg-black"></div>

        <div className="px-8">
          <p className="text-center my-4 bg-gray-100">Description</p>
          <p className="bg-gray-200">{reportData[0].description}</p>
          <p className="text-center my-4 bg-gray-100">Summary</p>
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b text-left">
                <th>Activity</th>
                <th>Comments</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData[0].summary.map((item, index) => (
                <tr key={index}>
                  <td>{item.activity}</td>
                  <td>{item.comments}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-center my-4 bg-gray-100">Delay</p>
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b text-left">
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData[0].delay.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-center my-4 bg-gray-100">Crew</p>
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b text-left">
                <th>Name</th>
                <th>Type</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {reportData[0].crew.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-center my-4 bg-gray-100">Equipment</p>
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b text-left">
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {reportData[0].equipment.map((item, index) => (
                <tr key={index} className="pl-4">
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.status}</td>
                  <td>{item.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-center my-4 bg-gray-100">Materials</p>
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b text-left">
                <th>Type</th>
                <th>Used Today</th>
                <th>Min Need</th>
                <th>Max Present</th>
                <th>Need</th>
              </tr>
            </thead>
            <tbody>
              {reportData[0].materials.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.usedToday}</td>
                  <td>{item.minNeed}</td>
                  <td>{item.maxPresent}</td>
                  <td>{item.need}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-center my-4 bg-gray-100">Accident or Other Events</p>
          <p className="">{reportData[0].accidentOrOtherEvents}</p>

          <p className="text-center my-4 bg-gray-100">Site Visitors</p>
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b text-left">
                <th>Name</th>
                <th>Type</th>
                <th>Purpose</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {reportData[0].siteVisitor.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.purpose}</td>
                  <td>{item.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="flex gap-4 flex-wrap justify-around mb-12">
            {reportData[0].images.map((img, index)=>(
              <img src={img} alt="i" key={index} className="flex w-40 h-32"></img>
            ))}
          </div> */}
        </div>
      </div>
      <div className="flex flex-col py-10 w-1/2 items-center">
        <select
          className="w-1/3 py-2 px-2 max-w-full max-h-full"
          value={selectedReport}
          onChange={handleDropdownChange}
        >
          <option value={"daily"}>Daily</option>
          <option value={"weekly"}>Weekly</option>
          <option value={"monthly"}>Monthly</option>
        </select>
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
