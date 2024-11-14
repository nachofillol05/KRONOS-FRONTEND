import { fetchData, postData, deleteData, putData } from "./apiService"

export const fetchTypesEvent = async () => {
    return await fetchData("typeevent")
}

export const fetchEvents = async (role, date, eventType, name) => {
    const params = {
        role: role,
        maxDate: date,
        eventType: eventType,
        name: name
    }
    return await fetchData("events", params)
}

export const affiliateEvent = async (event_id) => {
    return await postData("events/affiliated/", {event_id: event_id})
}

export const desaffiliateEvent = async (event_id) => {
    return await deleteData("events/affiliated", null, {event_id: event_id})
}

export const createEvent = async (data) => {
    return await postData('events/', data)
}

export const updateEvent = async (pk, data) => {
    return await putData(`events/${pk}/`, data)
}

export const deleteEvent = async (pk, data = null) => {
    return await deleteData('events', pk, data)
}

export const fetchRoles = async () => {
    return await fetchData('roles')
}