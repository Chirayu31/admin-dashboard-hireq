import selectedRowsAtom from "../atoms/selectedRowsAtom";
import { useRecoilState, useRecoilValue } from 'recoil'
import TableRow from "./elements/TableRow";
import { filteredUsers } from "../atoms/usersAtom";
import { currentPageAtom, itemsPerPageAtom } from "../atoms/paginationAtom";
import { useEffect } from 'react';

const Table = () => {
    const [selectedRows, setSelectedRows] = useRecoilState<number[]>(selectedRowsAtom);
    const filteredData = useRecoilValue(filteredUsers)
    const currentPage = useRecoilValue(currentPageAtom);
    const itemsPerPage = useRecoilValue(itemsPerPageAtom);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const data = filteredData.slice(startIndex, endIndex);

    const handleAllCheckboxSelect = () => {
        const idArr = data.map(person => person.id)

        if (selectedRows.length === idArr.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(idArr);
        }
    }

    useEffect(() => {
        setSelectedRows([]);
    }, [currentPage]);

    return (
        <div className="table-container">
            <table className="main-table">
                <thead className="table-head">
                    <tr className="table-row">
                        <th>
                            <input
                                type="checkbox"
                                checked={selectedRows.length === data.length && data.every(person => selectedRows.includes(person.id))}
                                onChange={handleAllCheckboxSelect}
                                className="input-checkbox"
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <TableRow key={row.id} row={row} />
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default Table