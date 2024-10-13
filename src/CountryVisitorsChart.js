import Chart from "react-apexcharts";
const CountryVisitorsChart = ({ data }) => {
  const countryData = data.reduce((acc, curr) => {
    const country = curr.country;
    const visitors = curr.adults + curr.children + curr.babies;
    acc[country] = (acc[country] || 0) + visitors;
    return acc;
  }, {});

  const series = [
    {
      name: "Visitors",
      data: Object.values(countryData),
    },
  ];

  const categories = Object.keys(countryData);

  return (
    <div className="chart">
      <h2>Visitors Per Country</h2>
      <Chart
        options={{
          chart: { type: "bar", toolbar: { show: false } },
          colors: ["#28a745"],
          xaxis: {
            categories,
            labels: {
              show: true,
              style: {
                colors: "#ffffff",
              },
            },
          },
          tooltip: {
            theme: "dark",
            y: {
              formatter: (val) => `${val} visitors`,
            },
          },
          dataLabels: {
            enabled: false,
            formatter: (val) => `${val} visitors`,
            style: {
              colors: ["#fff"],
              fontSize: "14px",
              fontWeight: "bold",
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
        type="bar"
        height={300}
      />
    </div>
  );
};
export default CountryVisitorsChart;
