import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../tasks/tasks.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.params['id'];
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });

    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe((task) => {
        this.taskForm.patchValue(task);
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        ...this.taskForm.value,
        id: this.taskId,
      };
      this.taskService.updateTask(updatedTask).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }
}
