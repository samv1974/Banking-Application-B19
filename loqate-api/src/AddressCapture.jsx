import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const LoqateAPI = ({ onSelectAddress }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.length > 2) {
        try {
          const response = await axios.get(`https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws`, {
            params: {
              Key: process.env.REACT_APP_LOQATE_API_KEY,
              Text: query,
              IsMiddleware: true,
              Container: '',
              Countries: 'IND',
            },
          });

          const results = response.data.Items;
          if (results) {
            setSuggestions(results);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error('Error fetching address suggestions:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = async (suggestion) => {
    try {
      const response = await axios.get(`https://api.addressy.com/Capture/Interactive/Retrieve/v1.00/json3.ws`, {
        params: {
          Key: process.env.REACT_APP_LOQATE_API_KEY,
          Id: suggestion.Id,
        },
      });

      const details = response.data.Items[0];
      if (details) {
        const formattedAddress = {
          flatNumber: details.BuildingNumber || '',
          street: details.Street || '',
          city: details.City || '',
          postalCode: details.PostalCode || '',
        };

        setQuery(`${formattedAddress.flatNumber} ${formattedAddress.street}, ${formattedAddress.city}, ${formattedAddress.postalCode}`);
        setSelectedAddress(formattedAddress);

        if (onSelectAddress) {
          onSelectAddress(formattedAddress);
        }
      }
    } catch (error) {
      console.error('Error fetching address details:', error);
    }
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAddress) {
      console.log('Submitting address:', selectedAddress);
      // Perform your submit action here
    }
  };

  return (
    <div>
      <h2>Address Capture</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter address"
          className="formInputAPI"
        />
        {suggestions.length > 0 && (
          <ul className="containerAPI" style={{ marginTop: '5px' }}>
            {suggestions.map((suggestion) => (
              <li key={suggestion.Id} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.Text}
              </li>
            ))}
          </ul>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoqateAPI;
