
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

// Define el componente de Rating con estilos personalizados
const CustomRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#FFD700', // Cambia el color de las estrellas llenas
    },
    '& .MuiRating-iconEmpty': {
        color: '#ccc', // Cambia el color de las estrellas vacías
    },
});

// Componente de Rating personalizado
const StarRating = ({ value, onChange, readOnly = false }) => {
    return (
        <CustomRating
            name="star-rating"
            value={value}
            onChange={(event, newValue) => {
                if (!readOnly) {
                    onChange(newValue);
                }
            }}
            precision={0.5}
            readOnly={readOnly}
        />
    );
};

export default StarRating;
