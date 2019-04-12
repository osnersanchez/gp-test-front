import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PublicationsApiService } from '../../../shared/services/publications-api.service';

@Component({
  selector: 'app-plans-selection',
  templateUrl: './plans-selection.component.html',
  styleUrls: ['./plans-selection.component.scss']
})
export class PlansSelectionComponent implements OnInit {
  
  @Output() planSelection: EventEmitter<any> = new EventEmitter(); 

  // public plansType = [];
  public plansType = [
    { name: '3 Meses', days: 180, exposition: Array(5), cost: 1900, ads: false, value: 3},
    { name: '6 Meses', days: 90, exposition: Array(4), cost: 997, ads: false, value: 6 },
    { name: '9 Meses', days: 90, exposition: Array(4), cost: 997, ads: false, value: 9 },
    { name: '12 Meses', days: 90, exposition: Array(4), cost: 997, ads: false, value: 12 },
    { name: 'No, Gracias', days: 90, exposition: Array(4), cost: 997, ads: false, value: 0 },
    // { name: 'Basico Pro', days: 180, exposition: Array(3), cost: 1097, ads: false, value: "Basic180" },
    // { name: 'Basico', days: 90, exposition: Array(2), cost: 617, ads: false, value: "Basic90" },
    // { name: 'Gratis', days: 30, exposition: Array(1), cost: 0, ads: true, value: "Free" },
  ];

  public selected: number;

  constructor(private publicationService: PublicationsApiService) { }

  ngOnInit() {
    // this.publicationService.getPlans().subscribe((res:any)=>{
    //   this.plansType = res;
    // })
  }

  selectedPlans(index, plan){
    this.selected = index;
    // this.planSelection.emit({PlanId: plan.PlanId, Comission: plan.PlanComission});
    this.planSelection.emit({PlanId: plan.value, Comission: plan.name});
  }

}
