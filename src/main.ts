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
        if (!list[index]) return

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

function createEditButton(index: number) {
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

        const newInputEdit = document.createElement('input')
        newInputEdit.type = 'text'
        newInputEdit.value = list[index].text

        parentLabel.replaceChild(newInputEdit, oldTextSpan)
        newInputEdit.focus()

        newInputEdit.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                list[index].text = newInputEdit.value
                renderList()
            }
        })

        newInputEdit.addEventListener('blur', function () {
            list[index].text = newInputEdit.value
            renderList()
        })
    })
    return editButton
}

function createTodoContent(value: TodoItem, index: number) {
    const label = document.createElement('label')

    const checkbox = createCheckbox(value, index)
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
    list.sort(sortTodoList)

    todoListHTML.innerHTML = ''

    list.forEach(
        function (value, index) {
            const divTodoItem = document.createElement('div')
            const deleteButton = createDeleteButton(index)
            const resultEditButton = createEditButton(index)
            const todoContent = createTodoContent(value, index)
            divTodoItem.className = 'todo_item'


            divTodoItem.appendChild(todoContent)
            divTodoItem.appendChild(deleteButton)
            divTodoItem.appendChild(resultEditButton)


            todoListHTML.appendChild(divTodoItem)
        }
    )
}




