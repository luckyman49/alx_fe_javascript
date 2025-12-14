// Quotes array with text and category
const quotes = [
  { text: "Stay hungry, stay foolish.", category: "Motivation" },
  { text: "Knowledge is power.", category: "Education" },
  { text: "The best way to predict the future is to invent it.", category: "Innovation" }
];

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" — ${quote.category}`;
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

// Function to add a new quote
function addQuote() {
  const text = document.getElementById('newQuoteText').value;
  const category = document.getElementById('newQuoteCategory').value;

  if (text && category) {
    // Add new quote to the array
    quotes.push({ text: text, category: category });

    // Update the DOM immediately with the new quote
    document.getElementById('quoteDisplay').innerHTML = `"${text}" — ${category}`;

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Please enter both a quote and a category.");
  }
}
