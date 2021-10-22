import {Directive, HostListener, OnDestroy} from '@angular/core';

@Directive({
  selector: 'input[type=password][ngxPwdStrength]',
  exportAs: 'ngxPwdStrength'
})

export class NgxPwdStrengthDirective implements OnDestroy{
  /*
   * Password must be atleast 12 characters long (10 pts)                      => /^(.){12,}$/
   * Password must contain atleast a lowercase letter (5 pts)                  => /^(?=.*[a-z])(.*)$/
   * Password must contain atleast an uppercase letter (5 pts)                 => /^(?=.*[A-Z])(.*)$/
   * Password must contain atleast a digit (5 pts)                             => /^(?=.*[0-9])(.*)$/
   * Password must contain atleast a symbol (10 pts)                           => /^(?=.*[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#])([a-zA-Z0-9-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]*)$/
   * Password must contain atleast 5 unique characters (5 pts)                 => /(?:(.)(?<=^(?:(?!\1).)*\1)(?=(?:(?!\1).)*$).*?){5,}/
   * --------------------------------------------------------------------------------------
   * str = 'abdellahb';
   * const data = str.split('');
   * const map = data.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
   * const filtered = [...map.entries()].filter(([key, value]) => value === 1);
   * --------------------------------------------------------------------------------------
   * */

  regexLength = /^(.){12,}$/;
  regexAtleastLowercase = /^(?=.*[a-z])(.*)$/;
  regexAtleastLUpperercase = /^(?=.*[A-Z])(.*)$/;
  regexAtleastLDigit = /^(?=.*[0-9])(.*)$/;
  regexAtleastLSymbole = /^(?=.*[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#])([a-zA-Z0-9-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]*)$/;
  regexAtleastUniqueCharacters = /(?:(.)(?<=^(?:(?!\1).)*\1)(?=(?:(?!\1).)*$).*?){5,}/;


  constructor() { }

  @HostListener("focusin", ["$event.target.value"])
  onMouseEnter(value: any): void {
    //show popup
    this.ratePassword(value);
  }

  ratePassword(password: string) {
    let score = 0;
    let matches = 0;
    if(this.regexLength.test(password)) {
      score += 10;
      matches++;
    }
    if(this.regexAtleastLowercase.test(password)) {
      score += 5;
      matches++;
    }
    if(this.regexAtleastLUpperercase.test(password)) {
      score += 5;
      matches++;
    }
    if(this.regexAtleastLDigit.test(password)) {
      score += 5;
      matches++;
    }
    if(this.regexAtleastLSymbole.test(password)) {
      score += 5;
      matches++;
    }
    if(this.regexAtleastUniqueCharacters.test(password)) {
      score += 10;
      matches++;
    }

    return score + matches * 10;

  }

  ngOnDestroy(): void {
  }

}
