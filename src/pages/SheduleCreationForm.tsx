import React, { useState } from "react";
import { useSelector } from "react-redux";
import { postTheDoctorshedule } from "../apis/adminAuthoritiesApi";
import './styles/sheduleCreationForm.css'

const ScheduleCreationForm: React.FC = () => {
  const token = useSelector((state:any)=>state.user.userDetails.token)
  const [doctorId, setDoctorId] = useState("");
  const [daySchedules, setDaySchedules] = useState<
    { day: string; time: string[] }[]
  >([
    { day: "SunDay", time: [] },
    { day: "Monday", time: [] },
    { day: "Tuesday", time: [] },
    { day: "Wednesday", time: [] },
    { day: "Thursday", time: [] },
    { day: "Friday", time: [] },
    { day: "Saturday", time: [] },
  ]);

  const handleDoctorIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorId(event.target.value);
  };

  const handleDayChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedDaySchedules = [...daySchedules];
    updatedDaySchedules[index].day = event.target.value;
    setDaySchedules(updatedDaySchedules);
  };

  const handleTimeChange = (
    dayIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
    timeIndex: number
  ) => {
    const updatedDaySchedules = [...daySchedules];
    const [hours, minutes] = (event.target.value).split(':');
    let period='am'
    let hour = parseInt(hours);
    
    if(hour>=12){
      period='pm';
    }
    if(hour>12){
      hour-=12;
    }
    else if(hour === 0){
      hour=12;
    }
    updatedDaySchedules[dayIndex].time[timeIndex] = `${hour}:${minutes} ${period}`;
    setDaySchedules(updatedDaySchedules);
  };

  const handleAddTimeSlot = (dayIndex: number) => {
    const updatedDaySchedules = [...daySchedules];
    updatedDaySchedules[dayIndex].time.push("");
    setDaySchedules(updatedDaySchedules);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const scheduleData = {
      doctor: doctorId,
      days: daySchedules,
    };
    console.log(scheduleData);
    postTheDoctorshedule(scheduleData,token)
    .then((res)=>{
      console.log("data posted successfully", res.data)
      alert(res.data.message)
    }).catch((error)=>{
      console.log("Error in post the data", error.message);
      alert(error.message)
    })
  };

  return (
    <div className="shedule-form-container">
    <form onSubmit={handleSubmit}>
      <div className="shedule-form-field">
      <label className="shedule-form-label">
        Doctor ID:
        <input type="text" className="shedule-form-input" value={doctorId} onChange={handleDoctorIdChange} placeholder="Please enter the Doctor Id"/>
      </label>
      </div>
      {daySchedules.map((daySchedule, dayIndex) => (
        <div className="shedule-form-field" key={dayIndex}>
          <label className="shedule-form-label">
            Day:
            <input
              className="shedule-form-input"
              type="text"
              value={daySchedule.day}
              onChange={(e) => handleDayChange(dayIndex, e)}
            />
          </label>

          {daySchedule.time.map((time, timeIndex) => (
            <div className="shedule-form-field" key={timeIndex}>
              <label className="shedule-form-label">
                Time:
                <input 
                  className="shedule-form-input"
                  type="time"
                  onChange={(e) => handleTimeChange(dayIndex, e, timeIndex)}
                />
              </label>
            </div>
          ))}

          <button type="button" className="add-time-btn" onClick={() => handleAddTimeSlot(dayIndex)}>
            Add Time Slot
          </button>
        </div>
      ))}

      <button type="submit" className="submit-btn">Submit</button>
    </form>
    </div>
  );
};

export default ScheduleCreationForm;
