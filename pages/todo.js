document.addEventListener('DOMContentLoaded', function () {
  const todoForm = document.getElementById('todo-form')
  const todoInput = document.getElementById('todo-input')
  const todoList = document.getElementById('todo-list')
  const errorMessage = document.getElementById('error-message')


  const savedTodos = JSON.parse(localStorage.getItem('todos')) || []
  for (const todo of savedTodos) {
    addTodoToList(todo.text, todo.completed)
  }

  todoForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const todoText = todoInput.value.trim()

    if (todoText === '') {
      errorMessage.textContent = 'Задание не может быть пустым!'
      return
    }

    errorMessage.textContent = ''
    addTodoToList(todoText, false)

    savedTodos.push({text: todoText, completed: false})
    localStorage.setItem('todos', JSON.stringify(savedTodos))

    todoInput.value = ''
  })

  function addTodoToList(todoText, completed) {
    const listItem = document.createElement('li')
    listItem.className = 'items'
    if (completed) {
      listItem.classList.add('completed')
    }
    listItem.innerHTML = `
      <span>${todoText}</span>
      <div>
        <button class="complete-btn">✔</button>
        <button class="delete-btn">✖</button>
      </div>
    `

    todoList.appendChild(listItem)

    const completeButton = listItem.querySelector('.complete-btn')
    completeButton.addEventListener('click', function () {
      listItem.classList.toggle('completed')

      const todo = savedTodos.find((t) => t.text === todoText)
      if (todo) {
        todo.completed = !todo.completed
        localStorage.setItem('todos', JSON.stringify(savedTodos))
      }
    })

    const deleteButton = listItem.querySelector('.delete-btn')
    deleteButton.addEventListener('click', function () {
      todoList.removeChild(listItem)

      const index = savedTodos.findIndex((t) => t.text === todoText)
      if (index !== -1) {
        savedTodos.splice(index, 1)
        localStorage.setItem('todos', JSON.stringify(savedTodos))
      }
    })
  }
})
