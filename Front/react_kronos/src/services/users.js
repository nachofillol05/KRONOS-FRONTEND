import { fetchData, postData } from "./apiService";

export const fetchProfile = async () => {
  return await fetchData("profile");
};

export const fetchMySchools = async () => {
  return await fetchData("user_schools");
};

export const fetchMyRoles = async () => {
  return await fetchData("school/myroles");
};
