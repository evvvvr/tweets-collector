export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export function startRequest() {
  return {
    type: SEARCH_REQUEST,
    payload: {}
  };
};

export function requestSuccess(resp) {
  return {
    type: SEARCH_SUCCESS,
    payload: {
      data: resp.items
    }
  };
};

export function requestError() {
  return {
    type: SEARCH_ERROR,
    payload: {}
  };
};

export function search() {
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

    return fetch('http://localhost:3004/tweets', {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    /*
    .then(function (response) {
      return response.json()
    })
    .catch (function (error) {
      console.log('Request failed', error)
    })
   */
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
}
