import { applyMiddleware, createStore } from "redux";

const reducer = (initialState = 0, action) => {
  if (action.type === "INC") {
    return ++initialState;
  } else if (action.type === "DEC") {
    return --initialState;
  } else if (action.type === "E") {
    throw new Error("AHHHHHH!!!!!");
  }
  return initialState;
};

const logger = store => next => action => {
  console.log("action fired", action);
  //  action.type = "DEC"; 중간에 수정도 가능함
  next(action);
};

const error = store => next => action => {
  try {
    next(action);
  } catch (e) {
    console.log("AAHHHH!!", e);
  }
};

const middleware = applyMiddleware(logger, error);

const store = createStore(reducer, 1, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch({ type: "INC" });
store.dispatch({ type: "INC" });
store.dispatch({ type: "INC" });
store.dispatch({ type: "DEC" });
store.dispatch({ type: "DEC" });
store.dispatch({ type: "DEC" });
store.dispatch({ type: "E" });
