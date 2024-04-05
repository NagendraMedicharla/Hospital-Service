import axios from 'axios';
 
const API_URL = 'https://psl-test2-b8593d29856b.herokuapp.com/api/v1';

export const getDoctorSchedulesById = async (page:number, token:string,id:string) =>{
    try{
        const response = await axios.get(`${API_URL}/doctors/${id}/schedules?page=${page}`,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return response;
    }catch (error:any) {
      throw error.response.data
    }
  }


  export const getAppointments = async (page:number, token:string) =>{
    try{
        const response = await axios.get(`${API_URL}/doctor/appointments?page=${page}`,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return response;
    }catch (error:any) {
      throw error.response.data
    }
}