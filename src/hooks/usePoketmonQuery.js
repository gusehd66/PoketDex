import axios from "axios";
import { useQueries, useQuery } from "react-query";

export const poketmonApi = (id) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${id || ""}`, {
    params: { limit: 151 },
  });
};

export const usePoketmonQueries = (names) => {
  const queries = names.map((name, idx) => ({
    queryKey: ["evolution", `${name}_${idx}`],
    queryFn: () => poketmonApi(name),
  }));

  return useQueries(queries);
};

const usePoketmonQuery = (id) =>
  useQuery(id ? ["poketmon", id] : "pokemon", () => poketmonApi(id));

export default usePoketmonQuery;
