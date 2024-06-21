document.addEventListener('DOMContentLoaded', function () {
  const todoForm = document.getElementById('todo-form')
  const todoInput = document.getElementById('todo-input')
  const todoList = document.getElementById('todo-list')
  const errorMessage = document.getElementById('error-message')

  todoForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const todoText = todoInput.value.trim()

    if (todoText === '') {
      errorMessage.textContent = 'Задание не может быть пустым!'
      return
    }

    errorMessage.textContent = ''

    const listItem = document.createElement('li')
    listItem.className = 'items'
    listItem.innerHTML = `
					<span>${todoText}</span>
					<div>
							<button class="complete-btn">✔</button>
							<button class="delete-btn">✖</button>
					</div>
			`

    todoList.appendChild(listItem)
    todoInput.value = ''

    const completeButton = listItem.querySelector('.complete-btn')
    completeButton.addEventListener('click', function () {
      listItem.classList.toggle('completed')
    })

    const deleteButton = listItem.querySelector('.delete-btn')
    deleteButton.addEventListener('click', function () {
      todoList.removeChild(listItem)
    })
  })
})
