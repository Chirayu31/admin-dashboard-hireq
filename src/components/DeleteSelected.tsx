import { useRecoilState, useSetRecoilState } from "recoil"
import selectedRowsAtom from "../atoms/selectedRowsAtom"
import usersAtom, { filteredUsers } from "../atoms/usersAtom"

const DeleteSelected = () => {
    const [selectedRows, setSelectedRows] = useRecoilState(selectedRowsAtom)
    const [usersData, setUsersData] = useRecoilState(usersAtom)
    const setFilteredData = useSetRecoilState(filteredUsers)

    const handleDeleteSelected = () => {
        selectedRows.forEach((rowId) => {
            setUsersData(prevUserData => prevUserData.filter(user => user.id !== rowId))
            setFilteredData(prevUserData => prevUserData.filter(user => user.id !== rowId))
        })
        setSelectedRows([])
    }

    return (
        <div className="selection-data">
            <p>
                {`${selectedRows.length} of ${usersData.length} selected`}
            </p>

            {selectedRows.length > 0 &&
                <button onClick={handleDeleteSelected}>Delete Selected</button>}
        </div>
    )
}

export default DeleteSelected