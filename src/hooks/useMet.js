import { useQuery } from 'react-query';

const useMet = (lat, lon) => {
  const { isLoading, data } = useQuery(lat && lon && ['lat', lat], () =>
    fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/complete.json?lat=${lat}&lon=${lon}`
    ).then(res => res.json())
  );

  return { isLoading, data };
};

export default useMet;
