//match object
var Match = function(homeTeam,awayTeam){
  // setting up the basics
  this.homeTeam = homeTeam;
  this.awayTeam = awayTeam;
  this.homeTeamScore = 0;
  this.awayTeamScore = 0;
  this.clock = 0;
  this.control = this.homeTeam;
  this.possessionZone = 4;

  // kick off
  this.kickOff = function(){
    this.possessionZone = 4;
    console.log(this.control + " are kicking off");
    this.pass();
  };

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
    } else {
      //calculate odds
      var midPoint = 0.6;
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
    var midPoint = 0.4;
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

  }
}



var match1 = new Match('England', 'Scotland');