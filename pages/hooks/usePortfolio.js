import useSWR from 'swr'
import useWalletAuth from './useWalletAuth';

const OPENSEA_API_BASE_URL = 'https://api.opensea.io/api/v1';

const fetcher = url => fetch(url).then(r => r.json());

const useCollections = (id) => {
  const { data, error } = useSWR(`${OPENSEA_API_BASE_URL}/collections?asset_owner=${id}`, fetcher);
  return {
    collections: data ?? []
  }
}

const usePortfolio = () => {
  const { id } = useWalletAuth();
  const { collections } = useCollections(id);

  return {
    collections
  }
}

export default usePortfolio;