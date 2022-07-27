import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Output() submit_event = new EventEmitter<{
    username: string;
    password: string;
  }>();
  @Input() errorMessage = '';
  @Input() header = '';
  myForm: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
          ),
        ],
      ],
    });
  }

  onSubmit(): void {
    console.log(
      this.myForm.get('username').value,
      this.myForm.get('password').value
    );
    console.log('Function called');
    this.submit_event.emit({
      username: this.myForm.get('username').value,
      password: this.myForm.get('password').value,
    });
  }
}
