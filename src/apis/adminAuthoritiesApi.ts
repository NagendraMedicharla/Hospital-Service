import axios, { AxiosResponse } from 'axios';
 
interface PostData {
  degree: string;
  description: string;
}
 
const API_URL = 'https://psl-test2-b8593d29856b.herokuapp.com/api/v1';


export const postTheQualification = async (data: PostData, token:string): Promise<AxiosResponse> => {
  try {
const response = await axios.post(`${API_URL}/qualifications`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error:any) {
    throw error.response.data
  }
};



export const getQualifications = async (page:any) =>{
    try{
        const response = await axios.get(`${API_URL}/qualifications?page=${page}`);
        return response;
    }catch (error:any) {
      throw error.response.data
    }
}


export const postTheDoctor = async (data:any, token:string): Promise<AxiosResponse> => {
  try {
const response = await axios.post(`${API_URL}/doctor`, {"doctor":data}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error:any) {
    throw error.response.data
  }
};


export const getDoctors = async (page:number, token:string) =>{
  try{
      const response = await axios.get(`${API_URL}/doctors?page=${page}`,{
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


export const postTheDoctorshedule = async (data:any, token:string): Promise<AxiosResponse> => {
  try {
const response = await axios.post(`${API_URL}/schedules`, {"schedule":data}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error:any) {
    throw error.response.data
  }
};


export const postThe = async (data:any, token:string): Promise<AxiosResponse> => {
  try {
const response = await axios.post(`${API_URL}/doctor`, {"doctor":data}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error:any) {
    throw error.response.data
  }
};

