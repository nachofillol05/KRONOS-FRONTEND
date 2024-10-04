import { fetchData } from "./apiService"

export const fetchTypeEvent = async () => {
    return await fetchData("typeevent")
}