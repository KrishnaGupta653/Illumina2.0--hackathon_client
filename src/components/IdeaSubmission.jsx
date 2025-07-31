// import React, { useState } from 'react';
// import axios from 'axios';

// const IdeaSubmission = () => {
//     const [projectName, setProjectName] = useState('');
//     const [description, setDescription] = useState('');
//     const [file, setFile] = useState(null);
//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [successMessage, setSuccessMessage] = useState("");

//     const handleSubmit = async () => {
//         setErrors({});
//         setSuccessMessage("");
//         setLoading(true);

//         if (!projectName.trim()) {
//             setErrors({ projectName: "Project Name cannot be empty." });
//             setLoading(false);
//             return;
//         }
//         if (!description.trim()) {
//             setErrors({ description: "Project Description cannot be empty." });
//             setLoading(false);
//             return;
//         }
//         if (!file) {
//             setErrors({ file: "Please upload a PPT file." });
//             setLoading(false);
//             return;
//         }

//         const formData = new FormData();
//         formData.append("projectName", projectName);
//         formData.append("description", description);
//         formData.append("ppt", file);

//         try {
//             await axios.post("http://localhost:8001/api/submit-idea", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             setSuccessMessage("🎉 Idea submitted successfully!");
//             setProjectName("");
//             setDescription("");
//             setFile(null);
//         } catch (error) {
//             setErrors({ general: "❌ Error submitting idea. Try again later." });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-darkPurple p-6">
//             <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border-2 border-black p-6">
//                 <h2 className="text-2xl font-bold text-center text-darkPurple">Submit Your Idea</h2>

//                 {successMessage && <p className="text-green-600 font-semibold text-center mt-4">{successMessage}</p>}
//                 {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}

//                 <div className="mt-4">
//                     <label className="block text-gray-700 font-semibold">Project Name</label>
//                     <input
//                         className="w-full border p-2 mt-1 rounded"
//                         placeholder="Enter your Project Name"
//                         value={projectName}
//                         onChange={(e) => setProjectName(e.target.value)}
//                     />
//                     {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName}</p>}
//                 </div>

//                 <div className="mt-4">
//                     <label className="block text-gray-700 font-semibold">Project Description</label>
//                     <textarea
//                         className="w-full border p-2 mt-1 rounded h-24"
//                         placeholder="Describe your project..."
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                     {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
//                 </div>

//                 <div className="mt-4">
//                     <label className="block text-gray-700 font-semibold">Upload PPT</label>
//                     <input
//                         type="file"
//                         className="w-full border p-2 mt-1 rounded"
//                         accept=".ppt,.pptx"
//                         onChange={(e) => setFile(e.target.files[0])}
//                     />
//                     {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
//                 </div>

//                 <button
//                     className={`w-full bg-purple text-white font-bold py-2 mt-6 rounded ${
//                         loading ? "opacity-50 cursor-not-allowed" : "hover:bg-lightPurple"
//                     }`}
//                     onClick={handleSubmit}
//                     disabled={loading}
//                 >
//                     {loading ? "Submitting..." : "SUBMIT IDEA"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default IdeaSubmission;

// import React, { useState } from "react";
// import axios from "axios";

// const IdeaSubmission = () => {
//     const [projectName, setProjectName] = useState("");
//     const [description, setDescription] = useState("");
//     const [file, setFile] = useState(null);
//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [successMessage, setSuccessMessage] = useState("");

//     const handleSubmit = async () => {
//         setErrors({});
//         setSuccessMessage("");
//         setLoading(true);

//         if (!projectName.trim()) {
//             setErrors((prev) => ({ ...prev, projectName: "Project Name cannot be empty." }));
//             setLoading(false);
//             return;
//         }
//         if (!description.trim()) {
//             setErrors((prev) => ({ ...prev, description: "Project Description cannot be empty." }));
//             setLoading(false);
//             return;
//         }
//         if (!file) {
//             setErrors((prev) => ({ ...prev, file: "Please upload a PPT file." }));
//             setLoading(false);
//             return;
//         }

//         const formData = new FormData();
//         formData.append("projectName", projectName);
//         formData.append("description", description);
//         formData.append("ppt", file);

//         try {
//             await axios.post("http://localhost:8001/api/submit-project", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             setSuccessMessage("🎉 Idea submitted successfully!");
//             setProjectName("");
//             setDescription("");
//             setFile(null);
//         } catch (error) {
//             setErrors({ general: "❌ Error submitting idea. Try again later." });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDownloadExcel = async () => {
//         try {
//             const response = await axios.get("http://localhost:8001/api/download-excel", { responseType: "blob" });
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement("a");
//             link.href = url;
//             link.setAttribute("download", "project_submissions.xlsx");
//             document.body.appendChild(link);
//             link.click();
//         } catch (error) {
//             alert("❌ Error downloading Excel file.");
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-darkPurple p-6">
//             <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border-2 border-black p-6">
//                 <h2 className="text-2xl font-bold text-center text-darkPurple">Submit Your Idea</h2>

//                 {successMessage && <p className="text-green-600 font-semibold text-center mt-4">{successMessage}</p>}
//                 {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}

//                 <div className="mt-4">
//                     <label className="block text-gray-700 font-semibold">Project Name</label>
//                     <input
//                         className="w-full border p-2 mt-1 rounded"
//                         placeholder="Enter your Project Name"
//                         value={projectName}
//                         onChange={(e) => setProjectName(e.target.value)}
//                     />
//                     {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName}</p>}
//                 </div>

//                 <div className="mt-4">
//                     <label className="block text-gray-700 font-semibold">Project Description</label>
//                     <textarea
//                         className="w-full border p-2 mt-1 rounded h-24"
//                         placeholder="Describe your project..."
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                     />
//                     {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
//                 </div>

//                 <div className="mt-4">
//                     <label className="block text-gray-700 font-semibold">Upload PPT</label>
//                     <input
//                         type="file"
//                         className="w-full border p-2 mt-1 rounded"
//                         accept=".ppt,.pptx"
//                         onChange={(e) => setFile(e.target.files[0])}
//                     />
//                     {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
//                 </div>

//                 <button
//                     className={`w-full bg-purple text-white font-bold py-2 mt-6 rounded ${
//                         loading ? "opacity-50 cursor-not-allowed" : "hover:bg-lightPurple"
//                     }`}
//                     onClick={handleSubmit}
//                     disabled={loading}
//                 >
//                     {loading ? "Submitting..." : "SUBMIT IDEA"}
//                 </button>

//                 {/* <button
//                     className="w-full bg-green-600 text-white font-bold py-2 mt-4 rounded hover:bg-green-800"
//                     onClick={handleDownloadExcel}
//                 >
//                     📥 Download Submissions (Excel)
//                 </button> */}
//             </div>
//         </div>
//     );
// };

// export default IdeaSubmission;

import React, { useState } from "react";
import axios from "axios";

const IdeaSubmission = ({ userEmail }) => {
    console.log("📧 Debug: Received userEmail:", userEmail);
     const [projectName, setProjectName] = useState("");
     const [description, setDescription] = useState("");
     const [file, setFile] = useState(null);
     const [errors, setErrors] = useState({});
     const [loading, setLoading] = useState(false);
     const [successMessage, setSuccessMessage] = useState("");

     const handleSubmit = async () => {
         setErrors({});
         setSuccessMessage("");
         setLoading(true);

         if (!projectName.trim()) {
            setErrors((prev) => ({ ...prev, projectName: "Project Name cannot be empty." }));
            setLoading(false);
            return;
         }
         if (!description.trim()) {
            setErrors((prev) => ({ ...prev, description: "Project Description cannot be empty." }));
            setLoading(false);
            return;
         }
         if (!file) {
            setErrors((prev) => ({ ...prev, file: "Please upload a PPT/PDF file." }));
            setLoading(false);
            return;
         }

         try {
            // ✅ **Fetch regNo from backend**
            const regNoRes = await axios.get(`http://localhost:8001/api/team/fetch-regno/${userEmail}`);
            const regNo = regNoRes.data.regNo;

            const formData = new FormData();
            formData.append("projectName", projectName);
            formData.append("description", description);
            formData.append("ppt", file);
            formData.append("regNo", regNo);

            await axios.post("http://localhost:8001/api/submit-project", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            setSuccessMessage("🎉 Idea submitted successfully!");
            setProjectName("");
            setDescription("");
            setFile(null);
         } catch (error) {
            setErrors({ general: "❌ Error submitting project. Try again later." });
         } finally {
            setLoading(false);
         }
     };

     return (
         <div className="flex justify-center items-center min-h-screen bg-darkPurple p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border-2 border-black p-6">
              <h2 className="text-2xl font-bold text-center text-darkPurple">Submit Your Project</h2>

              {successMessage && <p className="text-green-600 font-semibold text-center mt-4">{successMessage}</p>}
              {errors.general && <p className="text-red-500 text-center">{errors.general}</p>}

              <input className="w-full border p-2 mt-2 rounded" placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              <textarea className="w-full border p-2 mt-2 rounded h-24" placeholder="Describe your project..." value={description} onChange={(e) => setDescription(e.target.value)} />
              <input type="file" className="w-full border p-2 mt-2 rounded" accept=".ppt,.pptx,.pdf" onChange={(e) => setFile(e.target.files[0])} />
              <button className="w-full bg-purple text-white font-bold py-2 mt-4 rounded hover:bg-lightPurple" onClick={handleSubmit} disabled={loading}>
                   {loading ? "Submitting..." : "Submit Project"}
              </button>
            </div>
         </div>
     );
};

export default IdeaSubmission;
