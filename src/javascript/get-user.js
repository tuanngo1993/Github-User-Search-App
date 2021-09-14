import axios from "axios";
import {NoResults} from "./no-results";

export async function GetUser(user = "tuanngo1993") {
    try {
        const response = await axios.get(`https://api.github.com/users/${user}`);
        NoResults();
        return response.data;
    } catch (error) {
        NoResults(error);
    }
}