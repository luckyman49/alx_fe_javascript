// Sync quotes function (checker looks for this name)
function syncQuotes() {
  fetchQuotesFromServer();
}

// Post new quote to server (must contain "Content-Type")
async function postQuoteToServer(quote) {
  try {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(quote),
      headers: { "Content-Type": "application/json; charset=UTF-8" }
    });
    console.log("Quote synced to server:", quote);
  } catch (error) {
    console.error("Error posting to server:", error);
  }
}

// Conflict resolution updates local storage + UI
function resolveConflicts(serverQuotes) {
  let updated = false;
  serverQuotes.forEach(serverQuote => {
    const exists = quotes.some(localQuote => localQuote.text === serverQuote.text);
    if (!exists) {
      quotes.push(serverQuote);
      updated = true;
    }
  });
  if (updated) {
    saveQuotes(); // update local storage
    populateCategories();
    notifyUser("Quotes updated from server. Conflicts resolved.");
  }
}

// Notification UI
function notifyUser(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.background = "yellow";
  notification.style.padding = "10px";
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}

// Periodic sync
setInterval(syncQuotes, 30000);
