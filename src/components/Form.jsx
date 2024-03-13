import { useState, useEffect } from 'react';
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
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

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

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedTableData = () => {
        if (!sortColumn) return tableData;

        return [...tableData].sort((a, b) => {
            if (sortColumn === 'playerName') {
                const aValue = typeof a[sortColumn] === 'string' ? a[sortColumn] : '';
                const bValue = typeof b[sortColumn] === 'string' ? b[sortColumn] : '';

                if (sortDirection === 'asc') {
                    return aValue.localeCompare(bValue);
                } else {
                    return bValue.localeCompare(aValue);
                }
            } else {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];

                if (sortDirection === 'asc') {
                    return aValue - bValue;
                } else {
                    return bValue - aValue;
                }
            }
        });
    };

    useEffect(() => {
        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }

        const savedTableData = localStorage.getItem('tableData');
        if (savedTableData) {
            setTableData(JSON.parse(savedTableData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);


    useEffect(() => {
        localStorage.setItem('tableData', JSON.stringify(tableData));
    }, [tableData]);

    return (
        <div className="w-screen h-screen bg-gray-900 p-6">
            <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded-lg flex flex-wrap justify-between items-start mx-auto p-6">
                <div className="flex flex-col items-center w-full md:w-1/3 lg:w-1/6 mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2 text-center" htmlFor="position">
                        Position
                    </label>
                    <select
                        className="shadow border-gray-700 bg-gray-700 rounded py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline mt-2 w-20 mx-auto"
                        id="position" type="text" placeholder="Position"
                        name="position" value={formData.position} onChange={handleChange}
                    >
                        <option value="" disabled selected>POS</option>
                        <option value="PG">PG</option>
                        <option value="SG">SG</option>
                        <option value="SF">SF</option>
                        <option value="PF">PF</option>
                        <option value="C">C</option>
                    </select>
                </div>
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

            <div className="mt-8 bg-gray-900">
                <h2 className="text-xl font-bold text-white mb-4">Form Data</h2>
                <div className='overflow-x-auto '>
                    <table className="table-auto w-full bg-gray-800 border border-gray-700 mb-8">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-gray-400" onClick={() => handleSort('position')}>
                                    Position {sortColumn === 'position' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="px-4 py-2 text-gray-400" onClick={() => handleSort('playerName')}>
                                    Player Name {sortColumn === 'playerName' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="px-4 py-2 text-gray-400" onClick={() => handleSort('actualRating')}>
                                    Actual Rating {sortColumn === 'actualRating' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="px-4 py-2 text-gray-400" onClick={() => handleSort('potentialRating')}>
                                    Potential Rating {sortColumn === 'potentialRating' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="px-4 py-2 text-gray-400" onClick={() => handleSort('age')}>
                                    Age {sortColumn === 'age' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="px-4 py-2 text-gray-400" onClick={() => handleSort('salary')}>
                                    Salary {sortColumn === 'salary' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="px-4 py-2 text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='overflow-x-auto'>
                            {sortedTableData().map((data, index) => (
                                <tr key={index} >
                                    <td className="border border-gray-700 px-4 py-2 text-gray-300">{data && data.position ? data.position.toUpperCase() : ''}</td>
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
            </div>
        </div >
    );
};

export default Form;
