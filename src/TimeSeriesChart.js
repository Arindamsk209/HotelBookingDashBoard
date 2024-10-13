import Chart from "react-apexcharts";

const TimeSeriesChart = ({ data }) => {
  const timeSeriesData = data.reduce((acc, curr) => {
    const date = `${curr.arrival_date_year}-${curr.arrival_date_month}-${curr.arrival_date_day_of_month}`;
    const visitors = curr.adults + curr.children + curr.babies;
    acc[date] = (acc[date] || 0) + visitors;
    return acc;
  }, {});

  const series = [
    {
      name: "Total Visitors",
      data: Object.entries(timeSeriesData).map(([date, count]) => ({
        x: new Date(date),
        y: count,
      })),
    },
  ];

  return (
    <div className="chart">
      <h2>Time Series: Visitors Per Day</h2>
      <Chart
        options={{
          chart: {
            type: "line",
            zoom: { enabled: true },
            toolbar: { show: false },
          },
          colors: ["#007bff"],
          xaxis: {
            type: "datetime",
            labels: {
              show: true,
              style: {
                colors: "#ffffff",
              },
            },
          },
          tooltip: {
            theme: "dark",
            x: {
              formatter: (val) => {
                const date = new Date(val);
                return `${date.toLocaleString("default", {
                  month: "long",
                })} ${date.getDate()}, ${date.getFullYear()}`;
              },
            },
            y: {
              formatter: (val) => `${val} visitors`,
            },
          },
          grid: {
            borderColor: "#444",
          },
          yaxis: {
            labels: {
              show: true,
              style: {
                colors: "#ffffff",
              },
            },
            tooltip: { enabled: false },
          },
        }}
        series={series}
        type="line"
        height={300}
      />
    </div>
  );
};
export default TimeSeriesChart;
