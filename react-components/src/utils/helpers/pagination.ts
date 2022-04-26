const DEFAULT_API_TOTAL = 20;

export const createPageArray = (value: number) => Array.from({ length: value }, (_, k) => k + 1);

export const countPageAmount = (total: number, pages: number) =>
  (pages * DEFAULT_API_TOTAL) / total;

export const countPage = (total: number, current: number) =>
  Math.ceil((current * total) / total).toString();

export const sliceCards = <T>(array: T[], current: number, total: number) => {
  const start = (current - 1) * total;
  const end = current * total;
  return array.slice(start, end);
};
