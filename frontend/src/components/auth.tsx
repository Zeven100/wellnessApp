import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupInput } from "@satvik-jain/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../../config.ts";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<signupInput>({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt.jwt);
            navigate("/blogs");
        } catch (e) {
            console.error({ error: "Error signin up" });
        }
    }

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
    };

    const headingStyle: React.CSSProperties = {
        fontSize: '1.875rem',
        fontWeight: '800',
        textAlign: 'center',
    };

    const linkStyle: React.CSSProperties = {
        color: '#3b82f6',
        textDecoration: 'underline',
    };

    const inputContainerStyle: React.CSSProperties = {
        width: '100%',
        padding: '20px', // Add padding to create space between input fields and border
    };

    const box: React.CSSProperties = {
        border: '2px solid #000', // Set border to 2px solid black
        padding: '30px', 
        borderRadius: '10px', // Add border radius for rounded corners
        width: '300px', // Set width of the box
        maxWidth: '100%',
        // Ensure box width doesn't exceed its container
        
    };

    const buttonStyle: React.CSSProperties = {
        color: 'white',
        backgroundColor: 'black',
        width: '100%',
        border: 'none',
        borderRadius: '0.375rem',
        padding: '0.625rem',
        cursor: 'pointer',
        marginTop: '0.75rem',
        fontWeight:'bold'
    };

    return (
        <div style={containerStyle}>
            <div style={box}>
                <div style={headingStyle}>
                    {type === "signup" ? "Create an account" : "Sign in"}
                </div>
                <div style={{textAlign : 'center'}}>
                    {type === "signup" ? "Already have an account? " : "Don't have an account? "}
                    <Link to={type === "signup" ? "/signin" : "/signup"} style={linkStyle}>
                        {type === "signup" ? "Sign In" : "Sign Up"}
                    </Link>
                </div>
                <div style={inputContainerStyle}>
                    {type === "signup" && <LabelledInput label="Name" placeholder="Satvik Jain" onChange={(e) => setPostInputs((c) => ({ ...c, name: e.target.value }))} />}
                    <LabelledInput label="Email" placeholder="2022uee0148@iitjammu.ac.in" onChange={(e) => setPostInputs((c) => ({ ...c, email: e.target.value }))} />
                    <LabelledInput label="Password" placeholder="supersecret" onChange={(e) => setPostInputs((c) => ({ ...c, password: e.target.value }))} type="password" />
                </div>
                <div>
                    <button type="button" onClick={sendRequest} style={buttonStyle}>
                        {type === "signup" ? "Sign Up" : "Sign In"}
                    </button>
                </div>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    const labelStyle: React.CSSProperties = {
        marginBottom: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        color: '#000000',
        
    };

    const inputStyle: React.CSSProperties = {
        backgroundColor: '#F3F4F6', // Light gray background
        border: '1px solid #E5E7EB', // Light gray border
        color: '#1F2937', // Dark text color
        fontSize: '0.875rem',
        borderRadius: '0.375rem',
        padding: '0.75rem', // Increased padding for better spacing
        width: '80%',
        marginTop: '0.5rem', // Adjusted margin top
        transition: 'border-color 0.3s ease', // Smooth transition for border color change
        outline: 'none', // Remove default outline
    };
    
    
    return (
        <div>
            <label style={labelStyle}>{label}</label>
            <input type={type || "text"} onChange={onChange} style={ inputStyle } placeholder={placeholder} required />
        </div>
    );
}
