import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, fromEvent } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { HttpBase } from 'src/app/services/http.service';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { RequestParam } from 'src/app/interfaces/request-param.interface';
import { CartItem } from '../interfaces/cart-item.interface';
import { LanguageService } from 'src/app/services/language.service';
import { DeliveryArea } from '../../admin/models/delivery-area.model';
@Injectable({
    providedIn: 'root'
})
export class StoreUiService {
    collapseSideNav: BehaviorSubject<boolean> = new BehaviorSubject(false);
    cartShown: BehaviorSubject<boolean> = new BehaviorSubject(false);
    windowWidth: BehaviorSubject<number> = this.createWindowWatcher();
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
    createWindowWatcher() {
        const subject = new BehaviorSubject(window.innerWidth);
        merge(fromEvent(window, 'load'), fromEvent(window, 'resize'))
        .pipe(
            map(() => window.innerWidth)
        ).subscribe(val => subject.next(val), err => subject.error(err), () => subject.complete());
        return subject;
    }

    isSmallScreen() {
        return this.windowWidth.getValue() < 768;
    }

    confirm(title: string, html: string) {
        return this.customSwal.fire({title, html, type: 'warning', showCancelButton: true});
    }

    isEmail(value: string) {
        const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailRegex.test(value);
    }

    isPhone(value: string) {
        const phoneRegex =  /(^(88)?(01){1}[3456789]{1}(\d){8})$/;
        return phoneRegex.test(value);
    }

    validEmailorNumber(value: string) {
        return this.isEmail(value) || this.isPhone(value);
    }

    userByEmailIOrPhone(phoneOrEmail: string) {
        const root = `users`;
        const filters: RequestParam[] = [];
        let field: string;
        if (this.isEmail(phoneOrEmail)) {
            field = 'email';
        } else {
            field = 'phone';
        }
        filters.push({
            property: `filter[${field}]`,
            value: `like,${phoneOrEmail}`
        });
        return this.httpService.get<HttpResponse<any>>(root, ['address'], filters);
    }

    validOrderResponse(response: any) {
        if (response && response.data && (response.data as any).id) {
            return true;
        }
        return false;
    }

    checkout(items: CartItem[], digitalCenterId?: string, deliveryAreas: DeliveryArea[] = []) {
        const total = items.reduce((sum, curr) => sum + (curr.unit_price * curr.quantity), 0);
        const lang = this.languageService.language.getValue().toLowerCase();
        const token1 = lang === 'bn' ? 'পরবর্তি ধাপ &rarr;' : 'Next &rarr;';
        const token2 = lang === 'bn' ? 'তথ্যাদি' : 'Credentials';
        const token3 = lang === 'bn' ? 'আপনার নাম' : 'Enter your name';
        const token4 = lang === 'bn' ? 'আপনার ফোন নাম্বার' : 'Enter your phone number';
        const token5 = lang === 'bn' ? 'আপনার পাসওয়ার্ড' : 'Username/Password empty';
        const token6 = lang === 'bn' ? 'সঠিক ফোন নাম্বার প্রয়োজন' : 'Valid phone number needed';
        const token7 = lang === 'bn' ? 'ঠিকানা (যেখানে পন্য পাঠানো হবে)' : 'Shipping Address';
        const token8 = lang === 'bn' ? 'দয়া করে বিস্তারিত ঠিকানা দিন' : 'Please! Provide detailed shipping address';
        const token11 = lang === 'bn' ? `<p>সর্বমোট <span id="total-price-span"></span> টাকা</p><p>লেনদেনের পদ্ধতি: ডেলিভারির সময় নগদ</p>`
        : `<p>Total BDT <span id="total-price-span"></span></p><p>Delivery method: Cash on Delivery</p>`;
        const token12 = lang === 'bn' ? 'কিছু একটা সমস্যা হয়েছে' : 'Something went wrong';
        const token13 = lang === 'bn' ? 'ভ্যারিফাই' : 'Verify';
        const token14 = lang === 'bn' ? `আমরা আপনার ফোনে একটা নম্বর পাঠিয়েছি।
         ভ্যারিফিকেশনের জন্য নম্বরটি লিখুন। ভ্যারিফিকেশন ব্যাতিত আপনার অর্ডার সম্পন্ন হবে না` : `We sent you a verification code.
        Write the code here. The order won't be processed until verified`;
        const token15 = lang === 'bn' ? 'পরে ভ্যারিফাই করব' : 'Verify later';
        const token16 = lang === 'bn' ? 'নিশ্চিত করুন' : 'Confirm';
        const token17 = lang === 'bn' ? 'প্রদত্ত তথ্য ঠিক নয়' : 'Not valid';
        const token18 = lang === 'bn' ? 'অভিনন্দন!' : 'Congratulations!';
        const token19 = lang === 'bn' ? 'বন্ধ করুন' : 'Close';
        const token20 = lang === 'bn' ? 'সর্বমোট' : 'Total Amount';
        const token22 = lang === 'bn' ? 'বাতিল করুন' : 'Cancel';
        const token23 = lang === 'bn' ? 'ঠিকানা' : 'Address';
        const token24 = lang === 'bn' ? 'এলাকা নির্বাচন করুন' : 'Select Area';
        const token25 = lang === 'bn' ? 'দয়া করে আপনার ঠিকান দিন' : 'Please! Provide your address';

        return new Promise((resolve, reject) => {
            let address: any = {};
            let phoneOrEmail: string;
            let isPhone: boolean;
            let isEmail: boolean;
            let name: string;
            let deliveryAddress: string;
            let deliveryAreaId: string;
            let done = false;
            let verified = false;
            // tslint:disable-next-line: variable-name
            let order_id: string;
            this.customSwal.mixin({
                confirmButtonText: token1,
                cancelButtonText: token22,
                showCancelButton: true,
                progressSteps: lang === 'bn' ? ['১', '২', '৩', '৪'] : ['1', '2', '3', '4']
              }).queue([
                {
                    title: token2,
                    html: `<input type="text" id="name" class="swal2-input" placeholder="${token3}"></input>
                    <input type="text" id="emailOrPassword" class="swal2-input" placeholder="${token4}"></input>`,
                    preConfirm: () => {
                      const nameValue = (Swal.getPopup().querySelector('#name') as HTMLInputElement).value;
                      const contactValue = (Swal.getPopup().querySelector('#emailOrPassword') as HTMLInputElement).value;
                      if (nameValue === '' || nameValue === '') {
                        Swal.showValidationMessage(token5);
                    } else if (!this.isPhone(contactValue)) {
                         Swal.showValidationMessage(token6);
                      } else {
                          name = nameValue;
                          phoneOrEmail = contactValue;
                          isPhone = true;
                          isEmail = false;
                          return this.userByEmailIOrPhone(contactValue).pipe(
                              map(response => {
                                  if (resolve && response.included && response.included[0]) {
                                    const addr: any = response.included[0];
                                    address = {};
                                    address.id = addr.id;
                                    address = {...address, ...addr.attributes};
                                  }
                                  return response;
                              })
                          ).toPromise().then(() => {
                              return address;
                          });
                      }
                    }
                  },
                {
                    title: token7,
                    text: token8,
                    onBeforeOpen: async (html) => {
                        const val = address && address.detailed_address ? address.detailed_address : '';
                        if ((html.querySelector('#delivery_address') as HTMLInputElement)) {
                            (html.querySelector('#delivery_address') as HTMLInputElement).value = val;
                        }
                        if ((html.querySelector('#delivery_area') as HTMLInputElement)) {
                            const options = deliveryAreas
                            .filter(each => each.digital_center_id === digitalCenterId)
                            .map(item => {
                                const prop = item.selected ? 'selected' : '';
                                return `<option value="${item.id}" ${ prop }>
                                ${ lang === 'bn' ? item.delivery_area_bn || item.delivery_area : item.delivery_area}</option>`;
                            });
                            options.unshift(`<option value="">${ token24 }</option>`);
                            (html.querySelector('#delivery_area') as HTMLInputElement).innerHTML = options.join('');
                        }
                    },
                    inputValue: address && address.delivery_address ? address.delivery_address : '',
                    html: `
                    <div class="form-group text-left">
                        <label for="delivery_area">${token24}</label>
                        <select id="delivery_area" class="swal2-input my-0"></select>
                    </div>
                    <div class="form-group text-left">
                        <label for="delivery_address">${token23}</label>
                        <textarea id="delivery_address" class="swal2-textarea my-0"></textarea>
                    </div>
                    `,
                    preConfirm: () => {
                        deliveryAddress = (Swal.getPopup().querySelector('#delivery_address') as HTMLInputElement).value;
                        deliveryAreaId = (Swal.getPopup().querySelector('#delivery_area') as HTMLInputElement).value;
                        if (!((deliveryAddress || '').trim() && (deliveryAreaId || '').trim())) {
                            Swal.showValidationMessage(token25);
                        }
                    }
                },
                {
                    title: token20,
                    html: token11,
                    type: 'question',
                    showLoaderOnConfirm: true,
                    onBeforeOpen: html => {
                        const deliveryCharge = deliveryAreas.filter(each => each.id === deliveryAreaId)
                        .reduce((sum, curr) => sum + (+curr.delivery_charge), 0);
                        html.querySelector('#total-price-span').innerHTML = (deliveryCharge + total).toFixed(2);
                    },
                    preConfirm: () => {
                        const data: any = {};
                        data.type = 'orders';
                        data.attributes = {
                            digital_center_id: digitalCenterId,
                            delivery_area_id: deliveryAreaId,
                            phoneOrEmail,
                            deliveryAddress,
                            user_info: {
                                name
                            }
                        };
                        if (isPhone) {
                            data.attributes.user_info.phone = phoneOrEmail;
                        }

                        data.attributes.digital_center_id = digitalCenterId;
                        data.attributes.delivery_area_id = deliveryAreaId;
                        data.attributes['order-items'] = [];
                        items.forEach(item => {
                            data.attributes['order-items'].push({
                                product_id: item.id,
                                quantity : item.quantity

                            });
                        });
                        let endpoint = 'orders/checkout';
                        return this.httpService.post(endpoint, {data}).pipe(
                            map(response => {
                                if (this.validOrderResponse(response)) {
                                    order_id = (response.data as any).attributes.order_id;
                                    done = true;
                                    return true;
                                }
                                throw new Error(token12);
                            })
                        ).toPromise().then(() => this.customSwal.insertQueueStep({
                            title: token13,
                            text: token14,
                            input: 'text',
                            showLoaderOnConfirm: true,
                            cancelButtonText: token15,
                            confirmButtonText: token16,
                            inputValidator: value => value ? null : token17,
                            preConfirm: async (code: string) => {
                                const token21 = lang === 'bn' ? `আপনার অর্ডারটি ভ্যারিফাইড হয়েছে` : `The order is verified`;
                                data.attributes = {phoneOrEmail, code};
                                endpoint = 'orders/verify';
                                await this.httpService.post(endpoint, { data })
                                .pipe(filter(response => this.validOrderResponse(response)), tap(() => verified = true)).toPromise();
                                return this.customSwal.insertQueueStep({
                                    title: token18,
                                    html: token21,
                                    showConfirmButton: false,
                                    cancelButtonText: token19
                                });
                            }
                        }));
                    }
                }
              ]).then(() => {
                if (done) {
                  resolve({done, verified});
                } else {
                    reject();
                }
              });
        });
    }

    constructor(
        private httpService: HttpBase,
        private languageService: LanguageService    ) {}
}
