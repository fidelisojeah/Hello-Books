import shortid from 'shortid';
import { ADD_FLASH_MESSAGE } from '../components/actions/types';

export default function flashMessages(state = [], action) {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      //  return console.log('Hi');
      return [
        ...state,
        Object.assign({}, {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text,
        })];
    // break;
    default:
      return state;
  }
}
