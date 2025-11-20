import React from 'react'
import ProtectedRoute from '../../routes/ProtectedRoute'

const UserPage = () => {
  return (
    <div>UserPage</div>
  )
}

const ProtectedUserPage = ProtectedRoute(UserPage);
export default ProtectedUserPage