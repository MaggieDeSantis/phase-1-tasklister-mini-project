document.addEventListener("DOMContentLoaded", () => {
 addingEventListeners()
})

let taskObjArr = []

// get the form and add an event listener
function addingEventListeners() {
  document
     .getElementById("create-task-form")
     .addEventListener("submit", handleFormSubmit)
  document.getElementById("sort-tasks").addEventListener("change", sortTasks)
}

function handleFormSubmit(e) {
  e.preventDefault()
  console.log(e)
  const task = e.target[0].value
  const priorityLvl = parseInt(e.target.priority.value)

  const taskObj = { task, priorityLvl }
  taskObjArr.push(taskObj)

  console.log(taskObjArr)

  sortTasks()
  displayTasks()
}

function displayTasks() {
  const taskUl = document.getElementById("tasks")
  taskUl.innerHTML = ""

  taskObjArr.forEach((task) => {
     const taskLi = document.createElement("li")
     const deleteBtn = document.createElement("button")

     deleteBtn.textContent = "x"
     deleteBtn.addEventListener("click", (e) => deleteTask(e, task))

     taskLi.textContent = task.task + " "
     taskLi.style.color = getPriorityColor(task.priorityLvl)
     taskLi.appendChild(deleteBtn)
     taskUl.appendChild(taskLi)
  })
}

function deleteTask(e, task) {
  taskObjArr = taskObjArr.filter((element) => element.task !== task.task)
  e.target.parentNode.remove()
}

function getPriorityColor(priorityLvl){
    if (priorityLvl === 1) {
      return "red"      
    } else if (priorityLvl === 2 ){
      return "orange"
    } else {
      return "green"
    }
  }
  function sortTasks() {
    console.log("in sortTasks")
    const sortTasksSelect = document.getElementById("sort-tasks")
    if (sortTasksSelect.value === "h-l") {
       taskObjArr.sort((a, b) => a.priorityLvl - b.priorityLvl)
    } else {
       taskObjArr.sort((a, b) => b.priorityLvl - a.priorityLvl)
    }
    console.log(taskObjArr)
    displayTasks()
 }