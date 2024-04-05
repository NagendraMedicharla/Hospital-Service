import axios from "axios";

const baseURL = 'https://psl-test2-b8593d29856b.herokuapp.com/api/v1'


const axiosInstance = axios.create({
    baseURL,
    timeout:5000,
});


export const login = async (email:string, password:string, role:string) =>{
    try{
        const response = await axiosInstance.post('/session', {'user':{email, password, role}});
        return response.data;
    }catch(error:any){
        throw error.response.data;
    }
}

export const logout = async(token:any)=>{
    try{
        const response = await axiosInstance.delete('/session',{ headers: {"Authorization" : `Bearer ${token}`} });
        return response.data;
    }catch(error:any){
        throw error.response.data;
    }
}