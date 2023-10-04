import { useEffect, useState } from "react"

export const useAxios = (url) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url)
                const data = await response.json()
                setData(data)
            } catch (error) {
                alert(error.message)
            }
        }
        fetchData()
    }, [url])
    return [data]
}