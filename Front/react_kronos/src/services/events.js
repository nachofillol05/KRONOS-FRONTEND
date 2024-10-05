import { fetchData, postData, deleteData } from "./apiService"

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
    return await deleteData("events/affiliated/", {event_id: event_id})
}

export const createEvent = async (data) => {
    return await postData('events/', data)
}

export const fetchRoles = async () => {
    return await fetchData('roles')
}