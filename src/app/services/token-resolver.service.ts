import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageService } from './language.service';
import { distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { LanguageTokenList } from '../interfaces/LanguageTokenList';

@Injectable({
    providedIn: 'root'
})
export class TokenResolverService {
    tokens: BehaviorSubject<LanguageTokenList> = new BehaviorSubject({});
    register(tokens: LanguageTokenList) {
        const currentList = this.tokens.getValue();
        const newList = {...currentList, ...tokens};
        this.tokens.next(newList);
    }

    resolve(key: any, hasNumber: boolean = false) {
        return this.languageService.language.pipe(
            distinctUntilChanged(),
            switchMap(() => {
                const lang = this.languageService.language.getValue().toLowerCase();
                if (lang === 'bn' && hasNumber) {
                    key = key.toString()
                            .replace(new RegExp('0', 'gi'), '০')
                            .replace(new RegExp('1', 'gi'), '১')
                            .replace(new RegExp('2', 'gi'), '২')
                            .replace(new RegExp('3', 'gi'), '৩')
                            .replace(new RegExp('4', 'gi'), '৪')
                            .replace(new RegExp('5', 'gi'), '৫')
                            .replace(new RegExp('6', 'gi'), '৬')
                            .replace(new RegExp('7', 'gi'), '৭')
                            .replace(new RegExp('8', 'gi'), '৮')
                            .replace(new RegExp('9', 'gi'), '৯');

                }
                return this.tokens.pipe(
                    map(() => {
                        const tokenList = this.tokens.getValue();
                        const token = tokenList[key] || {bn: key, en: key};
                        return token[lang];
                    })
                );
            })
        );
    }

    constructor(
        private languageService: LanguageService
    ) {}
}
