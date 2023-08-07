import { postData,createGroupElement, postDatawithToken, getData, createMyMessage, createOtherMessage } from "./templates.js";
import { development_api_domain,development_own_domain,development_ws_domain } from "./domain.js";


function setCookie(token){
  const x = new Date()
  x.setDate(x.getDate() + 1);
  document.cookie += `token=${token}; ; SameSite=None; Secure;expires=${x}`;
}



function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return undefined;
  }
  // Example usage: Retrieving the value of a cookie named 'jwt'
const jwtToken = getCookie('token');

if(jwtToken===undefined){
  const section = document.querySelector('.login-section')
  section.classList.remove('hidden')
  const login_btn = document.querySelector('.login-btn')
  const user_name = document.querySelector('.username')
  const password = document.querySelector('.password')
  login_btn.addEventListener('click',event=>{
    const jwt_create_url = `${development_api_domain}auth/jwt/create/`
    const data = {
      "username":user_name.value,
      "password":password.value
    }
    postData(jwt_create_url,data)
    .then(data=>{
      if(data.access!==undefined){
        setCookie(data.access)
        const x = getData(`${development_api_domain}auth/users/`,data.access)
        x.then(data=>{
          localStorage.setItem('account_id',data[0].id)
        })
        section.classList.add('hidden')
        window.location.reload();
      }
    })
  })
}else{
  const websocket = new WebSocket(`${development_ws_domain}myapp/global/${jwtToken}`)
  websocket.onmessage = function(event){
    const data = JSON.parse(event.data)
    if(data.label ==='my_groups'){
      const my_groups = document.querySelector('.my-groups')
      data.data.forEach(element => {
        const li = createGroupElement("/assets/accept.png",element.title,element.members,100)
        li.setAttribute('id',element.id)
        li.style.cursor = 'pointer'
        my_groups.appendChild(li)
        console.log(element);
      });
    }
  }
}

let group_socket = '';
let current_group_id = ''

const my_groups = document.querySelector('.my-groups')
my_groups.addEventListener('click',event=>{
  if(my_groups.childElementCount===0){
    return
  }
  let group_id = event.target.closest('li')
  if(group_id===null){
    return
  }
  group_id = group_id.id
  if(current_group_id===group_id){
    return;
  }else{
    current_group_id = group_id
  }
  
  group_socket = new WebSocket(`${development_ws_domain}myapp/groups/${group_id}/${jwtToken}`)
  group_socket.onmessage = function(event){
    let data = JSON.parse(event.data)
    console.log(data);
    const message_area = document.querySelector('.message-area')
    const account_id = localStorage.getItem('account_id')

    if(data.label === "connected"){
      data = data.data[0]
      const group_name = document.querySelector('.group-name')
      group_name.textContent = data.title
      data.messages.forEach(element=>{
        const time = new Date(element.created_at);
        const local = time.toLocaleString();
        if(account_id==element.account_id){
          const li = createMyMessage(local,element.text)
          message_area.appendChild(li)
          //{account_name: 'Ark Em', text: 'hu', account_id: 2, created_at: '2023-07-11T14:11:36.569383Z'}
        }else{
          const li = createOtherMessage(local,element.account_name,element.text)
          message_area.appendChild(li)
        }
      })
      message_area.scrollTop = message_area.scrollHeight;
    }
    if(data.label === "chat_message"){
      const element = data.data.data
      const time = new Date(element.created_at);
      const local = time.toLocaleString();
      if(account_id==element.account_id){
        const li = createMyMessage(local,element.text)
        message_area.appendChild(li)
        //{account_name: 'Ark Em', text: 'hu', account_id: 2, created_at: '2023-07-11T14:11:36.569383Z'}
      }else{
        const li = createOtherMessage(local,element.account_name,element.text)
        message_area.appendChild(li)
      }
      message_area.scrollTop = message_area.scrollHeight;
    }
  }
})

const send_message = document.querySelector('.send-message')

send_message.addEventListener('click',event=>{
  console.log(event);
  const message = document.querySelector(".message")
  group_socket.send(message.value)
  message.value = ''
})








