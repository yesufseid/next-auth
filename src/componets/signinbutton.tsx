'use client'
// import React from "react"
import { signIn, signOut, useSession } from "next-auth/react"





export default function Signinbutton() {
  const {data:session}=useSession()
  console.log(session?.user);
   
 if(session && session.user){
    return(
        <div>
            <p>{session.user.name}</p>
            <button onClick={()=>signOut()}>SIGN OUT</button>
        </div>
    )
 }


  return (
    <div>
        <button onClick={()=>signIn()}>SIGN-IN</button>
    </div>
  )
}
