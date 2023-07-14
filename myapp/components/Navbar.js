'use client'
import Link from 'next/link'
import React from 'react'
import {signIn, signOut, useSession} from 'next-auth/react'

const Navbar = () => {
  const {data: session} = useSession()


  return (
  <header className='max-w-screen-xl m-auto navbar bg-base-100 pt-8 pb-8'>
     <div className="flex-1">
    <Link href={'/'} className="btn normal-case text-xl btn-secondary">Donut Shop</Link>  
  </div>
  {
            session?.user
              ? (
                <div >
                  { (
                    <div className=''>
                     <Link className="btn mr-4 btn-warning" href='/category' >Categories</Link>
                     <Link className="btn mr-4 btn-primary" href='/profile' >Chefs</Link>
                      <Link className="btn mr-4 btn-accent text-white" href='/create-donut' >Create</Link>
                      <button className="btn btn-error" onClick={() => {signOut(); handleHideDropdown()}} >Logout</button>
                    </div>
                  )}
                </div>
              )
              : (
                <>
                  <button className="btn mr-4" onClick={() => {signIn()}} >Log in</button>
                  <Link className="btn" href='/register'>Register</Link>
                </>
              )
          }

  </header>
  )
}

export default Navbar