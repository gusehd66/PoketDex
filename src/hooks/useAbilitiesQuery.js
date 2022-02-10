import axios from "axios";
import { useQueries } from "react-query";

const useAbilitiesQuery = (abilities) => {
  const queries = abilities.map(({ ability }, idx) => ({
    queryKey: ["ability", idx],
    queryFn: () => axios.get(ability.url),
  }));

  return useQueries(queries);
};

export default useAbilitiesQuery;
