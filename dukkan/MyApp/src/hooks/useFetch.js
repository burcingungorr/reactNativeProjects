import { useEffect, useState } from "react";
import axios from 'axios';

function useFetch(url){
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
    
 
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        useEffect(()=>{
            fetchData();
    },[]);

    return { error, loading, data };
}
export default useFetch;