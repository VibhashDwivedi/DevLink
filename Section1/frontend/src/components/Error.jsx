import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
const Error = () => {
  return (
    <div>
 <Header/>
  <div class="container py-md-5 container--narrow">
        <div class="text-center">
            <h2>Whoops, we cannot find that page.</h2>
            <p class="lead text-muted">You can always visit the <Link to="/home" className='text-decoration-none' >homepage</Link> to get a fresh start.</p>
        </div>
    </div>
</div>
    
  )
}

export default Error