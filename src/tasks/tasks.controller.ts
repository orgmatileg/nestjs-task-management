import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskWithFilters(filterDto);
    }
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskByID(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskByID(@Param('id') id: string): void {
    return this.taskService.deleteTaskByID(id);
  }

  @Patch('/:id/status')
  updateTaskByID(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateTaskByID(id, status);
  }
}
