import { service } from '@/utils/service.js';

const userId = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).id : '';

export function regUserInfo(params) {
  return service.post('/workstation/User/regUserInfo', params);
}

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

export function getVisitorInfoList(pageNum) {
  return service.post('/workstation/User/getVisitorInfoList', {
    pageNum,
    pageSize: 10,
    type: '',
    userId
  });
}

export function getVisitorInfo(visitorId) {
  return service.post('/workstation/User/getVisitorInfo', { visitorId });
}

export function updateUserState(id, state) {
  return service.post('/workstation/User/updateUserState', { id, state });
}

export function getInviteCode() {
  return service.post('/workstation/User/getInviteCode', { userId });
}

export function updatePwd(oldPwd, newPwd) {
  return service.post('/workstation/User/updatePwd', { oldPwd, newPwd, userId });
}
