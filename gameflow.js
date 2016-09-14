var Manager = function(name,country){
  this.playerName = name;
  this.nation = country;
}

function fixturePageBuildGroup(game,counter) {
  //updating fixture list" vs "
  var j=1;
  while(j <= 4){
    var target="";
    var group="";
    var source="";
    var table="";
    var k = 9;
    //updating the table
    for(var i = 0; i < 4; i++){
      if(j===1){
        if(counter === 0){
          source = game.groupATableUnsorted;
        } else {
          source = game.groupATable;
        }
        var table = $('#groupA').find('td');
      } else if (j===2) {
        if(counter === 0){
          source = game.groupBTableUnsorted;
        } else {
          source = game.groupBTable;
        }
        var table = $('#groupB').find('td');
      } else if (j===3) {
        if(counter === 0){
          source = game.groupCTableUnsorted;
        } else {
          source = game.groupCTable;
        }
        var table = $('#groupC').find('td');
      } else {
        if(counter === 0){
          source = game.groupDTableUnsorted;
        } else {
          source = game.groupDTable;
        }
        var table = $('#groupD').find('td');
      }
      //code here to update the table
      var l = k + 1;
      var m = k + 2;
      var n = k + 3;
      var o = k + 4;
      var p = k + 5;
      var q = k + 6;
      var r = k + 7;
      var s = k + 8;
      $(table[k]).text(source[i].nation);
      $(table[l]).text(source[i].played);
      $(table[m]).text(source[i].win);
      $(table[n]).text(source[i].draw);
      $(table[o]).text(source[i].lose);
      $(table[p]).text(source[i].goalsFor);
      $(table[q]).text(source[i].goalsAgainst);
      $(table[r]).text(source[i].goalDifference);
      $(table[s]).text(source[i].points);
      k+=9;
    }
    for(var i = 0; i < 6; i++){
      if(j===1){
        target=game.groupAMatches;
        var group = $('#groupA').find('p')[i];
      } else if (j===2) {
        target=game.groupBMatches;
        var group = $('#groupB').find('p')[i];
      } else if (j===3) {
        target=game.groupCMatches;
        var group = $('#groupC').find('p')[i];
      } else {
        target=game.groupDMatches;
        var group = $('#groupD').find('p')[i];
      }
      //building the fixtures
      if(target[i].played === true){
        $(group).text(target[i].homeTeam+" "+target[i].homeTeamScore+":"+target[i].awayTeamScore+" "+target[i].awayTeam);
      } else if (target[i].played === false){
        $(group).text(target[i].homeTeam +" vs "+target[i].awayTeam);
      } else {
        console.log('nothing')
      }

    }
  j++;
  }
}

function fixturePageBuildKnockout(){

}

function checkingTeamSelection(tactic){
  var defNo = 0;
  var midNo = 0;
  var attNo = 0;
  if(tactic === "4-4-2"){
    defNo=4;
    midNo=4;
    attNo=2;
  } else if(tactic === "5-3-2"){
    defNo=5;
    midNo=3;
    attNo=2;
  } else if(tactic === "4-5-1"){
    defNo=4;
    midNo=5;
    attNo=1;
  } else if(tactic === "4-3-3"){
    defNo=4;
    midNo=3;
    attNo=3;
  }
  console.log(defNo);
  console.log(midNo);
  console.log(attNo);
  var goalkeepersChosen = [];
  $('#goalkeepersCheckbox:checked').each(function(i){
    goalkeepersChosen[i] = $(this).val();
  })
  var defendersChosen = [];
  $('#defendersCheckbox:checked').each(function(i){
    defendersChosen[i] = $(this).val();
  })
  console.log(defendersChosen);
  var midfieldersChosen = [];
  $('#midfieldersCheckbox:checked').each(function(i){
    midfieldersChosen[i] = $(this).val();
  })
  console.log(midfieldersChosen);
  var attackersChosen = [];
  $('#attackersCheckbox:checked').each(function(i){
    attackersChosen[i] = $(this).val();
  })
  console.log(attackersChosen);
  if(goalkeepersChosen.length>1){
    alert("too many goalkeepers");
  } else if (goalkeepersChosen < 1 ){
    alert("not enough goalkeepers");
  } else {
    console.log(goalkeepersChosen);


  }


}


$(document).ready(

  function startGame(){

    //initial conditions
    var playerName = "";
    var nationChoice = "";
    var manager = new Manager(playerName,nationChoice);
    var game = new Draw();
    var counter = 0;
    game.teamDistribute();
    game.groupStageGenerate();
    game.tableBuild();

    //player name entry and country selection
    $('#startGame').click(function(e){
      e.preventDefault();
      playerName = $('#nameEntry').val();
      nationChoice = $('.countrySelect input:checked').val();

      console.log(game);
      manager = new Manager(playerName,nationChoice);
      console.log(manager);
      //build communication page
      //find the h1 element
      var header = $('#communicationPage').find('h1');
      $(header).text("Welcome to the game " + manager.playerName);
      //hide frontpage
      $('#frontPage').addClass('hide');
      //unhide communication page
      $('#communicationPage').removeClass('hide');
    });


// game.groupAMatches[2].kickOff();
// game.tableUpdate(game.groupAMatches[2],game.groupA,game.groupATableUnsorted);
// game.groupAMatches[3].kickOff();
// game.tableUpdate(game.groupAMatches[3],game.groupA,game.groupATableUnsorted);
// game.groupAMatches[4].kickOff();
// game.tableUpdate(game.groupAMatches[4],game.groupA,game.groupATableUnsorted);
// game.groupAMatches[5].kickOff();
// game.tableUpdate(game.groupAMatches[5],game.groupA,game.groupATableUnsorted);

// game.tableSort(game.groupATable,game.groupATableUnsorted,game.groupAMatches);


// game.groupBMatches[2].kickOff();
// game.tableUpdate(game.groupBMatches[2],game.groupB,game.groupBTableUnsorted);
// game.groupBMatches[3].kickOff();
// game.tableUpdate(game.groupBMatches[3],game.groupB,game.groupBTableUnsorted);
// game.groupBMatches[4].kickOff();
// game.tableUpdate(game.groupBMatches[4],game.groupB,game.groupBTableUnsorted);
// game.groupBMatches[5].kickOff();
// game.tableUpdate(game.groupBMatches[5],game.groupB,game.groupBTableUnsorted);

// game.tableSort(game.groupBTable,game.groupBTableUnsorted,game.groupBMatches);


// game.groupCMatches[2].kickOff();
// game.tableUpdate(game.groupCMatches[2],game.groupC,game.groupCTableUnsorted);
// game.groupCMatches[3].kickOff();
// game.tableUpdate(game.groupCMatches[3],game.groupC,game.groupCTableUnsorted);
// game.groupCMatches[4].kickOff();
// game.tableUpdate(game.groupCMatches[4],game.groupC,game.groupCTableUnsorted);
// game.groupCMatches[5].kickOff();
// game.tableUpdate(game.groupCMatches[5],game.groupC,game.groupCTableUnsorted);

// game.tableSort(game.groupCTable,game.groupCTableUnsorted,game.groupCMatches);


// game.groupDMatches[2].kickOff();
// game.tableUpdate(game.groupDMatches[2],game.groupD,game.groupDTableUnsorted);
// game.groupDMatches[3].kickOff();
// game.tableUpdate(game.groupDMatches[3],game.groupD,game.groupDTableUnsorted);
// game.groupDMatches[4].kickOff();
// game.tableUpdate(game.groupDMatches[4],game.groupD,game.groupDTableUnsorted);
// game.groupDMatches[5].kickOff();
// game.tableUpdate(game.groupDMatches[5],game.groupD,game.groupDTableUnsorted);

// game.tableSort(game.groupDTable,game.groupDTableUnsorted,game.groupDMatches);

    //showing group draw and fixtures
    $('#commContinue').click(function(e){
      e.preventDefault();
      //hide communication page
      $('#fixtureGroupStage').removeClass('hide');
      //unhide fixtures
      $('#communicationPage').addClass('hide');
      //use a function here to build the fixture page
      fixturePageBuildGroup(game,counter);
    })



    $('#fixtureGroupContinue').click(function(e){
      e.preventDefault();
      //building the team pick page
      //find the team in the array of teams
      var locA = -1;
      var locB = -1;
      for(var i = 0; i<game.groupArray.length; i++){
        for(var j = 0; j<game.groupArray[i].length; j++){
          console.log(game.groupArray[i][j].nation);
          if(game.groupArray[i][j].nation === nationChoice){
            locA = i;
            locB = j;
          }
        }
      }
      //defining arrays for each position
      var goalkeepers = game.groupArray[locA][locB].goalkeepers;
      var defendersArray = game.groupArray[locA][locB].pickedDefenders.concat(game.groupArray[locA][locB].defenders);
      var midfieldersArray = game.groupArray[locA][locB].pickedMidfielders.concat(game.groupArray[locA][locB].midfielders);
      var attackersArray = game.groupArray[locA][locB].pickedAttackers.concat(game.groupArray[locA][locB].attackers);
      console.log(midfieldersArray);
      console.log(attackersArray);
      //replacing the goalkeeper list
      for(var i = 0; i < goalkeepers.length; i++){
        var newTableRow = document.createElement("tr");
        $(newTableRow).html("<td><div class='checkbox'><label><input type='checkbox' name='selector[]' id='goalkeepersCheckbox' value="+goalkeepers[i].firstName+goalkeepers[i].lastName+">"+goalkeepers[i].firstName+' '+goalkeepers[i].lastName+"</label></div></td><td>"+goalkeepers[i].ability+"</td>");
        $('#goalkeepers').append(newTableRow);
      }
      //updating the defender list
      for(var i = 0; i < defendersArray.length; i++){
        var newTableRow = document.createElement("tr");
        $(newTableRow).html("<td><div class='checkbox'><label><input type='checkbox' name='selector[]' id='defendersCheckbox' value="+defendersArray[i].firstName+defendersArray[i].lastName+">"+defendersArray[i].firstName+' '+defendersArray[i].lastName+"</label></div></td><td>"+defendersArray[i].defendingAbility+"</td><td>"+defendersArray[i].attackingAbility+"</td>");
        $('#defenders').append(newTableRow);
      }
      //updating the midfielder list
      for(var i = 0; i < midfieldersArray.length; i++){
        var newTableRow = document.createElement("tr");
        $(newTableRow).html("<td><div class='checkbox'><label><input type='checkbox' name='selector[]' id='midfieldersCheckbox' value="+midfieldersArray[i].firstName+midfieldersArray[i].lastName+">"+midfieldersArray[i].firstName+' '+midfieldersArray[i].lastName+"</label></div></td><td>"+midfieldersArray[i].defendingAbility+"</td><td>"+midfieldersArray[i].attackingAbility+"</td>");
        $('#midfielders').append(newTableRow);
      }
      //updating the defender list
      for(var i = 0; i < attackersArray.length; i++){
        var newTableRow = document.createElement("tr");
        $(newTableRow).html("<td><div class='checkbox'><label><input type='checkbox' name='selector[]' id='attackersCheckbox' value="+attackersArray[i].firstName+attackersArray[i].lastName+">"+attackersArray[i].firstName+' '+attackersArray[i].lastName+"</label></div></td><td>"+attackersArray[i].defendingAbility+"</td><td>"+attackersArray[i].attackingAbility+"</td>");
        $('#attackers').append(newTableRow);
      }

      $('#teamPick').removeClass('hide');
      $('#fixtureGroupStage').addClass('hide');


      // if(counter === 0){
      //   if(nationChoice === game.groupAMatches[0].homeTeam || nationChoice === game.groupAMatches[0].awayTeam){
      //     $('#fixtureGroupStage').addClass('hide');
      //     $('#teamPick').removeClass('hide');
      //   } else {
      //     game.groupAMatches[0].kickOff();
      //     game.tableUpdate(game.groupAMatches[0],game.groupA,game.groupATableUnsorted);
      //   }
      //   if(nationChoice === game.groupAMatches[1].homeTeam || nationChoice === game.groupAMatches[1].awayTeam){
      //     $('#fixtureGroupStage').addClass('hide');
      //     $('#teamPick').removeClass('hide');
      //   } else {
      //     game.groupAMatches[1].kickOff();
      //     game.tableUpdate(game.groupAMatches[1],game.groupA,game.groupATableUnsorted);
      //   }
      //   if(nationChoice === game.groupBMatches[0].homeTeam || nationChoice === game.groupBMatches[0].awayTeam){
      //     $('#fixtureGroupStage').addClass('hide');
      //     $('#teamPick').removeClass('hide');
      //   } else {
      //     game.groupBMatches[0].kickOff();
      //     game.tableUpdate(game.groupBMatches[0],game.groupB,game.groupBTableUnsorted);
      //   }
      //   if(nationChoice === game.groupBMatches[1].homeTeam || nationChoice === game.groupBMatches[1].awayTeam){
      //     $('#fixtureGroupStage').addClass('hide');
      //     $('#teamPick').removeClass('hide');
      //   } else {
      //     game.groupBMatches[1].kickOff();
      //     game.tableUpdate(game.groupBMatches[1],game.groupB,game.groupBTableUnsorted);
      //   }
      //   if(nationChoice === game.groupCMatches[0].homeTeam || nationChoice === game.groupCMatches[0].awayTeam){
      //     $('#fixtureGroupStage').addClass('hide');
      //     $('#teamPick').removeClass('hide');
      //   } else {
      //     game.groupCMatches[0].kickOff();
      //     game.tableUpdate(game.groupCMatches[0],game.groupC,game.groupCTableUnsorted);
      //   }
      //   if(nationChoice === game.groupCMatches[1].homeTeam || nationChoice === game.groupCMatches[1].awayTeam){
      //     $('#fixtureGroupStage').addClass('hide');
      //     $('#teamPick').removeClass('hide');
      //   } else {
      //     game.groupCMatches[1].kickOff();
      //     game.tableUpdate(game.groupCMatches[1],game.groupC,game.groupCTableUnsorted);
      //   }
      //   if(nationChoice === game.groupDMatches[0].homeTeam || nationChoice === game.groupDMatches[0].awayTeam){
      //     $('#fixtureGroupStage').addClass('hide');
      //     $('#teamPick').removeClass('hide');
      //   } else {
      //     game.groupDMatches[0].kickOff();
      //     game.tableUpdate(game.groupDMatches[0],game.groupD,game.groupDTableUnsorted);
      //   }
      //   if(nationChoice === game.groupDMatches[1].homeTeam || nationChoice === game.groupDMatches[1].awayTeam){
      //     $('#fixtureGroupStage').addClass('hide');
      //     $('#teamPick').removeClass('hide');
      //   } else {
      //     game.groupDMatches[1].kickOff();
      //     game.tableUpdate(game.groupDMatches[1],game.groupD,game.groupDTableUnsorted);
      //   }

      // }
      // game.tableSort(game.groupATable,game.groupATableUnsorted,game.groupAMatches);
      // game.tableSort(game.groupBTable,game.groupBTableUnsorted,game.groupBMatches);
      // game.tableSort(game.groupCTable,game.groupCTableUnsorted,game.groupCMatches);
      // game.tableSort(game.groupDTable,game.groupDTableUnsorted,game.groupDMatches);
    })

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
      console.log(tactic);
      //console.log($('#tacticChoice input:checked').val());
    });



    $('#teamPickContinue').click(function(){
      if(tactic === 0){
        alert("please choose a formation");
      } else {
        checkingTeamSelection(tactic);
      }
    })
  }

);