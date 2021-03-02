import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import { urlApi } from "../../config";
import useFetch from "../../lib/useFetch";


const RecentPage = () => {    
    const {response, error, loading} = useFetch(urlApi() + 'recent.json', {});
    // console.log(response, error, loading);

    if (loading || response == null) {
        return <p>Loading...</p>
    } else {
        return <>
            <h1>Recent Articles</h1>
            <ul>{response.data.items.map(i => <li><Link to={i.path}>{i.name}</Link></li>)}</ul>
        </>
    }
}

export default RecentPage;