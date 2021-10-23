import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class NgxPwdStrengthService {

  private score = new BehaviorSubject<number>(0);
  public updatedScore$ = this.score.asObservable();

  updateScore(data: number): void {
    this.score.next(data);
  }
}
