import { axiosWithBaseURL as axios, axiosWithAuth } from "../../utils"

const ACTION = {
  LOGIN: {
    START: "AUTH__LOGIN--START",
    SUCCESS: "AUTH__LOGIN--SUCCESS",
    FAIL: "AUTH__LOGIN--FAIL",
  },
  LOGOUT: {
    START: "AUTH__LOGOUT--START",
    SUCCESS: "AUTH__LOGOUT--SUCCESS",
    FAIL: "AUTH__LOGOUT--FAIL",
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
    const res = await axiosWithAuth().get('/auth/logout');
    
    dispatch({
      type: ACTION.LOGOUT.SUCCESS,
      data: res.data
    });

  } catch (err) {
    dispatch({
      type: ACTION.LOGOUT.FAIL,
      error: err.response
    });
  }
};

export const Auth = {
  ...ACTION,
  login,
  logout,
}