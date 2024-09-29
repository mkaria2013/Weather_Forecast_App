import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import back from '../assets/back.svg';
import { API } from '../API/api.jsx';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  // Default form data structure
  const DefaultFormData = {
    name: '',
    username: '',
    country: null,
    state: null,
    city: null,
    language: 'English',
    personalMessage: '',
  };

  // State hooks for managing form data, countries, states, cities, error and success messages
  const [formData, setFormData] = useState(DefaultFormData);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch countries from the API when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(API.COUNTRY);
        const formattedCountries = response.data.map(country => ({
          value: country.id,
          label: country.name,
        }));
        setCountries(formattedCountries); // Set the countries state
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Failed to load countries. Please try again.'); // Set error message
      }
    };

    fetchCountries(); // Trigger the country fetch
  }, []);

  // Fetch states based on the selected country
  useEffect(() => {
    const fetchStates = async () => {
      if (formData.country) {
        try {
          const response = await axios.get(API.STATUS);
          const filteredStates = response.data.filter(state => state.country_id === formData.country.value);
          const formattedStates = filteredStates.map(state => ({
            value: state.id,
            label: state.name,
          }));
          setStates(formattedStates); // Set the states state
        } catch (err) {
          console.error('Error fetching states:', err);
          setError('Failed to load states. Please try again.'); // Set error message
        }
      } else {
        setStates([]); // Clear states if no country is selected
      }
    };

    fetchStates(); // Trigger the state fetch
  }, [formData.country]);

  // Fetch cities based on the selected state
  useEffect(() => {
    const fetchCities = async () => {
      if (formData.state) {
        try {
          const response = await axios.get(API.CITYS);
          const filteredCities = response.data.filter(city => city.state_id === formData.state.value);
          const formattedCities = filteredCities.map(city => ({
            value: city.id,
            label: city.name,
          }));
          setCities(formattedCities); // Set the cities state
        } catch (err) {
          console.error('Error fetching cities:', err);
          setError('Failed to load cities. Please try again.'); // Set error message
        }
      } else {
        setCities([]); // Clear cities if no state is selected
      }
    };

    fetchCities(); // Trigger the city fetch
  }, [formData.state]);

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle country selection change
  const handleCountrySelectChange = (selectedOption) => {
    setFormData(prevState => ({
      ...prevState,
      country: selectedOption,
      state: null, // Reset state and city when country changes
      city: null,
    }));
  };

  // Handle state selection change
  const handleStateSelectChange = (selectedOption) => {
    setFormData(prevState => ({
      ...prevState,
      state: selectedOption,
      city: null, // Reset city when state changes
    }));
  };

  // Handle city selection change
  const handleCitySelectChange = (selectedOption) => {
    setFormData(prevState => ({
      ...prevState,
      city: selectedOption,
    }));
  };

  // Handle form submission to update profile
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validation check for required fields
    if (!formData.name || !formData.username || !formData.country || !formData.state || !formData.city) {
      setError('Please fill out all required fields.');
      return; // Stop submission if validation fails
    }

    try {
      // Update profile via API
      await axios.post(API.UPDATEPROFILE, {
        ...formData,
        stateId: formData.state.value,
        cityId: formData.city.value,
      });
      setSuccessMessage('Profile updated successfully!'); // Set success message
      setError(''); // Reset error message
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.'); // Set error message
    }
  };

  return (
    <div className='font-montserrat'>
      <div className="bg-white bg-opacity-25 rounded-lg shadow relative m-10">
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Profile</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={() => navigate('/dashboard')}
          >
            <img src={back} alt="Back" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-6 gap-6">
              {/* Input for Name */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Enter Name"
                  required
                />
              </div>

              {/* Input for Username */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="username" className="text-sm font-medium text-gray-900 block mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="Enter Username"
                  required
                />
              </div>

              {/* Country Selector */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="text-sm font-medium text-gray-900 block mb-2">Country</label>
                <Select
                  value={formData.country}
                  onChange={handleCountrySelectChange}
                  options={countries}
                  placeholder="Select Country"
                  required
                />
              </div>

              {/* State Selector */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="state" className="text-sm font-medium text-gray-900 block mb-2">State</label>
                <Select
                  value={formData.state}
                  onChange={handleStateSelectChange}
                  options={states}
                  placeholder="Select State"
                  isDisabled={!formData.country}
                  required
                />
              </div>

              {/* City Selector */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="city" className="text-sm font-medium text-gray-900 block mb-2">City</label>
                <Select
                  value={formData.city}
                  onChange={handleCitySelectChange}
                  options={cities}
                  placeholder="Select City"
                  isDisabled={!formData.state}
                  required
                />
              </div>

              {/* Language Input */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="language" className="text-sm font-medium text-gray-900 block mb-2">Language</label>
                <input
                  type="text"
                  name="language"
                  id="language"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="English"
                  value={formData.language}
                  readOnly
                />
              </div>

              {/* Personal Message Input */}
              <div className="col-span-full">
                <label htmlFor="personalMessage" className="text-sm font-medium text-gray-900 block mb-2">Personal Message</label>
                <textarea
                  id="personalMessage"
                  name="personalMessage"
                  rows="6"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                  placeholder="Type here..."
                  value={formData.personalMessage}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Error and Success Messages */}
            {error && <p className="text-red-500 font-bold py-2 px-1">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
