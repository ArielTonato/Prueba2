import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  // Método para obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }
}