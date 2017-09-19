import config from '../../config';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export function startRequest () {
  return {
    type: SEARCH_REQUEST,
    payload: {}
  }
};

export function requestSuccess (resp) {
  return {
    type: SEARCH_SUCCESS,
    payload: {
      data: resp.items
    }
  };
};

export function requestError () {
  return {
    type: SEARCH_ERROR,
    payload: {}
  }
};

export function search (query) {
  return (dispatch, getState) => {
    const {
      search: {
        loading
      }
    } = getState();

    if (loading) {
      return new Promise(resolve => resolve());
    }

    dispatch(startRequest());

    const searchEndpointUrl = `${config.API_HOST}/api/search`;
    const encodedQuery = encodeURIComponent(query);
    return fetch(`${searchEndpointUrl}?q=${encodedQuery}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.text()
      .then(data => resp.ok ? dispatch(requestSuccess(JSON.parse(data))) : Promise.reject())
    )
    .catch(e => {
      if (e instanceof Error) {
        console.error(e);
      }

      dispatch(requestError());
    })
  }
};
