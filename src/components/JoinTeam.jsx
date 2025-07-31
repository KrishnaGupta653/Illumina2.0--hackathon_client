// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // const JoinTeam = () => {
// //     const [teamCode, setTeamCode] = useState("");
// //     const [regNo, setRegNo] = useState("");
// //     const [teamMembers, setTeamMembers] = useState([]);
// //     const [teamName, setTeamName] = useState("");
// //     const [isLeader, setIsLeader] = useState(false);
// //     const [joined, setJoined] = useState(false);
// //     const [error, setError] = useState("");

// //     // When a user has joined, fetch team members
// //     useEffect(() => {
// //         if (joined && teamCode) {
// //             fetchTeamMembers();
// //         }
// //     }, [joined, teamCode]);

// //     const fetchTeamMembers = async () => {
// //         try {
// //             const response = await axios.get(`http://localhost:8001/api/team/members?teamCode=${teamCode}`);
// //             setTeamMembers(response.data.members);
// //             setTeamName(response.data.teamName);
// //             // We assume the backend returns a flag isLeader if needed (or you can determine it by comparing regNo)
// //             // For simplicity, assume leader is the one whose regNo equals the one saved when creating team.
// //             // In a real implementation, you might call a separate endpoint to check leader status.
// //         } catch (err) {
// //             console.error("Error fetching team members:", err);
// //         }
// //     };

// //     const handleJoinTeam = async () => {
// //         setError("");
// //         try {
// //             const response = await axios.post("http://localhost:8001/api/team/join", { teamCode, regNo });
// //             alert("Joined team successfully!");
// //             setJoined(true);
// //             fetchTeamMembers();
// //         } catch (error) {
// //             setError(error.response?.data?.error || "Error joining team.");
// //         }
// //     };

// //     return (
// //         <div className="flex justify-center items-center min-h-screen bg-darkPurple">
// //             <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-purple">
// //                 {!joined ? (
// //                     <>
// //                         <h2 className="text-2xl font-bold text-center text-darkPurple">Join a Team</h2>
// //                         <input
// //                             className="w-full p-2 border rounded mt-1"
// //                             placeholder="Enter Team Code"
// //                             value={teamCode}
// //                             onChange={(e) => setTeamCode(e.target.value)}
// //                         />
// //                         <input
// //                             className="w-full p-2 border rounded mt-1"
// //                             placeholder="Enter Registration Number"
// //                             value={regNo}
// //                             onChange={(e) => setRegNo(e.target.value)}
// //                         />
// //                         <button
// //                             className="w-full bg-purple text-white font-bold py-2 mt-6 rounded hover:bg-lightPurple transition"
// //                             onClick={handleJoinTeam}
// //                         >
// //                             Join Team
// //                         </button>
// //                         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
// //                     </>
// //                 ) : (
// //                     <>
// //                         <h2 className="text-2xl font-bold text-center text-darkPurple">Team Members - {teamName}</h2>
// //                         <table className="w-full border mt-4 text-center">
// //                             <thead>
// //                                 <tr className="bg-darkPurple text-white">
// //                                     <th className="p-2">S. No</th>
// //                                     <th className="p-2">Member Name</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {teamMembers.map((member, index) => (
// //                                     <tr key={member.reg_no} className={index === 0 ? "font-bold" : ""}>
// //                                         <td className="border p-2">{index + 1}</td>
// //                                         <td className="border p-2">{member.participant_name}</td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                         {/* The Freeze Team button would appear for the leader.
// //                             Leader status can be determined by comparing the current user's regNo 
// //                             with the regNo stored in the team (this logic can be enhanced further). */}
// //                         {isLeader && (
// //                             <button
// //                                 className="w-full bg-red-600 text-white font-bold py-2 mt-4 rounded hover:bg-red-800 transition"
// //                                 onClick={() => alert("Team frozen successfully!")}
// //                             >
// //                                 Freeze Team
// //                             </button>
// //                         )}
// //                     </>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default JoinTeam;


// const JoinTeam = () => {
//     const [teamCode, setTeamCode] = useState("");
//     const [regNo, setRegNo] = useState("");
//     const [teamMembers, setTeamMembers] = useState([]);
//     const [teamName, setTeamName] = useState("");
//     const [leaderRegNo, setLeaderRegNo] = useState(""); // Store leader's regNo
//     const [isFrozen, setIsFrozen] = useState(false);
//     const [joined, setJoined] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         checkIfUserInTeam();
//     }, []);

//     // **Check if User is Already in a Team**
//     const checkIfUserInTeam = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8001/api/team/check-user/${regNo}`);
//             if (response.data.inTeam) {
//                 setJoined(true);
//                 fetchTeamMembers(response.data.teamCode);
//             }
//         } catch (err) {
//             console.error("Error checking team status:", err);
//         }
//     };

//     // **Fetch Team Members**
//     const fetchTeamMembers = async (teamCode) => {
//         try {
//             const response = await axios.get(`http://localhost:8001/api/team/members?teamCode=${teamCode}`);
//             setTeamMembers(response.data.members);
//             setTeamName(response.data.teamName);
//             setLeaderRegNo(response.data.leaderRegNo);
//             setIsFrozen(response.data.isFrozen);
//         } catch (err) {
//             console.error("Error fetching team members:", err);
//         }
//     };

//     // **Join Team**
//     const handleJoinTeam = async () => {
//         try {
//             const response = await axios.post("http://localhost:8001/api/team/join", { teamCode, regNo });
//             alert("Joined team successfully!");
//             setJoined(true);
//             fetchTeamMembers(teamCode);
//         } catch (error) {
//             setError(error.response?.data?.message || "Error joining team.");
//         }
//     };

//     // **Freeze Team (Leader Only)**
//     const handleFreezeTeam = async () => {
//         try {
//             await axios.post("http://localhost:8001/api/team/freeze", { teamId: teamMembers[0].team_id, regNo });
//             alert("Team Frozen Successfully!");
//             setIsFrozen(true);
//         } catch (error) {
//             alert("Error freezing team.");
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-darkPurple">
//             <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-purple">
//                 {!joined ? (
//                     <>
//                         <h2 className="text-2xl font-bold text-center text-darkPurple">Join a Team</h2>
//                         <input
//                             className="w-full p-2 border rounded mt-1"
//                             placeholder="Enter Team Code"
//                             value={teamCode}
//                             onChange={(e) => setTeamCode(e.target.value)}
//                         />
//                         <input
//                             className="w-full p-2 border rounded mt-1"
//                             placeholder="Enter Registration Number"
//                             value={regNo}
//                             onChange={(e) => setRegNo(e.target.value)}
//                         />
//                         <button
//                             className="w-full bg-purple text-white font-bold py-2 mt-6 rounded hover:bg-lightPurple transition"
//                             onClick={handleJoinTeam}
//                         >
//                             Join Team
//                         </button>
//                         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//                     </>
//                 ) : (
//                     <>
//                         <h2 className="text-2xl font-bold text-center text-darkPurple">Team Members - {teamName}</h2>
//                         <table className="w-full border mt-4 text-center">
//                             <thead>
//                                 <tr className="bg-darkPurple text-white">
//                                     <th className="p-2">S. No</th>
//                                     <th className="p-2">Member Name</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {teamMembers.map((member, index) => (
//                                     <tr key={member.reg_no} className={index === 0 ? "font-bold" : ""}>
//                                         <td className="border p-2">{index + 1}</td>
//                                         <td className="border p-2">{member.participant_name}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>

//                         {/* Show Freeze Button if Team has 3+ Members & Current User is the Leader */}
//                         {!isFrozen && teamMembers.length >= 3 && regNo === leaderRegNo && (
//                             <button
//                                 className="w-full bg-red-600 text-white font-bold py-2 mt-4 rounded hover:bg-red-800 transition"
//                                 onClick={handleFreezeTeam}
//                             >
//                                 Freeze Team
//                             </button>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default JoinTeam;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const JoinTeam = () => {
//     const [teamCode, setTeamCode] = useState("");
//     const [regNo, setRegNo] = useState("");
//     const [teamMembers, setTeamMembers] = useState([]);
//     const [teamName, setTeamName] = useState("");
//     const [leaderRegNo, setLeaderRegNo] = useState("");
//     const [isFrozen, setIsFrozen] = useState(false);
//     const [joined, setJoined] = useState(false);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         checkIfUserInTeam();
//     }, []);

//     const checkIfUserInTeam = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8001/api/team/check-user/${regNo}`);
//             if (response.data.inTeam) {
//                 setJoined(true);
//                 fetchTeamMembers(response.data.teamCode);
//             }
//         } catch (err) {
//             console.error("Error checking team status:", err);
//         }
//     };

//     const fetchTeamMembers = async (teamCode) => {
//         try {
//             const response = await axios.get(`http://localhost:8001/api/team/members?teamCode=${teamCode}`);
//             setTeamMembers(response.data.members);
//             setTeamName(response.data.teamName);
//             setLeaderRegNo(response.data.leaderRegNo);
//             setIsFrozen(response.data.isFrozen);
//         } catch (err) {
//             console.error("Error fetching team members:", err);
//         }
//     };

//     const handleJoinTeam = async () => {
//         try {
//             const response = await axios.post("http://localhost:8001/api/team/join", { teamCode, regNo });
//             alert("✅ Joined team successfully!");
//             setJoined(true);
//             fetchTeamMembers(teamCode);
//         } catch (error) {
//             setError(error.response?.data?.message || "❌ Error joining team.");
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-darkPurple">
//             <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-purple">
//                 {!joined ? (
//                     <>
//                         <h2 className="text-2xl font-bold text-center text-darkPurple">Join a Team</h2>
//                         <input
//                             className="w-full p-2 border rounded mt-1"
//                             placeholder="Enter Team Code"
//                             value={teamCode}
//                             onChange={(e) => setTeamCode(e.target.value)}
//                         />
//                         <input
//                             className="w-full p-2 border rounded mt-1"
//                             placeholder="Enter Registration Number"
//                             value={regNo}
//                             onChange={(e) => setRegNo(e.target.value)}
//                         />
//                         <button
//                             className="w-full bg-purple text-white font-bold py-2 mt-6 rounded hover:bg-lightPurple transition"
//                             onClick={handleJoinTeam}
//                         >
//                             Join Team
//                         </button>
//                         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//                     </>
//                 ) : (
//                     <>
//                         <h2 className="text-2xl font-bold text-center text-darkPurple">Team Members - {teamName}</h2>
//                         <table className="w-full border mt-4 text-center">
//                             <thead>
//                                 <tr className="bg-darkPurple text-white">
//                                     <th className="p-2">S. No</th>
//                                     <th className="p-2">Member Name</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {teamMembers.map((member, index) => (
//                                     <tr key={member.reg_no}>
//                                         <td className="border p-2">{index + 1}</td>
//                                         <td className="border p-2">{member.participant_name}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default JoinTeam;
//correct
// import React, { useState } from "react";
// import axios from "axios";

// const JoinTeam = ({ userRegNo, onTeamJoined }) => {
//     const [teamCode, setTeamCode] = useState("");
//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);

//     const handleJoinTeam = async () => {
//         setErrors({});
//         setLoading(true);

//         // Validate Team Code
//         if (teamCode.trim() === "") {
//             setErrors({ teamCode: "Team Code cannot be empty." });
//             setLoading(false);
//             return;
//         }

//         try {
//             // Send request to backend
//             await axios.post("http://localhost:8001/api/team/join", { teamCode, regNo: userRegNo });

//             // Hide Join/Create buttons & Show Team Details on Portal
//             onTeamJoined();

//         } catch (error) {
//             setErrors({ general: error.response?.data?.message || "Failed to join team. Try again." });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-darkPurple">
//             <div className="w-[400px] bg-white rounded-2xl shadow-lg border-2 border-black p-6">
//                 <h2 className="text-xl font-bold text-center text-darkPurple">Join a Team</h2>

//                 <input
//                     className="w-full border p-2 mt-4 rounded"
//                     placeholder="Team Code"
//                     value={teamCode}
//                     onChange={(e) => setTeamCode(e.target.value)}
//                 />
//                 {errors.teamCode && <p className="text-red-500 text-sm">{errors.teamCode}</p>}
//                 {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

//                 <button
//                     className={`w-full bg-purple text-white font-bold py-2 mt-4 rounded ${
//                         loading ? "opacity-50 cursor-not-allowed" : "hover:bg-lightPurple"
//                     }`}
//                     onClick={handleJoinTeam}
//                     disabled={loading}
//                 >
//                     {loading ? "Joining..." : "JOIN TEAM"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default JoinTeam;


import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JoinTeam = ({ userEmail}) => {
    const [hashCode, setHashCode] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [userRegNo, setUserRegNo] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchRegNo = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/team/fetch-regno/${userEmail}`);
                setUserRegNo(response.data.regNo);  // ✅ Save regNo after fetching
            } catch (err) {
                setError("❌ Failed to fetch registration number.");
            }
        };

        fetchRegNo();
    }, [userEmail]);

    const handleJoinTeam = async () => {
        setMessage("");
        setError("");
        setLoading(true);

        if (!hashCode.trim()) {
            setError("❌ Team Hash Code is required.");
            setLoading(false);
            return;
        }

    //     try {
    //         console.log("📤 Sending Join Request:", { regNo: userRegNo, hashCode });
    //         const response = await axios.post("http://localhost:8001/api/team/join", {
    //             email: userEmail,
    //             hashCode
    //         });

    //         setMessage(response.data.message);
    //     } catch (err) {
    //         setError(err.response?.data?.message || "❌ Failed to join the team.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    try {
        const response = await axios.post("http://localhost:8001/api/team/join", {
            regNo: userRegNo,         // ✅ Now we send correct regNo
            hashCode: hashCode.trim() // remove accidental spaces
        });
        
        alert("✅ Successfully joined team!");
        setMessage("✅ Successfully joined the team!");
        setTimeout(() => navigate("/portal"), 1500); 
    } catch (error) {
        setError(error.response?.data?.message || "❌ Failed to join the team.");
    }
    finally {
        setLoading(false);}
};


    return (
        <div className="flex justify-center items-center min-h-screen bg-darkPurple">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-center text-darkPurple">Join a Team</h2>

                {message && <p className="text-green-600 text-center">{message}</p>}
                {error && <p className="text-red-600 text-center">{error}</p>}

                <div className="mt-4">
                    <label className="block text-gray-700">Enter Team Hash Code:</label>
                    <input 
                        className="w-full p-2 border" 
                        value={hashCode} 
                        onChange={(e) => setHashCode(e.target.value)} 
                        placeholder="8-digit Team Hash Code"
                    />
                </div>

                <button 
                    className="w-full bg-purple text-white py-2 mt-4" 
                    disabled={loading} 
                    onClick={handleJoinTeam}
                >
                    {loading ? "Joining..." : "Join Team"}
                </button>
            </div>
        </div>
    );
};

export default JoinTeam;
