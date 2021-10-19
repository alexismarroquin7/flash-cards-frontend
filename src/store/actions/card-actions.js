import { axiosWithAuth } from "../../utils";

const ACTION = {
  FETCH_BY_DECK_ID: {
    START: 'CARD__FETCH_BY_DECK_ID--START',
    SUCCESS: 'CARD__FETCH_BY_DECK_ID--SUCCESS',
    FAIL: 'CARD__FETCH_BY_DECK_ID--FAIL'
  },
  FETCH_BY_ID: {
    START: 'CARD__FETCH_BY_ID--START',
    SUCCESS: 'CARD__FETCH_BY_ID--SUCCESS',
    FAIL: 'CARD__FETCH_BY_ID--FAIL'
  },
  CREATE: {
    START: 'CARD__CREATE--START',
    SUCCESS: 'CARD__CREATE--SUCCESS',
    FAIL: 'CARD__CREATE--FAIL'
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

const create = ({ 
  deck_id,
  panel_a,
  panel_b
}) => async dispatch => {
  
  dispatch({
    type: ACTION.CREATE.START
  });

  const cardModel = {
    deck_id: Number(deck_id),
    panel_a: {
      ...panel_a,
      text: panel_a.text.trim().length !== 0 ? panel_a.text.trim() : null,
      notes: panel_a.notes.trim().length !== 0 ? panel_a.notes.trim() : null
    },
    panel_b: {
      ...panel_b,
      text: panel_b.text.trim().length !== 0 ? panel_b.text.trim() : null,
      notes: panel_b.notes.trim().length !== 0 ? panel_b.notes.trim() : null
    }
  }

  try {
    const res = await axiosWithAuth()
    .post('/cards', cardModel);

    dispatch({
      type: ACTION.CREATE.SUCCESS,
      payload: {
        data: res.data
      }
    });

  } catch(err) {
    dispatch({
      type: ACTION.CREATE.SUCCESS,
      payload: {
        error: err.response
      }
    });
  }
}

export const Card = {
  ...ACTION,
  fetchByDeckId,
  fetchById,
  create
}