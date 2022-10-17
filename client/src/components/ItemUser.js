export const ItemUser = ({ user }) => {
  const statusStyle = user.connected ? 'fa fa-circle online' : 'fa fa-circle offline'
  const containerStyle = user.active ? 'clearfix active' : 'clearfix'

  return (
    <li key={user.userID} class={containerStyle}>
      <img src="https://ksastcorpsites.blob.core.windows.net/site/general/63703629760793-image.jpg?width=100" alt='avatar' />

      <div class='about'>
          <div class='name'>{user.username} {user.self && '(yourself)'}</div>
          <div class='status'> 
            <i class={statusStyle}></i> 
            { user.connected ? 'online' : 'offline'}
          </div>                                            
      </div>
    </li>
  )
}
