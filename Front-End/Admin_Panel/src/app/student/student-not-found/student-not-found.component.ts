import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-not-found',
  templateUrl: './student-not-found.component.html',
  styleUrls: ['./student-not-found.component.css']
})
export class StudentNotFoundComponent implements OnInit {
  public heading = "Create Agent";
  createAgent: FormGroup;
  public data: any = [];
  createIn: FormGroup;
  public intent: any = [];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.create();
    this.createIntent();

  }
  create() {
    this.createAgent = this.fb.group({
      email: [''],
      password: [''],
      roletype: [''],
      ProjectId: [''],
      displayName: ['']
    });
  }
  get f() {
    return this.createAgent.controls;
  }
  createAdmin() {
    

    // {...this.createAgent.value, ProjectId: this.createAgent.value.projectId}
    this.studentService.createAdmin(this.createAgent.value)
      .subscribe(res => {
        this.data = res
        console.log("my response is", res);
        if (res) {
          this.toastr.success('Admin Created Sucessfully');
          this.router.navigate(['/company/dashboard']);
        }
        else {
          this.toastr.error("Error");
        }
      });
  }

  createIntent() {
    this.createIn = this.fb.group({
      ProjectId: [''],
      displayName: ['']
    })
  }

  createSubject() {
    this.studentService.createIntent(this.createIn.value)
      .subscribe(res => {
        this.intent = res;
        console.log('my created intent on dialogflow is', this.intent);
        if (res) {
          this.toastr.success("Intent Created Sucessfully");
        }
      })
  }
}
