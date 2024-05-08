import { Component, OnInit } from '@angular/core';
import { Task } from './tasks.model';
import { TaskService } from '../task.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<Task>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.dataSource = new MatTableDataSource(tasks);
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (task) => task.id !== id
      );
    });
  }
}
