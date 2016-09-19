var Manager = function(name,country){
  this.playerName = name;
  this.nation = country;
}

$(document).ready(

  function startGame(){

    var playerName = "";
    var nationChoice = "";
    var manager = new Manager(playerName,nationChoice);
    var game = new Draw();
    var counter = 0;
    game.teamDistribute();
    game.groupStageGenerate();
    game.tableBuild();
    game.matchSort();

    //what happens when the start game button is pushed
    $('#startGame').click(function(e){
      e.preventDefault();
      playerName = $('#nameEntry').val();
      nationChoice = $('.countrySelect input:checked').val();
      manager = new Manager(playerName,nationChoice);
      var header = $('#communicationPage').find('h1');
      $(header).text("Welcome to the game " + manager.playerName);
      $('#frontPage').addClass('hide');
      $('#communicationPage').removeClass('hide');
    });

    //moving on from the communication page
    $('#commContinue').click(function(e){
      e.preventDefault();
      if(counter > 2) {
        //build the knockout fixture page
        fixturePageBuildKnockout(game,counter);
        $('#fixtureKnockoutStage').removeClass('hide');
        $('#communicationPage').addClass('hide');
        if(counter === 4){
          $('#commContinue').addClass('hide');
        }
        //fixturePageBuildKnockout(game,counter);
      } else if (counter === 0){
        $('#fixtureGroupStage').removeClass('hide');
        $('#communicationPage').addClass('hide');
        fixturePageBuildGroup(game,counter);
      }
    });

    //moving on from the fixture group stage to the team pick
    var playedMatch = "";
    var playedGroup = "";
    var playedUnsrtTable = "";
    //finding the match to watch and playing the rest
    $('#fixtureGroupContinue').click(function(e){
      e.preventDefault();
      teamSelectionPageBuild(game,nationChoice,counter);
      if(counter < 3){
        for(var i = 0; i < game.roundArray[counter].length; i++){
          if(nationChoice === game.roundArray[counter][i].homeTeam || nationChoice === game.roundArray[counter][i].awayTeam){
            playedMatch = game.roundArray[counter][i];
            playedGroup = game.groupArray[parseInt(i/2)];
            playedUnsrtTable = game.groupTableUnsorted[parseInt(i/2)];
            $('#fixtureGroupStage').addClass('hide');
            $('#teamPick').removeClass('hide');
          } else {
            game.roundArray[counter][i].kickOff();
            game.tableUpdate(game.roundArray[counter][i],game.groupArray[parseInt(i/2)],game.groupTableUnsorted[parseInt(i/2)]);
          }
        }
      } else if (counter === 3){
        //update the comm page and show it
        for (var i = 0; i < game.groupTable.length; i++){
          for(var j = 0; j < game.groupTable[i].length; j++){
            if(nationChoice === game.groupTable[i][j].nation && j < 2){
              //go through
              //do quarter final prep
              game.quarterFinalGenerate();

              //change communication screen
              var header = $('#communicationPage').find('h1');
              $(header).text("Congratulations you're through to the Quarter Finals, is this the start of something special?");
              //hide fixture group
              $('#fixtureGroupStage').addClass('hide');
              //reveal communication screen
              $('#communicationPage').removeClass('hide');
            } else if((nationChoice === game.groupTable[i][j].nation && j >= 2)){
              //go home
              //update communication screen
              var header = $('#communicationPage').find('h1');
              $(header).text("Out in the first round?  What a bunch of overpaid softys, my nan could play better than them");
              //create an element
              var newElement = document.createElement('h3');
              //give it some text
              $(newElement).html('Please refresh to play again');
              //append it to the div
              var temp = $('#communicationPage .row')[0];
              $(temp).append(newElement);
              $('#commContinue').addClass('hide');
              //hide fixture group
              $('#fixtureGroupStage').addClass('hide');
              //reveal communication screen
              $('#communicationPage').removeClass('hide');
            }
          }
        }
      }
    });

    //changing the tactic image based on choice selected
    var tactic = 0;
    $('#tacticChoice').on("change",function(e){
      tactic = $('#tacticChoice input:checked').val();
      if(tactic === "4-4-2"){
        $('#tacticImage').html('<img src="Images/4-4-2.png">');
      } else if(tactic === "5-3-2"){
        $('#tacticImage').html('<img src="Images/5-3-2.png">');
      } else if(tactic === "4-5-1"){
        $('#tacticImage').html('<img src="Images/4-5-1.png">');
      } else if(tactic === "4-3-3"){
        $('#tacticImage').html('<img src="Images/4-3-3.png">');
      }
    });

    $('#teamPickContinue').click(function(){
      if(tactic === 0){
        alert("please choose a formation");
      } else {
        checkingTeamSelection(tactic,nationChoice,game,counter);
      }
    })


    //moving from team pick to match screen
    $('#teamPickContinue').click(function(){
      //checking the team picked
      if(checkingTeamSelection(tactic,nationChoice,game,counter)){
        buildingMatchScreen(puttingPlayersIntoTeam(nationChoice,game,counter));
        $('#matchScreen').removeClass('hide');
        $('#teamPick').addClass('hide');
      }
    });

    //starting the game
    $('#matchScreenBtn').click(function(){
      $('#matchScreenBtn').addClass('hide');
      $('#matchScreenContinue').removeClass('hide');
    });

    //leaving match screen, checking stage and moving to either the fixtures or the comm page as appropriate
    $('#matchScreenContinue').click(function(){
      $('#matchScreenContinue').addClass('hide');
      $('#matchScreenBtn').removeClass('hide');
      $('#matchScreen').addClass('hide');
      if(counter <= 2){
        game.tableUpdate(playedMatch,playedGroup,playedUnsrtTable);
        game.tableSort(game.groupATable,game.groupATableUnsorted,game.groupAMatches);
        game.tableSort(game.groupBTable,game.groupBTableUnsorted,game.groupBMatches);
        game.tableSort(game.groupCTable,game.groupCTableUnsorted,game.groupCMatches);
        game.tableSort(game.groupDTable,game.groupDTableUnsorted,game.groupDMatches);
        fixturePageBuildGroup(game,counter);
        $('#fixtureGroupStage').removeClass('hide');
      }
      counter++;
      console.log(counter);
    });

    $('#fixtureKnockoutContinue').click(function(){
      $('#fixtureKnockoutStage').addClass('hide');
      $('#teamPick').removeClass('hide');
    });


  }
);