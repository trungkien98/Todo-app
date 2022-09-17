class TaskListCompleted {
  constructor(taskListComplete) {
    this.taskListComplete = taskListComplete;
  }
  themTask(task) {
    if (this.taskListComplete) {
      this.taskListComplete = [...this.taskListComplete, task];
    } else {
      this.taskListComplete = [task];
    }
  }
  xoaTask(id) {
    let taskIndex = this.taskListComplete.findIndex((item) => item.id == id);
    this.taskListComplete.splice(taskIndex, 1);
  }
  timTask(id) {
    let task = this.taskListComplete.find((item) => item.id == id);
    return task;
  }
}
export default TaskListCompleted;
