import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateTeam = ({ userEmail }) => {
    const [regNo, setRegNo] = useState("");
    const [teamName, setTeamName] = useState("");
    const [errors, setErrors] = useState({});
    const [alreadyInTeam, setAlreadyInTeam] = useState(false);
    const [teamDetails, setTeamDetails] = useState({ teamId: "", hashCode: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDetails = async () => {
            if (!userEmail) {
                setErrors({ general: "❌ No user email provided." });
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8001/api/team/fetch-regno/${userEmail}`);
                const fetchedRegNo = response.data.regNo;

                setRegNo(fetchedRegNo);

                const teamCheck = await axios.get(`http://localhost:8001/api/team/check-user/${fetchedRegNo}`);
                if (teamCheck.data.inTeam) {
                    setAlreadyInTeam(true);
                    setTeamDetails({
                        teamId: teamCheck.data.teamId,
                        hashCode: teamCheck.data.teamCode
                    });
                }
            } catch (error) {
                setErrors({ general: "❌ Failed to fetch registration number or team details." });
            }
        };

        fetchDetails();
    }, [userEmail]);

    const handleCreateTeam = async () => {
        setErrors({});
        setLoading(true);

        if (!teamName.trim()) {
            setErrors({ teamName: "❌ Team name is required." });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8001/api/team/create", {
                email: userEmail,
                teamName
            });

            setTeamDetails({
                teamId: response.data.teamId,
                hashCode: response.data.teamCode
            });
            setAlreadyInTeam(true);
            setTimeout(() => navigate("/portal"), 1500); // Redirect to portal after 1.5s
        } catch (error) {
            setErrors({ general: error.response?.data?.message || "❌ Failed to create team." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-darkPurple">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-center text-darkPurple">Create Your Team</h2>

                {alreadyInTeam ? (
                    <div className="text-center">
                        <p className="text-green-600">✅ You are already in a team.</p>
                        <p>Team ID: {teamDetails.teamId}</p>
                        <p>Team Code: {teamDetails.hashCode}</p>
                    </div>
                ) : (
                    <>
                        <div>
                            <label>Registration Number</label>
                            <input className="w-full p-2 border bg-gray-100" value={regNo} readOnly />
                        </div>

                        <div className="mt-4">
                            <label>Team Name</label>
                            <input className="w-full p-2 border" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                            {errors.teamName && <p className="text-red-500">{errors.teamName}</p>}
                        </div>

                        {errors.general && <p className="text-red-500">{errors.general}</p>}

                        <button className="w-full bg-purple text-white py-2 mt-4" disabled={alreadyInTeam || loading} onClick={handleCreateTeam}>
                            {loading ? "Creating..." : "Create Team"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CreateTeam;
