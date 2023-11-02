/**
 *
 * @param obj : object need to change all value
 * @param val : value fill to object
 */

export function setAll(obj: Object, val: any) {
  if (obj !== null && typeof obj === 'object') {
    const tmp = { ...obj };
    // @ts-ignore
    Object.keys(tmp).forEach(k => (tmp[k] = val));
    return tmp;
  }
  throw Error('invalid object');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stripEmptyValue = (obj: any, property: string) => {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((v as any)[property] !== null && (v as any)[property] !== undefined && (v as any)[property] !== '') {
      return { ...acc, [k]: v };
    }

    return acc;
  }, {});
};

export const removeEmptyObjects = (arr: { [key: string]: any }[]): { [key: string]: any }[] => {
  return arr.filter(obj => Object.keys(obj).length !== 0);
};
