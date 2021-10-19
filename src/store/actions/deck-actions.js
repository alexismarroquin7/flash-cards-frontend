import { axiosWithAuth } from "../../utils";

const ACTION = {
  FETCH_BY_USER_ID: {
    START: 'DECK__FETCH_BY_USER_ID--START',
    SUCCESS: 'DECK__FETCH_BY_USER_ID--SUCCESS',
    FAIL: 'DECK__FETCH_BY_USER_ID--FAIL',
  },
  CREATE: {
    START: 'DECK__CREATE--START',
    SUCCESS: 'DECK__CREATE--SUCCESS',
    FAIL: 'DECK__CREATE--FAIL',
  },
  DELETE_BY_ID: {
    START: 'DECK__DELETE_BY_ID--START',
    SUCCESS: 'DECK__DELETE_BY_ID--SUCCESS',
    FAIL: 'DECK__DELETE_BY_ID--FAIL',
  },
  REVIEW: {
    SORT_CARDS: {
      SHUFFLE: "DECK__REVIEW__SORT_CARDS__SHUFFLE",
      ASC: "DECK__REVIEW__SORT_CARDS__ASC",
      DESC: "DECK__REVIEW__SORT_CARDS__DESC",
    },
    CARD_ANSWER: {
      CORRECT: "DECK__REVIEW__CARD_ANSWER--CORRECT",
      INCORRECT: "DECK__REVIEW__CARD_ANSWER--INCORRECT",
    },
    DEQUEUE_CARD: "DECK__REVIEW__DEQUEUE_CARD",
    CLEAR: {
      RESULTS: "DECK__REVIEW__CLEAR__RESULTS"
    }
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

const deleteById = (deck_id) => async dispatch => {
  dispatch({
    type: ACTION.DELETE_BY_ID.START
  });
  
  try {
    const { data } = await axiosWithAuth().delete(`/decks/${deck_id}`);

    dispatch({
      type: ACTION.DELETE_BY_ID.SUCCESS,
      payload: {
        data
      }
    });

  } catch (err) {
    
    dispatch({
      type: ACTION.DELETE_BY_ID.FAIL,
      payload: {
        error: err.response
      }
    });

  }
} 

const sortCardsForReview = (deck_id, order, filter = null) => {
  const SHUFFLE = "SHUFFLE";
  const ASC = "ASC";
  const DESC = "DESC";

  switch(order){
    case SHUFFLE:
      return {
        type: ACTION.REVIEW.SORT_CARDS.SHUFFLE,
        payload: {
          deck_id,
          filter
        }
      }
    
    case ASC:
      return {
        type: ACTION.REVIEW.SORT_CARDS.ASC,
        payload: {
          deck_id
        }
      }
    
    case DESC:
      return {
        type: ACTION.REVIEW.SORT_CARDS.DESC,
        payload: {
          deck_id
        }
      }
    
    default:
      throw Error(`order must equal {SHUFFLE} || {ASC} || {DESC}`);
  }
}

const reviewCard = (answer) => {
  if(answer === 'CORRECT'){
    return {
      type: ACTION.REVIEW.CARD_ANSWER.CORRECT
    }
  } else if(answer === 'INCORRECT'){
    return {
      type: ACTION.REVIEW.CARD_ANSWER.INCORRECT
    }
  }
}

const dequeueReviewList = () => {
  return {
    type: ACTION.REVIEW.DEQUEUE_CARD
  }
}

const clearReviewResults = () => {
  return {
    type: ACTION.REVIEW.CLEAR.RESULTS
  }
}

const reviewIncorrectAnswers = () => {
  
}

export const Deck = { 
  ...ACTION,
  fetchByUserId,
  create,
  deleteById,
  sortCardsForReview,
  reviewCard,
  dequeueReviewList,
  clearReviewResults,
  reviewIncorrectAnswers
}