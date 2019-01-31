
  export type Qunami ={
      qRating: number;
      name: string;
  }
  export type Que={
      qunamiUsers: Qunami[];
  }

  export type Questions=
  {
    questionText: string;
    optionA:string;
    optionB:string;
    optionC:string;
    optionD:string;
    correctAnswer:string;
    // sourceDifficultyLevel:string;
    
    
    // questionCategory:string;
  }

  export type Rec=
  { allQuestions:{
    edges:[
        
    ]    } 

  }