import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/form.css';
import { useNavigate, useParams } from 'react-router-dom';

const ContactForm = () => {

    const { id } = useParams();
    const CREATE_URL = 'http://localhost:4000/contactInfo';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        address: ''
    });
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [addressError, setAddressError] = useState('');

    const navigate = useNavigate();
    const genderOptions = ['Male', 'Female', 'Other'];

    useEffect(() => {
        if (id) {
            axios.get(`${CREATE_URL}/${id}`)
                .then((res) => {
                    const { name, email, phone, gender, address } = res.data;
                    setFormData({ name, email, phone, gender, address });
                })
                .catch((err) => {
                    console.error('Error fetching item data:', err);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let isValid = true;

        setNameError('');
        setEmailError('');
        setPhoneError('');
        setGenderError('');
        setAddressError('');

        if (!formData.name) {
            setNameError('Name is required');
            isValid = false;
        }
        if (!formData.email) {
            setEmailError('Email is required');
            isValid = false;
        }
        if (!formData.phone) {
            setPhoneError('Phone is required');
            isValid = false;
        }
        if (formData.gender === 'Select Gender' || !formData.gender) {
            setGenderError('Gender is required');
            isValid = false;
        }
        if (!formData.address) {
            setAddressError('Address is required');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (id) {
                axios.put(`${CREATE_URL}/${id}`, formData)
                    .then((res) => {
                        console.log('Form data updated:', res.data);
                        navigate('/table');
                    })
                    .catch((err) => {
                        console.error('Error updating form:', err);
                    });
            } else {
                axios.post(CREATE_URL, formData)
                    .then((res) => {
                        console.log('Form data submitted:', res.data);
                        setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            gender: '',
                            address: ''
                        });
                    })
                    .catch((err) => {
                        console.error('Error submitting form:', err);
                    });
            }
        }
    };

    return (
        <div className='form-wrapper'>
            <div className='form-heading'>Information Form</div>
            <form className='form-content' onSubmit={handleSubmit}>
                <div className='name-container'>
                    <div className='name'>Name</div>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    {nameError && <div className='error'>{nameError}</div>}
                </div>
                <div className='email-container'>
                    <div className='name'>Email</div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {emailError && <div className='error'>{emailError}</div>}
                </div>
                <div className='phone-container'>
                    <div className='name'>Phone</div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                    {phoneError && <div className='error'>{phoneError}</div>}
                </div>
                <div className='gender-container'>
                    <div className='name'>Gender</div>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="" disabled>Select Gender</option>
                        {genderOptions.map((gender) => (
                            <option key={gender} value={gender}>
                                {gender.charAt(0).toUpperCase() + gender.slice(1)}
                            </option>
                        ))}
                    </select>
                    {genderError && <div className='error'>{genderError}</div>}
                </div>
                <div className='address-container'>
                    <div className='name'>Address</div>
                    <textarea name="address" value={formData.address} onChange={handleChange} />
                    {addressError && <div className='address-error'>{addressError}</div>}
                </div>
                <div className='button-container'>
                    {id ?
                        <button className='submit-btn' type="submit">Update</button>
                        : <button className='submit-btn' type="submit">Submit</button>
                    }
                    <button className='table-btn' onClick={() => navigate('/table')}>View Table</button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
