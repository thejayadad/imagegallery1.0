"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import { format } from 'timeago.js'
import { useRouter } from 'next/navigation'


const DonutPage = (ctx) => {
    const [donutDetails, setDonutDetails] = useState("")
    const { data: session } = useSession()
    const router = useRouter()


    useEffect(() => {
        async function fetchDonut() {
            const res = await fetch(`http://localhost:3000/api/donut/${ctx.params.id}`, { cache: 'no-store' })
            const donut = await res.json()

            setDonutDetails(donut)
        }
        session && fetchDonut()
    }, [session])

  return (
    <section className='bg-white p-16 rounded-2xl h-full'>
        <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-12">
        <div className="lg:col-start-2 md:pl-20">
            <Link 
            href={'/'}
            >
                Edit
            </Link>
        <h3 className='text-4xl'>{donutDetails?.title}</h3>

        
        </div>
        <div className="relative mt-10 -mx-4 md:-mx-12 lg:mt-0 lg:col-start-1">
        <img alt='pic' src={donutDetails?.imageUrl} />
        </div>
        </div>
    </section>
  )
}

export default DonutPage