// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const CreateTeam = () => {
// //     const [regNo, setRegNo] = useState("");
// //     const [teamName, setTeamName] = useState("");
// //     const [errors, setErrors] = useState({});
// //     const [teamId, setTeamId] = useState(null);
// //     const [hashCode, setHashCode] = useState(null);
// //     const [alreadyInTeam, setAlreadyInTeam] = useState(false);

// //     useEffect(() => {
// //         const existingTeam = localStorage.getItem("teamId");
// //         if (existingTeam) {
// //             setAlreadyInTeam(true);
// //         }
// //     }, []);

// //     const handleCreateTeam = async () => {
// //         setErrors({});

// //         // Regex Validation (Frontend)
// //         const regNoPattern = /^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/;
// //         if (!regNoPattern.test(regNo)) {
// //             setErrors({ regNo: "Invalid Registration Number (Format: XXZZZXXXX)." });
// //             return;
// //         }

// //         try {
// //             const response = await axios.post("http://localhost:8001/api/team", { regNo, teamName });

// //             if (response.data.teamId) {
// //                 setTeamId(response.data.teamId);
// //                 setHashCode(response.data.hashCode);
// //                 localStorage.setItem("teamId", response.data.teamId);
// //                 setAlreadyInTeam(true);
// //             }
// //         } catch (error) {
// //             setErrors({ regNo: error.response?.data?.error || "Failed to create a team." });
// //         }
// //     };

// //     return (
// //         <div className="flex justify-center items-center min-h-screen bg-darkPurple">
// //             <div className="w-[400px] bg-white rounded-2xl shadow-lg border-2 border-black p-6">
// //                 <h2 className="text-xl font-bold text-center text-darkPurple">Create Your Team</h2>

// //                 {alreadyInTeam ? (
// //                     <p className="text-green-500 text-center">You have already created/joined a team.</p>
// //                 ) : (
// //                     <>
// //                         <input
// //                             className="w-full border p-2 mt-4 rounded"
// //                             placeholder="Registration Number (XXZZZXXXX)"
// //                             value={regNo}
// //                             onChange={(e) => setRegNo(e.target.value)}
// //                         />
// //                         {errors.regNo && <p className="text-red-500 text-sm">{errors.regNo}</p>}

// //                         <input
// //                             className="w-full border p-2 mt-2 rounded"
// //                             placeholder="Team Name"
// //                             value={teamName}
// //                             onChange={(e) => setTeamName(e.target.value)}
// //                         />
// //                         {errors.teamName && <p className="text-red-500 text-sm">{errors.teamName}</p>}

// //                         <button
// //                             className="w-full bg-purple text-white font-bold py-2 mt-4 rounded hover:bg-lightPurple"
// //                             onClick={handleCreateTeam}
// //                         >
// //                             CREATE TEAM
// //                         </button>
// //                     </>
// //                 )}

// //                 {teamId && (
// //                     <p className="text-center text-lg font-semibold mt-4">
// //                         Your Team ID: <span className="text-darkPurple">{teamId}</span><br />
// //                         Team Code: <span className="text-darkPurple">{hashCode}</span>
// //                     </p>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// export default CreateTeam;

import React, { useState } from "react";
import axios from "axios";

const CreateTeam = () => {
    const [regNo, setRegNo] = useState("");
    const [teamName, setTeamName] = useState("");
    const [errors, setErrors] = useState({});
    const [teamId, setTeamId] = useState(null);
    const [hashCode, setHashCode] = useState(null);
    const [alreadyInTeam, setAlreadyInTeam] = useState(false);

    // Since all membership checks are done at the backend,
    // if a creation call fails due to membership, we update alreadyInTeam.
    const handleCreateTeam = async () => {
        setErrors({});

        // Frontend Regex Validation for regNo and non-empty teamName
        const regNoPattern = /^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/;
        if (!regNoPattern.test(regNo)) {
            setErrors({ regNo: "Invalid Registration Number (Format: XXZZZXXXX)." });
            return;
        }
        if (teamName.trim() === "") {
            setErrors({ teamName: "Team Name cannot be empty." });
            return;
        }

        try {
            const response = await axios.post("http://localhost:8001/api/team", { regNo, teamName });
            if (response.data.teamId) {
                setTeamId(response.data.teamId);
                setHashCode(response.data.hashCode);
                setAlreadyInTeam(true);
            }
        } catch (error) {
            const errMsg = error.response?.data?.error;
            if (errMsg) {
                // If error indicates already in a team, mark accordingly
                if (errMsg.includes("already created") || errMsg.includes("already joined")) {
                    setAlreadyInTeam(true);
                }
                setErrors({ general: errMsg });
            } else {
                setErrors({ general: "Failed to create a team. Please try again." });
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-darkPurple">
            <div className="w-[400px] bg-white rounded-2xl shadow-lg border-2 border-black p-6">
                <h2 className="text-xl font-bold text-center text-darkPurple">Create Your Team</h2>

                {alreadyInTeam ? (
                    <p className="text-green-500 text-center">You have already created/joined a team.</p>
                ) : (
                    <>
                        <input
                            className="w-full border p-2 mt-4 rounded"
                            placeholder="Registration Number (XXZZZXXXX)"
                            value={regNo}
                            onChange={(e) => setRegNo(e.target.value)}
                        />
                        {errors.regNo && <p className="text-red-500 text-sm">{errors.regNo}</p>}

                        <input
                            className="w-full border p-2 mt-2 rounded"
                            placeholder="Team Name"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        {errors.teamName && <p className="text-red-500 text-sm">{errors.teamName}</p>}
                        {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

                        <button
                            className="w-full bg-purple text-white font-bold py-2 mt-4 rounded hover:bg-lightPurple"
                            onClick={handleCreateTeam}
                        >
                            CREATE TEAM
                        </button>
                    </>
                )}

                {teamId && (
                    <p className="text-center text-lg font-semibold mt-4">
                        Your Team ID: <span className="text-darkPurple">{teamId}</span><br />
                        Team Code: <span className="text-darkPurple">{hashCode}</span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default CreateTeam;

// import React, { useState } from "react";
// import axios from "axios";

// const CreateTeam = () => {
//     const [regNo, setRegNo] = useState("");
//     const [teamName, setTeamName] = useState("");
//     const [errors, setErrors] = useState({});
//     const [teamId, setTeamId] = useState(null);
//     const [hashCode, setHashCode] = useState(null);
//     const [alreadyInTeam, setAlreadyInTeam] = useState(false);
//     const [loading, setLoading] = useState(false); // To prevent multiple submissions

//     const handleCreateTeam = async () => {
//         setErrors({});
//         setLoading(true); // Disable button during API call

//         // ✅ **Regex Validation for Registration Number**
//         const regNoPattern = /^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/;
//         if (!regNoPattern.test(regNo)) {
//             setErrors({ regNo: "Invalid Registration Number (Format: XXZZZXXXX)." });
//             setLoading(false);
//             return;
//         }
//         if (teamName.trim() === "") {
//             setErrors({ teamName: "Team Name cannot be empty." });
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:8001/api/team", { regNo, teamName });

//             if (response.data.teamId) {
//                 setTeamId(response.data.teamId);
//                 setHashCode(response.data.hashCode);
//                 setAlreadyInTeam(true);
//             }
//         } catch (error) {
//             const errMsg = error.response?.data?.error || "Failed to create a team. Please try again.";
//             if (errMsg.includes("already created") || errMsg.includes("already joined")) {
//                 setAlreadyInTeam(true);
//             }
//             setErrors({ general: errMsg });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-darkPurple">
//             <div className="w-[400px] bg-white rounded-2xl shadow-lg border-2 border-black p-6">
//                 <h2 className="text-xl font-bold text-center text-darkPurple">Create Your Team</h2>

//                 {alreadyInTeam ? (
//                     <p className="text-green-500 text-center font-semibold">✅ You have already created/joined a team.</p>
//                 ) : (
//                     <>
//                         <input
//                             className="w-full border p-2 mt-4 rounded"
//                             placeholder="Registration Number (XXZZZXXXX)"
//                             value={regNo}
//                             onChange={(e) => setRegNo(e.target.value)}
//                         />
//                         {errors.regNo && <p className="text-red-500 text-sm">{errors.regNo}</p>}

//                         <input
//                             className="w-full border p-2 mt-2 rounded"
//                             placeholder="Team Name"
//                             value={teamName}
//                             onChange={(e) => setTeamName(e.target.value)}
//                         />
//                         {errors.teamName && <p className="text-red-500 text-sm">{errors.teamName}</p>}
//                         {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

//                         <button
//                             className={`w-full bg-purple text-white font-bold py-2 mt-4 rounded ${
//                                 loading ? "opacity-50 cursor-not-allowed" : "hover:bg-lightPurple"
//                             }`}
//                             onClick={handleCreateTeam}
//                             disabled={loading}
//                         >
//                             {loading ? "Creating..." : "CREATE TEAM"}
//                         </button>
//                     </>
//                 )}

//                 {teamId && (
//                     <div className="mt-4 p-4 border border-gray-300 rounded-lg">
//                         <p className="text-center text-lg font-semibold">
//                             🎉 Team Created Successfully!
//                         </p>
//                         <p className="text-center">
//                             <strong>Team ID:</strong> <span className="text-darkPurple">{teamId}</span><br />
//                             <strong>Team Code:</strong> <span className="text-darkPurple">{hashCode}</span>
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CreateTeam;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CreateTeam = ({ userRegNo }) => {
//     const [regNo, setRegNo] = useState(userRegNo || ""); // Allow user input
//     const [teamName, setTeamName] = useState("");
//     const [errors, setErrors] = useState({});
//     const [teamId, setTeamId] = useState(null);
//     const [hashCode, setHashCode] = useState(null);
//     const [alreadyInTeam, setAlreadyInTeam] = useState(false);
//     const [loading, setLoading] = useState(false);

//     // ✅ **Check if user is already in a team when component loads**
//     useEffect(() => {
//         if (userRegNo) {
//             checkUserTeamStatus();
//         }
//     }, [userRegNo]);

//     const checkUserTeamStatus = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8001/api/team/check-user/${userRegNo}`);
//             if (response.data.inTeam) {
//                 setAlreadyInTeam(true);
//                 setTeamId(response.data.teamId);
//                 setHashCode(response.data.teamCode);
//             }
//         } catch (error) {
//             console.error("Error checking user team status:", error);
//         }
//     };

//     // ✅ **Handle Team Creation**
//     const handleCreateTeam = async () => {
//         setErrors({});
//         setLoading(true);

//         // ✅ **Validation**
//         const regNoPattern = /^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/;
//         if (!regNoPattern.test(regNo)) {
//             setErrors({ regNo: "❌ Invalid Registration Number (Format: XXZZZXXXX)." });
//             setLoading(false);
//             return;
//         }
//         if (teamName.trim() === "") {
//             setErrors({ teamName: "❌ Team Name is required." });
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:8001/api/team/create", { regNo, teamName });

//             if (response.data.teamId) {
//                 setTeamId(response.data.teamId);
//                 setHashCode(response.data.teamCode);
//                 setAlreadyInTeam(true);
//             }
//         } catch (error) {
//             setErrors({ general: error.response?.data?.message || "❌ Error creating team." });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-darkPurple">
//             <div className="w-[400px] bg-white rounded-2xl shadow-lg border-2 border-black p-6">
//                 <h2 className="text-xl font-bold text-center text-darkPurple">Create Your Team</h2>

//                 {alreadyInTeam ? (
//                     <div className="text-center">
//                         <p className="text-green-500 font-semibold">✅ You are already in a team.</p>
//                         <p className="mt-2">Team ID: <strong>{teamId}</strong></p>
//                         <p>Team Code: <strong>{hashCode}</strong></p>
//                     </div>
//                 ) : (
//                     <>
//                         <input
//                             className="w-full border p-2 mt-4 rounded"
//                             placeholder="Registration Number (XXZZZXXXX)"
//                             value={regNo}
//                             onChange={(e) => setRegNo(e.target.value)} // ✅ Allow user input
//                         />
//                         {errors.regNo && <p className="text-red-500 text-sm">{errors.regNo}</p>}

//                         <input
//                             className="w-full border p-2 mt-2 rounded"
//                             placeholder="Team Name"
//                             value={teamName}
//                             onChange={(e) => setTeamName(e.target.value)}
//                         />
//                         {errors.teamName && <p className="text-red-500 text-sm">{errors.teamName}</p>}
//                         {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

//                         <button
//                             className={`w-full bg-purple text-white font-bold py-2 mt-4 rounded ${
//                                 alreadyInTeam ? "opacity-50 cursor-not-allowed" : "hover:bg-lightPurple"
//                             }`}
//                             onClick={handleCreateTeam}
//                             disabled={alreadyInTeam || loading}
//                         >
//                             {loading ? "Creating..." : "CREATE TEAM"}
//                         </button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CreateTeam;
