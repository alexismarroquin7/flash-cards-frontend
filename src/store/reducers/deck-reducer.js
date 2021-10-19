import { Deck } from "../actions";
import { shuffleArray } from "../../utils";

const initialState = {
  list: [],

  review: {
    queue: [],
    result: {
      correct: [],
      incorrect: []
    }
  },

  status: {
    loading: false,
    
    error: {
      message: ''
    }
  }
}


export const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case Deck.FETCH_BY_USER_ID.START:
      return {
        ...state,
        
        status: {
          ...state.status,
          loading: true,

          error: {
            ...state.status.error,
            message: ''
          }
        }
      }
    case Deck.FETCH_BY_USER_ID.SUCCESS:
      return {
        ...state,

        list: action.payload.data,
        
        status: {
          ...state.status,
          loading: false,

          error: {
            ...state.status.error,
            message: ''
          }
        }
      }
    case Deck.FETCH_BY_USER_ID.FAIL:
      return {
        ...state,
        
        status: {
          ...state.status,
          loading: false,

          error: {
            ...state.status.error,
            message: action.payload.data.message
          }
        }
      }

    case Deck.CREATE.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: { ...state.status.error, message: '' }
        }
      }
    case Deck.CREATE.SUCCESS:
      return {
        ...state,
        list: [
          ...state.list,
          action.payload.data[0]
        ],

        status: {
          ...state.status,
          loading: false,
          error: { ...state.status.error, message: '' }
        }
      }
    case Deck.CREATE.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: action.payload.data.message 
          }
        }
      }
    case Deck.DELETE_BY_ID.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            ...state.status.error,
            message: ''
          }
        }
      }
    case Deck.DELETE_BY_ID.SUCCESS:
      return {
        ...state,
        list: [
          ...state.list.filter(deck => (
            deck.deck_id !== Number(action.payload.data.deck_id)
          ))
        ],
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ''
          }
        }
      }
    case Deck.DELETE_BY_ID.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: action.payload.error.data.message 
          }
        }
      }
  
    case Deck.REVIEW.SORT_CARDS.SHUFFLE:
      const [deck] = state.list.filter((deck) => (
        deck.deck_id === action.payload.deck_id
      ));

      let shuffledDeck;

      if(action.payload.filter){
        if(action.payload.filter === "INCORRECT"){
          shuffledDeck = shuffleArray(state.review.result.incorrect)
          
        } else if(action.payload.filter === "CORRECT"){
          shuffledDeck = shuffleArray(state.review.result.correct)
        }  
      } else {
        
        shuffledDeck = shuffleArray(deck.cards)
      }
      
      return {
        ...state,
        review: {
          ...state.review,
          queue: shuffledDeck,
          result: {
            ...state.review.result,
            correct: [],
            incorrect: []
          }
        }

      }
    case Deck.REVIEW.SORT_CARDS.ASC:
      return {
        ...state
      }
    case Deck.REVIEW.SORT_CARDS.DESC:
      return {
        ...state
      }

    case Deck.REVIEW.CARD_ANSWER.CORRECT:
      return {
        ...state,
        review: {
          ...state.review,
          result: {
            ...state.review.result,
            correct: [
              ...state.review.result.correct,
              state.review.queue[0]
            ]
          }
        }
      }
    
    case Deck.REVIEW.CARD_ANSWER.INCORRECT:
      return {
        ...state,
        review: {
          ...state.review,
          result: {
            ...state.review.result,
            incorrect: [
              ...state.review.result.incorrect,
              state.review.queue[0]
            ]
          }
        }
      }

    case Deck.REVIEW.DEQUEUE_CARD:
      return {
        ...state,
        review: {
          ...state.review,
          queue: state.review.queue.filter((_, i) => i !== 0)
        }
      }

    case Deck.REVIEW.CLEAR.RESULTS:
      return {
        ...state,
        review: {
          ...state.review,
          result: {
            ...state.review.result,
            correct: [],
            incorrect: []
          }
        }
      }

    default:
      return state;
  }
}

