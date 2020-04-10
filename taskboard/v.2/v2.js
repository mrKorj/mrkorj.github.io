let dataArr = [];

const boardContent = document.querySelector('.boardContent');
const form = document.querySelector('#form');


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

const htmlEl = taskObj => {
    return `<div class="card-rotate">
                <div class="front">
                    <div class="front-cower">
                        <span>${taskObj.name}</span>
                        <div class="date-time"><p>deadline:</p>${taskObj.date}, ${taskObj.time}</div>
                     </div>
                </div>
                <div class="back">
                    <div class="back-content">
                            <div class="description">${taskObj.description}</div>
                            <div class="add-date">added: ${taskObj.addDate}</div>                     
                        <div class="delete-section">
                             <a href="#"><i class="fa fa-trash delBtn" title="Delete Task"></i></a>
                        </div>
                    </div>
                </div>
            </div>
           `
};

const deleteTaskEl = (taskObj, taskEl) => {
    for (let i = 0; i < dataArr.length; i++) {
        const el = dataArr[i];
        if (el.id === taskObj.id) {
            dataArr.splice(i, 1);
            break
        }
    }

    taskEl.remove()
};

const renderTaskCards = array => {
    for (let i = 0; i < array.length; i++) {
        const task = array[i];
        const taskEl = createTaskEl(task);
        boardContent.appendChild(taskEl)
    }
};

const saveTaskToLocalStorage = () => localStorage.setItem('tasks', JSON.stringify(dataArr));

const getTaskFromLocalStorage = () => JSON.parse(localStorage.getItem('tasks')) || [];

document.addEventListener('DOMContentLoaded', () => {
    dataArr = getTaskFromLocalStorage();
    renderTaskCards(dataArr)
});