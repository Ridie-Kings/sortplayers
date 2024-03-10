import { useState } from 'react';
import StarRating from './Star.jsx';
import Rating from '@mui/material/Rating';

const Form = () => {
    const [formData, setFormData] = useState({
        playerName: '',
        actualRating: 0,
        potentialRating: 0,
        age: '',
        salary: ''
    });

    const [tableData, setTableData] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRatingChange = (newValue, fieldName) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [fieldName]: newValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTableData([...tableData, formData]);
        setFormData({
            playerName: '',
            actualRating: 0,
            potentialRating: 0,
            age: '',
            salary: ''
        });
    };

    const handleEdit = (index) => {
        const editedData = tableData[index];
        setFormData(editedData);
        setTableData(tableData.filter((_, i) => i !== index));
    };

    const handleDelete = (index) => {
        setTableData(tableData.filter((_, i) => i !== index));
    };

    return (
        <div className="w-screen h-screen bg-gray-900 p-6">
            <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded-lg flex flex-wrap justify-between items-start mx-auto p-6">
                <div className="flex flex-col w-full md:w-1/3 lg:w-1/6 mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2 text-center" htmlFor="playerName">
                        Player Name
                    </label>
                    <input
                        className="shadow border-gray-700 bg-gray-700 rounded py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mt-2 w-full"
                        id="playerName" type="text" placeholder="Player Name"
                        name="playerName" value={formData.playerName} onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col w-full md:w-1/3 lg:w-1/6 mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2 text-center" htmlFor="actualRating">
                        Actual Rating
                    </label>
                    <div className="flex items-center justify-center h-12">
                        <StarRating
                            value={formData.actualRating}
                            onChange={(newValue) => {
                                // console.log("New rating:", newValue); Comprobado que funciona
                                handleRatingChange(newValue, 'actualRating')
                            }
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-1/3 lg:w-1/6 mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2 text-center" htmlFor="potentialRating">
                        Potential Rating
                    </label>
                    <div className="flex items-center justify-center h-12">
                        <StarRating
                            value={formData.potentialRating}
                            onChange={(newValue) => handleRatingChange(newValue, 'potentialRating')}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full md:w-1/3 lg:w-1/6 mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2 text-center" htmlFor="age">
                        Age
                    </label>
                    <input
                        className="shadow border-gray-700 bg-gray-700 rounded py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mt-2 w-50 mx-auto"
                        id="age" type="text" placeholder="Age"
                        name="age" value={formData.age} onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-center w-full md:w-1/3 lg:w-1/6 mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2 text-center" htmlFor="salary">
                        Salary
                    </label>
                    <input
                        className="shadow border-gray-700 bg-gray-700 rounded py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mt-2 w-50 mx-auto"
                        id="salary" type="text" placeholder="Salary"
                        name="salary" value={formData.salary} onChange={handleChange}
                    />
                </div>

                <div className="w-full md:w-1/3 lg:w-1/6 mb-2 flex flex-col items-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-8 px-4 rounded focus:outline-none focus:shadow-outline h-full">
                        Submit
                    </button>
                </div>
            </form>

            <div className="mt-8">
                <h2 className="text-xl font-bold text-white mb-4">Form Data</h2>
                <table className="table-auto w-full bg-gray-800 border border-gray-700">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-gray-400">Player Name</th>
                            <th className="px-4 py-2 text-gray-400">Actual Rating</th>
                            <th className="px-4 py-2 text-gray-400">Potential Rating</th>
                            <th className="px-4 py-2 text-gray-400">Age</th>
                            <th className="px-4 py-2 text-gray-400">Salary</th>
                            <th className="px-4 py-2 text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data, index) => (
                            <tr key={index} >
                                <td className="border border-gray-700 px-4 py-2 text-gray-300">{data.playerName}</td>
                                <td className="border border-gray-700 px-4 py-2 text-gray-300">
                                    <Rating name="read-only" value={data.actualRating} readOnly precision={0.5} />
                                </td>
                                <td className="border border-gray-700 px-4 py-2 text-gray-300">
                                    <Rating name="read-only" value={data.potentialRating} readOnly precision={0.5} />
                                </td>
                                <td className="border border-gray-700 px-4 py-2 text-gray-300">{data.age}</td>
                                <td className="border border-gray-700 px-4 py-2 text-gray-300">{data.salary}</td>
                                <td className="border border-gray-700 px-4 py-2 text-gray-300">
                                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 mr-2 rounded focus:outline-none focus:shadow-outline" onClick={() => handleEdit(index)}>Edit</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Form;
