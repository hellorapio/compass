import { useSearchParams } from "react-router-dom";

const useURLPosition = () => {
  const [search] = useSearchParams();
  const lat = search.get("lat");
  const lng = search.get("lng");
  return [lat, lng];
};

export default useURLPosition;
