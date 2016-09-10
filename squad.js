var squad = function(nation,nationality,goalkeepers,defenders,midfielders,attackers){
  this.nation = nation;
  this.nationality = nationality;
  this.goalkeepersGen = goalkeepers;
  this.defendersGen = defenders;
  this.midfieldersGen = midfielders;
  this.attackersGen = attackers;
  this.goalkeepers = [];
  this.defenders = [];
  this.midfielders = [];
  this.attackers = [];
  this.control = false;

  //function to generate players
  this.generatePlayers = function(){
    this.goalkeeperAssignAbility();
    this.defenderAssignAbility();
    this.midfielderAssignAbility();
    this.attackerAssignAbility();
  }

  //function to assign GK ability
  this.goalkeeperAssignAbility = function(){
    for(var i = 0; i < this.goalkeepersGen.length; i++){
      // Calculating Ability using random number
      var random = Math.random();
      if(random < 0.35){
        var ability = 6;
      } else if (random < 0.70) {
        var ability = 7;
      } else if ( random < 0.88) {
        var ability = 8;
      } else if (random < 0.98) {
        var ability = 9;
      } else {
        var ability = 10;
      }
      // creating the player object
      var player = new goalkeeper(this.goalkeepersGen[i][0],this.goalkeepersGen[i][1],this.nationality,ability);
      // adding object to relevant array
      this.goalkeepers[i] = player;
    }
  }

  //function to assign GK ability
  this.defenderAssignAbility = function(){
    for(var i = 0; i < this.defendersGen.length; i++){
      // Calculating defending Ability using random number
      var random = Math.random();
      if(random < 0.35){
        var defAbility = 6;
      } else if (random < 0.70) {
        var defAbility = 7;
      } else if ( random < 0.88) {
        var defAbility = 8;
      } else if (random < 0.98) {
        var defAbility = 9;
      } else {
        var defAbility = 10;
      }
      // Calculating the attacking ability using random number
      var random = Math.random();
      if(random < 1/3){
        var attAbility = defAbility - 5;
      } else if(random < 2/3) {
        var attAbility = defAbility - 4;
      } else {
        var attAbility = defAbility - 3;
      }
      // creating the player object
      var player = new outfieldPlayer(this.defendersGen[i][0],this.defendersGen[i][1],this.nationality,"Defender",defAbility,attAbility);
      // adding object to relevant array
      this.defenders[i] = player;
    }
  }

  //function to assign GK ability
  this.midfielderAssignAbility = function(){
    for(var i = 0; i < this.midfieldersGen.length; i++){
      // Calculating defending Ability using random number
      var random = Math.random();
      if(random < 0.35){
        var defAbility = 4;
      } else if (random < 0.70) {
        var defAbility = 5;
      } else if ( random < 0.88) {
        var defAbility = 6;
      } else if (random < 0.98) {
        var defAbility = 7;
      } else {
        var defAbility = 8;
      }
      // Calculating the attacking ability using random number
      var random = Math.random();
      if(random < 0.35){
        var attAbility = 4;
      } else if (random < 0.70) {
        var attAbility = 5;
      } else if ( random < 0.88) {
        var attAbility = 6;
      } else if (random < 0.98) {
        var attAbility = 7;
      } else {
        var attAbility = 8;
      }
      // creating the player object
      var player = new outfieldPlayer(this.midfieldersGen[i][0],this.midfieldersGen[i][1],this.nationality,"Midfielder",defAbility,attAbility);
      // adding object to relevant array
      this.midfielders[i] = player;
    }
  }

  //function to assign GK ability
  this.attackerAssignAbility = function(){
    for(var i = 0; i < this.attackersGen.length; i++){
      // Calculating the attacking ability using random number
      var random = Math.random();
      if(random < 0.35){
        var attAbility = 6;
      } else if (random < 0.70) {
        var attAbility = 7;
      } else if ( random < 0.88) {
        var attAbility = 8;
      } else if (random < 0.98) {
        var attAbility = 9;
      } else {
        var attAbility = 10;
      }
      // Calculating defending Ability using random number and attacking ability
      var random = Math.random();
      if(random < 1/3){
        var defAbility = attAbility - 5;
      } else if(random < 2/3) {
        var defAbility = attAbility - 4;
      } else {
        var defAbility = attAbility - 3;
      }      // creating the player object
      var player = new outfieldPlayer(this.attackersGen[i][0],this.attackersGen[i][1],this.nationality,"Attacker",defAbility,attAbility);
      // adding object to relevant array
      this.attackers[i] = player;
    }
  }

}

var japan = new squad('Japan','Japanese',[
    ['Eiji','Kawashima'] , ['Shusaku','Nishikawa'] , ['Masaaki' , 'Higashiguchi']
  ],[
    ['Naomichi','Ueda'] , ['Kosuke','Ota'] , ['Yuto' , 'Nagatomo'] , ['Tsukasa' , 'Shiotani'] , ['Takashi' , 'Inui'] , ['Gen' , 'Shoji'] , ['Gōtoku' , 'Sakai'] , ['Maya' , 'Yoshida']
  ],[
    ['Masato' , 'Morishige'] , ['Yasuhito' , 'Endo'] , ['Shinji' , 'Kagawa'] , ['Yu' , 'Kobayashi'] , ['Yasuyuki' , 'Konno'] , ['Makoto' , 'Hasebe'] , ['Gaku' , 'Shibasaki']
  ],[
    ['Keisuke' , 'Honda'] , ['Hiroshi' , 'Kiyotake'] , ['Shinji' , 'Okazaki'] , ['Yohei' , 'Toyoda'] , ['Yoshinori' , 'Muto']
  ]);

japan.generatePlayers();


var ireland = new squad ('Ireland', 'Irish', [
    ['Keiren' , 'Westwood'] , ['Shay' , 'Given'] , ['Darren' , 'Randolph']
  ] , [
    ['Seamus' , 'Coleman'] , ['Ciaran' , 'Clark'] , ["John" , "O'Shea"] , ['Richard' , 'Keogh'] , ['Shane' , 'Duffy'] , ['Cyrus' , 'Christie'] , ['Stephen' , 'Ward']
  ] , [
    ['Glenn' , 'Whelan'] , ['Aiden' , 'McGeady'] , ['James' , 'McCarthy'] , ['James' , 'McClean'] , ['Jeff' , 'Hendrick'] , ['David' , 'Meyler'] , ['Robbie' , 'Brady'] , ['Wes' , 'Hoolahan'] , ['Stephen' , 'Quinn']
  ] , [
    ['Shane' , 'Long'] , ['Robbie' , 'Keane'] , ['Jonathan' , 'Walters'] , ['Daryl' , 'Murphy']
  ] );

ireland.generatePlayers();

var blank = new squad ('Ireland', 'Irish', [
    ['Keiren' , 'Westwood'] , [''] , ['']
  ] , [
    ['Seamus' , 'Coleman']
  ] , [

  ] , [

  ] );