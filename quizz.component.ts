import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string = 'Novo titulo'
  caracteristicas:any
  personagem:any

  questions:any
  questionSelect:any

  answers:string[] = []
  answerSelect:string = ''

  personagemIndex:number = 0
  personagemSelected:any
  personagemMaxIndex:number = 0

  questionIndex:number = 0
  questionMaxIndex:number = 0


  finished:boolean = false
  constructor() { }


  ngOnInit(): void {

    if(quizz_questions) {
      this.finished = false
      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      this.personagemIndex = 0
      this.personagemSelected = quizz_questions.personagens[this.personagemIndex]
      this.personagem = this.personagemSelected.name

      this.caracteristicas = quizz_questions.personagens[this.personagemIndex].caracteristicas


      this.questionSelect = quizz_questions.questions[this.questionIndex]


      
      
    }
  }

  PlayerChoose(value:string) {
    this.answers.push(value)
    this.nextStep()
    console.log(this.questionIndex)
  }
  async nextStep() {
    this.questionIndex += 1
    console.log(this.questions)
    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelect = this.questions[this.questionIndex]

    } else {
      const finalAnswer:string = await this.checkResults(this.answers)
      this.finished = true
      this.answerSelect = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async checkResults(answers:string[]) {
    
    for(let i = 0; i <= quizz_questions.personagens.length; i++ ){
      this.personagemSelected = quizz_questions.personagens[i]
      if(JSON.stringify(answers) === JSON.stringify(this.personagemSelected.caracteristicas)){
        alert(`${this.personagem}`)
        
        return this.personagem
      } else { 
        this.personagemIndex += 1 
        alert(`${this.personagemIndex } \n ${this.personagem}`)}
    }
  }
}
