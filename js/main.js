import { postData,createGroupElement } from "./templates.js";
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
const my_groups = document.querySelector('.my-groups')
my_groups.addEventListener('click',event=>{
  const group_id = event.target.closest('li').id

  
})








