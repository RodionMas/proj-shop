export const getLocalStorage = (arg: string) => {
  if (arg === 'item') {
    const data = localStorage.getItem('item');
  return data ? JSON.parse(data) : [];
  }
  if (arg === 'totalPrice') {
    const data = localStorage.getItem('totalPrice');
    return data ? JSON.parse(data) : 0;
  }
  if (arg === 'count') {
    const data = localStorage.getItem('count');
    return data ? JSON.parse(data) : 0;
  }
};