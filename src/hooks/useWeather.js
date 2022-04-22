import { useQuery } from 'react-query';

const useWeather = location => {
  const defaultLocation = location === undefined ? 'Oslo' : location;

  const { isLoading, data } = useQuery(
    defaultLocation && ['location', defaultLocation],
    () =>
      fetch(`http://api.weatherapi.com/v1/forecast.json?key=06a59b151a3b482c8ac202441221904&q=${defaultLocation}&days=8&aqi=no&alerts=no
      `).then(res => res.json())
  );
  return { isLoading, data };
};

export default useWeather;
