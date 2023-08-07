export async function postData(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    return response.json(); 
  }

export async function postDatawithToken(url, data, token) {
  let d = ''
    if(data===null){
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${token}` // Add the Authorization header with the token
        },
      });
      d = response.json()
    }else{
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${token}` // Add the Authorization header with the token
        },
        body: JSON.stringify(data),
      });
      d = response.json()
    }
    return d; 
  }

export async function getData(url,token) {
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Request failed.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// GroupElement

export function createGroupElement(imgSrc, groupName, currentMember, totalMember) {
  // Create <li> element
  var li = document.createElement('li');

  // Create <div> element with class "my-groups-img"
  var imgDiv = document.createElement('div');
  imgDiv.className = 'my-groups-img';

  // Create <img> element with src attribute
  var img = document.createElement('img');
  img.src = imgSrc;
  img.alt = 'my';
  imgDiv.appendChild(img);

  // Create <div> element with class "my-groups-name"
  var nameDiv = document.createElement('div');
  nameDiv.className = 'my-groups-name';

  // Create <p> element with group name
  var groupNameText = document.createElement('p');
  groupNameText.textContent = groupName;
  nameDiv.appendChild(groupNameText);

  // Create <div> element with class "members"
  var membersDiv = document.createElement('div');
  membersDiv.className = 'members';

  // Create <span> element with class "current-member" for current member count
  var currentMemberSpan = document.createElement('span');
  currentMemberSpan.className = 'current-member';
  currentMemberSpan.textContent = currentMember;
  membersDiv.appendChild(currentMemberSpan);

  // Create <span> element for "/"
  var separatorSpan = document.createElement('span');
  separatorSpan.textContent = '/';
  membersDiv.appendChild(separatorSpan);

  // Create <span> element with class "limit-member" for total member count
  var totalMemberSpan = document.createElement('span');
  totalMemberSpan.className = 'limit-member';
  totalMemberSpan.textContent = totalMember;
  membersDiv.appendChild(totalMemberSpan);

  // Append all created elements to <li> element
  li.appendChild(imgDiv);
  li.appendChild(nameDiv);
  li.appendChild(membersDiv);

  return li;
}


// Message chat template
export function createOtherMessage(time, name, message) {
  const li = document.createElement('li');
  li.className = 'others-message';

  const sentTime = document.createElement('p');
  sentTime.className = 'sent-time';
  sentTime.style.textAlign = 'center';
  sentTime.textContent = time;

  const senderSpan = document.createElement('span');
  senderSpan.className = 'sender';
  senderSpan.textContent ='Sender : ';

  const nameSpan = document.createElement('span');
  nameSpan.className = 'others-name';
  nameSpan.textContent = name;

  const lineBreak = document.createElement('br');

  const messageText = document.createElement('p');
  messageText.className = 'message-text';
  messageText.textContent = message;

  li.appendChild(sentTime);
  li.appendChild(senderSpan);
  li.appendChild(nameSpan);
  li.appendChild(lineBreak);
  li.appendChild(messageText);

  return li;
}

// Function to create "My Message" element
export function createMyMessage(time, message) {
  const li = document.createElement('li');
  li.className = 'my-message';

  const sentTime = document.createElement('p');
  sentTime.className = 'sent-time';
  sentTime.style.textAlign = 'center';
  sentTime.textContent = time;

  const youP = document.createElement('p');
  youP.className = 'you';
  youP.textContent = 'You';

  const messageText = document.createElement('p');
  messageText.className = 'my-message-text';
  messageText.textContent = message;

  li.appendChild(sentTime);
  li.appendChild(youP);
  li.appendChild(messageText);

  return li;
}