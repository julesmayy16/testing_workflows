import React, { useState } from 'react';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    business_name: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    ssn: '',
    email: '',
    dob: '',
  });

  // Detecting if there is a change on the application
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const stateRegex = /^[A-Z]{2}$/;
    const ssnRegex = /^\d{9}$/;
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;

    // Check that every required field is filled out
    for (let key in formData) {
      if (key !== 'address2' && formData[key].trim() === '') {  // 'address2' is optional
        return false;
      }
    }

    // Validate specific fields with regex
    return (
      stateRegex.test(formData.state) &&
      ssnRegex.test(formData.ssn) &&
      dobRegex.test(formData.dob) &&
      formData.country === 'US'
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Form validation failed. Please ensure all fields are correctly filled.');
      return;
    }
    try {
      const response = await fetch('/submit', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input type="text" name="business_name" placeholder="Business Name" onChange={handleChange} required />
      <input type="text" name="address1" placeholder="Address Line 1" onChange={handleChange} required />
      <input type="text" name="address2" placeholder="Address Line 2" onChange={handleChange} />
      <input type="text" name="city" placeholder="City" onChange={handleChange} required />
      <input type="text" name="state" placeholder="State (e.g., NY)" onChange={handleChange} required />
      <input type="text" name="zip" placeholder="Zip Code" onChange={handleChange} required />
      <input type="text" name="ssn" placeholder="SSN (9 digits)" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="date" name="dob" placeholder="Date of Birth (YYYY-MM-DD)" onChange={handleChange} required />
      <button type="submit">Submit Application</button>
    </form>
  );
};

export default ApplicationForm;