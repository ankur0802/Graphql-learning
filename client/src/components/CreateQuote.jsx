import React, {useState} from 'react'

export default function CreateQuote() {
    const [quote, setQuote] = useState(' ')
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(quote);
      }
    

  return (
    <div className='container'>
        <form onSubmit={handleSubmit} >
        <input 
        type="text"
        placeholder='enter your quote..'
        value={quote}
        onChange={(e)=>setQuote(e.target.value)}
        required
        />

        <button className='btn green'>Create</button>
        </form>
    </div>
  )
}
