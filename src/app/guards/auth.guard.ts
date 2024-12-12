import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';


export const authGuard: CanActivateFn = (route, state) => {
 const firebaseSrv = inject(FirebaseService)
 const utilsSrv = inject(UtilsService)

 let user = localStorage.getItem('user')

  return new Promise((resolve) => {
    firebaseSrv.getAuth().onAuthStateChanged((auth)=>{
      if(auth){
        if(user){
          resolve(true)
        }
      }else{
        utilsSrv.routerLink('/auth')
        resolve(false)
      }
    })
  });
};
