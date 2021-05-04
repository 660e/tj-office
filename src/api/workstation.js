import { service } from '@/utils/service.js';

const userId = JSON.parse(sessionStorage.getItem('user')).id;

export function getInviteCode() {
  return service.post('/workstation/User/getInviteCode', { userId });
}

export function updatePwd(oldPwd, newPwd) {
  return service.post('/workstation/User/updatePwd', { oldPwd, newPwd, userId });
}
