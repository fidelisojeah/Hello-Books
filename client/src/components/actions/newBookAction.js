import request from 'superagent';

import {
  CLOUDINARY_CLOUD_URL,
  CLOUDINARY_UPLOAD_PRESET
} from './types';

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  onUploadProgress(progressEvent) {
    // Do whatever you want with the native progress event
    // console.log('progressEvent', progressEvent);
    const progress =
      Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
    console.log(progressEvent, '----');
    // document.getElementById('progress').style.width = `${progress} %`;

    console.log(`onUploadProgress progressEvent.loaded: ${progressEvent.loaded},
    progressEvent.total: ${progressEvent.total}`);
  }
};

/**
 * @description
 * @param {*} Data
 * @return {*} return data
 */
export function bookImageUpload(Data) {
  return dispatch => {
    // const fd = new FormData();
    // fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    // fd.append('file', Data);
    return request
      .post(CLOUDINARY_CLOUD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', Data);
  };
}
