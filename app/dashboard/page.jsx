import React from 'react'
import UsersTable from '../../components/dashboard/UsersTable'


const page = () => {
  return (
    <div className="flex-1  bg-gray-50 dark:bg-black p-4 overflow-y-auto">
      <UsersTable />
    </div>
  )
}

export default page
