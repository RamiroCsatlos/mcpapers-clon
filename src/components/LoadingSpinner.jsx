import './LoadingSpinner.css';

const LoadingSpinner = ({ text = 'Cargando...' }) => {
  return (
    <div className="loading-spinner">
      {text}
    </div>
  );
};

export default LoadingSpinner;
