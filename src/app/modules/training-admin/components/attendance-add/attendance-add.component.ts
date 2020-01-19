import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/app/modules/admin/models/batch.model';
import { BatchService } from 'src/app/modules/admin/services/batch.service';
import { Attendance } from 'src/app/modules/admin/models/attendance.model';
import { Student } from 'src/app/modules/admin/models/student.model';
import { Subject } from 'rxjs';
import { RangePickerValue } from '../../../../interfaces/range-picker-value.interface';

@Component({
  selector: 'app-attendance-add',
  templateUrl: './attendance-add.component.html',
  styleUrls: ['./attendance-add.component.scss']
})
export class AttendanceAddComponent implements OnInit {
  selected_option: {[key: string]: any} = {}
  all_present = false;
  batches: Batch[] = [];
  attendences: Attendance[] = [];
  students: Student[] = [];
  loading = false;
  selectionChanged: Subject<string> = new Subject();
  selected_date?: any;
  constructor(
    private batchService: BatchService  ) { }

  loadStudent(){
    this.loading = true;
    this.batchService.http
        .get<Batch>(`batches/${this.selected_option.selected_batch}`, ['students'])
        .subscribe((response)=>{
          if(response && response.included && Array.isArray(response.included)){
            this.loading = false;
            this.students = response.included.map(data=>{
              return {
                ...data.attributes,
                type: data.type,
                id: data.id
              };
            });
          }
        });
  }

  onDateSelect({startDate}: RangePickerValue){
    if(startDate){
      console.log(startDate.format());
    }
  }

  ngOnInit() {
    this.batchService.getList().subscribe(({list})=>{
      this.batches = list;
    });

    this.selectionChanged.subscribe(prop=>{
      if(prop === 'selected_batch'){
        this.loadStudent();
      }
    });

  }

  selectAll(){
    if(this.all_present){
      this.students.forEach(student=>{
        student.is_present = true;
      });
    }
  }

}
