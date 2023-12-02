import { atom } from "recoil";

const selectedRowsAtom = atom<number[] | []>({
    key: 'selectedRows',
    default: []
})

export default selectedRowsAtom