import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const passwordref = useRef()
  const ref = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setpasswordArray(passwords);
  }


  useEffect(() => {
    getPasswords()

  }, [])


  const showPassword = () => {
    passwordref.current.type = "text"
    if (ref.current.src.includes("images/eye.png")) {
      ref.current.src = "images/hidden.png";
      passwordref.current.type = "text"
    }
    else {
      ref.current.src = "images/eye.png";
      passwordref.current.type = "password"
    }
  }
  const savePassword = async() => {
    if (form.site.length > 2 && form.username.length > 2 && form.password.length > 2) {
      
      //if any uch id exixt then delete it 
      await fetch("http://localhost:3000",{method:"DELETE",headers:{"Content-Type": "application/json"}, body: JSON.stringify({id: form.id})})


      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])//new password push
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      let res=await fetch("http://localhost:3000",{method:"POST",headers:{"Content-Type": "application/json"}, body: JSON.stringify({ ...form,id:uuidv4()})})
      setform({ site: "", username: "", password: "" })
      toast.success('Password Saved', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
      });
    }
    else {
      toast.error('Password Not Valid !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
      });
    }
  }

  const deletePassword = async(id) => {
    //new password push
    let confirm = window.confirm("do you really want to delete this password");
    if (confirm) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      let res=await fetch("http://localhost:3000",{method:"DELETE",headers:{"Content-Type": "application/json"}, body: JSON.stringify({id})})

    }
    toast.success('Password Deleted', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Bounce,
    });
  }
  const editPassword = (id) => {
    console.log("editing", id)
    setform({...passwordArray.filter(i => i.id === id)[0],id:id})
    setpasswordArray(passwordArray.filter(item => item.id !== id))//new password push

    // setpasswordArray(passwordArray.filter(item=>item.id!==id))//new password push
    // localStorage.setItem("passwords", JSON.stringifypasswordArray.filter(item=>item.id!==id))
    // console.log([...passwordArray, form])
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const copyText = (text) => {
    toast.success('Copied to Clipboard', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Bounce,
    });
    navigator.clipboard.writeText(text)
  }

  return (
    <>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      // transition={Bounce}
      />

      <div className="p-0 py-16 md:px-10 md:py-16 md:container md:mx-auto w-full min-h-[94vh]">
        <h1 className='text-4xl text-center'>
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>your own password manager</p>
        <div className=" flex flex-col p-4 gap-5 items-center">
          <input name="site" value={form.site} onChange={handleChange} className='rounded-full border border-green-600 w-full text-black px-4 py-1' type="text" placeholder='Enter Website URL' />
          <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
            <input name="username" value={form.username} onChange={handleChange} className='rounded-full border border-green-600 text-black px-4 py-1 w-full' type="text" placeholder='Enter Username' />
            <div className="relative  w-full">
              <input ref={passwordref} name="password" value={form.password} onChange={handleChange} className='flex rounded-full border border-green-600 text-black px-4 py-1 w-full' type="password" placeholder='Enter Password' />
              <span className='absolute right-[6px] top-[4px] cursor-pointer'><img ref={ref} className='' width={25} src="images/eye.png" alt="eye" onClick={showPassword} /></span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center bg-green rounded-full border-2 border-green-700 bg-green-500 py-2 px-3 w-fit hover:bg-green-600 gap-2 cursor-pointer'>
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              colors="primary:#121331,secondary:#0a5c15">
            </lord-icon>
            Add Password</button>
        </div>

        <div className="passwords">
          <h2 className=' text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords Added</div>}
          {passwordArray.length != 0 &&
            <div className="w-full overflow-x-auto rounded-md">
              <table className="table-auto w-full  rounded-md overflow-hidden m-auto">
                <thead className='bg-green-800 text-white'>
                  <tr>
                    <th className='py-2'>Site</th>
                    <th className='py-2'>Username</th>
                    <th className='py-2'>Password</th>
                    <th className='py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-green-100 '>
                  {passwordArray.map((item) => {
                    return <tr>
                      <td className='text-center min-w-32 py-2 border border-white  '><a href="{item.site}" target='_blank'>{item.site}</a><img onClick={() => copyText(item.site)} className="w-5 cursor-pointer inline" src="images/copy.png" alt="img" /></td>
                      <td className='text-center min-w-32 py-2 border border-white  '><span>{item.username}</span><img onClick={() => copyText(item.username)} className="w-5 cursor-pointer inline" src="images/copy.png" alt="img" /></td>
                      <td className='text-center min-w-32 py-2 border border-white  '><span>{item.password}</span><img onClick={() => copyText(item.password)} className="w-5 cursor-pointer inline" src="images/copy.png" alt="img" /></td>
                      <td className='text-center min-w-32 py-2 border border-white '>
                        <div className='flex justify-center items-center gap-4'>
                          <span onClick={() => { editPassword(item.id) }}>
                            <lord-icon className="cursor-pointer" src="https://cdn.lordicon.com/exymduqj.json" trigger="hover"> </lord-icon>
                          </span>
                          <span>
                            <lord-icon onClick={() => { deletePassword(item.id) }} className="cursor-pointer" src="https://cdn.lordicon.com/hwjcdycb.json" trigger="hover"> </lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Manager
