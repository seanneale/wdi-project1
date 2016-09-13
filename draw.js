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
  this.quarterFinalMatches = [];


  this.teamDistribute = function(){
    for(var i = 0; i < this.teams.length; i++){
      this.randomGroup(this.teams[i]);
    }
  };

  this.groupStageGenerate = function(){
    var j = 1;
    for(var i =0; i < this.groupArray.length; i++){
      var match_j = new Match(this.groupArray[i][0].nation,this.groupArray[i][1].nation,this.groupArray[i][0].picked,this.groupArray[i][1].picked,"group");
      this.matchArray(i,match_j);
      var k = j+1;
      var match_k = new Match(this.groupArray[i][2].nation,this.groupArray[i][3].nation,this.groupArray[i][2].picked,this.groupArray[i][3].picked,"group");
      this.matchArray(i,match_k);
      var l = j+8;
      var match_l = new Match(this.groupArray[i][0].nation,this.groupArray[i][2].nation,this.groupArray[i][0].picked,this.groupArray[i][2].picked,"group");
      this.matchArray(i,match_l);
      var m = j+9;
      var match_m = new Match(this.groupArray[i][1].nation,this.groupArray[i][3].nation,this.groupArray[i][1].picked,this.groupArray[i][3].picked,"group");
      this.matchArray(i,match_m);
      var n = j+16;
      var match_n = new Match(this.groupArray[i][0].nation,this.groupArray[i][3].nation,this.groupArray[i][0].picked,this.groupArray[i][3].picked,"group");
      this.matchArray(i,match_n);
      var o = j+17;
      var match_o = new Match(this.groupArray[i][1].nation,this.groupArray[i][2].nation,this.groupArray[i][1].picked,this.groupArray[i][2].picked,"group");
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
    this.position = 0;
    this.played;
  }

  //function to build the initial table
  this.tableBuild = function(){
    for(var i = 0; i < this.groupArray.length; i++){
      var temp = this.groupArray[i];
      for(var j = 0; j < temp.length; j++){
        var temp2 = this.groupArray[i][j];
        var row = new this.tableRow(temp2.nation);
        this.tableArray(i,row);
      }
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

  this.tableUpdate = function(groupGame,group,unsortedTable){
    //getting required info from match object
    var homeTeam = groupGame.homeTeam;
    var awayTeam = groupGame.awayTeam;
    var homeTeamStatus = groupGame.homeTeamEndStatus
    var awayTeamStatus = groupGame.awayTeamEndStatus
    var homeTeamGoals = groupGame.homeTeamScore;
    var awayTeamGoals = groupGame.awayTeamScore;
    //finding the home team in the original array
    var homeLoc = -1;
    for(i=0; i < group.length; i++){
      if(group[i].nation === homeTeam){
        homeLoc = i;
      }
    }
    //finding the away team in the original array
    var awayLoc = -1;
    for(i=0; i < group.length; i++){
      if(group[i].nation === awayTeam){
        awayLoc = i;
      }
    }
    //updating the unsorted table for the home team
    //goals
    unsortedTable[homeLoc].goalsFor += homeTeamGoals;
    unsortedTable[homeLoc].goalsAgainst += awayTeamGoals;
    unsortedTable[homeLoc].goalDifference = unsortedTable[homeLoc].goalsFor - unsortedTable[homeLoc].goalsAgainst;
    //w,d,l
    if(homeTeamStatus === "win"){
      unsortedTable[homeLoc].win += 1;
    } else if(homeTeamStatus === "draw"){
      unsortedTable[homeLoc].draw += 1;
    } else {
      unsortedTable[homeLoc].lose += 1;
    }
    //points
    unsortedTable[homeLoc].points = 3 * unsortedTable[homeLoc].win + unsortedTable[homeLoc].draw;
    //updating the unsorted table for the away team
    unsortedTable[awayLoc].goalsFor += awayTeamGoals;
    unsortedTable[awayLoc].goalsAgainst += homeTeamGoals;
    unsortedTable[awayLoc].goalDifference = unsortedTable[awayLoc].goalsFor - unsortedTable[awayLoc].goalsAgainst;
    //w,d,l
    if(awayTeamStatus === "win"){
      unsortedTable[awayLoc].win += 1;
    } else if(awayTeamStatus === "draw"){
      unsortedTable[awayLoc].draw += 1;
    } else {
      unsortedTable[awayLoc].lose += 1;
    }
    //points
    unsortedTable[awayLoc].points = 3 * unsortedTable[awayLoc].win + unsortedTable[awayLoc].draw;
  }

  this.sort = function(tableArray,a,b,matches){
    //i need to take out the group A Matches hardcoding
    if(tableArray[a].points < tableArray[b].points){
      tableArray[a].position++
    } else if (tableArray[a].points > tableArray[b].points) {
      tableArray[b].position++
    } else {
      if (tableArray[a].goalDifference < tableArray[b].goalDifference){
        tableArray[a].position++
      } else if ((tableArray[a].goalDifference > tableArray[b].goalDifference)){
        tableArray[b].position++
      } else {
        for(var i =0; i < matches.length; i++){
        //this a horrible 'if' but it basically says that is looking for the two teams we are interested in and looking for the match they played together (a===home && b===away || a===away && b===home)
          if(tableArray[a].nation === matches[i].homeTeam && tableArray[b].nation === matches[i].awayTeam || tableArray[a].nation === matches[i].awayTeam && tableArray[b].nation === matches[i].homeTeam) {
          //the match in question then has the info stored in it for which team won, but as seperate info, I shouldve built home team objects and away team objects
            if(tableArray[a].nation === matches[i].homeTeam && matches[i].homeTeamEndStatus === "win" || tableArray[a].nation === matches[i].awayTeam && matches[i].awayTeamEndStatus === "win"){
              tableArray[a].position++
            } else if ((tableArray[b].nation === matches[i].homeTeam && matches[i].homeTeamEndStatus === "win" || tableArray[b].nation === matches[i].awayTeam && matches[i].awayTeamEndStatus === "win")){
              tableArray[b].position++
            } else {
              if(tableArray[a].goalsFor < tableArray[b].goalsFor){
                tableArray[a].position++
              } else if (tableArray[a].goalsFor > tableArray[b].goalsFor){
                tableArray[b].position++
              } else {
                var rand = Math.random();
                if (rand < 0.5){
                  tableArray[a].position++
                } else {
                  tableArray[b].position++
                }
              }
            }
          }
        }
      }
    }
  }

  this.tableSort = function(table,unsortedTable,matches){
    //resetting the sorted table
    //resetting position
    for(var i = 0; i < unsortedTable.length; i++){
      unsortedTable[i].position = 0;
    }
    //running the sort function
    for(var i =0; i < unsortedTable.length; i++){
      for(var j = 0; j < unsortedTable.length; j++){
        if(i < j){
          this.sort(unsortedTable,i,j,matches);
        }
      }
    }
    //moving the rows into the sorted table
    for(var k = 0; k < unsortedTable.length; k++){
      var pos = unsortedTable[k].position;
      table[pos] = unsortedTable[k];
    }
  }

  this.quarterFinalGenerate = function(){
    //find the team A0 A1 B0 B1 C0 C1 D0 D1
    var a0 = this.groupATable[0].nation;
    var a1 = this.groupATable[1].nation;
    var b0 = this.groupBTable[0].nation;
    var b1 = this.groupBTable[1].nation;
    var c0 = this.groupCTable[0].nation;
    var c1 = this.groupCTable[1].nation;
    var d0 = this.groupDTable[0].nation;
    var d1 = this.groupDTable[1].nation;
    console.log(a0);
    console.log(a1);
    console.log(b0);
    console.log(b1);
    console.log(c0);
    console.log(c1);
    console.log(d0);
    console.log(d1);
    //find the squad required
    var nationArray = [a0 , a1 , b0 , b1 , c0 , c1 , d0 ,d1 ]
    var squadArray = [];
    console.log(nationArray);
    for(var i = 0; i < nationArray.length; i++){
      //looking for each entry in the nation array
      for(var j =0; j < this.groupArray.length; j++){
        for(var k = 0; k < this.groupArray.length; k++){
          //checking to see if i.nation equals groupArrayJK.nation
          if(nationArray[i] === this.groupArray[j][k].nation){
            squadArray.push(this.groupArray[j][k].picked);
          }
        }
      }
    }
    console.log(squadArray);
//      var match = new Match(team,team,squad,squad);
    for(var i = 0; i < nationArray.length; i += 4){
      console.log(i);
      var j = i + 1;
      var k = i + 2;
      var l = i + 3;
      //setting up the new matches
      var match = new Match(nationArray[i],nationArray[l],squadArray[i],squadArray[l],"knockout");
      this.quarterFinalMatches.push(match);
      var match = new Match(nationArray[j],nationArray[k],squadArray[j],squadArray[k],"knockout");
      this.quarterFinalMatches.push(match);
    }
  }
}

var test = new Draw();

test.teamDistribute();

test.groupStageGenerate();

test.tableBuild();

test.groupAMatches[0].kickOff();
test.tableUpdate(test.groupAMatches[0],test.groupA,test.groupATableUnsorted);
test.groupAMatches[1].kickOff();
test.tableUpdate(test.groupAMatches[1],test.groupA,test.groupATableUnsorted);
test.groupAMatches[2].kickOff();
test.tableUpdate(test.groupAMatches[2],test.groupA,test.groupATableUnsorted);
test.groupAMatches[3].kickOff();
test.tableUpdate(test.groupAMatches[3],test.groupA,test.groupATableUnsorted);
test.groupAMatches[4].kickOff();
test.tableUpdate(test.groupAMatches[4],test.groupA,test.groupATableUnsorted);
test.groupAMatches[5].kickOff();
test.tableUpdate(test.groupAMatches[5],test.groupA,test.groupATableUnsorted);

test.tableSort(test.groupATable,test.groupATableUnsorted,test.groupAMatches);

test.groupBMatches[0].kickOff();
test.tableUpdate(test.groupBMatches[0],test.groupB,test.groupBTableUnsorted);
test.groupBMatches[1].kickOff();
test.tableUpdate(test.groupBMatches[1],test.groupB,test.groupBTableUnsorted);
test.groupBMatches[2].kickOff();
test.tableUpdate(test.groupBMatches[2],test.groupB,test.groupBTableUnsorted);
test.groupBMatches[3].kickOff();
test.tableUpdate(test.groupBMatches[3],test.groupB,test.groupBTableUnsorted);
test.groupBMatches[4].kickOff();
test.tableUpdate(test.groupBMatches[4],test.groupB,test.groupBTableUnsorted);
test.groupBMatches[5].kickOff();
test.tableUpdate(test.groupBMatches[5],test.groupB,test.groupBTableUnsorted);

test.tableSort(test.groupBTable,test.groupBTableUnsorted,test.groupBMatches);

test.groupCMatches[0].kickOff();
test.tableUpdate(test.groupCMatches[0],test.groupC,test.groupCTableUnsorted);
test.groupCMatches[1].kickOff();
test.tableUpdate(test.groupCMatches[1],test.groupC,test.groupCTableUnsorted);
test.groupCMatches[2].kickOff();
test.tableUpdate(test.groupCMatches[2],test.groupC,test.groupCTableUnsorted);
test.groupCMatches[3].kickOff();
test.tableUpdate(test.groupCMatches[3],test.groupC,test.groupCTableUnsorted);
test.groupCMatches[4].kickOff();
test.tableUpdate(test.groupCMatches[4],test.groupC,test.groupCTableUnsorted);
test.groupCMatches[5].kickOff();
test.tableUpdate(test.groupCMatches[5],test.groupC,test.groupCTableUnsorted);

test.tableSort(test.groupCTable,test.groupCTableUnsorted,test.groupCMatches);

test.groupDMatches[0].kickOff();
test.tableUpdate(test.groupDMatches[0],test.groupD,test.groupDTableUnsorted);
test.groupDMatches[1].kickOff();
test.tableUpdate(test.groupDMatches[1],test.groupD,test.groupDTableUnsorted);
test.groupDMatches[2].kickOff();
test.tableUpdate(test.groupDMatches[2],test.groupD,test.groupDTableUnsorted);
test.groupDMatches[3].kickOff();
test.tableUpdate(test.groupDMatches[3],test.groupD,test.groupDTableUnsorted);
test.groupDMatches[4].kickOff();
test.tableUpdate(test.groupDMatches[4],test.groupD,test.groupDTableUnsorted);
test.groupDMatches[5].kickOff();
test.tableUpdate(test.groupDMatches[5],test.groupD,test.groupDTableUnsorted);

test.tableSort(test.groupDTable,test.groupDTableUnsorted,test.groupDMatches);

test.quarterFinalGenerate();
test.quarterFinalMatches[0].kickOff();

// console.log(test.groupATableUnsorted[0].nation+' '+test.groupATableUnsorted[0].points+' '+test.groupATableUnsorted[0].position+' '+test.groupATableUnsorted[0].goalDifference+' '+test.groupATableUnsorted[0].goalsFor);
// console.log(test.groupATableUnsorted[1].nation+' '+test.groupATableUnsorted[1].points+' '+test.groupATableUnsorted[1].position+' '+test.groupATableUnsorted[1].goalDifference+' '+test.groupATableUnsorted[1].goalsFor);
// console.log(test.groupATableUnsorted[2].nation+' '+test.groupATableUnsorted[2].points+' '+test.groupATableUnsorted[2].position+' '+test.groupATableUnsorted[2].goalDifference+' '+test.groupATableUnsorted[2].goalsFor);
// console.log(test.groupATableUnsorted[3].nation+' '+test.groupATableUnsorted[3].points+' '+test.groupATableUnsorted[3].position+' '+test.groupATableUnsorted[3].goalDifference+' '+test.groupATableUnsorted[3].goalsFor);


    //1. change the name
    //2. add a column to the table row object
    //3. this column is the placing
    //4. put two teams into the sort above
    //5. add one to the column if it loses
    //6. the team with the worst points(...) will 3 'adds'
    //7. the team with the lowest points(...) will get no 'adds'
    //8. can then use this to add them to the sorted array
    //9. this can then be used to generate the second round of fixtures
    //10. and so on


