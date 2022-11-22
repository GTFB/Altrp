import { useCallback, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

function useQuery() {
  const history = useHistory();
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const set = useCallback((param, value) => {
    if (typeof param === 'string') {
      query.set(param, value);
    } else if (typeof param === 'object') {
      Object.keys(param).map(key => {
        query.set(key, param[key]);
      });
    }
    history.push('?' + query.toString());
  }, [query, history]);

  return [query, set];
}

export default useQuery;
