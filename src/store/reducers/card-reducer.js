import { Card } from "../actions";

const initialState = {
  list: [],
  
  status: {
    loading: false,

    error: {
      message: ''
    }
  }
}

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case Card.FETCH_BY_DECK_ID.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: { ...state.status.error, message: '' }
        }
      }
    case Card.FETCH_BY_DECK_ID.SUCCESS:
      return {
        ...state,
        list: action.payload.cards,
        status: {
          ...state.status,
          loading: false,
          error: { ...state.status.error, message: '' }
        }
      }
    case Card.FETCH_BY_DECK_ID.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: { ...state.status.error, message: action.payload.error.data.message }
        }
      }

    case Card.FETCH_BY_ID.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: { ...state.status.error, message: '' }
        }
      }
    case Card.FETCH_BY_ID.SUCCESS:
      return {
        ...state,
        list: [action.payload.card],
        status: {
          ...state.status,
          loading: false,
          error: { ...state.status.error, message: '' }
        }
      }
    case Card.FETCH_BY_ID.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: { ...state.status.error, message: action.payload.error.data.message }
        }
      }
    default:
      return state;
  }
}