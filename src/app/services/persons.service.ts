import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

//Models.
import { Person } from '../models/Person'; 

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  private _firstNames: string[] = ["James","Robert","John","Michael","David","William","Richard","Joseph","Thomas","Charles","Christopher","Daniel","Matthew","Anthony","Mark","Donald","Steven","Paul","Andrew","Joshua","Kenneth","Kevin","Brian","George","Timothy","Mary","Patricia","Jennifer","Linda","Elizabeth","Barbara","Susan","Jessica","Sarah","Karen","Lisa","Nancy","Betty","Margaret","Sandra","Ashley","Kimberly","Emily","Donna","Michelle","Carol","Amanda","Dorothy","Melissa","Deborah"];
  private _lastNames: string[] = ["Smith","Jones","Taylor","Williams","Brown","White","Harris","Martin","Davies","Wilson","Cooper","Evans","King","Thomas","Baker","Green","Wright","Johnson","Edwards","Clark","Roberts","Robinson","Hall","Lewis","Clarke","Young","Davis","Turner","Hill","Phillips","Collins","Allen","Moore","Thompson","Carter","James","Knight","Walker","Wood","Hughes","Parker","Ward","Bennett","Cook","Webb","Bailey","Scott","Jackson","Lee","Cox"];

  private _maxRandomNumber: number = 50;

  private _personNumber: number = 1;

  private _allPersons: Person[] = [];

  private _updatePersons: ReplaySubject<boolean>;

  constructor() {
    this._updatePersons = new ReplaySubject<boolean>();
  }

  generateRandomPersons(amount: number) : void {
    for(let i = 0; i < amount; i++) {
      let randomIndex01: number = Math.floor(Math.random() * this._maxRandomNumber);
      let randomIndex02: number = Math.floor(Math.random() * this._maxRandomNumber);     
      let randomAge: number = Math.floor(Math.random() * (65 - 18) + 18) ;

      this._allPersons.push(new Person(this._personNumber, this._firstNames[randomIndex01], this._lastNames[randomIndex02], randomAge));
      this._personNumber++;;
    }
  }

  getAllPersons() : Person[] {
    return this._allPersons;
  }

  setUpdatePersons(value: boolean) : void {
    this._updatePersons.next(value)
  }
  
  getUpdatePersons() : ReplaySubject<boolean> {
    return this._updatePersons;
  }

}