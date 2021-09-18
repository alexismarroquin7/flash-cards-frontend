import { axiosWithAuth } from "../../utils";

const ACTION = {
  FETCH_BY_USER_ID: {
    START: 'FETCH_DECKS_BY_USER_ID_START',
    SUCCESS: 'FETCH_DECKS_BY_USER_ID_SUCCESS',
    FAIL: 'FETCH_DECKS_BY_USER_ID_FAIL',
  },
  CREATE: {
    START: 'DECK_CREATE_START',
    SUCCESS: 'DECK_CREATE_SUCCESS',
    FAIL: 'DECK_CREATE_FAIL',
  }
}

const fetchByUserId = user_id => async dispatch => {
  dispatch({
    type: ACTION.FETCH_BY_USER_ID.START
  });
  
  try {
    const res = await axiosWithAuth()
      .get(`/decks?user_id=${user_id}`);
    
    dispatch({
      type: ACTION.FETCH_BY_USER_ID.SUCCESS,
      payload: {
        data: res.data
      }
    });
    
  } catch(err) {
    dispatch({
      type: ACTION.FETCH_BY_USER_ID.FAIL,
      payload: {
        data: err.response.data
      }
    });

  }
};

const create = (deck) => async dispatch => {
  dispatch({
    type: ACTION.CREATE.START
  });
  
  try {
    const { data } = await axiosWithAuth().post('/decks', deck);

    dispatch({
      type: ACTION.CREATE.SUCCESS,
      payload: {
        data
      }
    });

  } catch (err) {
    dispatch({
      type: ACTION.CREATE.FAIL,
      payload: {
        data: err.response.data
      }
    });

  }
}

export const Deck = { 
  ...ACTION,
  fetchByUserId,
  create
}