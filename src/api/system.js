import { service } from '@/utils/service.js';

export function queryByLoginname(loginname) {
  return service.get('/system/system/user/query-by-loginname', {
    params: {
      loginname
    }
  });
}
