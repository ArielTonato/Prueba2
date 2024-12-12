import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { orderBy } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  utilsSrv = inject(UtilsService)
  firebaseSrv = inject(FirebaseService)

  products: Product[] = []
  loading: boolean = false

  user(): User {
    return this.utilsSrv.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getProducts()
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getProducts();
      event.target.complete();
    }, 1000);
  }

  // ====== Obtener ganancias =====
  getProfits() {
    return this.products.reduce((index, product) => index + product.price * product.soldUnits, 0);
  }

  // ====== Obtener productos =====
  getProducts() {
    let path = `users/${this.user().uid}/products`;
    console.log(path);
    this.loading = true;

    let query = [
      orderBy('soldUnits', 'desc'),
    ]

    let sub = this.firebaseSrv.getCollectionData(path, query).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;
        this.loading = false;
        sub.unsubscribe();
      }
    })
  }

  async addUpdateProduct(product?: Product) {
    let success = await this.utilsSrv.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: { product }
    })
    if (success) this.getProducts();
  }

  // async confirmDeleteProduct(product: Product) {
  //   const confirmed = await this.utilsSrv.presentAlertConfirm({
  //     header: 'Confirmar eliminación',
  //     message: `¿Estás seguro de que deseas eliminar el producto "${product.name}"?`,
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Eliminación cancelada');
  //         }
  //       },
  //       {
  //         text: 'Eliminar',
  //         role: 'confirm',
  //         handler: async () => {
  //           await this.deleteProduct(product);
  //         }
  //       }
  //     ]
  //   });

  //   if (confirmed) {
  //     await this.deleteProduct(product);
  //     this.getProducts();
  //   }
  // }

//   private async deleteProduct(product: Product) {
//     try {
//       const path = `users/${this.user().uid}/products/${product.id}`;
//       await this.firebaseSrv.deleteDocument(path);

//       if (product.image) {
//         const filePath = await this.firebaseSrv.getFilePath(product.image);
//         await this.firebaseSrv.deleteFile(filePath);
//         await this.firebaseSrv.deleteFile(product.image);
//       }
// //pathImage
//       this.utilsSrv.showToast({
//         message: 'Producto eliminado correctamente',
//         duration: 2000
//       });
//     } catch (error) {
//       console.error('Error eliminando producto: ', error);
//       // this.utilsSrv.showToast({
//       //   // message: 'Error eliminando producto',
//       //   duration: 2000
//       // });
//     }
//   }

}
