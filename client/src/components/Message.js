export const Message = ({ messagesList, isPrimary }) => {
  
  const itemStyle = isPrimary? 'alert alert-primary' : 'alert alert-secondary'

  return (
    <div className='col'>
      {messagesList.map((content, index) => (
        <div 
          key={index}
          className={itemStyle}
        > 
          {content} 
        </div>
      ))}
    </div>
  )
}