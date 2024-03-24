import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import matter from 'gray-matter';
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { Link } from "react-router-dom";

export const PublishComp: React.FC = () => {
    const [markdown, setMarkdown] = useState<string>('');
    const [leftWidth, setLeftWidth] = useState<number>(300);
    const [middleLeft, setMiddleLeft] = useState<number>(0);
    const rightRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [resizing, setResizing] = useState<boolean>(false);
    const [resizeStartX, setResizeStartX] = useState<number>(0);
    const [title, setTitle] = useState<string>("");

    const handleMarkdownChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdown(e.target.value);
    };

    useEffect(() => {
        if (rightRef.current) {
            rightRef.current.scrollTop = rightRef.current.scrollHeight;
        }
    }, [markdown]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setResizing(true);
            } else {
                setResizing(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const renderCodeBlock = ({ node, inline, className, children, ...props }: any) => {
        const match = /language-(\w+)/.exec(className || '');
        if (!inline && match) {
            return (
                <SyntaxHighlighter style={materialDark} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
            );
        }
        return <code className={className} {...props}>{children}</code>;
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setResizing(true);
        setResizeStartX(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!resizing) return;
        const diff = e.clientX - resizeStartX;

        setLeftWidth(leftWidth + diff);
        setMiddleLeft(middleLeft + diff);

        setResizeStartX(e.clientX);
    };

    const handleMouseUp = () => {
        setResizing(false);
    };

    const handlePublish = async () => {
        const token = localStorage.getItem('token');
        if (title && markdown) {
            try {
                const res = await axios.post(`${BACKEND_URL}/api/v1/blog`,
                    {
                        title: title,
                        content: markdown
                    },
                    {
                        headers: {
                            Authorization: `${token}`
                        }
                    }
                );
                if (res.status === 200) {
                    alert("Article published");
                }
            } catch (error) {
                console.error("Error publishing article: ", error);
            }
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!resizing) return;
            const diff = e.clientX - resizeStartX;

            setLeftWidth(prevWidth => prevWidth + diff);
            setMiddleLeft(prevLeft => prevLeft + diff);

            setResizeStartX(e.clientX);
        };

        const handleMouseUp = () => {
            setResizing(false);
        };

        if (resizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [resizing, resizeStartX]);

    const left: React.CSSProperties = {
        height: "100%",
        width: `${leftWidth}px`,
        backgroundColor: "#eeeee4", // Light gray
        padding: "1rem",
        overflowY: "auto"
    };

    const middle: React.CSSProperties = {
        height: "100%",
        width: `5px`,
        cursor: "ew-resize",
        backgroundColor: "#f0f0f0" // Light gray
    };

    const right: React.CSSProperties = {
        height: "100%",
        width: `calc(100% - ${leftWidth}px - 5px)`,
        backgroundColor: "#eeeee4", // White
        overflowY: "auto"
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
        width: '10%'
    };

    const buttonHoverStyle: React.CSSProperties = {
        backgroundColor: '#45a049',
    };

    return (
        <div style={{ display: "flex", flexDirection: 'column', height: "100%", width: '100%' }}>
            <label style={{ margin: "0.5rem 1rem", color: "#333", fontWeight: "bold" }}>Give your Blog a Title</label>
            <input type="text" placeholder="Title of the Blog" onChange={(e) => setTitle(e.target.value)} style={{ margin: "0.5rem 1rem", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "0.25rem" }} />
            <div style={{ display: "flex", height: "90%", width: '100%' }}>
                <textarea ref={textareaRef} style={left} onChange={handleMarkdownChange}></textarea>
                <div
                    style={middle}
                    onMouseDown={handleMouseDown}
                ></div>
                <div ref={rightRef} style={right}><Markdown remarkPlugins={[remarkGfm]} components={{ code: renderCodeBlock }}>{markdown}</Markdown></div>
            </div>
            <div style={{ paddingTop: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               
                
                <button onClick={handlePublish} style={{ ...buttonStyle, ...buttonHoverStyle }}>Publish</button>
            </div>
        </div>
    );
};
