// Step 2.1: Quotes array
const quotes = [
  { text: "Stay hungry, stay foolish.", category: "Motivation" },
  { text: "Knowledge is power.", category: "Education" },
  { text: "The best way to predict the future is to invent it.", category: "Innovation" }
];

// Step 2.2: Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" — ${quote.category}`;
}

// Step 2.3: Event listener for the button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Step 2.4: Function to create the Add Quote form dynamically
function createAddQuoteForm() {
  const formDiv = document.createElement('div');

  const inputText = document.createElement('input');
  inputText.id = "newQuoteText";
  inputText.type = "text";
  inputText.placeholder = "Enter a new quote";

  const inputCategory = document.createElement('input');
  inputCategory.id = "newQuoteCategory";
  inputCategory.type = "text";
  inputCategory.placeholder = "Enter quote category";

  const addButton = document.createElement('button');
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  formDiv.appendChild(inputText);
  formDiv.appendChild(inputCategory);
  formDiv.appendChild(addButton);

  document.body.appendChild(formDiv);
}

// Step 2.5: Function to add a new quote
function addQuote() {
  const text = document.getElementById('newQuoteText').value;
  const category = document.getElementById('newQuoteCategory').value;

  if (text && category) {
    quotes.push({ text, category });
    document.getElementById('quoteDisplay').innerHTML = `"${text}" — ${category}`;
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Step 2.6: Call the form creation function so it appears on page load
createAddQuoteForm();
