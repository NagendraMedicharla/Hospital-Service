import { Stack, Pagination, TableContainer, Table, TableHead, TableCell, TableRow, Paper, TableBody} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getQualifications } from "../apis/adminAuthoritiesApi";
import "./styles/displayQualifications.css";

interface Qualification {
  id: string;
  degree: string;
  description: string;
  created_at: string;
  updated_at: string;
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

const DisplayQualifications: React.FC = () => {
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [pagination, setPagination] = useState<Paginations | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()

  useEffect(() => {
    fetchQualifications(currentPage);
  }, [currentPage]);

  const handleChange: any = (event: any, value: number) => {
    setCurrentPage(value);
    console.log(typeof value);
  };

  const handleCreateDoctorBtn = (id:any)=>{
    navigate('/createDoctor', {state:{qualificationId:id}})
  }

  const fetchQualifications = async (page: number) => {
    try {
      const response = await getQualifications(page);
      setQualifications(response.data.qualifications);
      setPagination(response.data.pagination);
    } catch (error: any) {
      console.error("Error fetching qualifications:", error.message);
    }
  };

  return (
    <div className="display-qualification-container">
      <h1>Qualifications</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Qualification ID</TableCell>
              <TableCell>Degree</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {qualifications.length===0? <p style={{color:'red'}}>No records found</p> : qualifications?.map((qualification, index) => (
              <TableRow key={index}>
                <TableCell>{qualification.id}</TableCell>
                <TableCell>{qualification.degree}</TableCell>
                <TableCell>{qualification.description}</TableCell>
                <TableCell><button className="qualification-button" onClick={()=>handleCreateDoctorBtn(qualification.id)}>Create Doctor</button></TableCell>
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

export default DisplayQualifications;
