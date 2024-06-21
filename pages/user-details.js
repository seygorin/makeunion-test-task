document.addEventListener('DOMContentLoaded', function () {
  const userDetails = document.getElementById('user-details')
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get('userId')
  const loadingOverlay = document.getElementById('loading-overlay')
  const username = document.querySelector('.username')
  const todoLink = document.querySelector('.link')

  function showLoading() {
    if (loadingOverlay) {
      loadingOverlay.style.display = 'flex'
      username.style.display = 'none'
      todoLink.style.display = 'none'
    }
  }

  function hideLoading() {
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none'
      username.style.display = 'block'
      todoLink.style.display = 'block'
    }
  }

  showLoading()

  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      const userInfo = `
        <h2 class="username">${user.name}</h2>

				<div class="contact-info">
				<p><strong>Email:</strong> ${user.email}</p>
				<p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        <p><strong>Company:</strong> ${user.company.name}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
				</div>

      `
      userDetails.innerHTML = userInfo
      hideLoading()
    })
    .catch((error) => {
      console.error('Error fetching user details:', error)
      hideLoading()
    })
})
