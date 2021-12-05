# NgxPwdStrength

Estimate the strength of the password using [zxcvbn](https://github.com/dropbox/zxcvbn), and display a visual password strength bar
and feedback with suggestions and warning messages to help choose better passwords.

[Live Demo](https://el-abdel.github.io/ngx-pwd-strength/)

## Installation

Install [zxcvbn](https://github.com/dropbox/zxcvbn) (as the lib depends on) and `NgxPwdStrength` via npm:

```sh
npm install zxcvbn3 ngx-pwd-strength --save
```

## Configuration

Import NgxPwdStrength Module into the app module

```ts
import { NgxPwdStrengthModule } from 'ngx-pwd-strength';

@NgModule({

    imports: [
      NgxPwdStrengthModule
    ]

})
export class AppModule { }
```

## Usage

Add `ngxPwdStrength` directive to inputs of type = password

```html
<input type="password" ngxPwdStrength name="password" placeholder="Password">
```
