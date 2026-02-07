// Stock Ticker - scrolling ticker bar like a news show
(function () {
  // Fallback data used when the API is unavailable
  const FALLBACK = [
    { symbol: 'URTH', name: 'MSCI World', price: 135.20, change: 0.85, pct: 0.63, currency: 'USD' },
    { symbol: 'QQQ', name: 'Nasdaq 100', price: 525.40, change: -1.20, pct: -0.23, currency: 'USD' },
    { symbol: 'GDAXI', name: 'DAX', price: 20145.00, change: 78.50, pct: 0.39, currency: 'EUR' },
    { symbol: 'DIA', name: 'DOW Jones', price: 432.10, change: 1.45, pct: 0.34, currency: 'USD' },
    { symbol: 'SPY', name: 'S&P 500', price: 602.30, change: 2.10, pct: 0.35, currency: 'USD' },
    { symbol: 'VGK', name: 'FTSE Europe', price: 68.90, change: 0.30, pct: 0.44, currency: 'USD' },
    { symbol: 'EEM', name: 'Emerging Mkts', price: 43.50, change: -0.15, pct: -0.34, currency: 'USD' },
    { symbol: 'AAPL', name: 'Apple', price: 237.50, change: 1.25, pct: 0.53, currency: 'USD' },
    { symbol: 'MSFT', name: 'Microsoft', price: 432.80, change: -0.90, pct: -0.21, currency: 'USD' },
    { symbol: 'NVDA', name: 'NVIDIA', price: 140.20, change: 3.40, pct: 2.48, currency: 'USD' },
    { symbol: 'TSLA', name: 'Tesla', price: 394.50, change: -5.30, pct: -1.33, currency: 'USD' },
    { symbol: 'AMZN', name: 'Amazon', price: 225.30, change: 0.80, pct: 0.36, currency: 'USD' },
    { symbol: 'META', name: 'Meta', price: 638.40, change: 2.60, pct: 0.41, currency: 'USD' },
    { symbol: 'GOOGL', name: 'Alphabet', price: 196.70, change: -0.45, pct: -0.23, currency: 'USD' },
    { symbol: 'NFLX', name: 'Netflix', price: 982.10, change: 4.20, pct: 0.43, currency: 'USD' },
  ];

  const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', CHF: 'CHF ' };

  function buildTickerHTML(quotes) {
    return quotes.map((q) => {
      const up = q.change >= 0;
      const cs = CURRENCY_SYMBOLS[q.currency] || q.currency + ' ';
      return `<span class="ticker-item">`
        + `<span class="ticker-symbol">${q.symbol}</span>`
        + `<span class="ticker-price">${cs}${q.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`
        + `<span class="ticker-change ${up ? 'up' : 'down'}">${up ? '▲' : '▼'} ${Math.abs(q.change).toFixed(2)} (${up ? '+' : ''}${q.pct.toFixed(2)}%)</span>`
        + `</span>`;
    }).join('');
  }

  function renderTicker(track, quotes) {
    const items = buildTickerHTML(quotes);
    track.innerHTML = items + items;
  }

  async function fetchQuotes() {
    const res = await fetch('/api/ticker');
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('Empty data');
    return data;
  }

  function init() {
    const bar = document.createElement('div');
    bar.className = 'stock-ticker-bar';

    const track = document.createElement('div');
    track.className = 'stock-ticker-track';

    // Show fallback immediately, then replace with real data
    renderTicker(track, FALLBACK);

    bar.appendChild(track);
    document.body.appendChild(bar);

    // Fetch real prices on load
    fetchQuotes()
      .then((data) => renderTicker(track, data))
      .catch(() => { /* keep fallback */ });

    // Refresh real prices every 5 minutes while in the DOM
    const intervalId = setInterval(() => {
      if (!document.body.contains(bar)) {
        clearInterval(intervalId);
        return;
      }
      fetchQuotes()
        .then((data) => renderTicker(track, data))
        .catch(() => { /* keep current data */ });
    }, 5 * 60 * 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
