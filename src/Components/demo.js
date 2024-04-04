import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OcrToFirebase from "./Components/OcrToFirebase";
import Login from "./Components/Login/Login";
import ApprovalUserDataTable from "./Components/ApprovalUserDataTable";
import ExpenseDetails from "./Components/ExpenseDetails";
import { getAuth , onAuthStateChanged } from "firebase/auth"
import { app } from "./firebase";

const auth = getAuth(app);

function demo() {
    const [details, setDetails]=useState({});
    const [user, setUser] =useState(null);
  
  
  
    useEffect(() =>{
      onAuthStateChanged(auth, user=>{
  
  
        if(user){
          console.log("signIn hoo bhai tm")
          setUser(user);
        }
        else{
          console.log("logout");
          setUser(null);
        }
      })
  
  
    },[]);
  
  return (
    <div>

<BrowserRouter>
         <Routes>
         {/* <Route path="/asd" element={<OcrToFirebase details={details}/>}/> */}
         { (user===null)?( <Route path="/login" element={<Login/>}/>):( <Route path="/asd"  element={<OcrToFirebase  details={details}/>}/>)}
       { (user===null)?( <Route path="/login" element={<Login/>}/>):( <Route path="/tab"  element={<ApprovalUserDataTable setDetails={setDetails}/>}/>)}
         {/* <Route path="/tab"  element={<ApprovalUserDataTable setDetails={setDetails}/>}/> */}
         { (user===null)?( <Route path="/login" element={<Login/>}/>):( <Route path="/det"  element={<ExpenseDetails/>}/>)}
         {/* <Route path="/det" element={<ExpenseDetails />}/> */}
         </Routes>
   



         {/* <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/asd" element={<OcrToFirebase />} />
            <Route path="/tab" element={<ApprovalUserDataTable />} />
            <Route path="/det" element={<ExpenseDetails />} />
          </>
        )}
      </Routes> */}
  
    </BrowserRouter>


    </div>
  )
}

export default demo