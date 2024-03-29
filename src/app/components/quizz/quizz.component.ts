import { Component } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'


@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
 titles: string = '';
 questions:any
 questionSelection:any

 answers: string[]= [];
 answersSelect:string =""

 questionIndex:number = 0;
 questionMaxIndex:number = 0;

 finished:boolean = false;

 imgVictori:string = 'assets/imgs/luffybando.jpeg';
 imgErro:string = ''

 poscetagem :number = 50;

 ngOnInit():void{
   if(quizz_questions){
    this.finished = false;
    this.titles = quizz_questions.title;
    this.questions = quizz_questions.questions;
    this.questionSelection = this.questions[this.questionIndex]

    this.questionIndex = 0;
    this.questionMaxIndex = this.questions.length;
   }
 }

 playChoose(value:string){
  this.nextStep();
  this.answers.push(value);

 }

 async nextStep (){

  this.questionIndex += 1;
  if(this.questionMaxIndex > this.questionIndex){
   this.questionSelection = this.questions[this.questionIndex]
  }else{
    const finalAnswers:string = await this.checkResults(this.answers)
  this.finished = true ;
  this.answersSelect = quizz_questions.results[finalAnswers as keyof
    typeof quizz_questions.results]
  }
 }

 async checkResults(answers:string[]){
    const result = answers.reduce((previous, current,_i,arr) => {
      if(
        arr.filter(item => item === previous ).length >
        arr.filter(item => item === current).length
      ){
       return previous;

      }else{
       return current ;
      }
    })
    return result ;
 }
}
