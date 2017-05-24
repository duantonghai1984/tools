import request from '../utils/request';

export async function query(options) {
  return request('/api/users',options);
};


export async function fetchData(options) {
   let url="http://10.139.34.144/za-doc/doc/list/docPrintReqRecordList/listPrintReqRecord.json?gmtCreatedStartStr=2017-05-22+12%3A51%3A00&gmtCreatedEndStr=2017-05-23+12%3A51%3A0";
   return request("/login");
};


