export const Message  =({ message, socketID }) => {
  const messageContentStyle = message.socketID === socketID ? 'message my-message float-right' : 'message other-message'

  return (
    <li class='clearfix'>
        <div class={messageContentStyle}>
          {message.content} - {message.user}
 
          <div class='text-end'>
            {message.datetime}
          </div>
        </div>                                    
    </li>
  )
}