import React, { useState } from 'react';
import { Stock } from '../types/stock';
import { Loader2 } from 'lucide-react';
import '../comp_css/StockFormc.css';

interface Props {
  onSubmit: (stock: Stock) => void;
  initialData?: Stock;
  isLoading?: boolean;
}

export function StockForm({ onSubmit, initialData, isLoading }: Props) {
  const [stock, setStock] = useState<Stock>(
    initialData || {
      name: '',
      ticker: '',
      quantity: 1,
      buyPrice: 0,
    }
  );

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsFetching(true);
    try {
      const response = await fetch(`http://localhost:8080/api/stocks/suggestions?query=${query}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching stock suggestions:', error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleTickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ticker = e.target.value.toUpperCase();
    setStock({ ...stock, ticker });
    fetchSuggestions(ticker);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const [selectedTicker] = suggestion.split(' - ');
    setStock({ ...stock, ticker: selectedTicker });
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(stock);
  };

  return (
    <form onSubmit={handleSubmit} className="stock-form">
      <div className="stock-form__grid">
        <div className="stock-form__input-group">
          <label className="stock-form__label">Stock Name</label>
          <input
            type="text"
            value={stock.name}
            onChange={(e) => setStock({ ...stock, name: e.target.value })}
            className="stock-form__input"
            required
            disabled={isLoading}
          />
        </div>

        <div className="stock-form__input-group">
          <label className="stock-form__label">Ticker Symbol</label>
          <input
            type="text"
            value={stock.ticker}
            onChange={handleTickerChange}
            className="stock-form__input"
            required
            disabled={isLoading}
          />
          {isFetching && <Loader2 className="stock-form__loader" />}
          {suggestions.length > 0 && (
            <ul className="stock-form__suggestions">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="stock-form__suggestion-item"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="stock-form__input-group">
          <label className="stock-form__label">Quantity</label>
          <input
            type="number"
            value={stock.quantity}
            onChange={(e) => setStock({ ...stock, quantity: Number(e.target.value) })}
            className="stock-form__input"
            required
            min="0"
            disabled={isLoading}
          />
        </div>

        <div className="stock-form__input-group">
          <label className="stock-form__label">Buy Price</label>
          <input
            type="number"
            value={stock.buyPrice}
            onChange={(e) => setStock({ ...stock, buyPrice: Number(e.target.value) })}
            className="stock-form__input"
            required
            min="0"
            step="0.01"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="stock-form__button-container">
        <button
          type="submit"
          className="stock-form__submit-button"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="stock-form__loader" />}
          {initialData ? 'Update Stock' : 'Add Stock'}
        </button>
      </div>
    </form>
  );
}