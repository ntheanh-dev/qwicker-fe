import { useCallback, useState } from "react"
import { urlAuthAPI } from "../configs/API"

export const useFetchPaginatedData = (access_token) => {
    const [data, setData] = useState({
        count: 0,
        links: {},
        results: []
    })
    const [isLoading, setIsLoading] = useState(false)
    const next = useCallback(async () => {
        if (data.links?.next) {
            setIsLoading(true)
            try {
                const res = await urlAuthAPI(access_token, data.links?.next).get()
                setData({
                    ...data,
                    links: res.data.links,
                    results: [...data.results, ...res.data?.results]
                })
                setIsLoading(false)
            } catch (err) {
                console.log(err)
                setIsLoading(false)
            }
        }
    })

    const previous = useCallback(async () => {
        if (data.links?.previous) {
            setIsLoading(true)
            try {
                const res = await urlAuthAPI(access_token, data.links?.previous).get()
                setData({
                    ...data,
                    links: res.data.links,
                    results: [...data?.results, ...res.data?.results]
                })
                setIsLoading(false)
            } catch (err) {
                console.log(err)
                setIsLoading(false)
            }
        }
    })

    return { results: data.results, setData, next, previous, isLoading }
}