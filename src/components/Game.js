import React from 'react';
import range from 'lodash/range';
import '../bootstrap.min.css';
import './game.css';
import Stars from './Stars/stars';
import Button from './Button/Button';
import Answer from './Answer/Answer';
import Numbers from './Numbers/Numbers';
import DoneFrame from './DoneFrame/DoneFrame';
 
export default class Game extends React.Component {
    constructor(){
        super();
        this.state = Game.initialState();
    }
    static randomNumber = () => 1 + Math.floor(Math.random() * 9)
    static initialState = () => ({
        selectedNumbers: [],
        randomNumberOfStars: Game.randomNumber(),
        usedNumbers: [],
        answerIsCorrect: null,
        redraws: 5,
        doneStatus: null
    })
    
    startGame = () => {
        this.setState({
            gameStarted: true
        });
    }

    selectNumber = (clickedNumber) => {
        if(this.state.selectedNumbers.indexOf(clickedNumber) >=0){
            return;
        }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }))
    }

    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }))
    }

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }))
    }

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber()
        }), this.updateDoneStatus)
    }
    redraw = () => {
        if(this.state.redraws === 0) {return}
        this.setState(prevState => ({
            randomNumberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            selectedNumbers: [],
            redraws: prevState.redraws -1,
        }), 
           this.updateDoneStatus 
        )
    }
    possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
        const possibleNumbers = range(1, 10).filter(number => 
            usedNumbers.indexOf(number) === -1
        )

        return this.possibleCombinationSum(possibleNumbers, randomNumberOfStars)
    }

    updateDoneStatus = () => {
        this.setState(prevState => {
            if(prevState.usedNumbers.length === 9){
                return { doneStatus: 'You Won!'}
            }
            if(prevState.redraws === 0 && !this.possibleSolutions(prevState)){
                return { doneStatus: 'Game Over!'}
            }
        })
    }

    possibleCombinationSum = function(arr, n) {
        if (arr.indexOf(n) >= 0) {
          return true;
        }
        if (arr[0] > n) {
          return false;
        }
        if (arr[arr.length - 1] > n) {
          arr.pop();
          return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length,
          combinationsCount = 1 << listSize;
        for (var i = 1; i < combinationsCount; i++) {
          var combinationSum = 0;
          for (var j = 0; j < listSize; j++) {
            if (i & (1 << j)) {
              combinationSum += arr[j];
            }
          }
          if (n === combinationSum) {
            return true;
          }
        }
        return false;
      };
      resetGame = () => this.setState(Game.initialState());

      render(){
          return(
              <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={this.state.randomNumberOfStars} />
                    <Button selectedNumbers={this.state.selectedNumbers}
                  redraws={this.state.redraws}
                  checkAnswer={this.checkAnswer}
                  acceptAnswer={this.acceptAnswer}
                  redraw={this.redraw}
                  answerIsCorrect={this.state.answerIsCorrect}/>
                  <Answer
                    selectedNumbers={this.state.selectedNumbers}
                    unselectNumber={this.unselectNumber}
                  />
                </div>
                <br />
                {
                    this.state.doneStatus ? <DoneFrame resetGame={this.resetGame} doneStatus ={this.state.doneStatus} />:
                    <Numbers selectedNumbers={this.state.selectedNumbers}
                         selectNumber={this.selectNumber}
                         usedNumbers={this.state.usedNumbers} />
                }
                
              </div>
          )
      }
}