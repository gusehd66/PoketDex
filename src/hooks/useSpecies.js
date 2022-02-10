import axios from "axios";
import { useQuery } from "react-query";

const speciesApi = (id) =>
  axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

const useSpecies = (id) => useQuery(["species", { id }], () => speciesApi(id));

export default useSpecies;
