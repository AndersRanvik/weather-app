import React, { useState, useEffect } from 'react';

const useLatLon = query => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setStatus('fetching');
      const response = await fetch(
        `http://api.positionstack.com/v1/forward?access_key=8ba9456ef80f97ca8e45b6942a0dd122&query=${query}&output=json&limit=1`
      );
      const data = await response.json();
      setData(data);
      setStatus('fetched');
    };

    fetchData();
  }, [query]);

  return { status, data };
};

export default useLatLon;
