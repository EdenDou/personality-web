// Import charting library (ECharts or Chart.js must be included in the HTML file as a dependency)

class SmartAccountingApp {
  constructor() {
    this.bills = []; // Store categorized bills
  }

  // Function to parse and classify bills
  addBill(description, amount) {
    const category = this.classifyBill(description);
    this.bills.push({ description, amount, category });
  }

  classifyBill(description) {
    // Simple rule-based classification
    const categories = {
      Food: ['restaurant', 'dining', 'meal'],
      Transport: ['taxi', 'fuel', 'bus'],
      Shopping: ['clothes', 'mall', 'grocery'],
    };
    for (const category in categories) {
      if (categories[category].some((keyword) => description.includes(keyword))) {
        return category;
      }
    }
    return 'Others';
  }

  // Generate pie chart data: category-wise spendings
  generateCategoryData() {
    const categorySpendings = this.bills.reduce((acc, bill) => {
      if (!acc[bill.category]) acc[bill.category] = 0;
      acc[bill.category] += bill.amount;
      return acc;
    }, {});
    return categorySpendings;
  }

  // Render spending chart by category
  renderPieChart() {
    const ctx = document.getElementById('chart'); // Ensure you have a canvas tag with id 'chart'
    const data = this.generateCategoryData();
    return new Chart(ctx.getContext('2d'), {
      type: 'pie',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Dynamic or fixed colors
          },
        ],
      },
    });
  }

  // Analyze spending trends and provide advice
  provideFinancialAdvice() {
    const categoryData = this.generateCategoryData();
    const totalSpending = this.bills.reduce((acc, bill) => acc + bill.amount, 0);
    const result = [];

    for (const category in categoryData) {
      const percentage = ((categoryData[category] / totalSpending) * 100).toFixed(2);
      if (percentage > 50) {
        result.push(`You are spending ${percentage}% of your money on ${category}, consider cutting back.`);
      }
    }

    if (result.length === 0) {
      result.push('Your spending habits are balanced, keep it up!');
    }

    return result;
  }
}

// Example Usage
const app = new SmartAccountingApp();
app.addBill('restaurant dinner', 45);
app.addBill('grocery shopping', 20);
app.addBill('taxi ride', 15);
app.addBill('movie ticket', 12);

// Render chart and display advice
window.onload = () => {
  app.renderPieChart(); // Ensure a <canvas> element exists on the HTML page
  console.log(app.provideFinancialAdvice());
};