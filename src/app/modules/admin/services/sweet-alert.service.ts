import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class SweetAlertService {
    swal: typeof Swal;
    get customSwal() {
        if (!this.swal) {
            this.swal = Swal.mixin({
                customClass: {
                    container: `custom-swal`
                }

            });
        }
        return this.swal;
    }
    constructor(
        private langugeService: LanguageService,
        private router: Router
    ) {}
    saving(title: string = 'Saving...') {
        this.customSwal.fire({
            title,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                this.customSwal.showLoading();
            }
        });
    }

    shopClosed() {
        const lang = this.langugeService.language.getValue().toLowerCase();
        let title = 'দোকান সাময়িকভাবে বন্ধ';
        let text = 'কিছুদিন পর আবার চেষ্টা করুন';
        if (lang === 'en') {
            title = 'Shop closed temporarily';
            text = 'Try again after few days';
        }
        this.customSwal.fire({
            title,
            text,
            type: 'warning',
            allowOutsideClick: false,
            showCloseButton: true,
            showConfirmButton: false,
            onBeforeOpen: () => {
                this.router.navigate(['/shop/stores']);
            }
        });
    }

    done(title: string = 'Done') {
        this.customSwal.fire({
            title,
            showCancelButton: true,
            cancelButtonText: 'Close',
            showConfirmButton: false,
            type: 'success',
            timer: 3000
        });
    }

    failed(title: string = 'Failed') {
        this.customSwal.fire({
            title,
            showCancelButton: true,
            cancelButtonText: 'Close',
            showConfirmButton: false,
            type: 'error',
            timer: 3000
        });
    }

    loading(title: string = 'Loading...') {
        this.customSwal.fire({
            title,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                this.customSwal.showLoading();
            }
        });
    }

    delete(text: string = 'Are you sure?', title: string= 'Delete') {
        return this.customSwal.fire({
            type: 'question',
            title,
            text,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            focusCancel: true
        });
    }

    close() {
        this.customSwal.close();
    }
}
