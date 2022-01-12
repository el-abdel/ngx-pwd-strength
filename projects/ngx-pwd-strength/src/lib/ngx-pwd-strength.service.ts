import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {zxcvbn} from "zxcvbn3";
import {pwdConfiguration, PwdScore} from "./types";

@Injectable()
export class NgxPwdStrengthService {

  private _options: pwdConfiguration = { enableFeedback: true };

  private score = new BehaviorSubject<any>(null);
  public updatedScore$ = this.score.asObservable();

  updateScore(data: any): void {
    this.score.next(data);
  }

  init (options: pwdConfiguration) {
    this._options = options;
  }

  /**
   * Score:
   * 0 # too guessable: risky password. (guesses < 10^3)
   * 1 # very guessable: protection from throttled online attacks. (guesses < 10^6)
   * 2 # somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)
   * 3 # safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)
   * 4 # very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)
   * @param password
   */
  getScore(password: string): PwdScore{
    const result = zxcvbn(password);
    return this._options.enableFeedback ? { score: result.score, feedback: result.feedback } : { score: result.score }
  }
}
