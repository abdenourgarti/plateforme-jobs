import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { Calendar } from "lucide-react"; // ✅ correct spelling

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangeWithPeer = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(), // ✅ correct casing
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const ref = useRef(null);
  const [show, setShow] = useState(false);

  // ✅ hide calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formattedRange = `${format(range[0].startDate, "MMM dd")} - ${format(
    range[0].endDate,
    "MMM dd"
  )}`;

  return (
    <div className="relative w-max" ref={ref}>
      {/* ✅ Use label not lable */}
      <label className="peer flex items-center border rounded-md px-3 py-1 cursor-pointer gap-2">
        {/* ✅ Remove quotes from value & fix class */}
        <input
          type="text"
          readOnly
          value={formattedRange}
          onClick={() => setShow(!show)}
          className="outline-none text-sm bg-transparent cursor-pointer w-40"
        />
        {/* ✅ Use the imported Lucide Calendar */}
        <Calendar className="w-4 h-4 text-red-500" />
      </label>

      {/* ✅ Conditional calendar */}
      <div
        className={`absolute z-50 mt-2 transition-all duration-200 ${
          show ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <DateRange
          onChange={(item) => setRange([item.selection])}
          moveRangeOnFirstSelection={false} // ✅ fix casing
          ranges={range}
        />
      </div>
    </div>
  );
};

export default DateRangeWithPeer;
