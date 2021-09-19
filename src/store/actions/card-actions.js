import { axiosWithAuth } from "../../utils";

const ACTION = {
  FETCH_BY_DECK_ID: {
    START: 'FETCH_BY_DECK_ID_START',
    SUCCESS: 'FETCH_BY_DECK_ID_SUCCESS',
    FAIL: 'FETCH_BY_DECK_ID_FAIL'
  },
  FETCH_BY_ID: {
    START: 'FETCH_BY_ID_START',
    SUCCESS: 'FETCH_BY_ID_SUCCESS',
    FAIL: 'FETCH_BY_ID_FAIL'
  },
}


const fetchByDeckId = (deck_id) => async dispatch => {
  dispatch({
    type: ACTION.FETCH_BY_DECK_ID.START
  });

  try {
    const res = await axiosWithAuth().get(`/cards?deck_id=${deck_id}&sort=asc`);

    dispatch({
      type: ACTION.FETCH_BY_DECK_ID.SUCCESS,
      payload: {
        cards: res.data
      }
    });

  } catch(err) {
    dispatch({
      type: ACTION.FETCH_BY_DECK_ID.FAIL,
      payload: {
        error: err.response
      }
    });
  }
}

const fetchById = (card_id) => async dispatch => {
  dispatch({
    type: ACTION.FETCH_BY_ID.START
  });

  try {
    const res = await axiosWithAuth().get(`/cards/${card_id}`);

    dispatch({
      type: ACTION.FETCH_BY_ID.SUCCESS,
      payload: {
        card: res.data
      }
    });

  } catch(err) {
    
    dispatch({
      type: ACTION.FETCH_BY_ID.FAIL,
      payload: {
        error: err.response
      }
    });
  }
}

export const Card = {
  ...ACTION,
  fetchByDeckId,
  fetchById
}