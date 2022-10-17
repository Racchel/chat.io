export const Form = ({ 
  handleSubmit, 
  inputValue, 
  setInputValue, 
  inputPlaceholder,
  buttonName,
  display 
}) => {

  if (display) {
    return (
      <form onSubmit={handleSubmit} className='text-center pt-3'>
        <div className='row g-3'>
          <div className='col-md-8'>
            <input 
              value={inputValue} 
              onChange={e => setInputValue(e.target.value)}
              type='text'
              placeholder={inputPlaceholder}
              className='form-control'
            />
          </div>
  
          <div className='col-md-4'>
            <button className='btn btn-secondary' type='submit'>
              { buttonName }
            </button>
          </div>
        </div>
      </form>
    )
  }

  return null
}