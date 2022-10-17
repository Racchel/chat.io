import { Message } from './Message'

export const ChatHistory = ({messages, socketID}) => {
  return (
    <div class="chat-history">
      <ul class="m-b-0">
        {messages.map((msg, index) => (
          <Message message={msg} key={index} socketID={socketID}/>
        ))}
      </ul>
  </div>
  )
}
