import { fetchData } from "./apiService"

export const fetchProfile = async () => {
    return await fetchData("profile")
}