import { BlogType } from "../hooks/index";
import { Avatar } from "./avatar";
import Markdown from "react-markdown";
export const FullBlog = ({ blog }: { blog: BlogType }) => {
    const containerStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        padding: '0 2.5rem', // Tailwind px-10
        background : 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(52,46,46,0.8493522408963585) 100%)'
    };

    const leftColumnStyle: React.CSSProperties = {
        gridColumn: 'span 7 / span 7',
        display: 'flex',
    };

    const leftContentStyle: React.CSSProperties = {
        flex: '1',
        padding: '1rem', // Tailwind pl-5 pt-4
        width: '100%',
        background: 'transparent',
        color : '#E6CB5F'
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '1.875rem', // Tailwind text-3xl
        fontWeight: '800', // Tailwind font-extrabold
    };

    const contentStyle: React.CSSProperties = {
        fontSize: '1rem', // Tailwind text-l
        fontFamily: 'serif', // Tailwind font-serif
        paddingTop: '0.5rem', // Tailwind pt-4
    };

    const rightColumnStyle: React.CSSProperties = {
        gridColumn: 'span 5 / span 5',
        background: 'transparent',
        opacity : '100%', 
        display: 'flex',
        flexDirection:'column',
        padding: '1rem', 
    };

    const authorDescriptionStyle: React.CSSProperties = {
        fontSize: '1rem', // Tailwind text-base
        fontFamily: 'serif', // Tailwind font-serif
        color : '#E6CB5F', 
    };

    return (
        <div style={containerStyle}>
            <div style={leftColumnStyle}>
                <div style={leftContentStyle}>
                    <div style={titleStyle}>{blog.title}</div>
                    <div style={contentStyle}><Markdown>{blog.content}</Markdown></div>
                </div>
            </div>
            <div style={rightColumnStyle}>
                <div style={{ display: 'flex' }}>
                    <Avatar authorName={blog.author.name || "Anonymous"} size="6" />
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', paddingLeft: '0.5rem',color : '#E6CB5F' }}>{blog.author.name || "Anonymous"}</div>
                </div>
                <div style={authorDescriptionStyle}>Description about the author</div>
            </div>
        </div>
    );
};
