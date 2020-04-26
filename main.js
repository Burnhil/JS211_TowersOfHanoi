'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}


// Next, what do you think this function should do?
const movePiece = (removed, placed) => {
  // Your code here
  //console.log("Entering move pices");
  let movingPiece = stacks[removed].pop();
  stacks[placed].push(movingPiece);
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (move1, move2) => {
  // Your code here
      
  let removedPiece = stacks[move1][stacks[move1].length - 1];
  let newPieceSpot = stacks[move2][stacks[move2].length - 1];

  //console.log(newPieceSpot);

  if(newPieceSpot === undefined){
    //console.log("yeah we have and undefined!!!!!!!!");
    return true;
  }else{
    //console.log("WE HAVE NUMBERS IN ARRAY!");
    if(removedPiece < newPieceSpot){
      return true;
    }else{
      return false;
    }
  }

}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  let test = [4, 3, 2, 1];
  let resultsB = "";
  let resultsC = "";
  let bLength = stacks.b.length;
  let cLength = stacks.c.length;

  
  for(let i=0; i < stacks.b.length; i++){
    if(stacks.b[i] !== test[i]){
      resultsB = false;
    }else{
      resultsB = true;
    }
  }

  for(let i=0; i < stacks.c.length; i++){
    if(stacks.c[i] !== test[i]){
      resultsC = false;
    }else{
      resultsC = true;
    }
  }
  
  //comparing array to test and length to ensure winner
  if(resultsB && bLength == 4 || resultsC && cLength == 4){
    return true;
  }else{
    return false;
  }

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {

  // Your code here
  if(isLegal(startStack, endStack) === true){
    movePiece(startStack, endStack);
  }else{
    console.log("Illegal move sorry try again!");
  }

  if(checkForWin()){
    console.log("We have a winner game over!!!");
  }



}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
