export function deskType(s) {
  switch (s) {
    case 201:
      return '固定工位';
    case 202:
      return '流动工位';
    default:
      return '-';
  }
}

export function deskStatus(s) {
  switch (s) {
    case 101:
      return '使用中';
    case 102:
      return '空闲中';
    default:
      return '-';
  }
}
