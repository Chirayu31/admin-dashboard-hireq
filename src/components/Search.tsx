import { useRecoilValue, useSetRecoilState } from "recoil"
import usersAtom, { filteredUsers } from "../atoms/usersAtom"
import { useState } from 'react'
import { IUser } from "../types"
import { currentPageAtom } from "../atoms/paginationAtom"

const Search = () => {
    const setFilteredUserData = useSetRecoilState<IUser[]>(filteredUsers)
    const userData = useRecoilValue<IUser[]>(usersAtom)
    const [query, setQuery] = useState('')
    const setCurrentPage = useSetRecoilState(currentPageAtom);

    const handleSearch = () => {
        setCurrentPage(1);

        const filteredData = userData.filter(
            (user) =>
                user.name.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase()) ||
                user.role.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredUserData(filteredData);
    };


    return (
        <div className="search-input">
            <input
                type='text'
                className='search-box'
                placeholder="Search user entries"
                onChange={(e) => { setQuery(e.target.value) }}
            />

            <button className='search-icon' onClick={handleSearch}>
                Search
            </button>
        </div>
    )
}

export default Search