const form = document.getElementById('todo-form') as HTMLFormElement
const input = document.getElementById('todo-input') as HTMLInputElement
const todoListHTML = document.getElementById('todo-list') as HTMLElement

type TodoItem = {
    text: string;
    completed: boolean
}

const list: TodoItem[] = []

form.addEventListener('submit', handleSubmit)

function handleSubmit(event: Event) {
    event.preventDefault()
    const value: string = input.value
    list.push({ text: value, completed: false })
    input.value = ''
    renderList()
}

function createCheckbox(value: TodoItem, index: number) {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = value.completed

    checkbox.addEventListener('change', function () {
        list[index].completed = checkbox.checked
        //todo а если не будет этого элемента по индексу = нужна проверка !
        renderList()
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

function createDeleteButton(index: number) {
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Удалить'
    deleteButton.addEventListener('click', function () {
        list.splice(index, 1)
        renderList()
    })
    return deleteButton
}

function renderList() {
    todoListHTML.innerHTML = ''

    list.forEach(
        function (value, index) {
            const checkbox = createCheckbox(value, index)
            const divTodoItem = document.createElement('div')
            const textSpan = createTextElement(value)
            const deleteButton = createDeleteButton(index)
            divTodoItem.className = 'todo_item'


            divTodoItem.appendChild(checkbox)
            divTodoItem.appendChild(textSpan)
            divTodoItem.appendChild(deleteButton)

            todoListHTML.appendChild(divTodoItem)
        }
    )
}

// const li = document.createElement('li')

// todo сортировка через фильтр массивов - ис комплитет. 2 варик посмотри sort()