var Draw = function(){
  this.teams = [algeria , argentina , australia , brazil , chile , england , france , germany , ghana , ivoryCoast , japan , mexico , ireland , southKorea , spain , usa];
  this.groupA = [0,0,0,0];
  this.groupB = [0,0,0,0];
  this.groupC = [0,0,0,0];
  this.groupD = [0,0,0,0];
  this.groupAMatches = [];
  this.groupBMatches = [];
  this.groupCMatches = [];
  this.groupDMatches = [];
  this.groupATable = [];
  this.groupBTable = [];
  this.groupCTable = [];
  this.groupDTable = [];
  this.groupATableUnsorted = [];
  this.groupBTableUnsorted = [];
  this.groupCTableUnsorted = [];
  this.groupDTableUnsorted = [];
  this.groupArray = [this.groupA , this.groupB , this.groupC , this.groupD];


  this.teamDistribute = function(){
    for(var i = 0; i < this.teams.length; i++){
      this.randomGroup(this.teams[i]);
    }
  };

  this.fixtureGenerate = function(){
    var j = 1;
    for(var i =0; i < this.groupArray.length; i++){
      var match_j = new Match(this.groupArray[i][0].nation,this.groupArray[i][1].nation,this.groupArray[i][0].picked,this.groupArray[i][1].picked);
      this.matchArray(i,match_j);
      var k = j+1;
      var match_k = new Match(this.groupArray[i][2].nation,this.groupArray[i][3].nation,this.groupArray[i][2].picked,this.groupArray[i][3].picked);
      this.matchArray(i,match_k);
      var l = j+8;
      var match_l = new Match(this.groupArray[i][0].nation,this.groupArray[i][2].nation,this.groupArray[i][0].picked,this.groupArray[i][2].picked);
      this.matchArray(i,match_l);
      var m = j+9;
      var match_m = new Match(this.groupArray[i][1].nation,this.groupArray[i][3].nation,this.groupArray[i][1].picked,this.groupArray[i][3].picked);
      this.matchArray(i,match_m);
      var n = j+16;
      var match_n = new Match(this.groupArray[i][0].nation,this.groupArray[i][3].nation,this.groupArray[i][0].picked,this.groupArray[i][3].picked);
      this.matchArray(i,match_n);
      var o = j+17;
      var match_o = new Match(this.groupArray[i][1].nation,this.groupArray[i][2].nation,this.groupArray[i][1].picked,this.groupArray[i][2].picked);
      this.matchArray(i,match_o);
      j+=2;
    }
  };

  this.randomGroup = function(nation){
    //Random Choosing of group
    var random = Math.random();
    if(random < 0.25) {
      var group =  this.groupA;
    } else if(random < 0.5){
      var group = this.groupB;
    } else if(random < 0.75){
      var group = this.groupC;
    } else {
      var group = this.groupD;
    }
    //random choosing of group slot
    var random = Math.random();
    if(random < 0.25) {
      var slot = 0;
    } else if(random < 0.5){
      var slot = 1;
    } else if(random < 0.75){
      var slot = 2;
    } else {
      var slot = 3;
    }
    //
    //checking if slot is available
    if(group[slot] != 0){
      this.randomGroup(nation);
    } else {
      group[slot] = nation;
    }
  }

  //function to distribute matches to the correct array based on groups
  this.matchArray = function(i,game){
    if(i === 0){
      this.groupAMatches.push(game);
    } else if (i ===1){
      this.groupBMatches.push(game);
    } else if (i ===2){
      this.groupCMatches.push(game);
    } else {
      this.groupDMatches.push(game);
    }
  }

  //object which stores the team info of the group table
  this.tableRow = function(nation){
    this.nation = nation;
    this.win = 0;
    this.draw = 0;
    this.lose = 0;
    this.goalsFor = 0;
    this.goalsAgainst = 0;
    this.goalDifference = this.goalsFor - this.goalsAgainst;
    this.points = this.win * 3 + this.draw;
  }

  //function to build the initial table
  this.tableBuild = function(){
    var j = 1;
    for(var i = 0; i < this.groupArray.length; i++){
      var temp = this.groupArray[i];
      console.log(temp);
      console.log(this.groupArray);
      console.log(this.groupArray[i]);
      // for(var j = 0; j < temp.length; i++){
      //   var row = new this.tableRow(temp[j]);
      //   this.tableArray(i,row);
      // }
    }
  }

  this.tableArray = function(i,row){
    if(i === 0){
      this.groupATableUnsorted.push(row);
    } else if (i ===1){
      this.groupBTableUnsorted.push(row);
    } else if (i ===2){
      this.groupCTableUnsorted.push(row);
    } else {
      this.groupDTableUnsorted.push(row);
    }
  }

//   this.tableRow = function(teamA,teamB,teamC,teamD){
//     var
//     //for each match
// //    for(i)
//     //check if played
//     //work out who has won, lost or drawn
//     //increase the w/d/l value
//     //calculate points 3w + d
//     //change the goal for/against
//     //calculate goal diff
//   }

}

var test = new Draw();

test.teamDistribute();

test.fixtureGenerate();

// test.groupAMatches[0].kickOff();
// test.groupAMatches[1].kickOff();
// test.groupAMatches[2].kickOff();
// test.groupAMatches[3].kickOff();
// test.groupAMatches[4].kickOff();
// test.groupAMatches[5].kickOff();

// test.groupBMatches[0].kickOff();
// test.groupBMatches[1].kickOff();
// test.groupBMatches[2].kickOff();
// test.groupBMatches[3].kickOff();
// test.groupBMatches[4].kickOff();
// test.groupBMatches[5].kickOff();

// test.groupCMatches[0].kickOff();
// test.groupCMatches[1].kickOff();
// test.groupCMatches[2].kickOff();
// test.groupCMatches[3].kickOff();
// test.groupCMatches[4].kickOff();
// test.groupCMatches[5].kickOff();

// test.groupDMatches[0].kickOff();
// test.groupDMatches[1].kickOff();
// test.groupDMatches[2].kickOff();
// test.groupDMatches[3].kickOff();
// test.groupDMatches[4].kickOff();
// test.groupDMatches[5].kickOff();

//test.tableBuild();