import { Link } from "react-router-dom";
import { Avatar } from "./avatar";
export const TaskBar = () => {
    const topDivStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background : 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(52,46,46,0.8493522408963585) 100%)',
        
        // Adjusted padding for better spacing
        
        display: 'flex',
        justifyContent: 'space-between', // Centered horizontally
        alignItems: 'center', // Centered vertically
        zIndex: 999,
        fontWeight : 'bold' 
    };

    const buttonContainerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center', // Centered vertically
        paddingRight : '3rem'
    };

    const buttonStyle: React.CSSProperties = {
        marginLeft: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease', 
    };

    const buttonHoverStyle: React.CSSProperties = {
        backgroundColor: '#45a049', // Darker shade on hover
    };

    return (
        <div style={topDivStyle}>
            <div style={{ display: 'flex', width: '100vw', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                <div style={{ display: 'flex' }}>
                    <Link to={'/'} style={{ textDecoration: 'none' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '800', color : '#ECD581' }}>WellnessHut</div>
                    </Link>
                </div>
                <div style={buttonContainerStyle}>
                <Link to="https://www.markdownguide.org/getting-started/">
                <button style={{...buttonStyle, ...buttonHoverStyle } }>Markdown's Guide</button></Link>
                    <Avatar authorName={"Satvik"} size="9"/>
                </div>
            </div>
        </div>
    );
};
