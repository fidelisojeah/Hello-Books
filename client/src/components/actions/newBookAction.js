import request from 'superagent';
import axios from 'axios';

import {
  CLOUDINARY_CLOUD_URL,
  CLOUDINARY_UPLOAD_PRESET
} from './types';


/**
 * @description
 * @param {file} Data
 * @return {promise} return data
 */
export function bookImageUpload(imageData) {
  return dispatch => {
    return request
      .post(CLOUDINARY_CLOUD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', imageData);
  };
}
/**
 * @description
 * @param {object} bookData
 * @return {promise} return Data
 */
export function newBookRequest(bookData) {
  return dispatch => {
    return axios.post('/api/v4/books', bookData);
  };
}
