const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

loadEventListeners();

function loadEventListeners(){
    document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);
    document.addEventListener("DOMContentLoaded", clearAllInputs);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener("click", clearTasks);
    filter.addEventListener("keyup", filterTasks);
}

function getTasksFromLocalStorage(){
    let tasks = checkLocalStorage();

    tasks.forEach(function(task){
        appendToUl(task);
    })
}

function checkLocalStorage(){
    if(localStorage.getItem("tasks") === null){
        tasks = [];
        return tasks;
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
        return tasks;
    }
}

function clearAllInputs(){
    taskInput.value = "";
    filter.value = "";
    taskInput.blur();
    filter.blur();
}

function addTask(e){
    if(taskInput.value.trim() === ""){
        alert("Please add a task.");
        taskInput.value = "";
    }else if(taskInput.value.length > 50){
        alert("Maximum 50 character allowed.")
        taskInput.value = "";
    }else{
        appendToUl(taskInput.value);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = "";
    }
    e.preventDefault();
}

function appendToUl(text){
    const li = document.createElement("li");
    li.className = "collection-item";
    li.textContent = text;

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    link.setAttribute("href", "#");
    li.appendChild(link);

    taskList.appendChild(li);
}

function storeTaskInLocalStorage(task){
    let tasks = checkLocalStorage();

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement.textContent)
        }
    }
}

function removeTaskFromLocalStorage(taskItemText){
    let tasks = checkLocalStorage();

    tasks.forEach(function(task, index){
        if(taskItemText === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks(){
    if(confirm("Are you sure to delete all tasks?")){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function(task){
        const itemText = task.textContent.toLowerCase();
        if(itemText.indexOf(text) !== -1){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
    })
}