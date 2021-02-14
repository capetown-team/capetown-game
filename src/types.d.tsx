import { ChangeEvent, MouseEvent } from 'react';

export type PaginateType = (num: number) => void;

export type SearchType = (event: ChangeEvent<HTMLInputElement>) => void;

export type ClickType = (event: MouseEvent) => void;
