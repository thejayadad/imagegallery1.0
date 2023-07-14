'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {signIn, signOut, useSession} from 'next-auth/react'

const Navbar = () => {
  const {data: session} = useSession()


  return (
  <header className='max-w-screen-xl m-auto navbar bg-base-100'>
     <div className="flex-1">
    <Link href={'/'} className="btn btn-ghost normal-case text-xl">Donut Shop</Link>  
  </div>
  {
            session?.user
              ? (
                <div >
                  { (
                    <div className=''>
                     <Link className="btn mr-4" href='/category' >Categories</Link>
                     <Link className="btn mr-4" href='/profile' >Chefs</Link>
                      <button className="btn mr-4" onClick={() => {signOut(); handleHideDropdown()}} >Logout</button>
                      <Link className="btn" href='/create-donut' >Create</Link>
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