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
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Add the Authorization header with the token
      },
      body: JSON.stringify(data),
    });
    return response.json(); 
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