import { Link } from "react-router-dom";
import { Avatar } from "./avatar";
import { Circle } from "./circle";

interface BlogCardDetails {
    id: number;
    authorName: string;
    title: string;
    content: string;
    Date : number ;
    Month : number ;
    Year : number ;
}

export function BlogCard({ id, authorName, title, content, Date , Month , Year }: BlogCardDetails) {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '1.25rem', 
        background : 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(52,46,46,0.8493522408963585) 100%)'
    };

    const authorContainerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '0.5rem', 
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '1.25rem', // Tailwind text-xl
        fontWeight: '700', // Tailwind font-bold
        paddingTop: '0.75rem', // Tailwind pt-2
        paddingBottom: '0.25rem', // Tailwind pb-1
        color : '#E6CB5F'
    };  

    const contentStyle: React.CSSProperties = {
        fontFamily: 'serif', // Tailwind font-serif
        paddingBottom: '0.5rem', // Tailwind pb-2
        color : '#E6CB5F'
    };

    const readTimeStyle: React.CSSProperties = {
        color: '#718096', 
        paddingBottom: '0.25rem', // Tailwind pb-1
    };

    return (
        <Link to={`blog/${id}`} style={{ textDecoration: 'none' }}>
            <div style={containerStyle}>
                <div style={authorContainerStyle}>
                    <Avatar authorName={authorName} size="6" />
                    <div style={{ fontWeight: '600' , paddingLeft : '5px',paddingRight : '5px', color : '#ECD581'}}>{authorName}</div>
                    <Circle />
                    <div style={{ color: 'grey', paddingLeft : '5px' }}>{Date}/{Month}/{Year}</div>
                </div>
                <div style={titleStyle}>{title}</div>
                <div style={contentStyle}>{content.substring(0, 190)}...</div>
                <div style={readTimeStyle}>{Math.ceil(content.length / 100)} Minute(s) read</div>
                <hr />
            </div>
        </Link>
    );
}
