import { fetchData, postData, deleteData } from "./apiService";

export const fetchTeachers = async (idTeacher) => {
    return await fetchData('teachersubjectschool')
};

export const deleteTeacher = async (idTeacher) => {
    return await deleteData('teachersubjectschool', idTeacher)
};

export const postTeacher = async (data) => {
    return await postData('teachersubjectschool', data)
}
