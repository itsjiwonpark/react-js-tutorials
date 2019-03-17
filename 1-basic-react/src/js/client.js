import { combineReducers, createStore } from "redux";

const userReducer = (state = {}, action) => {
  //action은 전부 받는데 state가 user가 들어옴
  switch (action.type) {
    case "CHANGE_NAME": {
      state = { ...state, name: action.payload };
      break;
    }
    case "CHANGE_AGE": {
      state = { ...state, age: action.payload };
      break;
    }
  }
  return state;
};

const tweetsReducer = (state = [], action) => {
  // return state; 이렇게 아무것도 안리턴하면 error뜸
  switch (action.type) {
    case "ADD_TWEET": {
      state = [...state, action.payload];
      break;
    }
    case "DELETE_TWEET": {
      state = [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
      break;
    }
  }
  return state;
};

const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer
});

const store = createStore(reducers);

store.subscribe(() => {
  // 비동기로 처리되나? 둘다 바뀐걸로 나오는데 근데 바뀐 걸 어떻게 알지? action이 dispatch돼서.. 두번 dispatch돼서
  // 얘는 state를 비교해서 반응하는 애가 아니고 action이 dispatch됐을 때 콜백을 호출하는 녀석
  console.log("store changed!", store.getState());
});

store.dispatch({ type: "CHANGE_NAME", payload: "Will" });
console.log("then what happens now");
store.dispatch({ type: "CHANGE_AGE", payload: "35" });
store.dispatch({ type: "ADD_TWEET", payload: "new tweet1" });
store.dispatch({ type: "ADD_TWEET", payload: "new tweet2" });
store.dispatch({ type: "ADD_TWEET", payload: "new tweet3" });
store.dispatch({ type: "DELETE_TWEET", payload: 2 });
store.dispatch({ type: "DELETE_TWEET", payload: 0 });
