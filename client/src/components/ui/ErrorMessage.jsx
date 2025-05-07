const ErrorMessage = ({ message }) => {
    if (!message) return null;
  
    return (
      <div className=" text-red-600 px-4 py-3 rounded relative text-sm" role="alert">
        <span className="block sm:inline">{message}</span>
      </div>
    );
  };
  
  export default ErrorMessage;
  