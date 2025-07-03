const endpoint = 'https://jsonplaceholder.typicode.com/users';
const userList = document.getElementById('userList');
const errorMsg = document.getElementById('errorMsg');
const reloadBtn = document.getElementById('reloadBtn');

async function fetchUsers() {
  userList.innerHTML = ''; 
  errorMsg.textContent = '';
  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const users = await res.json();
    
    users.forEach(u => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <h2>${u.name}</h2>
        <p><strong>Email:</strong> ${u.email}</p>
        <p><strong>Address:</strong> ${u.address.street}, ${u.address.city}</p>
      `;
      userList.appendChild(card);
    });
  } catch (err) {
    console.error('Fetch error:', err);
    errorMsg.textContent = '⚠️ Unable to load users. Check your connection and try again.';
  }
}

reloadBtn.addEventListener('click', fetchUsers);
window.addEventListener('load', fetchUsers);
