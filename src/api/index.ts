import { makeApi, makeLocalApi } from './api';

export const client = makeApi();
export const localClient = makeLocalApi();
export const path = `https://ya-praktikum.tech/api/v2`;
