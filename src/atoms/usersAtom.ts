import { atom } from 'recoil'
import { IUser } from '../types'

const usersAtom = atom<IUser[]>({
    key: 'usersAtom',
    default: []
})

export const filteredUsers = atom<IUser[]>({
    key: 'filteredUsersAtom',
    default: []
})


export default usersAtom