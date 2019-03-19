import { applyMiddleware, createStore } from "redux";
import axios from "axios";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  err: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_PENDING": {
      return { ...state, fetching: true };
    }
    case "FETCH_USERS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload.data
      };
    }
    case "FETCH_USERS_REJECTED": {
      return { ...state, fetching: false, err: action.payload };
    }
  }
  return state;
};

const middleware = applyMiddleware(promise, thunk, logger);
// promise middleware를 thunk 대신에 쓰거나 덧붙여 쓰거나
const store = createStore(reducer, middleware);

store.dispatch({
  type: "FETCH_USERS",
  payload: axios.get("http://rest.learncowefde.academy/api/wstern/users")
});

// 자동으로 "FETCH_USERS_PENDING"을 부르고 그 다음에는 "FETCH_USERS_FULFILLED", 또는 "FETCH_USERS_REJECTED"를 부른다.
// promise를 많이 쓸 거면 정말 깔끔함
