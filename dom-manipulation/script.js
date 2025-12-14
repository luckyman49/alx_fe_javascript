const quotes = [
  { text: "Stay hungry, stay foolish.", category: "Motivation" },
  { text: "Knowledge is power.", category: "Education" },
  { text: "The best way to predict the future is to invent it.", category: "Innovation" }
];

function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" — ${quote.category}`;
}

document.getElementById('newQuote').addEventListener('click', displayRandomQuote);

function addQuote() {
  const text = document.getElementById('newQuoteText').value;
  const category = document.getElementById('newQuoteCategory').value;

  if (text && category) {
    quotes.push({ text, category });
    alert("Quote added!");
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    displayRandomQuote(); // Show the new quote immediately
  } else {
    alert("Please enter both a quote and a category.");
  }
}
