import Task from "../models/taskModel.js";
import TaskList from "../models/taskListModel.js";

let loadData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

let dsTask = new TaskList(loadData("list"));
//add task
document.querySelector("#addItem").onclick = () => {
  let id = Math.random();
  let taskName = document.querySelector("#newTask").value;
  let task = new Task(id, taskName, "todo");
  dsTask.themTask(task);
  console.log(dsTask);
  saveData("list", dsTask.taskList);
  showTask(dsTask.taskList, "todo");
};

//render
let showTask = (taskList, idHtml) => {
  let result = "";
  if (taskList) {
    taskList.map((item) => {
      result += `
      <li>
      <div>${item.taskName}</div>
      <div>
        <button class="btn" onclick="doneTask(${item.id})">
            <i class="fa-solid fa-check"></i>
        </button class="btn btn-danger">
        <button class="btn btn-danger" onclick="xoaTask(${item.id})">
            <i class="fa-sharp fa-solid fa-trash">
        </i></button>
      </div>
    </li>
        `;
    });
  }
  document.getElementById(idHtml).innerHTML = result;
};
let showTaskCompleted = (dsComplete) => {
  let result = "";
  if (dsComplete) {
    dsComplete.map((item) => {
      result += `
      <li>
      <div>${item.taskName}</div>
      <div>
        <button class="btn btn-success" >
            <i class="fa-solid fa-check"></i>
        </button class="btn btn-danger">
        <button class="btn btn-danger" onclick="xoaTaskComplete(${item.id})">
            <i class="fa-sharp fa-solid fa-trash">
        </i></button>
      </div>
    </li>
        `;
    });
  }
  document.getElementById("completed").innerHTML = result;
};

let saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
window.xoaTask = (id) => {
  dsTask.xoaTask(id);
  saveData("list", dsTask.taskList);
  showTask(dsTask.taskList, "todo");
};
let dsComplete = loadData("dsComplete");
window.doneTask = (id) => {
  let taskComplete = dsTask.timTask(id);
  dsComplete.push(taskComplete);
  saveData("dsComplete", dsComplete);
  showTaskCompleted(loadData("dsComplete"));
  dsTask.xoaTask(id);
  saveData("list", dsTask.taskList);
  showTask(dsTask.taskList, "todo");
  console.log(dsComplete);
};
window.xoaTaskComplete = (id) => {
  let task = dsComplete.find((item) => item.id == id);
  dsComplete.splice(task, 1);
  saveData("dsComplete", dsComplete);
  showTaskCompleted(dsComplete);
};
let arrSortDown = (arr) => {
  arr.sort((taskTiepTheo, task) => {
    let tenTiepTheo = taskTiepTheo.taskName.toLowerCase();
    let tenTask = task.taskName.toLowerCase();
    if (tenTiepTheo > tenTask) {
      return 1;
    }
    if (tenTiepTheo < tenTask) {
      return -1;
    }
    return 1;
  });
  return arr;
};
let arrSortUp = (arr) => {
  arr.sort((taskTiepTheo, task) => {
    let tenTiepTheo = taskTiepTheo.taskName.toLowerCase();
    let tenTask = task.taskName.toLowerCase();
    if (tenTiepTheo < tenTask) {
      return 1;
    }
    if (tenTiepTheo > tenTask) {
      return -1;
    }
    return 1;
  });
  return arr;
};
document.querySelector("#two").onclick = () => {
  let arrTask = arrSortDown(dsTask.taskList);
  showTask(arrTask, "todo");
  let arrTaskComplete = arrSortDown(loadData("dsComplete"));
  showTaskCompleted(arrTaskComplete);
};
document.querySelector("#three").onclick = () => {
  let arrTask = arrSortUp(dsTask.taskList);
  showTask(arrTask, "todo");
  let arrTaskComplete = arrSortUp(loadData("dsComplete"));
  showTaskCompleted(arrTaskComplete);
};
showTask(loadData("list"), "todo");
showTaskCompleted(loadData("dsComplete"));
