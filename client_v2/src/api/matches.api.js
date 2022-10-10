import axios from 'axios';

const API = "http://localhost:4000/"

export const getEventMatches = async (event_id) => {
    return await axios.get(API + "matches/" + event_id);
}

export const getMatch = async (id) => {
    return await axios.get(API + "match/" + id);
}

export const createMatchRequest = async (event_id, match) => {
    return await axios.post(API + "create_match/" + event_id, match);
}

export const updateMatchRequest = async (params, id) => {
    return await axios.put(API + "update_match/" + id, params);
}

export const deleteMatchRequest = async (id) => {
    return await axios.delete(API + "delete_match/" + id);
}