// Step 1: Quotes array (loaded from localStorage if available)
let quotes = [
  { text: "Stay hungry, stay foolish.", category: "Motivation" },
  { text: "Knowledge is power.", category: "Education" },
  { text: "The best way to predict the future is to invent it.", category: "Innovation" }
];

// Load quotes from localStorage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}
loadQuotes();

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Step 2: Populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  const categories = [...new Set(quotes.map(q => q.category))]; // unique categories
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected filter from localStorage
  const lastFilter = localStorage.getItem('lastFilter');
  if (lastFilter) {
    categoryFilter.value = lastFilter;
  }
}
populateCategories();

// Step 3: Show random quote with filter
function showRandomQuote() {
  const categoryFilter = document.getElementById('categoryFilter').value;
  let filteredQuotes = quotes;

  if (categoryFilter !== 'all') {
    filteredQuotes = quotes.filter(q => q.category === categoryFilter);
  }

  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" — ${quote.category}`;
    sessionStorage.setItem('lastQuote', JSON.stringify(quote));
  } else {
    document.getElementById('quoteDisplay').innerHTML = "No quotes available for this category.";
  }
}

// Step 4: Event listener for "Show New Quote"
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Step 5: Filter quotes when dropdown changes
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('lastFilter', selectedCategory); // remember filter
  showRandomQuote(); // show a quote from that category
}

// Step 6: Add new quote
function addQuote() {
  const text = document.getElementById('newQuoteText').value;
  const category = document.getElementById('newQuoteCategory').value;

  if (text && category) {
    quotes.push({ text, category });
    document.getElementById('quoteDisplay').innerHTML = `"${text}" — ${category}`;
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    saveQuotes();
    populateCategories(); // update dropdown with new category
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Step 7: Export quotes to JSON
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// Step 8: Import quotes from JSON
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}
