import { Stack, Pagination, TableContainer, Table, TableHead, TableCell, TableRow, Paper, TableBody} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDoctors } from "../apis/adminAuthoritiesApi";
import "./styles/displayQualifications.css";

interface Doctors {
  id: string;
  first_name:string;
  last_name:string;
  contact_number:string;
  email:string;
  qualifications:Array<object>
}

interface Paginations {
  page: number;
  items: number;
  count: number;
  from: number;
  last: number;
  next: number;
  pages: number;
  to: number;
}

const DoctorsList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctors[]>([]);
  const [pagination, setPagination] = useState<Paginations | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const token = useSelector((state:any)=>state.user.userDetails.token)

  useEffect(() => {
    fetchDoctors(currentPage);
  }, [currentPage]);

  const handleChange: any = (event: any, value: number) => {
    setCurrentPage(value);
    console.log(typeof value);
  };

  const fetchDoctors = async (page: number) => {
    try {
      const response = await getDoctors(page,token);
      setDoctors(response.data.doctors);
      setPagination(response.data.pagination);
    } catch (error: any) {
      console.error("Error fetching qualifications:", error.message);
    }
  };

  return (
    <div className="display-qualification-container">
      <h1>Doctors List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Doctor Id</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Ph.no</TableCell>
                <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.length===0? <p style={{color:'red'}}>No records found</p> : doctors?.map((doctor, index) => (
              <TableRow key={index}>
                <TableCell>{doctor.id}</TableCell>
                <TableCell>{doctor.first_name}</TableCell>
                <TableCell>{doctor.last_name}</TableCell>
                <TableCell>{doctor.contact_number}</TableCell>
                <TableCell>{doctor.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination
          count={pagination?.pages}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
};

export default DoctorsList;
