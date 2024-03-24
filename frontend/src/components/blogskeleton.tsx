import { Appbar } from "./appbar";

export const BlogSkeleton = () => {
    const containerStyle: React.CSSProperties = {background : 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,0.8493522408963585) 100%)', height : '100%' , width : '100%'};

    const innerContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '48rem', // Tailwind max-w-3xl
        paddingTop: '0.5rem', // Tailwind pt-2
        width: '100%',
        minWidth: '24rem',
        backgroundColor : 'transparent' // Tailwind min-w-md
    };

    return (
        <div style={containerStyle}>
            <Appbar />
            <div style={innerContainerStyle}>
                <OneSkeleton />
                <OneSkeleton />
                <OneSkeleton />
                <OneSkeleton />
                <OneSkeleton />
                <OneSkeleton />
                <OneSkeleton />
                <OneSkeleton />
            </div>
        </div>
    );
};

function OneSkeleton() {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '1.25rem',
        backgroundColor: 'transparent'
    };

    const skeletonStyle: React.CSSProperties = {
        height: '0.75rem', // Adjusted to match the height of h-4, h-2 in Tailwind
        backgroundColor : '#ECD581',
        opacity : '25%', 
        borderRadius: '9999px', // Tailwind rounded-full
        marginBottom: '0.625rem', // Adjusted to match the mb-2.5 in Tailwind
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '1.25rem', // Tailwind text-xl
        fontWeight: '700', // Tailwind font-bold
        paddingTop: '0.5rem', // Adjusted to match the pt-2 in Tailwind
        paddingBottom: '0.25rem', // Adjusted to match the pb-1 in Tailwind
    };

    const contentStyle: React.CSSProperties = {
        fontFamily: 'serif', // Tailwind font-serif
        paddingBottom: '0.5rem', // Adjusted to match the pb-2 in Tailwind
    };

    const readTimeStyle: React.CSSProperties = {
        color: '#718096', // Tailwind text-slate-500
        paddingBottom: '0.25rem', // Adjusted to match the pb-1 in Tailwind
    };

    return (
        <div role="status" style={containerStyle}>
            <div style={skeletonStyle}></div>
            <div style={{ ...skeletonStyle, width: '80%' }}></div>
            <div style={skeletonStyle}></div>
            <div style={{ ...skeletonStyle, width: '60%' }}></div>
            <div style={titleStyle}></div>
            <div style={contentStyle}></div>
            <div style={readTimeStyle}></div>
            <hr />
        </div>
    );
}
