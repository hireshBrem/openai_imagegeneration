import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const[input, setInput] = useState("")
  const[text, setText] = useState("")

  const[image_url, setUrl] = useState("")
  const[image_url2, setUrl2] = useState("")

  async function generateImage(){
    await fetch("/api/generateImg", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify(input),
    }).then(r=>r.json())
    .then(data =>{setUrl(data.url)})
  }

  async function correctText(){
    await fetch("/api/createImageEdit", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,   
      },
      body: JSON.stringify(text)
    }).then(r=>r.json())
    .then(data =>{setUrl2(data.url)})
  }

  return (
    <>
      <Head>
        <title>OpenAI Image Generation</title>
      </Head>
      <div>
        <h1 className='text-center text-2xl mt-5'>OpenAI Image Generator</h1>
        <div className='mt-10 mx-5'>
          <p className='m-2 underline'>Enter text to generate an image!</p>
          <input onChange={(e)=>setInput(e.target.value)} className='border-2 border-slate-500 rounded-md p-2 mx-2' placeholder='Enter text' />
          <button className='p-3 bg-slate-500 rounded-md' onClick={()=>generateImage()}>Generate Image</button>
          {
            image_url!=""?
            <img className='border-2 border-slate-500 w-60 h-60 rounded-md m-2' src={image_url}  />
            :
            null
          }
        </div>
        {/* <div className='mt-10 mx-5'>
          <p className='m-2 underline'>Edit image!</p>
          <input onChange={(e)=>setText(e.target.value)} className='border-2 border-slate-500 rounded-md p-2 mx-2' placeholder='Enter text' />
          <button className='p-3 bg-slate-500 rounded-md' onClick={()=>correctText()}>Edit Text</button>
          <img className='border-2 border-slate-500 w-60 h-60 rounded-md m-2' src={image_url2} />
        </div>
         */}
      </div>
    </>
  )
}
