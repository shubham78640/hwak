import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OcrToFirebase from "./Components/OcrToFirebase";
import Login from "./Components/Login/Login";
import ApprovalUserDataTable from "./Components/ApprovalUserDataTable";
import ExpenseDetails from "./Components/ExpenseDetails";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

function App() {
  const [details, setDetails] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("signIn hoo bhai tm");
        setUser(user);
      } else {
        console.log("logout");
        setUser(null);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/asd" element={<OcrToFirebase details={details}/>}/> */}
        {user === null ? (
          <Route path="/" element={<Login />} />
        ) : (
          <Route path="/asd" element={<OcrToFirebase details={details} />} />
        )}
        {user === null ? (
          <Route path="/" element={<Login />} />
        ) : (
          <Route
            path="/tab"
            element={<ApprovalUserDataTable setDetails={setDetails} />}
          />
        )}
        {/* <Route path="/tab"  element={<ApprovalUserDataTable setDetails={setDetails}/>}/> */}
        {(!user) ? (
          
          <Route path="/" element={<Login />} />
        ) : (
          <Route path="/det" element={<ExpenseDetails />} />
        )}
        {/* <Route path="/det" element={<ExpenseDetails />}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
