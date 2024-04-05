import {
  Stack,
  Pagination,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getDoctorSchedulesById } from "../apis/doctorApi";

interface DoctorsShedule {
  id: string;
  date: string;
  created_at: string;
  updated_at: string;
  is_holiday: boolean;
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

const DoctorScheduleList: React.FC = () => {
  const [schedules, setschedules] = useState<DoctorsShedule[]>([]);
  const [pagination, setPagination] = useState<Paginations | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const userDetails = useSelector((state: any) => state.user.userDetails);

  useEffect(() => {
    fetchDoctorschedules(currentPage);
  }, [currentPage]);

  const handleChange: any = (event: any, value: number) => {
    setCurrentPage(value);
    console.log(typeof value);
  };

  const fetchDoctorschedules = async (page: number) => {
    try {
      const response = await getDoctorSchedulesById(
        page,
        userDetails.token,
        userDetails.id
      );
      setschedules(response.data.schedules);
      setPagination(response.data.pagination);
    } catch (error: any) {
      console.error("Error fetching schedules:", error.message);
    }
  };

  return (
    <div>
      <h1 style={{fontSize:'25px'}}>Doctors List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Date of schedule</TableCell>
              <TableCell>Holiday</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules.length===0? <p style={{color:'red'}}>No records found</p> :schedules?.map((schedule, index) => (
              <TableRow key={index}>
                <TableCell>{schedule?.id}</TableCell>
                <TableCell>{schedule?.date}</TableCell>
                <TableCell>{schedule?.is_holiday}</TableCell>
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

export default DoctorScheduleList;
