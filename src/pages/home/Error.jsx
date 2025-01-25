import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div>
        <h1>404 Error: Page Not Found</h1>
        <Link className="bg-amber-400 p-5" to ="/">Go Back to Home</Link>
    </div>
  )
}

export default Error