const redux = require("redux");
const createStore = redux.createStore;

//Action

const BUY_CAKE = "BUY_CAKE";

const buyCake = () => {
  return {
    type: BUY_CAKE,
    info: "My First Redux Action",
  };
};

// Reducer

const initialeState = {
  numOfCake: 10,
};

const reducer = (state = initialeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCake: state.numOfCake - 1,
      };

    default:
      return state;
  }
};

// Store

const store = createStore(reducer);
console.log("Initial State", store.getState());

const unsbscribe = store.subscribe(() => {
  console.log("Update State :", store.getState());
});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

unsbscribe();
