import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

const poketmonApi = (id) =>
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id || ""}`, {
    params: { limit: 151 },
  });

const usePoketmon = (id) => {
  return useQuery(id ? ["poketmon", id] : "poketmon", () => poketmonApi(id));
};

export default usePoketmon;
