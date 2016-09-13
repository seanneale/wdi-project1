//match object
var Match = function(homeTeam,awayTeam,homeTeamSquad,awayTeamSquad,stage){
  // setting up the basics
  this.homeTeam = homeTeam;
  this.homeTeamGoalkeeper = homeTeamSquad[0];
  this.homeTeamDefender = homeTeamSquad[1];
  this.homeTeamMidfielder = homeTeamSquad[2];
  this.homeTeamAttacker = homeTeamSquad[3];
  this.homeTeamScore = 0;
  this.awayTeam = awayTeam;
  this.awayTeamGoalkeeper = awayTeamSquad[0];
  this.awayTeamDefender = awayTeamSquad[1];
  this.awayTeamMidfielder = awayTeamSquad[2];
  this.awayTeamAttacker = awayTeamSquad[3];
  this.awayTeamScore = 0;
  this.clock = 0;
  this.control = this.homeTeam;
  this.possessionZone = 4;
  this.played = false;
  this.homeTeamEndStatus;
  this.awayTeamEndStatus;
  this.stage = stage;
  this.homeTeamPens = 0;
  this.awayTeamPens = 0;

  // kick off
  this.kickOff = function(){
    this.possessionZone = 4;
    console.log(this.control + " are kicking off");
    this.pass();
  };

  this.randomPlayer = function(array){
    var rand = Math.random();
    //use random number to get a lot in the array
    if(rand < 0.2){
      number = 0;
    } else if(rand < 0.4){
      number = 1;
    } else if(rand < 0.6){
      number = 2;
    } else if(rand < 0.8){
      number = 3;
    } else {
      number = 4;
    }
    //check slot is in the target array and redraw if not
    if(number + 1 > array.length){
      this.randomPlayer(array);
    }
    return number;
  }

  this.arraySum = function(array,interest){
    var abilityArray = [];
    var targetArray = array;
    if(interest === "defence"){
      for(var i = 0; i < targetArray.length; i++){
        var ability = targetArray[i].defendingAbility;
        abilityArray.push(ability);
      }
    } else {
      for(var i = 0; i < targetArray.length; i++){
        var ability = targetArray[i].attackingAbility;
        abilityArray.push(ability);
      }
    }
    var total = 0;
    for(var i = 0; i < abilityArray.length; i++){
      total += abilityArray[i];
    }
    return total;
  }

  this.midpointGenerate = function(homePlayerAbility,homePositionAverage,awayPlayerAbility,awayPositionAverage){
    var homeTeamCalc = homePlayerAbility + homePositionAverage;
    var awayTeamCalc = awayPlayerAbility + awayPositionAverage;
    var midPoint = homeTeamCalc / (homeTeamCalc + awayTeamCalc);
    return midPoint
  }

  this.midpointCalc = function(){
    if(this.control === this.homeTeam){
      if(this.possessionZone <= 2){
        //home team defenders attacking away team attacker
        //generate random players
        var number = 0;
        var homePlayer = this.randomPlayer(this.homeTeamDefender);
        var awayPlayer = this.randomPlayer(this.awayTeamAttacker);
        //retreive abilities
        var homePlayerAbility = this.homeTeamDefender[homePlayer].attackingAbility;
        var homePositionTotal = this.arraySum(this.homeTeamDefender,"attack");
        var homePositionAverage = homePositionTotal / this.homeTeamDefender.length;
        var awayPlayerAbility = this.awayTeamAttacker[awayPlayer].defendingAbility;
        var awayPositionTotal = this.arraySum(this.awayTeamAttacker,"defence");
        var awayPositionAverage = awayPositionTotal / this.awayTeamAttacker.length;
        // generate midpoint
        var midPoint = this.midpointGenerate(homePlayerAbility,homePositionAverage,awayPlayerAbility,awayPositionAverage);
        return midPoint
      } else if (2 < this.possessionZone < 6){
        //home team midfielders attacking away team midfielders
        //generate random players
        var number = 0;
        var homePlayer = this.randomPlayer(this.homeTeamMidfielder);
        var awayPlayer = this.randomPlayer(this.awayTeamMidfielder);
        //retreive abilities
        var homePlayerAbility = this.homeTeamMidfielder[homePlayer].attackingAbility;
        var homePositionTotal = this.arraySum(this.homeTeamMidfielder,"attack");
        var homePositionAverage = homePositionTotal / this.homeTeamMidfielder.length;
        var awayPlayerAbility = this.awayTeamMidfielder[awayPlayer].defendingAbility;
        var awayPositionTotal = this.arraySum(this.awayTeamMidfielder,"defence");
        var awayPositionAverage = awayPositionTotal / this.awayTeamMidfielder.length;
        // generate midpoint
        var midPoint = this.midpointGenerate(homePlayerAbility,homePositionAverage,awayPlayerAbility,awayPositionAverage);
        return midPoint
      } else {
        //home team attackers attacking away team defenders
        //generate random players
        var number = 0;
        var homePlayer = this.randomPlayer(this.homeTeamAttacker);
        var awayPlayer = this.randomPlayer(this.awayTeamDefender);
        //retreive abilities
        var homePlayerAbility = this.homeTeamAttacker[homePlayer].attackingAbility;
        var homePositionTotal = this.arraySum(this.homeTeamAttacker,"attack");
        var homePositionAverage = homePositionTotal / this.homeTeamAttacker.length;
        var awayPlayerAbility = this.awayTeamDefender[awayPlayer].defendingAbility;
        var awayPositionTotal = this.arraySum(this.awayTeamDefender,"defence");
        var awayPositionAverage = awayPositionTotal / this.awayTeamDefender.length;
        // generate midpoint
        var midPoint = this.midpointGenerate(homePlayerAbility,homePositionAverage,awayPlayerAbility,awayPositionAverage);
        return midPoint
      }
    } else {
      if(this.possessionZone <= 2){
        //away team attackers attacking home team defenders
        //generate random players
        var number = 0;
        var homePlayer = this.randomPlayer(this.homeTeamDefender);
        var awayPlayer = this.randomPlayer(this.awayTeamAttacker);
        //retreive abilities
        var homePlayerAbility = this.homeTeamDefender[homePlayer].attackingAbility;
        var homePositionTotal = this.arraySum(this.homeTeamDefender,"defence");
        var homePositionAverage = homePositionTotal / this.homeTeamDefender.length;
        var awayPlayerAbility = this.awayTeamAttacker[awayPlayer].attackingAbility;
        var awayPositionTotal = this.arraySum(this.awayTeamAttacker,"attack");
        var awayPositionAverage = awayPositionTotal / this.awayTeamAttacker.length;
        // generate midpoint
        var midPoint = this.midpointGenerate(homePlayerAbility,homePositionAverage,awayPlayerAbility,awayPositionAverage);
        return midPoint
      } else if (2 < this.possessionZone < 6){
        //away team midfielders attacking home team midfielders
        //generate random players
        var number = 0;
        var homePlayer = this.randomPlayer(this.homeTeamMidfielder);
        var awayPlayer = this.randomPlayer(this.awayTeamMidfielder);
        //retreive abilities
        var homePlayerAbility = this.homeTeamMidfielder[homePlayer].defendingAbility;
        var homePositionTotal = this.arraySum(this.homeTeamMidfielder,"defence");
        var homePositionAverage = homePositionTotal / this.homeTeamMidfielder.length;
        var awayPlayerAbility = this.awayTeamMidfielder[awayPlayer].attackingAbility;
        var awayPositionTotal = this.arraySum(this.awayTeamMidfielder,"attack");
        var awayPositionAverage = awayPositionTotal / this.awayTeamMidfielder.length;
        // generate midpoint
        var midPoint = this.midpointGenerate(homePlayerAbility,homePositionAverage,awayPlayerAbility,awayPositionAverage);
        return midPoint
      } else {
        //away team defenders attacking home team attackers
        //generate random players
        var number = 0;
        var homePlayer = this.randomPlayer(this.homeTeamAttacker);
        var awayPlayer = this.randomPlayer(this.awayTeamDefender);
        //retreive abilities
        var homePlayerAbility = this.homeTeamAttacker[homePlayer].defendingAbility;
        var homePositionTotal = this.arraySum(this.homeTeamAttacker,"defence");
        var homePositionAverage = homePositionTotal / this.homeTeamAttacker.length;
        var awayPlayerAbility = this.awayTeamDefender[awayPlayer].attackingAbility;
        var awayPositionTotal = this.arraySum(this.awayTeamDefender,"attack");
        var awayPositionAverage = awayPositionTotal / this.awayTeamDefender.length;
        // generate midpoint
        var midPoint = this.midpointGenerate(homePlayerAbility,homePositionAverage,awayPlayerAbility,awayPositionAverage);
        return midPoint
      }
    }
  }

  // pass function - calculate odds and carry out 'pass'
  this.pass = function(){
    this.time();
    console.log("The time is " + this.clock);
    console.log("The Possession Zone is " + this.possessionZone)
    if(this.clock === 45){
      //stop the game
      //give a score update
      console.log("Half Time!")
      this.score();
      //change control to away team
      this.control = this.awayTeam;
      //kick off
      this.kickOff();
    } else if(this.clock===90){
      //stop the game
      //give a score update
      console.log("Full Time!")
      this.score();
      this.played = true;
      this.endStatus();
      if(this.homeTeamEndStatus === "draw" && this.stage === "knockout"){
        this.penalty();
      }
    } else {
      //calculate odds
      var midPoint = this.midpointCalc();
      //determine random number
      var pass = Math.random();
      //reacting to random number
      if(pass <= midPoint){
        console.log(this.control + " Pass Successful!");
        // change possesion zone and check if we can shoot
        if(this.control === this.homeTeam){
          //create a function which stops the possession zone going greater than 7 and less than 1
          if(this.possessionZone===7){
            this.shoot();
          } else {
            this.possessionZone++;
            this.pass();
          }
        } else {
          if(this.possessionZone===1){
            this.shoot();
          } else {
            this.possessionZone--;
            this.pass();
          }
        }

      } else {
        //Intercepting the pass and changing control
        console.log(this.control + " Pass Intercepted!");
        this.swapControl();
        this.pass();
      }
    }
  };

  // shoot function
  this.shoot = function(){
    console.log(this.control + " Shoot!");
    //calculate odds
    if(this.control === this.homeTeam){
      var attacker = this.randomPlayer(this.homeTeamAttacker);
      var attackerAbility = this.homeTeamAttacker[attacker].attackingAbility;
      var goalkeeperAbility = this.awayTeamGoalkeeper[0].ability;
    } else {
      var attacker = this.randomPlayer(this.awayTeamAttacker);
      var attackerAbility = this.awayTeamAttacker[attacker].attackingAbility;
      var goalkeeperAbility = this.homeTeamGoalkeeper[0].ability;
    }
    var midPoint = attackerAbility / (attackerAbility + goalkeeperAbility);
    //determine random number
    var pass = Math.random();
    //reacting to random number
    if(pass <= midPoint){
      console.log(this.control + " Scores!");
      // swap control and kick off
      if(this.control===this.homeTeam){
        this.homeTeamScore++;
      } else {
        this.awayTeamScore++;
      }
      //swap control
      this.swapControl();
      this.score();
      //kick off
      this.kickOff();
     } else {
      //Intercepting the pass and changing control
      console.log(this.control + " Misses");
      this.swapControl();
      this.pass();
    }
  };

  // swap control
  this.swapControl = function(){
    if(this.control === this.homeTeam){
      this.control = this.awayTeam;
    } else {
      this.control = this.homeTeam;
   }
  };

  this.time = function(){
    this.clock++;
  }

  this.score = function(){
    if(this.clock >= 90){
      console.log("The Final Score is: " + this.homeTeam + " " + this.homeTeamScore +" "+this.awayTeam+" "+this.awayTeamScore);
    } else if (this.clock === 45){
      console.log("The Half Time Score is: " + this.homeTeam + " " + this.homeTeamScore +" "+this.awayTeam+" "+this.awayTeamScore);
    } else {
      console.log("The Score is: " + this.homeTeam + " " + this.homeTeamScore +" "+this.awayTeam+" "+this.awayTeamScore);
  }

    //function to work assign a winner at the end of the game
  this.endStatus = function(){
    if(this.homeTeamScore === this.awayTeamScore){
      this.homeTeamEndStatus = "draw";
      this.awayTeamEndStatus = "draw";
    } else if(this.homeTeamScore > this.awayTeamScore){
      this.homeTeamEndStatus = "win";
      this.awayTeamEndStatus = "lose";
    } else {
      this.homeTeamEndStatus = "lose";
      this.awayTeamEndStatus = "win";
    }
  }

  this.penaltyShot = function(player,gk){
    var midPoint = (5 + player.attackingAbility) / (player.attackingAbility + gk[0].ability);
    //determine random number
    var pass = Math.random();
    //reacting to random number
    if(pass <= midPoint){
      console.log(this.control + " Scores!");
      // swap control and kick off
      if(this.control===this.homeTeam){
        this.homeTeamPens++;
      } else {
        this.awayTeamPens++;
      }
     } else {
      //Intercepting the pass and changing control
      console.log(this.control + " Misses");
    }
  }

  this.penaltyScore = function(){
    console.log("The Penalty Score is: " + this.homeTeam + " " + this.homeTeamPens +" "+this.awayTeam+" "+this.awayTeamPens);
  }

  this.randomPenaltyTaker = function(team){
    var players = [];
    if(team === this.homeTeam){
      players = [this.homeTeamDefender , this.homeTeamMidfielder , this.homeTeamAttacker]
    } else {
      players = [this.homeTeamDefender , this.homeTeamMidfielder , this.homeTeamAttacker]
    }
    var random = Math.random();
    var i = 0;
    var j = 0;
    if(random < 1/3){
      i = 0;
    } else if (random < 2/3){
      i = 1;
    } else {
      i = 2;
    }
    var random = Math.random();
    if(random < 0.2){
      j = 0;
    } else if (random < 0.4){
      j = 1;
    } else if (random < 0.6){
      j = 2;
    } else if (random < 0.8){
      j = 3;
    } else {
      j = 4;
    }
    if(typeof players[i][j] === "undefined"){
      this.randomPenaltyTaker(team);
    } else {
      taker = players[i][j];
    }
    return taker;
  }

    //for loop to take shots
    //home  team first
    //away team second
    //after each penalty check to see if 'gap' is greater than remaining penalties
    //if teams level after 5 pens each then go to sudden death
    //while(homeTeamPens === awayTeamPens)
    //do one penalty each
    //once complete declare a winner to console
    //then change the end status for winner and loser
}


  this.penalty = function(){
    console.log("Penalties!!!");
    for(i = 1; i <= 5; i++){
      this.control = this.homeTeam;
      var home = this.randomPenaltyTaker(this.homeTeam);
      this.penaltyShot(home,this.awayTeamGoalkeeper);
      this.control = this.awayTeam;
      var away = this.randomPenaltyTaker(this.awayTeam);
      this.penaltyShot(away,this.homeTeamGoalkeeper);
      this.penaltyScore();
    }
    if(this.homeTeamPens === this.awayTeamPens){
      console.log("Sudden Death!!")
      //carry on until thats not true
      while(this.homeTeamPens === this.awayTeamPens){
        this.control = this.homeTeam;
        var home = this.randomPenaltyTaker(this.homeTeam);
        this.penaltyShot(home,this.awayTeamGoalkeeper);
        this.control = this.awayTeam;
        var away = this.randomPenaltyTaker(this.awayTeam);
        this.penaltyShot(away,this.homeTeamGoalkeeper);
        this.penaltyScore();
      }
      console.log("We have a winner");
      if(this.homeTeamPens > this.awayTeamPens){
        console.log(this.homeTeam + " has won on penalties");
        this.homeTeamEndStatus = "win"
        this.awayTeamEndStatus = "lose"
      } else {
        console.log(this.awayTeam + " has won on penalties");
        this.homeTeamEndStatus = "lose"
        this.awayTeamEndStatus = "win"
      }
    } else {
      if(this.homeTeamPens > this.awayTeamPens){
        console.log(this.homeTeam + " has won on penalties");
        this.homeTeamEndStatus = "win"
        this.awayTeamEndStatus = "lose"
      } else {
        console.log(this.awayTeam + " has won on penalties");
        this.homeTeamEndStatus = "lose"
        this.awayTeamEndStatus = "win"
      }
    }
  }
}