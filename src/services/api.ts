
import axios from "axios";

interface CreateProjectParams {
    name: string;
}

export default class API {
    static BASE_URL = "http://localhost:3333/";

    static async createProject({ name }: CreateProjectParams){
        const createdProject = axios.post(this.BASE_URL + 'projects/', {
            name
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.error(error);
        });
    }

    static async getProjects(){

        const userProjects = axios.get(this.BASE_URL + 'projects/', {
            params:{
                ownerId: "clcxsutm50000j938pytsfypo"
            }
        }).then(response => {

            return response.data.projects;
        }).catch(error => {
            console.error(error);
        });

        return userProjects;
    }
}