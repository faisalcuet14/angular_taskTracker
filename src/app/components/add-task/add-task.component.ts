import { Component, Output, EventEmitter } from "@angular/core";
import { Task } from "src/app/Task";
import { Subscription } from "rxjs";
import { UiService } from "src/app/services/ui.service";

@Component({
	selector: "app-add-task",
	templateUrl: "./add-task.component.html",
	styleUrls: ["./add-task.component.css"],
})
export class AddTaskComponent {
	@Output() onAddTask: EventEmitter<Task> = new EventEmitter();
	text: string = "";
	day: string = "";
	reminder: boolean = false;

	showAddTaskForm: boolean = false;
	subscription!: Subscription;

	constructor(private uiService: UiService) {
		this.subscription = this.uiService
			.onToggleAddTaskForm()
			.subscribe((value) => (this.showAddTaskForm = value));
	}

	onSubmit(): void {
		if (!this.text) {
			return alert("Please add a task");
		}
		const newTask: Task = {
			text: this.text,
			day: this.day,
			reminder: this.reminder,
		};
		// @todo- add event
		this.onAddTask.emit(newTask);

		this.text = "";
		this.day = "";
		this.reminder = false;
	}
}
