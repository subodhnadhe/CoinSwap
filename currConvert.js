// currConvert.js

// Function to fetch exchange rates from the API
async function fetchExchangeRates() {
    try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/e3c8c13945089b0633b6c47a/latest/USD');
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return null;
    }
}

// Function to update the exchange rate information
async function updateExchangeRateInfo() {
    const exchangeRates = await fetchExchangeRates();
    if (exchangeRates) {
        const fromCurrency = document.querySelector('select[name="from"]').value;
        const toCurrency = document.querySelector('select[name="to"]').value;
        const rate = exchangeRates.conversion_rates[toCurrency];
        const amount = parseFloat(document.querySelector('.amount input').value); // Get the amount from the input field
        const convertedAmount = (amount * rate).toFixed(2);
        document.querySelector('.msg').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }
}

// Call the function to update exchange rate info when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateExchangeRateInfo(); // Initial update
    document.querySelector('button').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission
        updateExchangeRateInfo(); // Update exchange rate info when button is clicked
    });
});

// Optionally, you can call this function whenever the currency selection changes
document.querySelectorAll('select[name="from"], select[name="to"]').forEach(select => {
    select.addEventListener('change', updateExchangeRateInfo);
});
