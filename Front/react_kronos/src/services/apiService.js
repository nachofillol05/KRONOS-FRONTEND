// services/apiService.js

const API_BASE_URL = "http://127.0.0.1:8000/api";

const getToken = () => {
    return 'Token ' + localStorage.getItem('token');
}

const getSchoolId = () => {
    return sessionStorage.getItem('actual_school');
} 

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Algo salió mal");
  }
  return response.json();
};

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        'Authorization': getToken(),
        'School-ID': getSchoolId()
      }
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const saveData = async (endpoint, data, isPost) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: isPost ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "DELETE",
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};
