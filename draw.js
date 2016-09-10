var Draw = function(){
  this.teams = ["Algeria" , "Argentina" , "Australia" , "Brazil" , "Cameroon" , "Chile" , "Egypt" , "England" , "France" , "Germany" , "Japan" , "Mexico" , "Republic Of Ireland" , "South Korea" , "Spain" , "USA"];
  this.groupA = [0,0,0,0];
  this.groupB = [0,0,0,0];
  this.groupC = [0,0,0,0];
  this.groupD = [0,0,0,0];
  this.groupAMatches = [];
  this.groupBMatches = [];
  this.groupCMatches = [];
  this.groupDMatches = [];
  this.groupArray = [this.groupA , this.groupB , this.groupC , this.groupD];


  this.teamDistribute = function(){
    for(var i = 0; i < this.teams.length; i++){
      this.randomGroup(this.teams[i]);
    }
  };

  this.fixtureGenerate = function(){
    var j = 1;
    for(var i =0; i < this.groupArray.length; i++){
      var match_j = new Match(this.groupArray[i][0],this.groupArray[i][1]);
      this.matchArray(i,match_j);
      var k = j+1;
      var match_k = new Match(this.groupArray[i][2],this.groupArray[i][3]);
      this.matchArray(i,match_k);
      var l = j+8;
      var match_l = new Match(this.groupArray[i][0],this.groupArray[i][2]);
      this.matchArray(i,match_l);
      var m = j+9;
      var match_m = new Match(this.groupArray[i][1],this.groupArray[i][3]);
      this.matchArray(i,match_m);
      var n = j+16;
      var match_n = new Match(this.groupArray[i][0],this.groupArray[i][3]);
      this.matchArray(i,match_n);
      var o = j+17;
      var match_o = new Match(this.groupArray[i][1],this.groupArray[i][2]);
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

}

var test = new Draw();

test.teamDistribute();

test.fixtureGenerate();