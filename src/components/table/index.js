import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/table.css';
import DeleteIcon from '../../../src/images/deleteIcon.png';
import EditIcon from '../../../src/images/editIcon.png';
import BackIcon from '../../../src/images/backIcon.png';
import { useNavigate } from 'react-router-dom';

const TableDetails = () => {
    const [tableData, setTableData] = useState([]);

    const GET_URL = 'http://localhost:4000/contactInfo';
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(GET_URL)
            .then((res) => {
                setTableData(res.data);
                console.log('Data:', res.data);
            })
            .catch((err) => {
                console.error('Error submitting form:', err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${GET_URL}/${id}`)
            .then((res) => {
                console.log('Record deleted:', res.data);
                setTableData(tableData.filter(item => item._id !== id));
            })
            .catch((err) => {
                console.error('Error deleting record:', err);
            });
    };

    const handleEdit = (id) => {
        navigate(`/${id}`);
    };

    return (
        <div className='table-wrapper'>
            <div className='table-top-wrapper'>
                <div className='table-heading-wrapper'>
                    <img className='back-icon' onClick={() => navigate('/')} src={BackIcon} alt='back-icon' />
                    <div className='table-heading'>Table of Information</div>
                </div>
                <button className='table-heading-right-button' onClick={() => navigate('/')}>Add Records</button>
            </div>
            <div className='table-container'>
                <table className='table-content'>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.gender}</td>
                                <td>{item.address}</td>
                                <td>
                                    <img
                                        onClick={() => handleEdit(item._id)}
                                        className='image-edit'
                                        src={EditIcon}
                                        alt="Edit"
                                    />
                                    <img
                                        onClick={() => handleDelete(item._id)}
                                        className='image-del'
                                        src={DeleteIcon}
                                        alt="Delete"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableDetails;
