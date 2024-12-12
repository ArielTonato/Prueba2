import { Component, inject, OnInit } from '@angular/core';
import { AcademicService } from 'src/app/services/academic.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  constructor(private academicService: AcademicService) { }
  
  utilsSrv = inject(UtilsService)
  tasks: any[] = [];

  ngOnInit() {
    this.loadTareas();
  }


  loadTareas() {
    this.academicService.getTasks().subscribe(
      {
        next: (data) => {
          console.log(data);
          this.tasks = data;
        },
        error: (err) => {
          console.error('Error al cargar tareas:', err);
        }
      }
    );
  }

  openTaskModal(task?: any) {
    let success = this.utilsSrv.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: { task }
    })
    if (success) this.loadTareas();
  }
}
