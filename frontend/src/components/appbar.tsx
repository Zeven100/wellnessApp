import { Avatar } from "./avatar";
import { Link } from "react-router-dom";

export const Appbar = () => {
    return (
        <div style={{background : 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(52,46,46,0.8493522408963585) 100%)'}}>
            <div style={{ display: 'flex', width: '100vw', justifyContent: 'space-between', alignItems: 'center', padding: '20px', margin : '0px'}}>
                <div style={{ display: 'flex' }}>
                    <Link to={'/'} style={{ textDecoration: 'none'  }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '800',  color : '#ECD581' }}>WellnessHut</div>
                    </Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', paddingRight : '50px' }}>
                    <Link to={"/publish"} style={{ textDecoration: 'none' }}>
                        <button type="button" style={{ outline: 'none', color: 'white', backgroundColor: '#34D399', cursor: 'pointer', borderRadius: '1.25rem', fontSize: '0.875rem', padding: '0.5rem 1.25rem', border: 'none', transition: 'background-color 0.3s', fontFamily: 'inherit' }}>Publish</button>
                    </Link>
                    <Avatar authorName={"Satvik"} size="9"/>
                </div>
            </div>
        </div>
    );
}
