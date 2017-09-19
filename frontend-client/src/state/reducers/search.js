import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_ERROR,
} from '../actions/search';

const initialState = {
  loading: false,
  tweets: []
}

export default function search(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        error: false,
        loading: true
      };
    case SEARCH_ERROR:
      return {
       ...state,
       error: true,
       loading: false
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        tweets: action.payload.data
      };
    default:
      return state
  };
};
