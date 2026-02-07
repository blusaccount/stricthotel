// Stock Ticker - scrolling ticker bar like a news show
(function () {
  const STOCKS = [
    { symbol: 'AAPL', name: 'Apple' },
    { symbol: 'MSFT', name: 'Microsoft' },
    { symbol: 'GOOGL', name: 'Alphabet' },
    { symbol: 'AMZN', name: 'Amazon' },
    { symbol: 'TSLA', name: 'Tesla' },
    { symbol: 'NVDA', name: 'NVIDIA' },
    { symbol: 'META', name: 'Meta' },
    { symbol: 'NFLX', name: 'Netflix' },
    { symbol: 'AMD', name: 'AMD' },
    { symbol: 'INTC', name: 'Intel' },
    { symbol: 'DIS', name: 'Disney' },
    { symbol: 'SPOT', name: 'Spotify' },
    { symbol: 'UBER', name: 'Uber' },
    { symbol: 'SNAP', name: 'Snap' },
    { symbol: 'RBLX', name: 'Roblox' },
  ];

  function randomPrice() {
    return (Math.random() * 400 + 20).toFixed(2);
  }

  function randomChange() {
    const val = (Math.random() * 10 - 5).toFixed(2);
    return parseFloat(val);
  }

  function buildTickerItems() {
    return STOCKS.map((s) => {
      const price = randomPrice();
      const change = randomChange();
      const pct = ((change / price) * 100).toFixed(2);
      const up = change >= 0;
      return `<span class="ticker-item">`
        + `<span class="ticker-symbol">${s.symbol}</span>`
        + `<span class="ticker-price">$${price}</span>`
        + `<span class="ticker-change ${up ? 'up' : 'down'}">${up ? '▲' : '▼'} ${Math.abs(change).toFixed(2)} (${up ? '+' : ''}${pct}%)</span>`
        + `</span>`;
    }).join('');
  }

  function init() {
    const bar = document.createElement('div');
    bar.className = 'stock-ticker-bar';

    const track = document.createElement('div');
    track.className = 'stock-ticker-track';

    // Duplicate content for seamless loop
    const items = buildTickerItems();
    track.innerHTML = items + items;

    bar.appendChild(track);
    document.body.appendChild(bar);

    // Periodically refresh prices while the ticker is in the DOM
    const intervalId = setInterval(() => {
      if (!document.body.contains(bar)) {
        clearInterval(intervalId);
        return;
      }
      const fresh = buildTickerItems();
      track.innerHTML = fresh + fresh;
    }, 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
