import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import selectedRowsAtom from '../../atoms/selectedRowsAtom';
import usersAtom, { filteredUsers } from '../../atoms/usersAtom';
import { IUser } from '../../types';

interface TableRowProps {
    row: IUser;
}

const TableRow: React.FC<TableRowProps> = ({ row }) => {
    const [selectedRows, setSelectedRows] = useRecoilState<number[]>(selectedRowsAtom);
    const setUserData = useSetRecoilState<IUser[]>(usersAtom);
    const setFilteredUserData = useSetRecoilState<IUser[]>(filteredUsers);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState<IUser>({ ...row });

    const handleCheckboxChange = (rowId: number) => {
        const isSelected = selectedRows.includes(rowId);
        if (isSelected) {
            setSelectedRows(selectedRows.filter((id) => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }
    };

    const handleDeleteRow = () => {
        setUserData((prevUserData) => prevUserData.filter((user) => user.id !== row.id));
        setFilteredUserData((prevFilteredData) => prevFilteredData.filter((user) => user.id !== row.id));

        if (selectedRows.includes(row.id)) {
            setSelectedRows(selectedRows.filter((id) => id !== row.id));
        }
    };

    const handleEditRow = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        setUserData((prevUserData) =>
            prevUserData.map((user) => (user.id === row.id ? editedUserData : user))
        );

        setFilteredUserData((prevFilteredData) =>
            prevFilteredData.map((user) => (user.id === row.id ? editedUserData : user))
        );

        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedUserData({ ...row });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedUserData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    return (
        <tr className={`${selectedRows.includes(row.id) ? 'selected-row' : ''}`}>
            <td>
                <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(row.id)}
                    checked={selectedRows.includes(row.id)}
                    className="input-checkbox"
                />
            </td>
            <td>
                {isEditing ? (
                    <input className="edit-input" name="name" value={editedUserData.name} onChange={handleInputChange} />
                ) : (
                    row.name
                )}
            </td>
            <td>
                {isEditing ? (
                    <input className="edit-input" name="email" value={editedUserData.email} onChange={handleInputChange} />
                ) : (
                    row.email
                )}
            </td>
            <td>
                <td>
                    {isEditing ? (
                        <input className="edit-input" name="role" value={editedUserData.role} onChange={handleInputChange} />
                    ) : (
                        row.role
                    )}
                </td>
            </td>
            <td>
                <div className='action-btn-grp'>
                    {isEditing ? (
                        <>
                            <button className='save-btn save' onClick={handleSaveEdit}>Save</button>
                            <button className='cancel-btn cancel' onClick={handleCancelEdit}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button className='edit edit-btn' onClick={handleEditRow}>Edit</button>
                            <button className='delete delete-btn' onClick={handleDeleteRow}>Delete</button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default TableRow;
