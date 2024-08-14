import { combineReducers } from 'redux';
import commandReducer from './commandReducer';

const rootReducer = combineReducers({
    command: commandReducer,
});

export default rootReducer;