import { useQuery } from 'react-query';

const useMap = () => {
  const { isLoading, data } = useQuery(['map'], () =>
    fetch(
      `https://api.met.no/weatherapi/subjectiveforecast/1.0/?content_type=image%2Fpng&product=prognose_map`
    ).then(res => res.json())
  );

  return { isLoading, data };
};

export default useMap;
