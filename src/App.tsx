import { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from "recoil";
import Search from "./components/Search"
import Table from "./components/Table"
import { IUser } from "./types";
import usersAtom, { filteredUsers } from "./atoms/usersAtom";
import PaginationControls from './components/PaginationControl';
import axios from 'axios';
import DeleteSelected from './components/DeleteSelected';

function App() {
  const setUserData = useSetRecoilState<IUser[]>(usersAtom)
  const [filteredData, setFilteredUsers] = useRecoilState<IUser[]>(filteredUsers)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    async function fetchData() {
      setLoading(true)
      try {
        const response = await axios.get(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );

        const data: IUser[] = response.data;
        setUserData(data)
        setFilteredUsers(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <h1 className="heading">Admin Dashboard</h1>

      {loading ? <>loading</> :
        <>
          <Search />

          <Table />
          <div className='bottom-stuff'>
            <DeleteSelected />
            <PaginationControls totalItems={filteredData.length} />
          </div>

        </>
      }
    </>
  )
}

export default App
