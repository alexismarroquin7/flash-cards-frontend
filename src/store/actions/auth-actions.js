import { axiosWithBaseURL as axios, axiosWithAuth } from "../../utils"

const ACTION = {
  LOGIN: {
    START: "LOGIN_START",
    SUCCESS: "LOGIN_SUCCESS",
    FAIL: "LOGIN_FAIL",
  },
  LOGOUT: {
    START: "LOGOUT_START",
    SUCCESS: "LOGOUT_SUCCESS",
    FAIL: "LOGOUT_FAIL",
  },
};

const login = credentials => async dispatch => {
  
  dispatch({
    type: ACTION.LOGIN.START
  });
  
  try {
    const res = await axios().post('/auth/login', credentials);
    dispatch({
      type: ACTION.LOGIN.SUCCESS,
      payload: {
        ...res.data
      }
    });
  } catch(err) {
    dispatch({
      type: ACTION.LOGIN.FAIL,
      payload: {
        err: err.response
      }
    });
  }
}

const logout = () => async dispatch => {
  dispatch({
    type: ACTION.LOGOUT.START
  });  
  
  try {
    const res = await axiosWithAuth().get('/api/auth/logout');
    dispatch({
      type: ACTION.LOGOUT.SUCCESS
    });

  } catch (err) {
    dispatch({
      type: ACTION.LOGOUT.FAIL
    });
  }
};

export const Auth = {
  ...ACTION,
  login,
  logout,
}