import { fetchData } from "./apiService";

export const fetchCourses = async () => {
    return await fetchData('courses')
};