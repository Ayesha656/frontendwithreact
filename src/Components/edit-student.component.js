// src/Components/EditStudent.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StudentForm from './StudentForm';

const EditStudent = () => {
  const { id } = useParams(); // Access route parameters using useParams hook
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    rollno: ''
  });

  useEffect(() => {
    // Fetch student data if ID is available
    if (id) {
      axios.get(`http://localhost:4000/students/update-student/${id}`)
        .then(res => {
          setFormValues(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [id]); // Dependency: id

  const onSubmit = studentObject => {
    // Update student data if ID is available
    if (id) {
      axios.put(`http://localhost:4000/students/update-student/${id}`, studentObject)
        .then(res => {
          if (res.status === 200)
            alert('Student successfully updated');
          else
            Promise.reject();
        })
        .catch(err => alert('Something went wrong'));
    }
  };

  return (
    <div>
      {formValues && (
        <StudentForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
          Update Student
        </StudentForm>
      )}
    </div>
  );
};

export default EditStudent;
