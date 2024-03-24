import { Link } from "react-router-dom";
export const Landing = () => {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        background: "linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(0,0,0,0.8493522408963585) 100%)",
        height : '100vh',
        width : '100vw',
        padding : '2rem'
    };

    const topDivStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: "linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(0,0,0,0.8493522408963585) 100%)",

        padding: '2rem',
        zIndex: 999,
    };

    const buttonContainerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight:'5rem'
        
    };

    const buttonStyle: React.CSSProperties = {
        marginLeft: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
    };

    const contentContainerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5rem', // Adjust as needed
    };

    const imageStyle: React.CSSProperties = {
        marginRight: '2rem',
        maxWidth: '50%',
        height: 'auto',
    };

    const quoteContainerStyle: React.CSSProperties = {
        maxWidth: '50%',
        textAlign: 'left',
        fontStyle: 'italic',
    };

    const quoteStyle: React.CSSProperties = {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#333',
    };

    const authorStyle: React.CSSProperties = {
        marginTop: '1rem',
        fontSize: '1.5rem',
        color: '#666',
    };

    return (
        <div style={{background : "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(40,42,43,0.9305847338935574) 100%, rgba(0,212,255,1) 100%)"}}>
            <div style={topDivStyle}>
                <div style={buttonContainerStyle}>
                    <Link to={'/signup'} >
                    <button style={buttonStyle}>Sign Up</button></Link>
                    <Link to={'/signin'}>
                    <button style={buttonStyle}>Sign In</button></Link>
                </div>
            </div>
            <div style={containerStyle}>
                <div style={contentContainerStyle}>
                <img src="/landing.png" alt="Wellness App" style={imageStyle} />


                    <div style={quoteContainerStyle}>
                        <div style={quoteStyle}>
                            "Elevate Your Mind, Transform Your Life: Read, Reflect, and Rise with Our Wellness App."
                        </div>
                        <div style={authorStyle}>~ Satvik Jain, Founder</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
