export const ConnectedUsers = ({ display, usersList}) => {

  if (display) {
    return (
      <div className='row'>
        <div className='d-flex justify-content-evenly pt-2 pb-1'>

          {usersList.map((user) => (
            <div key={user.userID}>
              {user.username} {user.self && '(yourself)'}
            </div>
          ))}

        </div>
      </div>
    )
  }

  return null
  
}