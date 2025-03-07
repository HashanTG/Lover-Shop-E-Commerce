import "./StatCard.css";

const StatsCards = ({ totalSales }) => {
  const stats = [
    {
      icon: "/rev.png",
      title: "Total Revenue",
      value: `Rs ${totalSales.toFixed(2)}`, // Use totalSales here
      change: "+10%", // You can calculate this dynamically if needed
      color: "blue",
    },
    {
      icon: "/sale.png",
      title: "Total Sales",
      value: "5", // Keep this as is if it's a different metric
      change: "+15%",
      color: "green",
    },
    {
      icon: "/sku.png",
      title: "Product SKU",
      value: "12",
      change: "0%",
      color: "red",
    },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className={`icon-wrapper ${stat.color}`}>
            <img src={stat.icon} alt={stat.title} className="stat-icon" />
          </div>
          <p className="stat-title">{stat.title}</p>
          <h2 className="stat-value">{stat.value}</h2>
          <span className={`stat-change ${stat.color}`}>{stat.change}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
