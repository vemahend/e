// NZ Income Tax Brackets (as of 2024)
const taxBrackets = [
    { threshold: 14000, rate: 0.105 },  // 10.5% for income up to $14,000
    { threshold: 48000, rate: 0.175 },  // 17.5% for income $14,001 to $48,000
    { threshold: 70000, rate: 0.30 },   // 30% for income $48,001 to $70,000
    { threshold: 180000, rate: 0.33 },  // 33% for income $70,001 to $180,000
    { threshold: Infinity, rate: 0.39 } // 39% for income above $180,000
];

// Salary Calculator (Monthly Salary)
function calculateSalary() {
    const annualSalary = parseFloat(document.getElementById("basicSalary").value) || 0;
    const monthlySalary = annualSalary / 12;
    document.getElementById("salaryResult").innerText = `Monthly Salary: $${monthlySalary.toFixed(2)}`;
}

// Tax Calculator (Based on NZ Tax Brackets)
function calculateTax() {
    const income = parseFloat(document.getElementById("taxIncome").value) || 0;
    let totalTax = 0;

    for (let i = 0; i < taxBrackets.length; i++) {
        const { threshold, rate } = taxBrackets[i];
        if (income > threshold) {
            totalTax += (Math.min(income, taxBrackets[i + 1]?.threshold || Infinity) - threshold) * rate;
        } else {
            break;
        }
    }

    document.getElementById("taxResult").innerText = `Total Income Tax: $${totalTax.toFixed(2)}`;
}

// GST Calculator (15% GST in NZ)
function calculateGST() {
    const amount = parseFloat(document.getElementById("amount").value) || 0;
    const gstRate = 0.15;
    
    const gstAmount = amount * gstRate;
    const totalWithGST = amount + gstAmount;
    document.getElementById("gstResult").innerText = `Total with GST: $${totalWithGST.toFixed(2)}`;
}
