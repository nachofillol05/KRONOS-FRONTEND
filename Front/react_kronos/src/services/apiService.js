// services/apiService.js

const STATUS_NO_CONTENT = 201

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

  if (response.status === STATUS_NO_CONTENT) {
    return null;
  }

  // verifica si tiene contenido
  const contentType = response.headers.get("Content-Type");
  if (!contentType) {
    return null
  } 

  return response.json();
};

export const fetchData = async (endpoint, params={}) => {
  try {
    const url = new URL(`${API_BASE_URL}/${endpoint}`);

    // Armar los filtros
    Object.keys(params).forEach(key => {
      if (params[key]) {
        url.searchParams.append(key, params[key]);
      }
    });
    
    const response = await fetch(url.toString(), {
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

export const postData = async (endpoint, data) => {
  return saveData(endpoint, data, "POST");
}

export const putData = async (endpoint, data) => {
  return saveData(endpoint, data, "PUT");
}

export const saveData = async (endpoint, data, method) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        'Authorization': getToken(),
        'School-ID': getSchoolId()
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (endpoint, pk, data = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}/${pk}/`, {
      method: "DELETE",
      headers: {
        'Authorization': getToken(),
        'School-ID': getSchoolId(),
        "Content-Type": "application/json" 
      },
      ...(data && { body: JSON.stringify(data) })
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const fetchLogin = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
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
