import react from 'react';
import { useParams } from 'react-router-dom';
export default function User(){
    let { username } = useParams();
    return(
        <div>
            <h1>User page for {username}</h1>
        </div>
    )
}