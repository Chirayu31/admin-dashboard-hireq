import { atom } from 'recoil';

export const currentPageAtom = atom({
    key: 'currentPage',
    default: 1,
});

export const itemsPerPageAtom = atom({
    key: 'itemsPerPage',
    default: 10,
});