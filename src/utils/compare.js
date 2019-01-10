export const compareAscByObject = field => (objectA, objectB) => {
  if (objectA[field] < objectB[field]) return -1;
  if (objectA[field] > objectB[field]) return 1;
  return 0;
};

export const compareDeskByObject = field => (objectA, objectB) => {
  if (objectB[field] < objectA[field]) return -1;
  if (objectB[field] > objectA[field]) return 1;
  return 0;
};
