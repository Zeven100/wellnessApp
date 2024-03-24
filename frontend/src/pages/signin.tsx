import { Quote } from "../components/quote";
import { Auth } from "../components/auth";

export const Signin = () => {
    const containerStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr', // Two equal-width columns
        gridColumnGap: '20px',
    };

   

    const quoteContainerStyle: React.CSSProperties = {
        display: 'none',
    };

    const quoteContainerMdStyle: React.CSSProperties = {
        display: 'block',
    };

    return (
        <div style={containerStyle}>
            <div>
                <Auth type="signin" />
            </div>
            <div style={{ ...quoteContainerStyle, ...quoteContainerMdStyle }}>
                <Quote />
            </div>
        </div>
    );
};
