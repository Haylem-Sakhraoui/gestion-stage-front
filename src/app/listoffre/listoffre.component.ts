import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StageService } from '../services/stage.service';
import { Stage } from '../models/stage';

@Component({
  selector: 'app-listoffre',
  templateUrl: './listoffre.component.html',
  styleUrls: ['./listoffre.component.css']
})
export class ListoffreComponent {
  stages!: Observable<Stage[]>;

  constructor(private stageservice:StageService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.stages = this.stageservice.getStageList();
  }
  updateStage(stage: Stage, field: string, value: any) {
    (stage as any)[field] = value;
    // You might want to call a service method here to update the stage data on the server
  }
}
