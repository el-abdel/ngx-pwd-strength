import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {zxcvbn} from "zxcvbn3";
import {PwdScore} from "./types";

@Injectable()
export class NgxPwdStrengthService {

  private score = new BehaviorSubject<any>(null);
  public updatedScore$ = this.score.asObservable();

  updateScore(data: any): void {
    this.score.next(data);
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
  getScoreWithFeedback(password: string): PwdScore{
    const result = zxcvbn(password);
    return { score: result.score, feedback: result.feedback };
  }
}
