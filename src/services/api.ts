
import axios from "axios";

interface CreateProjectParams {
    name: string;
}

interface DeleteProjectParams {
    id: string;
}

type ProjectItem = {
    equipmentId: string
    power: number,
    amount: number
    roomId?: string,
    phasesNumber?: number,
    voltage?: number,
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

        return createdProject;
    }

    static async deleteProject({ id }: DeleteProjectParams){
        axios.delete(this.BASE_URL + 'projects/' + id).then(response => {
            console.log("Instalação deletada com sucesso!");
            return true;
        }).catch(error => {
            console.error(error);
        });
    }

    static async createProjectItems({ projectItems, projectId }){

        try {
            let response = await axios.post(this.BASE_URL + 'projects/' + projectId + '/items', {
                projectItems, projectId
            })
            
            return response.data;
        }
        catch(error){
            return {
                error: true,
                message: error.response.data.error
            }
        }
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

    static async getProjectById(id: string){
        const project = await axios.get(this.BASE_URL + 'projects/' + id)
        .then(response => {
            return response.data.project;
        }).catch(error => {
            console.error(error);
        });

        return project;
    }

    static async getProjectItems(projectId: string){
        const result = await axios.get(this.BASE_URL + "projects/" + projectId + "/items")
        
        return ((result && result.data && result.data.projectItems) || []);
    }
}