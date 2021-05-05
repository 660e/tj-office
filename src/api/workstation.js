import { service } from '@/utils/service.js';

const userId = JSON.parse(sessionStorage.getItem('user')).id;

export function getOrderInfoList(pageNum, isAdmin = false) {
  return service.post('/workstation/Reservation/getOrderInfoList', {
    pageNum,
    pageSize: 10,
    stationName: null,
    startDate: null,
    startOrderTime: null,
    endDate: null,
    endOrderTime: null,
    userMainId: isAdmin ? null : userId,
    userSubId: null
  });
}

export function getInviteCode() {
  return service.post('/workstation/User/getInviteCode', { userId });
}

export function updatePwd(oldPwd, newPwd) {
  return service.post('/workstation/User/updatePwd', { oldPwd, newPwd, userId });
}
