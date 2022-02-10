import axios from "axios";
import { useQuery } from "react-query";

const useEvolutionChainQuery = (url) =>
  useQuery(["evolution", { url }], () => (url ? axios.get(url) : null));

export default useEvolutionChainQuery;
