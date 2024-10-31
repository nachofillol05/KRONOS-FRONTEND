import { fetchData, postData } from './apiService'


export const fetchSubjects = async (start_time, end_time, teacher, name) => {
    const params = {
        ...(teacher && { teacher }),
        ...(name && { name }),
        ...(start_time && { start_time }),
        ...(end_time && { end_time })
    }
    return await fetchData('subjects', params)
};

export const fetchFileSubjects = async (params) => {
    return await fetchData('subjects', params)
};


export const postSubject = async (data) => {
    return await postData('subjects', data)
};

export const postSubjectInCourse = async (data) => {
    return await postData('coursesubjects', data)
};