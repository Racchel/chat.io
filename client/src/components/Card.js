export const Card = ({ list, isBig, isPrimary }) => {
  
  const containerStyle = isBig? 'col-md-8' : 'col-md-4'
  const itemStyle = isPrimary? 'alert alert-primary' : 'alert alert-secondary'

  return (
    <div className={containerStyle}>
      <pre>
        {list.map((item, index) => (
          <div 
            key={index}
            className={itemStyle}
          > 
            {item} 
          </div>
        ))}
      </pre>
    </div>
  )
}