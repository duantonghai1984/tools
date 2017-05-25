import request from '../utils/request';

export async function query(options) {
  return request('/api/users',options);
};




