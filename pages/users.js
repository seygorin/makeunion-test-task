document.addEventListener('DOMContentLoaded', function () {
  const usersList = document.getElementById('users-list')
  const usersHeader = document.querySelector('.header')
  const loadingOverlay = document.getElementById('loading-overlay')

  function showLoading() {
    loadingOverlay.style.display = 'flex'
    usersHeader.style.display = 'none'
  }

  function hideLoading() {
    loadingOverlay.style.display = 'none'
    usersHeader.style.display = 'flex'
  }

  showLoading()

  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => {
        const listItem = document.createElement('li')
        listItem.className = 'items'
        listItem.textContent = user.name
        listItem.addEventListener('click', function () {
          window.location.href = `user-details.html?userId=${user.id}`
        })
        usersList.appendChild(listItem)
      })
      hideLoading()
    })
    .catch((error) => {
      console.error('Error fetching users:', error)
      hideLoading()
    })
})
