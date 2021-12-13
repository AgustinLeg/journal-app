import React from 'react'
import { Navigate } from 'react-router'

const PublicRouter = ({children, isAuthenticated}) => {
    return isAuthenticated ? <Navigate to="/" /> : children
}

export default PublicRouter
