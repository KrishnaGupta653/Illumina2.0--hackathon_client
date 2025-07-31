//correct
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const FillProfile = ({ userEmail }) => {
//     const navigate = useNavigate();

//     const [profile, setProfile] = useState({
//         email: userEmail || "", // ✅ Pre-filled email (Read-Only)
//         firstName: "",
//         lastName: "",
//         gender: "",
//         regNo: "",
//         block: "",
//         phone: "",
//         roomNumber: "",
//         github: ""
//     });

//     const [errors, setErrors] = useState({});
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);

//     // ✅ Regex Validation
//     const validateInputs = () => {
//         let newErrors = {};

//         if (!/^[A-Za-z]+$/.test(profile.firstName)) 
//             newErrors.firstName = "❌ First name must contain only letters.";

//         if (!/^[A-Za-z]+$/.test(profile.lastName)) 
//             newErrors.lastName = "❌ Last name must contain only letters.";

//         if (!/^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/.test(profile.regNo)) 
//             newErrors.regNo = "❌ Registration No. must be in '22BBSXXXX' format.";

//         if (!/^[0-9]{10}$/.test(profile.phone)) 
//             newErrors.phone = "❌ Phone number must be exactly 10 digits.";

//         if (!/^https?:\/\/github\.com\/[a-zA-Z0-9-]+\/?$/.test(profile.github)) 
//             newErrors.github = "❌ Enter a valid GitHub URL (https://github.com/username).";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     // ✅ Handle Input Change
//     const handleInputChange = (e) => {
//         setProfile({ ...profile, [e.target.name]: e.target.value });
//     };

//     // ✅ Submit Profile
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrors({});
//         setMessage("");
//         setLoading(true);

//         if (!validateInputs()) {
//             setLoading(false);
//             return;
//         }

//         try {
//             console.log("🔹 Sending Data:", profile); // ✅ Debugging Log

//             const response = await axios.post("http://localhost:8001/api/profile", profile);

//             console.log("✅ Server Response:", response.data); // ✅ Debugging Log
//             setMessage("✅ Profile saved successfully!");

//             // ✅ Redirect to Portal after 1.5s
//             setTimeout(() => navigate("/portal"), 1500);
//         } catch (error) {
//             console.error("❌ API Error:", error.response?.data || error.message);

//             if (error.response?.data) {
//                 setErrors(error.response.data); // ✅ Show exact validation errors
//             } else {
//                 setMessage("❌ An unexpected error occurred.");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

const FillProfile = ({ userEmail, setIsProfileComplete }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        email: userEmail || "",
        firstName: "",
        lastName: "",
        gender: "",
        regNo: "",
        block: "",
        phone: "",
        roomNumber: "",
        github: ""
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const validateInputs = () => {
        let newErrors = {};

        if (!/^[A-Za-z]+$/.test(profile.firstName)) newErrors.firstName = "❌ First name must contain only letters.";
        if (!/^[A-Za-z]+$/.test(profile.lastName)) newErrors.lastName = "❌ Last name must contain only letters.";
        if (!/^[0-9]{2}[A-Za-z]{3}[0-9]{4}$/.test(profile.regNo)) newErrors.regNo = "❌ Registration No. must be in 'XXZZZXXXX' format.";
        if (!/^[0-9]{10}$/.test(profile.phone)) newErrors.phone = "❌ Phone number must be exactly 10 digits or Check your number.";
        if (!/^https?:\/\/github\.com\/[a-zA-Z0-9-]+\/?$/.test(profile.github)) newErrors.github = "❌ Enter a valid GitHub URL (https://github.com/username).";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // const handleInputChange = (e) => {
    //     setProfile({ ...profile, [e.target.name]: e.target.value });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setMessage("");
        setLoading(true);

        if (!validateInputs()) {
            setLoading(false);
            return;
        }

        try {
            console.log("🔹 Sending Data:", profile);
            await axios.post("http://localhost:8001/api/profile", profile);
            console.log("✅ Profile saved successfully!");

            setMessage("✅ Profile saved successfully!");
            setIsProfileComplete(true);  // ✅ Update App state
            navigate("/portal", { replace: true }); // ✅ Redirect smoothly
        } catch (error) {
            console.error("❌ API Error:", error.response?.data || error.message);
            setErrors(error.response?.data || {});
            setMessage("❌ An unexpected error occurred. Please check your details and try again.");
        } finally {
            setLoading(false);
        }
    };

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        let cleanValue = value;
    
        // For firstName and lastName, clean extra spaces
        if (name === "firstName" || name === "lastName") {
            cleanValue = value.replace(/\s+/g, ' ').trim();
        }
        else if (name === "regNo" || name === "phone") {
            cleanValue = value.replace(/\s+/g, ''); // Remove spaces in regNo & phone
        }
    
        setProfile({ ...profile, [name]: cleanValue });
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-darkPurple">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 border-2 border-purple">
                
                {/* ✅ Success/Error Message */}
                {message && <p className={`text-center font-semibold ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}

                <h2 className="text-xl font-bold text-center text-darkPurple">Complete Your Profile</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-6">
                    
                    {/* ✅ First Name */}
                    <div>
                        <label className="block text-gray-700">First Name*</label>
                        <input name="firstName" className="w-full p-2 border rounded" value={profile.firstName} onChange={handleInputChange} 
                        required />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>

                    {/* ✅ Last Name */}
                    <div>
                        <label className="block text-gray-700">Last Name*</label>
                        <input name="lastName" className="w-full p-2 border rounded" value={profile.lastName} onChange={handleInputChange} required />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>

                    {/* ✅ Email (Read-Only) */}
                    <div>
                        <label className="block text-gray-700">Email*</label>
                        <input name="email" type="email" className="w-full p-2 border rounded bg-gray-200" value={profile.email} readOnly />
                    </div>

                    {/* ✅ Gender */}
                    <div>
                        <label className="block text-gray-700">Gender*</label>
                        <select name="gender" className="w-full p-2 border rounded" value={profile.gender} onChange={handleInputChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        
                    </div>

                    {/* ✅ Registration Number */}
                    <div>
                        <label className="block text-gray-700">Registration No.*</label>
                        <input name="regNo" className="w-full p-2 border rounded" value={profile.regNo} onChange={handleInputChange} required />
                        {errors.regNo && <p className="text-red-500 text-sm">{errors.regNo}</p>}
                    </div>

                    {/* ✅ Block Selection */}
                    <div>
                        <label className="block text-gray-700">Block*</label>
                        <select name="block" className="w-full p-2 border rounded" value={profile.block} onChange={handleInputChange} required>
                            <option value="">Select Block</option>
                            <option value="Ladies Hostel - A Block">Ladies Hostel - A Block</option>
                            <option value="Ladies Hostel - B Block">Ladies Hostel - B Block</option>
                            <option value="Ladies Hostel - C Block">Ladies Hostel - C Block</option>
                            <option value="Ladies Hostel - D Block">Ladies Hostel - D Block</option>
                            <option value="Ladies Hostel - E Block">Ladies Hostel - E Block</option>
                            <option value="Ladies Hostel - F Block">Ladies Hostel - F Block</option>
                            <option value="Ladies Hostel - G Block">Ladies Hostel - G Block</option>
                            <option value="Ladies Hostel - H Block">Ladies Hostel - H Block</option>
                            <option value="Ladies Hostel - J Block">Ladies Hostel - J Block</option>
                            <option value="Ladies Hostel - RGT Block">Ladies Hostel - RGT Block</option>
                            <option value="Ladies Hostel - GN-ANNEX Block">Ladies Hostel - GN-ANNEX Block</option>

                            <option value="Men's Hostel - A Block">Men's Hostel - A Block</option>
                            <option value="Men's Hostel - B Block">Men's Hostel - B Block</option>
                            <option value="Men's Hostel - B-ANNEX Block">Men's Hostel - B-ANNEX Block</option>
                            <option value="Men's Hostel - C Block">Men's Hostel - C Block</option>
                            <option value="Men's Hostel - D Block">Men's Hostel - D Block</option>
                            <option value="Men's Hostel - D-ANNEX Block">Men's Hostel - D-ANNEX Block</option>
                            <option value="Men's Hostel - E Block">Men's Hostel - E Block</option>
                            <option value="Men's Hostel - F Block">Men's Hostel - F Block</option>
                            <option value="Men's Hostel - G Block">Men's Hostel - G Block</option>
                            <option value="Men's Hostel - H Block">Men's Hostel - H Block</option>
                            <option value="Men's Hostel - J Block">Men's Hostel - J Block</option>
                            <option value="Men's Hostel - J-ANNEX Block">Men's Hostel - J-ANNEX Block</option>
                            <option value="Men's Hostel - K Block">Men's Hostel - K Block</option>
                            <option value="Men's Hostel - L Block">Men's Hostel - L Block</option>
                            <option value="Men's Hostel - M Block">Men's Hostel - M Block</option>
                            <option value="Men's Hostel - M-ANNEX Block">Men's Hostel - M-ANNEX Block</option>
                            <option value="Men's Hostel - N Block">Men's Hostel - N Block</option>
                            <option value="Men's Hostel - N-ANNEX Block">Men's Hostel - N-ANNEX Block</option>
                            <option value="Men's Hostel - P Block">Men's Hostel - P Block</option>
                            <option value="Men's Hostel - Q Block">Men's Hostel - Q Block</option>
                            <option value="Men's Hostel - R Block">Men's Hostel - R Block</option>
                            <option value="Men's Hostel - S Block">Men's Hostel - S Block</option>
                            <option value="Men's Hostel - T Block">Men's Hostel - T Block</option>

                            <option value="Day Scholar">Day Scholar</option>

                        </select>
                    </div>

                    {/* ✅ Phone Number */}
                    <div>
                        <label className="block text-gray-700">Phone Number*</label>
                        <input name="phone" className="w-full p-2 border rounded" value={profile.phone} onChange={handleInputChange} required />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    {/* ✅ Room Number */}
                    <div>
                        <label className="block text-gray-700">Room Number*</label>
                        <input name="roomNumber" className="w-full p-2 border rounded" value={profile.roomNumber} onChange={handleInputChange} required />
                        {errors.roomNumber && <p className="text-red-500 text-sm">{errors.roomNumber}</p>}
                    </div>

                    {/* ✅ GitHub Profile */}
                    <div className="col-span-2">
                        <label className="block text-gray-700">GitHub Link</label>
                        <input name="github" className="w-full p-2 border rounded" value={profile.github} onChange={handleInputChange} />
                        {errors.github && <p className="text-red-500 text-sm">{errors.github}</p>}
                    </div>

                    {/* ✅ Submit Button */}
                    <div className="col-span-2 flex justify-center mt-4">
                        <button type="submit" className="px-6 py-2 bg-purple text-white font-semibold rounded-lg hover:bg-lightPurple transition" disabled={loading}>
                            {loading ? "Saving..." : "Save & Continue"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default FillProfile;
