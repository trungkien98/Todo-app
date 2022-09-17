class TaskList {
  constructor(taskList) {
    this.taskList = taskList;
  }
  themTask(task) {
    if (this.taskList) {
      this.taskList = [...this.taskList, task];
    } else {
      this.taskList = [task];
    }
  }
  xoaTask(id) {
    let taskIndex = this.taskList.findIndex((item) => item.id == id);
    this.taskList.splice(taskIndex, 1);
  }
  timTask(id) {
    let task = this.taskList.find((item) => item.id == id);
    return task;
  }
}
export default TaskList;
