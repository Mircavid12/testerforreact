import { combineReducers, createStore ,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { attendenceReducer } from '../modules/attendence/reducer';
import { studentReducer } from '../modules/students/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
const  rootReducer = combineReducers({
    students:studentReducer,
    attendence:attendenceReducer
});

const middlewares = [
    thunk,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
]

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middlewares)))