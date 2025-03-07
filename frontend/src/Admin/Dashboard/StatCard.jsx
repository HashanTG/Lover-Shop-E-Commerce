import "./StatCard.css";

const StatsCards = () => {
  const stats = [
    {
      icon: "/rev.png", // Replace with actual image path
      title: "Total Revenue",
      value: "Rs 75,500",
      change: "+10%",
      color: "blue",
    },
    {
      icon: "/sale.png", // Replace with actual image path
      title: "Total Sales",
      value: "5300",
      change: "+15%",
      color: "green",
    },
    {
      icon: "/sku.png", // Replace with actual image path
      title: "Product SKU",
      value: "247",
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
