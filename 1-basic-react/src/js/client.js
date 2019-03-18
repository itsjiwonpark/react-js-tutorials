import { applyMiddleware, createStore } from "redux";
import axios from "axios";
import logger from "redux-logger";
import thunk from "redux-thunk";

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  err: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_START": {
      return { ...state, fetching: true };
    }
    case "RECEIVE_USERS": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      };
    }
    case "FETCH_USERS_ERROR": {
      return { ...state, fetching: false, err: action.payload };
    }
  }
  return state;
};

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducer, middleware);

store.dispatch(dispatch => {
  dispatch({ type: "FETCH_USERS_START" });
  axios
    .get("http://rest.learncode.academy/api/wstern/users")
    .then(response => {
      dispatch({ type: "RECEIVE_USERS", payload: response.data });
    })
    .catch(err => {
      dispatch({ type: "FETCH_USERS_ERROR", payload: err });
    });
});

// dispatch를 받는 함수를 dispatch하는 것이 thunk다
