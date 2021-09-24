import { Auth } from "../actions";

const initialState = {
  user_id: null,
  username: '',
  token: '',
  
  role: {
    role_id: null,
    name: ''
  },
  
  status: {
    message: '',

    loading: false,
    error: {
      message: ''
    }
  }
}

export const authReducer = (state = initialState, action) => {
  switch(action.type){
    
    case Auth.LOGIN.START:
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
    case Auth.LOGIN.SUCCESS:
      
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user_id', action.payload.user_id);
      localStorage.setItem('username', action.payload.username);
    
      return {
        ...state,
        user_id: action.payload.user_id,
        username: action.payload.username,
        token: action.payload.token,

        role: {
          ...state.role,
          ...action.payload.role
        },

        status: {
          ...state.status,
          message: action.payload.message,
          loading: false,

          error: {
            ...state.status.error,
            message: ''
          }
        }
      }   
    case Auth.LOGIN.FAIL:
      return {
        ...state,
        
        status: {
          ...state.status,
          loading: false,
        
          error: {
            ...state.status.error,
            message: action.payload.err.data.message
          }
        }
      }   
    
    case Auth.LOGOUT.START:  
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ''
          }
        }
      }

    case Auth.LOGOUT.SUCCESS:
      
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('username');
      localStorage.removeItem('reduxState');
      
      return {
        ...state,
        ...initialState
      }   

    case Auth.LOGOUT.FAIL:
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

    default:
      return state;
  }
};
