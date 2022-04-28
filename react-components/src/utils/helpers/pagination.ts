type N = number;

export const createPageArray = (value: N) => Array.from({ length: value }, (_, k) => k + 1);

export const countPageAmount = (total: N, count: N) => Math.ceil(count / total);

export const countCurrent = (current: N, pagesBefore: N, pages: N) =>
  Math.ceil((current * pages) / pagesBefore);

export const countPage = (total: number, current: number) =>
  Math.ceil((current * total) / total).toString();

export const sliceCards = <T>(array: T[], current: number, total: number) => {
  const start = (current - 1) * total;
  const end = current * total;
  return array.slice(start, end);
};
