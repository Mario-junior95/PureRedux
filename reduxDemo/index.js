const redux = require("redux");
const createStore = redux.createStore;
//Combine Reducers
const combineReducers = redux.combineReducers;

//Action
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

const buyCake = () => {
  return {
    type: BUY_CAKE,
    info: "First Redux Action",
  };
};

const buyIceCream = () => {
  return {
    type: BUY_ICECREAM,
    info: "Second Redux Action",
  };
};

//Reducer

const initialeCakeState = {
  numOfCakes: 10,
};

const initialeIceCreamState = {
  numofIceCreams: 20,
};

const cakeReducer = (state = initialeCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    default:
      return state;
  }
};

const iceCreamReducer = (state = initialeIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numofIceCreams: state.numofIceCreams - 1,
      };
    default:
      return state;
  }
};

//Store

const routeReducers = combineReducers({
  cake: cakeReducer,
  icecream: iceCreamReducer,
});

const store = createStore(routeReducers);
console.log("Initial State : ", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("Update State : ", store.getState());
});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();
