import { ChangeEvent } from 'react';

export type PaginateType = (num: number) => void;

export type SearchType = (event: ChangeEvent<HTMLInputElement>) => void;
