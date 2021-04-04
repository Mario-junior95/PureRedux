const redux = require("redux");
const creatStore = redux.createStore;
const thunkMiddleware = require("redux-thunk").default;
const applyMiddleware = redux.applyMiddleware;

const axios = require("axios");

// reducer

const initialeState = {
  loading: false,
  users: [],
  error: "",
};

//Action :

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

// Reducer

const reducer = (state = initialeState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: state.loading,
        users: [],
        error: action.payload,
      };
  }
};

// The Action Creator :

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => {
          return user.id;
        });
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

//Store
const store = creatStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsers());
