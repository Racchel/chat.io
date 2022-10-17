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
      <form onSubmit={handleSubmit}>
        <div class="chat-message clearfix">
          <div class="input-group mb-0">
            <input 
              type="text" 
              onChange={e => setInputValue(e.target.value)}
              value={inputValue} 
              class="form-control" 
              placeholder={inputPlaceholder}
            /> 
  
            <div class="input-group-prepend">
              <button type='submit' class="input-group-text">
                <i class="fa fa-send"></i>
                {buttonName}
              </button>
            </div>         
  
          </div>
        </div>
      </form>
    )
  }

  return null
}
