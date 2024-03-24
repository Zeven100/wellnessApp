export function Circle() {
    const circleStyle: React.CSSProperties = {
        height: '0.25rem', // Tailwind h-1
        width: '0.25rem', // Tailwind w-1
        borderRadius: '50%', // Tailwind rounded-full
        backgroundColor: '#718096', // Tailwind bg-slate-500
    };

    return <div style={circleStyle}></div>;
}
