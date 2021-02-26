import { createStore, combineReducers } from 'redux';
export const Reducer_One = (state = 1, action) => state
export const Reducer_Two = (state = 2, action) => state

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
  Reducer_One,
  Reducer_Two
})

const store = createStore(rootReducer)

export default store