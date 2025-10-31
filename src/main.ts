const form = document.getElementById('todo-form') as HTMLFormElement
const input = document.getElementById('todo-input') as HTMLInputElement
const todoListHTML = document.getElementById('todo-list') as HTMLElement

type TodoItem = {
    id: number
    text: string;
    completed: boolean
}

const todoList: TodoItem[] = []

form.addEventListener('submit', handleSubmit)

function handleSubmit(event: Event) {
    event.preventDefault()

    const rawValue: string = input.value
    const value = rawValue.trim()
    if (value === '') {
        input.value = ''
        return
    }

    todoList.push({
        id: Date.now(),
        text: value,
        completed: false
    })

    input.value = ''
    renderList()
}

function createCheckbox(id: number, value: TodoItem) {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = value.completed

    checkbox.addEventListener('change', function () {
        const todoItem = todoList.find(item => item.id === id)

        if (todoItem) {
            todoItem.completed = checkbox.checked
            renderList()
        }
    })

    return checkbox
}

function createTextElement(value: TodoItem) {
    const textSpan = document.createElement('span')
    textSpan.textContent = value.text

    if (value.completed) {
        textSpan.style.textDecoration = 'line-through'
    }

    return textSpan
}

function createDeleteButton(id: number) {
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Удалить'

    deleteButton.addEventListener('click', function () {
        const indexToDelete = todoList.findIndex(item => item.id === id)

        if (indexToDelete > -1) {
            todoList.splice(indexToDelete, 1)
            renderList()
        }
    })
    return deleteButton
}

function createEditButton(id: number) {
    const editButton = document.createElement('button')
    editButton.textContent = 'Редактировать'

    editButton.addEventListener('click', function () {
        const divTodoItemElement = editButton.parentElement
        if (!divTodoItemElement) {
            return
        }

        const oldTextSpan = divTodoItemElement.querySelector('label span')
        if (!oldTextSpan) {
            return
        }

        const parentLabel = oldTextSpan.parentElement
        if (!parentLabel) {
            return
        }

        const todoItem = todoList.find(item => item.id === id)
        if (!todoItem) {
            return
        }

        const newInputEdit = document.createElement('input')
        newInputEdit.type = 'text'
        newInputEdit.value = todoItem.text

        parentLabel.replaceChild(newInputEdit, oldTextSpan)
        newInputEdit.focus()

        newInputEdit.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                todoItem.text = newInputEdit.value
                renderList()
            }
        })

        newInputEdit.addEventListener('blur', function () {
            todoItem.text = newInputEdit.value
            renderList()
        })
    })
    return editButton
}

function createTodoContent(id: number, value: TodoItem) {
    const label = document.createElement('label')

    const checkbox = createCheckbox(id, value)
    const textSpan = createTextElement(value)

    label.appendChild(checkbox)
    label.appendChild(textSpan)

    return label
}

function sortTodoList(a: TodoItem, b: TodoItem) {
    if (!a.completed && b.completed) {
        return -1
    }

    if (a.completed && !b.completed) {
        return 1
    }

    return 0
}

function renderList() {
    todoList.sort(sortTodoList)

    todoListHTML.innerHTML = ''

    todoList.forEach(
        function (value) {
            const id = value.id

            const divTodoItem = document.createElement('div')

            const deleteButton = createDeleteButton(id)
            const resultEditButton = createEditButton(id)

            const todoContent = createTodoContent(id, value)

            divTodoItem.className = 'todo_item'

            divTodoItem.appendChild(todoContent)
            divTodoItem.appendChild(deleteButton)
            divTodoItem.appendChild(resultEditButton)

            todoListHTML.appendChild(divTodoItem)
        }
    )
    saveTodoList()
}

function saveTodoList() {
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

function loadTodoList() {
    const savedTodoList = localStorage.getItem('todoList')
    if (savedTodoList) {
        const parsedList: TodoItem[] = JSON.parse(savedTodoList)
        todoList.length = 0
        todoList.push(...parsedList)
    }
}

loadTodoList()
renderList()































