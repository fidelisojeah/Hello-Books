import {
  createStore,
  applyMiddleware,
} from 'redux';
import rootReducer from '../rootReducer';

/*
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(reduxImmutableStateInvariant(),
    )
  );
}
*/
