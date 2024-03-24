export const Quote = () => {
    const quoteStyle: React.CSSProperties = {
        height: '100%', 
        background: "linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(0,0,0,0.8493522408963585) 100%)", 
        display:'flex',
        flexDirection : 'column',
        justifyContent : 'center' ,
        paddingLeft : '20px',
        fontSize: '25px', // Increase font size
        fontWeight: 'bold', // Make font bold
    };
    const org : React.CSSProperties = {
        fontSize : '15px',
        fontWeight : 'lighter',
        color : 'grey'
    }

    return <div style={quoteStyle}>
    <div style={{color : '#ECD581'}}> "Health is a state of complete physical, mental, and social well-being, and not merely the absence of disease or infirmity"</div>
    <div style={org}>
         World Health Organization
    </div>
    </div>
}
