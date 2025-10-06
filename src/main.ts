const form = document.getElementById('todo-form') as HTMLFormElement

const input =document.getElementById('todo-input') as HTMLInputElement
const list: string[] = []
form.addEventListener('submit', handleSubmit)

function handleSubmit(event: Event) {
    event.preventDefault()

    const value:string = input.value
    console.log(value)
    list.push(value)
    input.value = ''

    return list
}

