import { Quote } from "../components/quote";
import { Auth } from "../components/auth";

export const Signup = () => {
    const containerStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Two equal-width columns
        gridColumnGap: '20px', // Adjust the gap between columns as needed
        height : '100vh' 
    };

    const authContainerStyle: React.CSSProperties = {
        height : '100%'
    };

    const quoteContainerStyle: React.CSSProperties = {
        height : '100%'  
    };

    return (
        <div style={containerStyle}>
            <div style={authContainerStyle}>
                <Auth type="signup" />
            </div>
            <div style={quoteContainerStyle}>
                <Quote />
            </div>
        </div>
    );
};
