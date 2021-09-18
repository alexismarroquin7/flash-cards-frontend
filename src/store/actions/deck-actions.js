import { axiosWithAuth } from "../../utils";

const ACTION = {
  FETCH_DECKS_BY_USER_ID: {
    START: 'FETCH_DECKS_BY_USER_ID_START',
    SUCCESS: 'FETCH_DECKS_BY_USER_ID_SUCCESS',
    FAIL: 'FETCH_DECKS_BY_USER_ID_FAIL',
  }
}

const fetchByUserId = user_id => async dispatch => {
  dispatch({
    type: ACTION.FETCH_DECKS_BY_USER_ID.START
  });
  
  try {
    const res = await axiosWithAuth()
      .get(`/decks?user_id=${user_id}`);
    
    dispatch({
      type: ACTION.FETCH_DECKS_BY_USER_ID.SUCCESS,
      payload: {
        data: res.data
      }
    });
    
  } catch(err) {
    dispatch({
      type: ACTION.FETCH_DECKS_BY_USER_ID.FAIL,
      payload: {
        data: err.response.data
      }
    });

  }
};

export const Deck = { 
  ...ACTION,
  fetchByUserId
}