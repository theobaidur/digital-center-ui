import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, fromEvent } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { HttpBase } from 'src/app/services/http.service';
import { HttpResponse } from 'src/app/interfaces/http-response.interface';
import { RequestParam } from 'src/app/interfaces/request-param.interface';
import { CartItem } from '../interfaces/cart-item.interface';
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

    checkout(items: CartItem[], dagitalCenterId?: string) {
        const total = items.reduce((sum, curr) => sum + (curr.unit_price * curr.quantity), 0);
        return new Promise((resolve, reject) => {
            let address: any = {};
            let phoneOrEmail: string;
            let isPhone: boolean;
            let isEmail: boolean;
            let name: string;
            let shippingAddress: string;
            let deliveryNote: string;
            let done = false;
            let verified = false;
            // tslint:disable-next-line: variable-name
            let order_id: string;
            this.customSwal.mixin({
                confirmButtonText: 'Next &rarr;',
                showCancelButton: true,
                progressSteps: ['1', '2', '3', '4', '5']
              }).queue([
                {
                    title: 'Credentials',
                    html: '<input type="text" id="name" class="swal2-input" placeholder="Enter your name"></input>' +
                      '<input type="text" id="emailOrPassword" class="swal2-input" placeholder="Enter your email or phone"></input>',
                    preConfirm: () => {
                      const nameValue = (Swal.getPopup().querySelector('#name') as HTMLInputElement).value;
                      const contactValue = (Swal.getPopup().querySelector('#emailOrPassword') as HTMLInputElement).value;
                      if (nameValue === '' || nameValue === '') {
                        Swal.showValidationMessage(`Username/Password empty`);
                    } else if (!this.validEmailorNumber(contactValue)) {
                         Swal.showValidationMessage(`Valid phone number or email address needed`);
                      } else {
                          name = nameValue;
                          phoneOrEmail = contactValue;
                          isPhone = this.isPhone(contactValue);
                          isEmail = this.isEmail(contactValue);
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
                    title: 'Shipping Address',
                    text: 'Please! Provide detailed shipping address',
                    onBeforeOpen: (html) => {
                        if ((html.querySelector('textarea.swal2-textarea') as HTMLInputElement)) {
                            (html.querySelector('textarea.swal2-textarea') as HTMLInputElement).value = address.detailed_address;
                        }
                    },
                    inputValue: address.detailed_address || '',
                    input: 'textarea',
                    preConfirm: value => {
                        shippingAddress = value;
                    }
                },
                {
                    title: 'Any special request?',
                    text: `We can't promise but we will try our best to fullfil`,
                    input: 'textarea',
                    preConfirm: value => {
                        deliveryNote = value;
                    }
                },
                {
                    title: 'Total Amount',
                    html: `<p>Total BDT ${total}</p><p>Delivery method: Cash on Delivery</p>`,
                    type: 'question',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        const data: any = {};
                        data.type = 'orders';
                        data.attributes = {
                            digital_center_id: dagitalCenterId,
                            shipping_note: deliveryNote,
                            phoneOrEmail,
                            address_info: {
                                detailed_address: shippingAddress
                            },
                            user_info: {
                                name
                            }
                        };
                        if (isEmail) {
                            data.attributes.user_info.email = phoneOrEmail;
                        }
                        if (isPhone) {
                            data.attributes.user_info.phone = phoneOrEmail;
                        }

                        data.attributes.digital_center_id = dagitalCenterId;
                        data.attributes.shipping_note = deliveryNote;
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
                                throw new Error('Something went wrong');
                            })
                        ).toPromise().then(() => this.customSwal.insertQueueStep({
                            title: 'Verify',
                            text: `We sent you a verification code. Write the code here. The order won't be processed until verified`,
                            input: 'text',
                            showLoaderOnConfirm: true,
                            cancelButtonText: `Verify later`,
                            confirmButtonText: `Confirm`,
                            inputValidator: value => value ? null : 'Not valid',
                            preConfirm: async (code: string) => {
                                data.attributes = {phoneOrEmail, code};
                                endpoint = 'orders/verify';
                                await this.httpService.post(endpoint, { data })
                                .pipe(filter(response => this.validOrderResponse(response)), tap(() => verified = true)).toPromise();
                                return this.customSwal.insertQueueStep({
                                    title: 'Congratulations!',
                                    html: `The order is verified. You can use this id <strong>(${order_id})</strong> to track your order`,
                                    showConfirmButton: false,
                                    cancelButtonText: 'Close'
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
        private httpService: HttpBase
    ) {}
}
