import "./App.css";
import "./index.css"; 
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Portal from "./components/Portal";
import Profile from "./components/Profile";
import FillProfile from "./components/FillProfile";
import CreateTeam from "./components/CreateTeam";
import JoinTeam from "./components/JoinTeam";
import IdeaSubmission from "./components/IdeaSubmission";



function App() {
    // const [userEmail, setUserEmail] = useState("sachin.gupta2010@example.com");  
    //  const [userEmail, setUserEmail] = useState("sachin.gupta2022@example.com");  
    const [userEmail, setUserEmail] = useState("sachin.gupta2020@example.com");  
    //const [userEmail, setUserEmail] = useState("sachin.gupta2012@example.com");  
    // const [userEmail, setUserEmail] = useState("sachin.gupta2013@example.com");  
    // const [userEmail, setUserEmail] = useState("sachin.gupta2011@example.com");  
    //const [userEmail, setUserEmail] = useState("sachin.diwaker2025@example.com ");  // Hardcoded for testing
    ///const [userEmail, setUserEmail] = useState("krishna.gupta2024@example.com ");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("kartavya.gupta2002@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("kartavya.gupta2003@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("kartavya.gupta2004@example.com");  // Hardcoded for testing
    // const [userEmail, setUserEmail] = useState("kartavya.gupta2005@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("kartavya.gupta2005@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("kartavya.gupta2006@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("kartavya.gupta2007@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("kartavya.gupta2007@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("uday.gupta2007@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("uday.gupta2008@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("uday.gupta2009@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("barun.gupta2001@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("barun.gupta2010@example.com");  // Hardcoded for testing
    // const [userEmail, setUserEmail] = useState("jayant.gupta2001@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("jayant.gupta2002@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("jayant.gupta2003@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("barun.gupta2002@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("barun.gupta2003@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("barun.gupta2004@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("barun.gupta2005@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("barun.gupta2006@example.com");  // Hardcoded for testing
    //const [userEmail, setUserEmail] = useState("barun.gupta2007@example.com");  // Hardcoded for testing
    const [isProfileComplete, setIsProfileComplete] = useState(null); // ✅ Start as null (not known yet)
    const [loading, setLoading] = useState(true); // ✅ Prevent UI glitches
    const [userRegNo, setUserRegNo] = useState("");

//correct
useEffect(() => {
    const checkProfileStatus = async () => {
        try {
            //console.log("🔍 Checking profile for:", userEmail);

            // ✅ API Call to check if user exists in `profiles` table
            const response = await axios.get(`http://localhost:8001/api/profile/${userEmail}`);

            //console.log("📌 API Response:", response.data); // ✅ Debugging

            // ❌ INCORRECT: Checking if `response.data.isComplete` exists
            // if (response.data.isComplete) {  // ❌ This is incorrect!

            // ✅ CORRECT: Check if `response.data.email` exists
            if (response.data.isComplete) {  
                //console.log("✅ Profile found, redirecting to portal!");
                setIsProfileComplete(true);  // ✅ Profile exists → Redirect to portal
            } else {
                //console.log("❌ No profile found, redirecting to fill-profile!");
                setIsProfileComplete(false); // ❌ No profile → Redirect to fill-profile
            }
        } catch (error) {
            //console.error("❌ API Error:", error.response?.data || error.message);
            setIsProfileComplete(false); // Assume profile does not exist if error occurs
        } finally {
            setLoading(false); // ✅ Remove loading state
        }
    };

    checkProfileStatus();
}, [userEmail]);

useEffect(() => {
    const fetchRegNo = async () => {
        try {
            const response = await axios.get(`http://localhost:8001/api/team/fetch-regno/${userEmail}`);
            setUserRegNo(response.data.regNo);
        } catch (error) {
            console.error("❌ Failed to fetch regNo");
        }
    };
    fetchRegNo();
}, [userEmail]);



    if (loading) {
        return <p className="text-center text-white text-lg">⏳ Loading...</p>;
    }

    return (
        <Router>
            <Routes>
                {/* ✅ Redirect user based on their profile status */}
                {/* <Route path="/fill-profile" element={isProfileComplete ? <Navigate to="/portal" replace /> : <FillProfile userEmail={userEmail} />} />
                <Route path="/portal" element={!isProfileComplete ? <Navigate to="/fill-profile" replace /> : <Portal />} /> */}
                <Route path="/fill-profile" element={
                        isProfileComplete === null ? <p>Loading...</p> : 
                        isProfileComplete ? <Navigate to="/portal" replace /> : <FillProfile userEmail={userEmail} setIsProfileComplete={setIsProfileComplete}/>
                        
                    } />
                    <Route path="/portal" element={
                        isProfileComplete === null ? <p>Loading...</p> : 
                        !isProfileComplete ? <Navigate to="/fill-profile" replace /> : <Portal userEmail={userEmail} userRegNo={userRegNo}/>
                    } />
                <Route path="/profile" element={<Profile userEmail={userEmail} userRegNo={userRegNo} />} />


                {/* ✅ Other Pages */}
                {/* <Route path="/profile" element={<Profile />} /> */}
                <Route path="/create-team" element={<CreateTeam userEmail={userEmail} />} />
                <Route path="/join-team" element={<JoinTeam userEmail={userEmail}/>} />
                <Route path="/idea-submission" element={<IdeaSubmission userEmail={userEmail}/>} />


                {/* ✅ Default Route */}
                <Route path="*" element={<Navigate to={isProfileComplete ? "/portal" : "/fill-profile"} replace />} />
            </Routes>
        </Router>
    );
}

export default App;
