const BASE = 'https://rickandmortyapi.com/api/';

export const CHARACTER = `${BASE}character/`;

export const getFilterUrl = ({ searchWord, status, gender, species }: { [x: string]: string }) =>
  `${CHARACTER}?name=${searchWord}&status=${status}&gender=${gender}&species=${species}`;
