import {useState, useEffect} from "react";

export default function useFetch(url, options = initialOptions) {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await fetch(url, options)
                const json = await res.json()
                setResponse(json)
            } catch (err) {
                setLoading(false)
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, []);
    return { response, error, loading }
}
