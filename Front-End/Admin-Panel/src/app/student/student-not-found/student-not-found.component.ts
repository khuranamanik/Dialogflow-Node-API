import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Router, NavigationEnd } from '@angular/router';
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
  public intentList: any = [];
  public createKnowledgeBase: FormGroup;
  knowledge: any = [];
  public entitiy: FormGroup;
  public entities: any = [];
  public entityType: FormGroup;
  public entityTypes:any=[];


  displayMode: string = "";
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService
  ) {

    router.events.subscribe((val) => {
      // see also 
      console.log(val instanceof NavigationEnd)
      if (val instanceof NavigationEnd) {
        this.displayMode = this.router.url;
        if (this.router.url.includes("Agent/create")) {
          this.displayMode = "create-admin";
        } else if (this.router.url.includes("intents/create")) {
          this.displayMode = "create-intent";
        }
        else if (this.router.url.includes("intents/list")) {
          this.displayMode = "list-intent";
        }
        else if (this.router.url.includes("knowledgebase/create")) {
          this.displayMode = "knowledgebase-create";
        }
        else if (this.router.url.includes("entities/create")) {
          this.displayMode = "entities-create";
        }
        else if (this.router.url.includes("entitiesType/create")) {
          this.displayMode = "entitiesType-create";
        }

      }
    });
  }

  ngOnInit() {
    this.getIntentList();
    this.knowledgeBaseForm();
    this.displayMode = this.router.url;
    if (this.router.url.includes("Agent/create")) {
      this.displayMode = "create-admin";
    } else if (this.router.url.includes("intents/create")) {
      this.displayMode = "create-intent";
    }
    else if (this.router.url.includes("intents/list")) {
      this.displayMode = "list-intent";
    }
    else if (this.router.url.includes("knowledgebase/create")) {
      this.displayMode = "knowledgebase-create";
    }
    else if (this.router.url.includes("entities/create")) {
      this.displayMode = "entities-create";
    }
    else if (this.router.url.includes("entitiesType/create")) {
      this.displayMode = "entitiesType-create";
    }

    this.createEntityType();

    debugger;
    this.create();
    this.createIntent();

  }
  create() {
    this.createAgent = this.fb.group({
      email: [''],
      password: [''],
      roletype: [''],
      projectId: [''],
      displayName: ['']
    });
  }

  createEntityType() {
    this.entityType = this.fb.group({
      displayName: [''],
      kind:[]
    })
  }
  createEnType()
  {
    this.studentService.entityType(this.entityType.value)
    .subscribe(res => {
      this.entityTypes = res
      console.log("my entitity Types aree", res);
      if (res) {
        this.toastr.success('Intent  Type Created Sucessfully');
      }
      else {
        this.toastr.error("Error");
      }
    }, (err) => {
      console.log(err);
    });


  }




  knowledgeBaseForm() {
    this.createKnowledgeBase = this.fb.group({
      displayName: []
    })
  }

  createEntity() {
    this.entitiy = this.fb.group({
      entityValue: [''],
      synonyms: [''],
      entityTypeName: ['']
    });
  }

  createEntities() {
    this.studentService.createEntities(this.entitiy.value)
      .subscribe(res => {
        this.entities = res
        console.log("my entitieeesss aree", res);
        if (res) {
          this.toastr.success('Intent Created Sucessfully');
          this.router.navigate(['/company/dashboard']);
        }
        else {
          this.toastr.error("Error");
        }
      }, (err) => {
        console.log(err);
      });

  }


  get f() {
    return this.createAgent.controls;
  }
  createAdmin() {
    console.log("my values are", this.createAgent.value);
    debugger;
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
      }, (err) => {
        console.log(err);
      });
  }

  createIntent() {
    this.createIn = this.fb.group({
      // ProjectId: [''],
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

  getIntentList() {
    this.studentService.getIntentList()
      .subscribe(res => {
        this.intentList = res;
        console.log('my intent list is', this.intentList);
      }
      )
  }

  deleteIntent(displayName) {
    this.studentService.deleteIntent(this.intentList.data.displayName)
      .subscribe(res => {
        if (res == 'ok') {
          alert('deleted succesfully');
        }
        else {
          alert('Unsuccessful');
        }
      })

  }

  createKb() {
    this.studentService.createKnowledgeBase(this.createKnowledgeBase.value)
      .subscribe(res => {
        this.knowledge = res;
        console.log('my kb', this.knowledge);
        if (res) {
          this.toastr.success("KnowledgeBase Created Sucessfully");
        }
      })
  }

  


}