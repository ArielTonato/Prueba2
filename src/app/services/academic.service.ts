import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Task {
    titulo: string;
    descripcion: string;
    date: Date;
    status: string;  // Estado de la tarea, por ejemplo: 'pendiente', 'completada'
}

@Injectable({
    providedIn: 'root'
})
export class AcademicService {
    private subjectsCollection = 'materia';  // Nombre de la colección en Firebase
    private tasksCollection = 'tareas';

    constructor(private firestore: AngularFirestore) { }

    // Obtener materias desde Firebase
    getSubjects(): Observable<any[]> {
        return this.firestore.collection(this.subjectsCollection).valueChanges();
    }

    // Obtener tareas desde Firebase
    getTasks(): Observable<any[]> {
        return this.firestore.collection(this.tasksCollection).valueChanges();
    }

    // Agregar una tarea a Firestore
    async addTask(task: any): Promise<void> {
        const taskRef = this.firestore.collection(this.tasksCollection).doc();  // Crear un nuevo documento con un ID auto-generado
        try {
            return await taskRef.set({
                titulo: task.titulo,
                descripcion: task.descripcion,
                date: task.date
            });
        } catch (error) {
            console.error('Error al agregar la tarea:', error);
            throw new Error('Error al agregar la tarea');
        }
    }

    // Actualizar una tarea existente
    async updateTask(taskId: string, task: any): Promise<void> {
        const taskRef = this.firestore.collection(this.tasksCollection).doc(taskId);
        return taskRef.update({
            titulo: task.titulo,
            descripcion: task.descripcion,
            date: task.date
        }).catch(error => {
            console.error('Error al actualizar la tarea:', error);
            throw new Error('Error al actualizar la tarea');
        });
    }
}
