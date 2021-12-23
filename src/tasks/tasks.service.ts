import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidV4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.status.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidV4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  public getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  public deleteTaskByID(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  public updateTaskByID(id: string, status: TaskStatus): Task {
    const updatedTask = this.getTaskById(id);
    updatedTask.status = status;

    const tasks = this.tasks.map((task) => {
      if (task.id === id) {
        task = updatedTask;
      }
      return task;
    });
    this.tasks = tasks;

    return updatedTask;
  }
}
