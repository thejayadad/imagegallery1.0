'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineFileImage } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from 'next-auth/react'


const CreateDonut = () => {
    const CLOUD_NAME = 'socialsite'
    const UPLOAD_PRESET = 'donut_shop'

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState("Hot")
    const [photo, setPhoto] = useState('')

    const { data: session, status } = useSession()
    const router = useRouter()


    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p>
            Access Denied
        </p>
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!photo || !title || !category){
            toast.error("All fields are required")
            return
        }

        try {
          const imageUrl = await uploadImage()
          
          const res = await fetch(`http://localhost:3000/api/donut`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${session?.user?.accessToken}` 
            },
            method: 'POST',
            body: JSON.stringify({title,category,imageUrl,authorId: session?.user?._id, creator: session?.user?._id})
          })

          if(!res.ok){
            throw new Error("Error occured")
          }

          const donut = await res.json()

          router.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const uploadImage = async () => {
        if (!photo) return

        const formData = new FormData()

        formData.append("file", photo)
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
          const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
          })

          const data = await res.json()

          const imageUrl = data['secure_url']

          return imageUrl
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <section>
        <h2>Create Donut</h2>
        <div className='bg-white p-16 rounded-2xl'>
        <form onSubmit={handleSubmit}
        >
          <div
        className='grid grid-cols-1 lg:grid-cols-3 gap-10'

          >
                        <div className='h-[450px] bg-[#e9e9e9] rounded-lg'>
                    <label 
                    className='m-5 flex flex-col justify-center items-center
                    cursor-pointer h-[90%] 
                    border-[2px] border-gray-300 border-dashed rounded-lg text-gray-600 '
                    htmlFor='image'>
                        Upload Image <AiOutlineFileImage />
                    </label>
                    <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />
                   </div>

          </div>
               
        <input 
                    className='outline-none font-bold w-full'
                    type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
        
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Hot">Hot</option>
                        <option value="Sprinkle">Sprinkle</option>
                        <option value="Custom">Custom</option>
                        <option value="Filled">Filled</option>
                        <option value="Seasonal">Seasonal</option>
                    </select>
                  
                  <button
                  className='bg-red-500 p-2
                  text-white font-semibold px-3 
                  rounded-lg'
                  >Create</button>
                </form>
        </div>

        <ToastContainer />
    </section>
  )
}

export default CreateDonut