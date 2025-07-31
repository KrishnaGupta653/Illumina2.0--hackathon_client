import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({userEmail}) => {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: userEmail, // Replace with actual logged-in user email
        gender: "",
        regNo: "",
        block: "",
        phone: "",
        roomNumber: "",
        github: ""
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    
    //const [isLoading, setIsLoading] = useState(true);

    // Fetch user profile from backend
    useEffect(() => {
        if (!profile.email) return; // Prevent API call if email is empty

        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/profile/${profile.email}`);
                setProfile(response.data);
                // if (response.data) {
                //     setProfile({
                //         firstName: response.data.first_name || "",
                //         lastName: response.data.last_name || "",
                //         email: response.data.email || "",
                //         gender: response.data.gender || "",
                //         regNo: response.data.reg_no || "",
                //         block: response.data.block || "",
                //         phone: response.data.phone || "",
                //         roomNumber: response.data.room_number || "",
                //         github: response.data.github || "",
                //     });
                // }
            } catch (error) {
                setMessage("Profile not found.");
            }
        };
        fetchProfile();
    }, [profile.email]);

    // Handle input changes
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors before making a request
    
        try {
            console.log(" Sending Profile Update Request:", profile);
            const response = await axios.put(`http://localhost:8001/api/profile/${profile.email}`, profile, {
                headers: { "Content-Type": "application/json" }
            });
    
            console.log(" Update Success Response:", response.data);
            setMessage(response.data.message);
        } catch (error) {
            console.error(" API Update Error:", error.response?.data || error.message);
            
            if (error.response?.data.errors) {
                setErrors(error.response.data.errors); // Set multiple errors
            } else {
                setMessage("Error updating profile.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-darkPurple">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 border-2 border-purple">
                {/* Display success/error messages */}
                {message && <p className="text-center text-green-600 font-semibold">{message}</p>}

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                        <label className="block text-gray-700">First Name*</label>
                        <input name="firstName" className="w-full p-2 border rounded" value={profile.firstName} onChange={handleChange} required />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700">Last Name*</label>
                        <input name="lastName" className="w-full p-2 border rounded" value={profile.lastName} onChange={handleChange} required />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700">Email*</label>
                        <input name="email" type="email" className="w-full p-2 border rounded bg-gray-200" value={profile.email} readOnly />
                    </div>
                    <div>
                        <label className="block text-gray-700">Block*</label>
                        <select name="block" className="w-full p-2 border rounded" value={profile.block} onChange={handleChange} required>
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
                    <div>
                        <label className="block text-gray-700">Gender*</label>
                        <select name="gender" className="w-full p-2 border rounded" value={profile.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transsexual Male">Transsexual Male</option>
                            <option value="Transsexual Female">Transsexual Female</option>
                            <option value="Metrosexual Male">Metrosexual Male</option>
                            <option value="Metrosexual Female">Metrosexual Female</option>
                            <option value="Male. But Curious What Being a Female is Like">Male. But Curious What Being a Female is Like</option>
                            <option value="Female. But Curious What Being a Male is Like">Female. But Curious What Being a Male is Like</option>
                            <option value="Male, But Overweight. So Have Moobs">Male, But Overweight. So Have Moobs</option>
                            <option value="Female. But Have an Adam's Apple">Female. But Have an Adam's Apple</option>
                            <option value="Hermaphrodite with Predominant Male Leanings">Hermaphrodite with Predominant Male Leanings</option>
                            <option value="Hermaphrodite with Predominant Female Leanings">Hermaphrodite with Predominant Female Leanings</option>
                            <option value="Hermaphrodite with No Strong Gender Leanings">Hermaphrodite with No Strong Gender Leanings</option>
                            <option value="Other">Other</option>
                            <option value="None">None</option>
                            <option value="Prefer Not to Say">Prefer Not to Say</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Phone Number*</label>
                        <input name="phone" className="w-full p-2 border rounded" value={profile.phone} onChange={handleChange} required />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700">Room Number*</label>
                        <input name="roomNumber" className="w-full p-2 border rounded" value={profile.roomNumber} onChange={handleChange} required />
                        {errors.roomNumber && <p className="text-red-500 text-sm">{errors.roomNumber}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700">Registration No.*</label>
                        <input name="regNo" className="w-full p-2 border rounded" value={profile.regNo} onChange={handleChange} required />
                        {errors.regNo && <p className="text-red-500 text-sm">{errors.regNo}</p>}
                    </div>
                    <div className="col-span-2">
                        <label className="block text-gray-700">GitHub Link</label>
                        <input name="github" className="w-full p-2 border rounded" value={profile.github} onChange={handleChange} />
                        {errors.github && <p className="text-red-500 text-sm">{errors.github}</p>}
                    </div>
                    <div className="col-span-2 flex justify-center mt-4">
                        <button type="submit" className="px-6 py-2 bg-purple text-white font-semibold rounded-lg hover:bg-lightPurple transition">
                            UPDATE PROFILE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
