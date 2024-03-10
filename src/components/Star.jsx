import { FaStar, FaRegStar } from 'react-icons/fa';


const Star = ({ selected = false, onClick = () => { } }) => (
    <span onClick={onClick} className="cursor-pointer flex">
        {selected ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-400" />}
    </span>
);


export default Star;
