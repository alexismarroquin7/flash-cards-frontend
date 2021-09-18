import { Deck } from "../actions";

const initialState = {
  list: [],

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

    default:
      return state;
  }
}

