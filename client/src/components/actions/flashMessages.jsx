import { ADD_FLASH_MESSAGE } from './types';

export const addFlashMessage = (message) => {
  return {
    type: ADD_FLASH_MESSAGE,
    message,
  };
};

