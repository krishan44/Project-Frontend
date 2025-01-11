import React, { useState } from "react";
import axios from "axios";
import styles from "./RegistrationForm.module.css";

const Registration = ({ closeForm }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        full_name: "",
        date_of_birth: "",
        email: "",
        mobile_number: "",
        gender: "",
        address: "",
        education_level: "",
        major: "",
        learning_speed: "",
        profession: "",
        job_knowledge: "",
        country: "",
        specification: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateStep1 = () => {
        const { full_name, date_of_birth, email, mobile_number, gender, address, education_level, major, learning_speed } = formData;
        const newErrors = {};
        if (!full_name) newErrors.full_name = "Full Name is required.";
        if (!date_of_birth) newErrors.date_of_birth = "Date of Birth is required.";
        if (!email) newErrors.email = "Email Address is required.";
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Please enter a valid email address.";
        if (!mobile_number) newErrors.mobile_number = "Mobile Number is required.";
        else if (!/^\d+$/.test(mobile_number)) newErrors.mobile_number = "Please enter a valid mobile number.";
        if (!gender) newErrors.gender = "Gender is required.";
        if (!address) newErrors.address = "Physical Address is required.";
        if (!education_level) newErrors.education_level = "Highest Level of Education is required.";
        if (!major) newErrors.major = "Major is required.";
        if (!learning_speed) newErrors.learning_speed = "Learning Speed is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const { profession, job_knowledge, country, specification } = formData;
        const newErrors = {};
        if (!profession) newErrors.profession = "Profession Name is required.";
        if (!job_knowledge) newErrors.job_knowledge = "Knowledge about the Profession is required.";
        if (!country) newErrors.country = "Current Country is required.";
        if (!specification) newErrors.specification = "Specification is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (step === 1 && !validateStep1()) return;
        if (step === 2 && !validateStep2()) return;
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep2()) return;

        try {
            // Send formData to the backend (Flask API)
            const response = await axios.post("http://localhost:5001/api/submit_registration", formData);
            // Log the response (optional, for debugging)
            console.log('Server Response:', response.data);
            // Handle successful submission
            if (response.status === 200) {
                closeForm();
                alert("Registration submitted successfully!");
            } else {
                alert("There was an error submitting your registration.");
            }
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error sending data to server:', error);
            alert("There was an error submitting your registration.");
        }
    };

    return (
        <div className={styles.forms}>
            <div className={styles.firstForm}>
                <div className={styles.closeButton} onClick={closeForm}>
                    <i className="uil uil-times"></i>
                </div>
                <form onSubmit={handleSubmit}>
                    {step === 1 ? (
                        <>
                            <div className={styles.details}>
                                <span className={styles.heading}>Registration</span>
                                <span className={styles.title}>Personal Details</span>
                                <div className={styles.fields}>
                                    <div className={styles.inputField}>
                                        <label htmlFor="full-name">Full Name</label>
                                        <input
                                            type="text"
                                            id="full-name"
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            placeholder="Enter your Name"
                                            required
                                        />
                                        {errors.full_name && <p className={styles.errorMessage}>{errors.full_name}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label htmlFor="dob">Date of Birth</label>
                                        <input
                                            type="date"
                                            id="dob"
                                            name="date_of_birth"
                                            value={formData.date_of_birth}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.date_of_birth && <p className={styles.errorMessage}>{errors.date_of_birth}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your Email"
                                            required
                                        />
                                        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label htmlFor="mobile">Mobile Number</label>
                                        <input
                                            type="number"
                                            id="mobile"
                                            name="mobile_number"
                                            value={formData.mobile_number}
                                            onChange={handleChange}
                                            placeholder="Enter Mobile Number"
                                            required
                                        />
                                        {errors.mobile_number && <p className={styles.errorMessage}>{errors.mobile_number}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label>Gender</label>
                                        <div className={styles.radioBtns}>
                                            <input
                                                type="radio"
                                                id="male"
                                                name="gender"
                                                value="Male"
                                                checked={formData.gender === "Male"}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="male">Male</label>
                                            <input
                                                type="radio"
                                                id="female"
                                                name="gender"
                                                value="Female"
                                                checked={formData.gender === "Female"}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="female">Female</label>
                                        </div>
                                        {errors.gender && <p className={styles.errorMessage}>{errors.gender}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label htmlFor="address">Physical Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Enter your Address"
                                            required
                                        />
                                        {errors.address && <p className={styles.errorMessage}>{errors.address}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.details}>
                                <span className={styles.title}>Education Details</span>
                                <div className={styles.fields}>
                                    <div className={styles.inputField}>
                                        <label htmlFor="education-level">Highest Level of Education</label>
                                        <select
                                            name="education_level"
                                            id="education-level"
                                            value={formData.education_level}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>Select an option</option>
                                            <option value="PhD">PhD Level</option>
                                            <option value="MSc">Master's Level</option>
                                            <option value="BSc">Bachelor's Level</option>
                                            <option value="HND">HND Level</option>
                                            <option value="Diploma">Diploma Level</option>
                                            <option value="School Leaver">School Leaver</option>
                                        </select>
                                        {errors.education_level && <p className={styles.errorMessage}>{errors.education_level}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label htmlFor="major">Major</label>
                                        <input
                                            type="text"
                                            id="major"
                                            name="major"
                                            value={formData.major}
                                            onChange={handleChange}
                                            placeholder="Ex: Computer Science/NA"
                                            required
                                        />
                                        {errors.major && <p className={styles.errorMessage}>{errors.major}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label htmlFor="learning-speed">Learning Speed</label>
                                        <select
                                            name="learning_speed"
                                            id="learning-speed"
                                            value={formData.learning_speed}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>Select an option</option>
                                            <option value="Fast">Fast Learner</option>
                                            <option value="Moderate">Moderate Learner</option>
                                            <option value="Slow">Slow Learner</option>
                                        </select>
                                        {errors.learning_speed && <p className={styles.errorMessage}>{errors.learning_speed}</p>}
                                    </div>
                                </div>
                            </div>
                            <button type="button" className={styles.nextBtn} onClick={nextStep}>
                                <span className={styles.btnText}>Next</span>
                                <i className="uil uil-navigator"></i>
                            </button>
                        </>
                    ) : (
                        <>
                            <div className={styles.details}>
                                <span className={styles.heading}>Registration</span>
                                <span className={styles.title}>Targeted Profession</span>
                                <div className={styles.fields}>
                                    <div className={styles.inputField}>
                                        <label htmlFor="profession">Profession Name</label>
                                        <input
                                            type="text"
                                            id="profession"
                                            name="profession"
                                            value={formData.profession}
                                            onChange={handleChange}
                                            placeholder="Enter your target profession"
                                            required
                                        />
                                        {errors.profession && <p className={styles.errorMessage}>{errors.profession}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label htmlFor="job-knowledge">Knowledge about the Profession</label>
                                        <select
                                            name="job_knowledge"
                                            id="job-knowledge"
                                            value={formData.job_knowledge}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>Select an option</option>
                                            <option value="Nothing">Nothing</option>
                                            <option value="Little">A Little</option>
                                            <option value="Moderate">Moderately</option>
                                            <option value="A Lot">A Lot</option>
                                        </select>
                                        {errors.job_knowledge && <p className={styles.errorMessage}>{errors.job_knowledge}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label htmlFor="country">Current Country</label>
                                        <input
                                            type="text"
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            placeholder="Enter your country"
                                            required
                                        />
                                        {errors.country && <p className={styles.errorMessage}>{errors.country}</p>}
                                    </div>

                                    <div className={styles.inputField}>
                                        <label htmlFor="specification">Specification (Career or Degree's)</label>
                                        <textarea
                                            id="specification"
                                            name="specification"
                                            value={formData.specification}
                                            onChange={handleChange}
                                            rows="4"
                                            cols="30"
                                            placeholder="Enter your specifications here"
                                        ></textarea>
                                        {errors.specification && <p className={styles.errorMessage}>{errors.specification}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.buttons}>
                                <button type="button" className={styles.backBtn} onClick={prevStep}>
                                    <i className="uil uil-navigator"></i>
                                    <span className={styles.btnText}>Back</span>
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    <span className={styles.btnText}>Submit</span>
                                    <i className="uil uil-navigator"></i>
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Registration;
