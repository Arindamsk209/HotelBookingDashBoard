import Chart from "react-apexcharts";
const SparklineChart = ({ data, type }) => {
    
    const aggregatedData = data.reduce((acc, item) => {
      const dateKey = `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`;
      const adultsCount = parseInt(item.adults) || 0; 
      const childrenCount = parseInt(item.children) || 0; 
  
      if (!acc[dateKey]) {
        acc[dateKey] = { date: dateKey, adults: 0, children: 0 }; 
      }
      
      acc[dateKey].adults += adultsCount; 
      acc[dateKey].children += childrenCount;
  
      return acc;
    }, {});
  
   
    const sparklineData = Object.values(aggregatedData).map((item) => ({
      x: new Date(item.date).getTime(), 
      y: type === 'adults' ? item.adults : item.children, 
    }));
  
    
    const totalVisitors = sparklineData.reduce((total, current) => total + current.y, 0);
  
    const series = [{
      name: `Total ${type.charAt(0).toUpperCase() + type.slice(1)} Visitors`,
      data: sparklineData,
    }];
  
    return (
      <div className="sparkline-chart" style={{ padding: '20px', borderRadius: '8px', backgroundColor: '#333' }}> 
        <h2 style={{ color: '#fff', fontSize: '16px', marginBottom: '5px' }}>
          {`Total ${type.charAt(0).toUpperCase() + type.slice(1)} Visitors`}
        </h2>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF6347' }}>
          {totalVisitors}
        </div>
        <Chart
          options={{
            chart: {
              type: 'area',
              sparkline: { enabled: true },
              dropShadow: {
                enabled: true,
                top: 1,
                left: 1,
                blur: 2,
                color: '#000',
                opacity: 0.1,
              },
              background: '#333', 
            },
            tooltip: {
              shared: true,
              theme: 'dark',
              style: {
                fontSize: '12px',
              },
              x: {
                formatter: (val) => {
                  const date = new Date(val);
                  return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
                },
              },
              y: {
                formatter: (val) => `Visitors: ${val}`,
              },
              fixed: {
                enabled: true,
                position: 'topRight',
                offsetY: 30,
                offsetX: 60,
              },
            },
            xaxis: {
              type: 'datetime',
              labels: {
                show: true,
                style: {
                  colors: '#fff', 
                },
              },
            },
            yaxis: {
              min: 0,
              labels: {
                show: true,
                style: {
                  colors: '#fff', 
                },
              },
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark', 
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: ['#FF7F50'],
                stops: [0, 100],
                opacityFrom: 0.5,
                opacityTo: 0.3,
              },
            },
            stroke: {
              curve: 'smooth',
              width: 3,
              colors: ['#FF6347'],
            },
            colors: ['#FF6347'],
          }}
          series={series}
          type="area"
          height={160}
        />
        <div style={{ textAlign: 'center', marginTop: '10px', color: '#fff' }}> 
          <p style={{ margin: 0 }}>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
        </div>
      </div>
    );
  };
export default SparklineChart;