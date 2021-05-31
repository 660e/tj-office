import { service } from '@/utils/service.js';

function qs(params) {
  const query = Object.keys(params).map(k => `${k}=${params[k]}`);
  return query.join('&');
}

export function regUserInfo(params) {
  return service.post('/workstation/User/regUserInfo', params);
}

export function getBuildingInfoList() {
  return service.post('/workstation/Station/getBuildingInfoList', { buildingId: '' });
}

export function getFloorInfoList(buildingId) {
  return service.post('/workstation/Station/getFloorInfoList', { buildingId });
}

export function getAreaInfoList(buildingId, floorId) {
  return service.post('/workstation/Station/getAreaInfoList', { buildingId, floorId });
}

export function getStationReservationList(areaId, startDate, endDate) {
  return service.post('/workstation/Station/getStationReservationList', { areaId, startDate, endDate });
}

export function getStationInfo(stationId) {
  return service.post('/workstation/Station/getStationInfo', { stationId });
}

export function getOrderInfoList(params) {
  return service.post('/workstation/Reservation/getOrderInfoList', params);
}

export function getVisitorInfoList(pageNum) {
  return service.post('/workstation/User/getVisitorInfoList', {
    pageNum,
    pageSize: 10,
    type: '',
    userId: JSON.parse(sessionStorage.getItem('user')).id
  });
}

export function getVisitorInfo(visitorId) {
  return service.post('/workstation/User/getVisitorInfo', { visitorId });
}

export function updateUserState(id, state) {
  return service.post('/workstation/User/updateUserState', { id, state });
}

export function addOrderInfo(params) {
  return service.post('/workstation/Reservation/addOrderInfo', params);
}

export function getInviteCode() {
  return service.post('/workstation/User/getInviteCode', { userId: JSON.parse(sessionStorage.getItem('user')).id });
}

export function updatePwd(params) {
  return service.post(`/workstation/User/updatePwd?${qs(params)}`);
}

export function controlStation(params) {
  return service.post('/workstation/Common/controlStation', params);
}

export function controlDevices(params) {
  return service.post('/workstation/Common/controlDevices', params);
}

export function processQRCode(QRCode) {
  return service.post('/workstation/Common/processQRCode', {
    QRCode,
    userId: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).id : ''
  });
}
