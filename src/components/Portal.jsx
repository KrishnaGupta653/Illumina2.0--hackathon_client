import React, { useState, useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";
import { LuLightbulb } from "react-icons/lu";
import { FiSettings, FiLogOut } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Portal = ({ userEmail }) => {
    const navigate = useNavigate();
    const [assignedIdea, setAssignedIdea] = useState(null);
    const [teamDetails, setTeamDetails] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [error, setError] = useState("");
    const [userRegNo, setUserRegNo] = useState("");
    const [isLeader, setIsLeader] = useState(false);
    const [isFrozen, setIsFrozen] = useState(false);
    const [hasIdeaAssigned, setHasIdeaAssigned] = useState(false);



    useEffect(() => {
        fetchRegNo();
    }, [userEmail]);

    const fetchRegNo = async () => {
        try {
            const response = await axios.get(`http://localhost:8001/api/team/fetch-regno/${userEmail}`);
            const regNo = response.data.regNo;
            setUserRegNo(regNo);
            fetchTeamDetails(regNo);
        } catch (err) {
            setError("Failed to fetch registration number.");
            setLoading(false);
        }
    };

    const fetchTeamDetails = async (regNo) => {
        try {
            const response = await axios.get(`http://localhost:8001/api/team/details?regNo=${regNo}`);
            setTeamDetails(response.data);

            // if (response.data.inTeam) {
            //     fetchTeamMembers(response.data.teamId);
            // }
            if (response.data.inTeam) {
                fetchTeamMembers(response.data.teamId);
                setIsFrozen(response.data.isFrozen);
                setIsLeader(response.data.teamLeaderRegNo === regNo);  // ✅ Check if current user is leader
                if (response.data.assignedIdea) {
                    setAssignedIdea(response.data.assignedIdea);
                    setHasIdeaAssigned(true);
                }
            }

            setLoading(false);
        } catch (err) {
            setError("Failed to fetch team details.");
            setLoading(false);
        }
    };

    const fetchTeamMembers = async (teamId) => {
        try {
            const response = await axios.get(`http://localhost:8001/api/team/members/${teamId}`);
            setTeamMembers(response.data.members);
        } catch (error) {
            setError("Failed to fetch team members.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        navigate("/login");
    };

    const handleGetIdea = async () => {
        try {
            if (!teamDetails?.teamId) {
                alert("Team ID not found!");
                return;
            }
            const response = await axios.get("http://localhost:8001/api/idea/get-idea");
            setAssignedIdea(response.data);
        } catch (error) {
            alert("Failed to fetch idea. Try again!");
        }
    };

    const handleConfirmIdea = async () => {
        if (!selectedTopic) {
            alert("Please select a topic!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8001/api/idea/set-idea", {
                teamId: teamDetails?.teamId,
                ideaDomain: assignedIdea?.domain,
                ideaTopic: selectedTopic,
            });

            alert(response.data.message || "Idea assigned successfully!");
            setHasIdeaAssigned(true);
            setAssignedIdea({ domain: assignedIdea.domain, selectedTopic });
        } catch (error) {
            alert(error.response?.data?.message || "Failed to save idea.");
        }
    };

    const handleFreezeTeam = async () => {
        try {
            await axios.post("http://localhost:8001/api/team/freeze", {
            teamId: teamDetails.teamId,
            });
            setIsFrozen(true);
            alert("✅ Team frozen successfully!");
        } catch (error) {
            alert("❌ Failed to freeze team.");
        }
        };
        
    return (
        <div className="min-h-screen bg-darkPurple p-8">
            {/* Profile/Settings Buttons */}
            <div className="absolute top-8 right-8 flex gap-4">
                <button onClick={() => navigate("/profile")} className="flex items-center gap-2 bg-purple text-white px-4 py-2 rounded-lg hover:bg-lightPurple transition">
                    <FiSettings size={20} />
                    <span>Profile</span>
                </button>
                <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition">
                    <FiLogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex justify-center items-center min-h-screen px-6">
                <div className="flex space-x-6">
                    {/* Team Box */}
                    <div className="w-[350px] bg-white rounded-2xl shadow-lg border-2 border-black text-center">
                        <div className="bg-darkPurple text-white font-bold text-lg p-3 rounded-t-2xl">
                            Step 1: Create/Join Team
                        </div>
                        <div className="flex flex-col items-center p-6">
                            <FaUserFriends className="text-6xl text-gray-500" />
                            {loading ? (
                                <p className="text-darkPurple text-lg mt-4">Loading...</p>
                            ) : teamDetails?.inTeam ? (
                                <>
                                    <div className="text-gray-700 text-sm mb-4">
                                        <p><strong>Team Name:</strong> {teamDetails.teamName}</p>
                                        <p><strong>Team ID:</strong> {teamDetails.teamId}</p>
                                        <p><strong>Team Code:</strong> {teamDetails.teamCode}</p>
                                    </div>
                                    {/* Team Members Table */}
                                    <table className="w-full text-sm text-left text-gray-500 border">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="border px-2 py-1">S.No</th>
                                                <th className="border px-2 py-1">Member Name</th>
                                                <th className="border px-2 py-1">Reg No</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teamMembers.map((member, index) => (
                                                <tr key={member.reg_no} className="border-b">
                                                    <td className="border px-2 py-1">{index + 1}</td>
                                                    <td className="border px-2 py-1">{member.participant_name}</td>
                                                    <td className="border px-2 py-1">{member.reg_no}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {teamDetails?.inTeaminTeam && !isLeader && (
                                        <div className="mt-4 flex justify-center">
                                            <button
                                                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700"
                                                onClick={async () => {
                                                    if (window.confirm("Are you sure you want to leave the team?")) {
                                                        try {
                                                            const response = await axios.post("http://localhost:8001/api/team/leave-team", {
                                                                regNo: userRegNo,
                                                            });
                                                            alert(response.data.message);
                                                            window.location.reload(); // Refresh UI after leaving
                                                        } catch (error) {
                                                            alert("❌ Error leaving team. Please try again.");
                                                        }
                                                    }
                                                }}
                                            >
                                                Leave Team
                                            </button>
                                        </div>
                                    )}

                                    {/* Freeze Button - Visible Only to Leader */}
                                    {isLeader && !isFrozen && teamMembers.length >= 3 &&(
                                        <button
                                            onClick={handleFreezeTeam}
                                            className="mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
                                        >
                                            🔒 Freeze Team
                                        </button>
                                    )}
                                    {/* Team is Frozen Message */}
                                {isFrozen && (
                                    <p className="mt-4 text-green-600 font-bold">✅ Team is Frozen</p>
                                )}
                                </>
                            ) : (
                                <>
                                    <h2 className="text-lg font-semibold mt-4">No team members yet?</h2>
                                    <p className="text-gray-500 text-sm mt-1">Start a new team or join one</p>
                                    <div className="mt-4 space-y-3 w-full">
                                        <button onClick={() => navigate("/join-team")} className="w-full bg-lightPurple text-white py-2 rounded-lg hover:bg-purple">
                                            + JOIN TEAM
                                        </button>
                                        <button onClick={() => navigate("/create-team")} className="w-full bg-purple text-white py-2 rounded-lg hover:bg-lightPurple">
                                            CREATE TEAM
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    
                    {/* Idea Assignment Box */}
                    <div className="w-[350px] bg-white rounded-2xl shadow-lg border-2 border-black text-center">
                        <div className="bg-darkPurple text-white font-bold text-lg p-3 rounded-t-2xl">
                            Step 2 : Get Project Idea
                        </div>
                        <div className="flex flex-col items-center p-6">
                            <LuLightbulb className="text-6xl text-gray-500" />
                            {assignedIdea ? (
                                <>
                                    <h2 className="text-lg font-semibold mt-4">{assignedIdea.domain}</h2>
                                    <p className="text-gray-500 text-sm">Selected Topic: <b>{assignedIdea.selectedTopic}</b></p>
                                </>
                            ) : (
                                <p className="text-gray-500 text-sm mt-1">Click below to get your project idea.</p>
                            )}

                            {/* {!assignedIdea && (
                                <button className="mt-4 w-full bg-purple text-white font-semibold py-2 rounded-lg hover:bg-lightPurple" onClick={handleGetIdea}>
                                    Get Idea
                                </button>
                            )} */}
                            {/* {!assignedIdea && (
                                <button
                                    className={`mt-4 w-full text-white font-semibold py-2 rounded-lg ${isFrozen ? 'bg-purple hover:bg-lightPurple' : 'bg-gray-400 cursor-not-allowed'}`}
                                    onClick={handleGetIdea}
                                    disabled={!isFrozen || !isLeader}
                                >
                                    Get Idea
                                </button>
                            )} */}
                            {/* ✅ Only leader can click this button, others see it greyed out */}
                            {!assignedIdea && (
                            <button
                                className={`mt-4 w-full text-white font-semibold py-2 rounded-lg
                                    ${isLeader && isFrozen ? "bg-purple hover:bg-lightPurple" : "bg-gray-400 cursor-not-allowed"}`}
                                onClick={handleGetIdea}
                                disabled={!isFrozen || !isLeader }
                            >
                                Get Idea
                            </button>
                            )}

                            {assignedIdea && !assignedIdea.selectedTopic && (
                                <div className="mt-4 w-full">
                                    <p className="text-gray-500 text-sm">Select a topic:</p>
                                    {assignedIdea.topics.map((topic, index) => (
                                        <button key={index} className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700" onClick={() => setSelectedTopic(topic)}>
                                            {topic}
                                        </button>
                                    ))}
                                    {/* <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-800" onClick={handleConfirmIdea}>
                                        Confirm Idea
                                    </button> */}
                                    <button
                                        className={`mt-4 w-full text-white font-semibold py-2 rounded-lg
                                            ${selectedTopic ? "bg-green-600 hover:bg-green-800" : "bg-gray-400 cursor-not-allowed"}`}
                                        onClick={handleConfirmIdea}
                                        disabled={!selectedTopic}
                                    >
                                        Confirm Idea
                                    </button>
                                </div>
                            )}
                            {!isLeader && assignedIdea &&(
                                <p className="mt-4 text-sm text-gray-500">❌ Only the Team Leader can fetch and confirm the idea.</p>
                            )}
                        </div>
                    </div>

                    {/* Project Submission Box — Add your existing code here if needed */}
                                        {/* Idea Submission Box */}
                        <div className="w-[350px] bg-white rounded-2xl shadow-lg border-2 border-black text-center">
                            <div className="bg-darkPurple text-white font-bold text-lg p-3 rounded-t-2xl">
                                Step 3 : Project and PPT Submission
                            </div>
                            <div className="flex flex-col items-center p-6">
                                <LuLightbulb className="text-6xl text-gray-500" />
                                <h2 className="text-lg font-semibold mt-4">No Project Submitted Yet</h2>
                                <p className="text-gray-500 text-sm mt-1">
                                    Submit your project before the deadline!
                                </p>
                                {/* <button
                                    className="mt-4 w-full bg-purple text-white font-semibold py-2 rounded-lg hover:bg-lightPurple"
                                    onClick={() => navigate("/idea-submission")}
                                >
                                CREATE SUBMISSION
                            </button> */}
                            {/* <button
                                className={`mt-4 w-full text-white font-semibold py-2 rounded-lg ${isFrozen ? 'bg-purple hover:bg-lightPurple' : 'bg-gray-400 cursor-not-allowed'}`}
                                onClick={() => {
                                    if (isFrozen) navigate("/idea-submission");
                                }}
                                disabled={!isFrozen || !isLeader}
                            >
                                CREATE SUBMISSION
                            </button> */}
                            {/* ✅ Only leader can submit, others see greyed-out button */}
                            <button
                                className={`mt-4 w-full text-white font-semibold py-2 rounded-lg
                                    ${isLeader && isFrozen && hasIdeaAssigned ? "bg-purple hover:bg-lightPurple" : "bg-gray-400 cursor-not-allowed"}`}
                                onClick={() => {
                                    if (isFrozen && isLeader && hasIdeaAssigned) navigate("/idea-submission");
                                }}
                                disabled={!isFrozen || !isLeader || !hasIdeaAssigned}
                            >
                                Create Submission
                            </button>
                            {!isLeader && (
                                 <p className="mt-4 text-sm text-gray-500">❌ Only the Team Leader can submit the project.</p>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portal;


// function App() {

//     const [userEmail, setUserEmail] = useState("barun.gupta2001@example.com");  // Hardcoded for testing
//     const [isProfileComplete, setIsProfileComplete] = useState(null); // ✅ Start as null (not known yet)
//     const [loading, setLoading] = useState(true); // ✅ Prevent UI glitches
//     const [userRegNo, setUserRegNo] = useState("");

// //correct
// useEffect(() => {
//     const checkProfileStatus = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8001/api/profile/${userEmail}`);

//             if (response.data.isComplete) {  
//                 //console.log("✅ Profile found, redirecting to portal!");
//                 setIsProfileComplete(true);  // ✅ Profile exists → Redirect to portal
//             } else {
//                 //console.log("❌ No profile found, redirecting to fill-profile!");
//                 setIsProfileComplete(false); // ❌ No profile → Redirect to fill-profile
//             }
//         } catch (error) {
//             //console.error("❌ API Error:", error.response?.data || error.message);
//             setIsProfileComplete(false); // Assume profile does not exist if error occurs
//         } finally {
//             setLoading(false); // ✅ Remove loading state
//         }
//     };

//     checkProfileStatus();
// }, [userEmail]);

// useEffect(() => {
//     const fetchRegNo = async () => {
//         try {
//             const response = await axios.get(`http://localhost:8001/api/team/fetch-regno/${userEmail}`);
//             setUserRegNo(response.data.regNo);
//         } catch (error) {
//             console.error("❌ Failed to fetch regNo");
//         }
//     };
//     fetchRegNo();
// }, [userEmail]);
// }