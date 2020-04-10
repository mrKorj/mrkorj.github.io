let dataArr = [];

const boardContent = document.querySelector('#boardContent');
const form = document.querySelector('#form');


//------- main app --------
form.addEventListener('submit', event => {
    event.preventDefault();

    const formEl = event.target;
    const name = formEl.name.value;
    const description = formEl.description.value;
    const date = formEl.date.value;
    const time = formEl.time.value;

    const newTask = new CreateTaskObj(name, description, date, time);
    if (validateForm(newTask)) {
        dataArr.push(newTask);
        boardContent.appendChild(createTaskEl(newTask));
        saveTaskToLocalStorage()
    }
});


//-------- create element ---------
const createTaskEl = taskCard => {
    const taskEl = document.createElement('div');
    taskEl.innerHTML = htmlEl(taskCard);

    const delBtn = taskEl.querySelector('.delBtn');
    delBtn.addEventListener('click', () => {
        deleteTaskEl(taskCard, taskEl);
        saveTaskToLocalStorage(dataArr)
    });

    return taskEl
};


//----- obj constructor ---------
class CreateTaskObj {
    constructor(name, description, date, time) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.time = time;
        this.id = `${Date.now()}-${Math.random()}`;
        this.addDate = new Date(Date.now()).toLocaleDateString();
    }
}


//------- form validation --------
const validateForm = taskObj => {
    if (!taskObj.name && !taskObj.name.trim()) {
        alert('Fill the Name of Task')
    } else if (!taskObj.description && !taskObj.description.trim()) {
        alert('description cannot be empty')
    } else if (!taskObj.date) {
        alert('set the End Date of Task')
    } else if (!taskObj.time) {
        alert('set the End Time of Task')
    } else {
        return true
    }
};


//----------- HTML card -------
const htmlEl = taskObj => {
    return `<div class="card scale-in-ver-top">
                <div class="card-name">
                    <h4>${taskObj.name}</h4>
                    <div class="fas fa-trash-alt delBtn" title="Delete Task"></div>
                </div>
                <div class="card-text">${taskObj.description}</div>
                <div class="date-time">deadline: ${taskObj.date} ${taskObj.time}</div>
                <div class="add-date">added: ${taskObj.addDate}</div>
            </div>
           `
};


// --------- deleting card -----
const deleteTaskEl = (taskObj, taskEl) => {
    for (let i = 0; i < dataArr.length; i++) {
        const el = dataArr[i];
        if (el.id === taskObj.id) {
            dataArr.splice(i, 1);
            break
        }
    }
    taskEl.classList.add('scale-out-ver-top');
    setTimeout(() => {
        taskEl.remove()
    }, 600)
};


//--------- render cards from array -----
const renderTaskCards = array => {
    for (let i = 0; i < array.length; i++) {
        const task = array[i];
        const taskEl = createTaskEl(task);
        boardContent.appendChild(taskEl)
    }
};


// -------- localStorage save/get -----
const saveTaskToLocalStorage = () => localStorage.setItem('tasks', JSON.stringify(dataArr));

const getTaskFromLocalStorage = () => JSON.parse(localStorage.getItem('tasks')) || [];


//----- render reloaded document -----
document.addEventListener('DOMContentLoaded', () => {
    dataArr = getTaskFromLocalStorage();
    renderTaskCards(dataArr)
});