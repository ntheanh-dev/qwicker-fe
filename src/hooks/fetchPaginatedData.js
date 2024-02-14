import { useCallback, useState } from "react"
import { urlAuthAPI } from "../configs/API"

export const useFetchPaginatedData = (access_token) => {
    const [data, setData] = useState({
        count: 0,
        links: {},
        results: []
    })

    const next = useCallback(async () => {
        if (data.links?.next) {
            try {
                const res = await urlAuthAPI(access_token, data.links?.next).get()
                setData({
                    ...data,
                    links: res.data.links,
                    results: [...data.results, ...res.data?.results]
                })
            } catch (err) {
                console.log(err)
            }
        }
    })

    const previous = useCallback(async () => {
        if (data.links?.previous) {
            try {
                const res = await urlAuthAPI(access_token, data.links?.previous).get()
                setData({
                    ...data,
                    links: res.data.links,
                    results: [...data?.results, ...res.data?.results]
                })
            } catch (err) {
                console.log(err)
            }
        }
    })

    return { results: data.results, setData, next, previous }
}