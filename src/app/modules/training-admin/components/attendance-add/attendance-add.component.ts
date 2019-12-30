import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/app/modules/admin/models/batch.model';
import { BatchService } from 'src/app/modules/admin/services/batch.service';
import { Attendance } from 'src/app/modules/admin/models/attendance.model';
import { Student } from 'src/app/modules/admin/models/student.model';
import { Subject } from 'rxjs';
import { StudentService } from 'src/app/modules/admin/services/student.service';

@Component({
  selector: 'app-attendance-add',
  templateUrl: './attendance-add.component.html',
  styleUrls: ['./attendance-add.component.scss']
})
export class AttendanceAddComponent implements OnInit {
  selected_option: {[key: string]: any} = {}
  batches: Batch[] = [];
  attendences: Attendance[] = [];
  students: Student[] = [];
  years: string[] = [];
  loading = false;
  selectionChanged: Subject<string> = new Subject();
  months: {key?: number, name?: string}[] = [
    {key: 0, name: 'January'},
    {key: 1, name: 'February'},
    {key: 2, name: 'March'},
    {key: 3, name: 'April'},
    {key: 4, name: 'May'},
    {key: 5, name: 'June'},
    {key: 6, name: 'July'},
    {key: 7, name: 'August'},
    {key: 8, name: 'September'},
    {key: 9, name: 'October'},
    {key: 10, name: 'November'},
    {key: 11, name: 'December'},
  ];
  constructor(
    private batchService: BatchService,
    private studentService: StudentService
  ) { }

  loadStudent(){
    this.batchService.http
        .get<Batch>(`batches/${this.selected_option.selected_batch}`, ['students'])
        .subscribe(batch=>{
          console.log(batch);
        });
  }

  ngOnInit() {
    const date = new Date();
    this.batchService.getList().subscribe(({list})=>{
      this.batches = list;
    });
    let year = date.getFullYear() - 30;
    let lastYear = year + 35;
    this.selected_option.selected_year = date.getFullYear();
    this.selected_option.selected_month = date.getMonth();
    while(year < lastYear){
      this.years.push(`${year}`);
      year++;
    }

    this.selectionChanged.subscribe(prop=>{
      if(prop === 'selected_batch'){
        this.loadStudent();
      }
    });

  }

}
