import { axiosWithAuth } from "../../utils";

const ACTION = {
  FETCH_BY_DECK_ID: {
    START: 'FETCH_CARD_BY_DECK_ID_START',
    SUCCESS: 'FETCH_CARD_BY_DECK_ID_SUCCESS',
    FAIL: 'FETCH_CARD_BY_DECK_ID_FAIL'
  },
  FETCH_BY_ID: {
    START: 'FETCH_CARD_BY_ID_START',
    SUCCESS: 'FETCH_CARD_BY_ID_SUCCESS',
    FAIL: 'FETCH_CARD_BY_ID_FAIL'
  },
  CREATE: {
    START: 'CREATE_CARD_START',
    SUCCESS: 'CREATE_CARD_SUCCESS',
    FAIL: 'CREATE_CARD_FAIL'
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