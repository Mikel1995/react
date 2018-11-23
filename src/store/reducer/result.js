import * as actionTypes from '../actions';

const initialState = {
  results: [],
};

const reducerName = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      // setTimeout(() => {
      //   console.log('Forza Juve');
      // }, 2000);
      return {
        ...state,
        results: state.results.concat({ id: new Date(), value: action.result }),
      };
    case actionTypes.DELETE_RESULT:
      // const newArray = state.results.filter(result => result.id !== action.resultId);
      return {
        ...state,
        results: state.results.filter(result => result.id !== action.resultId),
      };
    default:
      return state;
  }
};

export default reducerName;
