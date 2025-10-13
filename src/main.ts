const form = document.getElementById('todo-form') as HTMLFormElement
const input = document.getElementById('todo-input') as HTMLInputElement
const todoListHTML = document.getElementById('todo-list') as HTMLElement

type Todo = {
    text: string;
    completed: boolean
}

const list: Todo[] = []

form.addEventListener('submit', handleSubmit)

function handleSubmit(event: Event) {
    event.preventDefault()
    const value: string = input.value
    list.push({ text: value, completed: false })
    input.value = ''
    renderList()
}

function renderList() {
    todoListHTML.innerHTML = ''

    list.forEach(
        function (value, index, array) {
            const divTodoItem = document.createElement('div')
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.checked = value.completed

            checkbox.addEventListener('change', function () {
                list[index].completed = checkbox.checked
                renderList()
            })

            // const textSpan = document.createElement('span')

            divTodoItem.className = 'todo_item'
            divTodoItem.innerHTML += value.text

            divTodoItem.appendChild(checkbox)
            todoListHTML.appendChild(divTodoItem)
        }
    )
}

// const li = document.createElement('li')
//todo вынести переменные кнопок и чекбоксов в отдельные функции, чтобы не было помойки в рендер лист