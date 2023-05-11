import { Injectable } from '@angular/core';

//Models.
import { Person } from '../models/Person'; 

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  private _firstNames: string[] = ["James","Robert","John","Michael","David","William","Richard","Joseph","Thomas","Charles","Christopher","Daniel","Matthew","Anthony","Mark","Donald","Steven","Paul","Andrew","Joshua","Kenneth","Kevin","Brian","George","Timothy","Mary","Patricia","Jennifer","Linda","Elizabeth","Barbara","Susan","Jessica","Sarah","Karen","Lisa","Nancy","Betty","Margaret","Sandra","Ashley","Kimberly","Emily","Donna","Michelle","Carol","Amanda","Dorothy","Melissa","Deborah"];
  private _lastNames: string[] = ["Smith","Jones","Taylor","Williams","Brown","White","Harris","Martin","Davies","Wilson","Cooper","Evans","King","Thomas","Baker","Green","Wright","Johnson","Edwards","Clark","Roberts","Robinson","Hall","Lewis","Clarke","Young","Davis","Turner","Hill","Phillips","Collins","Allen","Moore","Thompson","Carter","James","Knight","Walker","Wood","Hughes","Parker","Ward","Bennett","Cook","Webb","Bailey","Scott","Jackson","Lee","Cox"];

  private _maxRandomNumber: number = 50;

  private _allPersons: Person[] = [];

  constructor() { }

  generateRandomPersons(amount: number) : void {
    for(let i = 0; i < amount; i++) {
      let randomIndex01: number = Math.random() * this._maxRandomNumber;
      let randomIndex02: number = Math.random() * this._maxRandomNumber;
      
      let p: Person = new Person(this._firstNames[randomIndex01], this._lastNames[randomIndex02]);
      this._allPersons.push(p);
    }
  }

  getAllPersons() : Person[] {
    return this._allPersons;
  }

}