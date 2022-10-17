import { ItemUser } from './ItemUser'
 
export const UserList = ({list}) => {
  return (
    <div id="plist" class="people-list">
      <ul class="list-unstyled chat-list mt-2 mb-0">
        {list.map((p, index) => (
          <ItemUser user={p} key={index}/>
        ))}                           
      </ul>
  </div>
  )
}