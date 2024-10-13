import React, { useState } from "react";

import hotelData from "./hotel_booking_data.json";
import TimeSeriesChart from "./TimeSeriesChart";
import CountryVisitorsChart from "./CountryVisitorsChart";
import SparklineChart from "./SparklineChart";
import "./App.css";

const App = () => {
  const [filteredData, setFilteredData] = useState(hotelData);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const filterDataByDate = () => {
    if (dateRange.from && dateRange.to) {
      const filtered = hotelData.filter((booking) => {
        const bookingDate = new Date(
          `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`
        );
        return (
          bookingDate >= new Date(dateRange.from) &&
          bookingDate <= new Date(dateRange.to)
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(hotelData);
    }
  };

  return (
    <div className="app-container">
      <h4>Hotel Booking Dashboard<span>(From July 2015 To Aug 2015)</span></h4>

      <div className="date-range-selector">
        From:{" "}
        <input
          type="date"
          name="from"
          value={dateRange.from}
          onChange={handleDateChange}
        />
        To:{" "}
        <input
          type="date"
          name="to"
          value={dateRange.to}
          onChange={handleDateChange}
        />
        <button className="filter-btn" onClick={filterDataByDate}>
          Filter
        </button>
      </div>

      <div className="chart-container">
        <TimeSeriesChart data={filteredData} />
        <CountryVisitorsChart data={filteredData} />
      </div>
      <div className="sparkline-container">
        <SparklineChart data={filteredData} type="adults" />
        <SparklineChart data={filteredData} type="children" />
      </div>
    </div>
  );
};

export default App;
