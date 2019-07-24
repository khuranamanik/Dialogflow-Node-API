import { Component, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VERSION } from '@angular/material';
import { NavService } from '../../services/nav-service';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';


interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
  isOnlyFor?: string;
}


@Component({
  selector: 'app-student-nav',
  templateUrl: './student-nav.component.html',
  styleUrls: ['./student-nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StudentNavComponent {
  studentRoute = {
    profile: "/company/profile"
  }

  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: "Dashboard",
      disabled: true,
      iconName: "dashboard",
      route: "/company/dashboard",
      isOnlyFor:"all",
      children: []
    },
    {
      displayName: "Agent ",
      disabled: true,
      iconName: "create",
      route: "/company/Agent",
      isOnlyFor:"superadmin",
      children: [
        {
          displayName: "Create",
          disabled: false,
          iconName: "remove_red_eye",
          route: "/company/Agent/create",
          isOnlyFor:"superadmin",
          children: []
        }
      ]
    },
     {
      displayName: "Intents",
      disabled: true,
      iconName: "create",
      route: "/company/intents",
      isOnlyFor:"all",
      children: [
        {
          displayName: "create",
          disabled: false,
          iconName: "remove_red_eye",
          route: "/company/intents/create",
          isOnlyFor:"all",
          children: []
        },
        {
          displayName: "delete",
          disabled: false,
          iconName: "remove_red_eye",
          route: "/student/assignments/dfdf",
          isOnlyFor:"all",
          children: []
        }
      ]
    },
    {
      displayName: "Entities",
      disabled: true,
      iconName: "description",
      route: "/student/tasks",
      isOnlyFor:"all",
      children: [
        {
          displayName: "Create",
          disabled: false,
          iconName: "remove_red_eye",
          route: "/student/viewstasks",
          isOnlyFor:"all",
          children: []
        },
        {
          displayName: "",
          disabled: false,
          iconName: "remove_red_eye",
          route: "/student/viewstasks",
          isOnlyFor:"all",
          children: []
        },

      ]
    },
    {
      displayName: "Context",
      disabled: true,
      iconName: "description",
      route: "/student/tasks",
      isOnlyFor:"all",
      children: [
        {
          displayName: "Create",
          disabled: false,
          iconName: "remove_red_eye",
          route: "/student/viewtasks",
          isOnlyFor:"all",
          children: []
        },
        {
          displayName: "Delete",
          disabled: false,
          iconName: "remove_red_eye",
          route: "/student/viewtasks",
          children: []
        }

      ]
    },
    {
      displayName: "Knowledgebase ",
      disabled: true,
      iconName: "create",
      route: "/student/assignments",
      isOnlyFor:"all",
      children: [
        {
          displayName: "Create",
          disabled: false,
          iconName: "remove_red_eye",
          route: "/student/assignments",
          isOnlyFor:"all",
          children: []
        },

        {
          displayName: "Delete",
          disabled: false,
          iconName: "remove_red_eye",
          route: "/student/assignments",
          isOnlyFor:"all",
          children: []
        },

      ]
    },
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  subitem = {
    displayName: 'Michael Prentice',
    iconName: 'person',
    route: 'devfestfl/speakers/michael-prentice',
    children: [
      {
        displayName: 'Create Enterprise UIs',
        iconName: 'star_rate',
        route: 'devfestfl/speakers/michael-prentice/material-design'
      }
    ]
  };

  constructor(private breakpointObserver: BreakpointObserver, private navService: NavService, private studentservice: StudentService, private router: Router) { }
  ngAfterViewInit() {
    // this.navService.appDrawer = this.appDrawer;
  }


  logOut() {
    this.studentservice.doLogout()
    this.router.navigate(['/signin'])
  }

}
