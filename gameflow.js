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

function buildingMatchScreen(match){
  match.viewed = true;
  console.log(match);
  var banner = $('#scoreBanner h1:nth-child(1)');
  $(banner[0]).text(match.homeTeam);
  $(banner[3]).text(match.awayTeam);
  var teamSheet = $('#teamSheet h3');
  $(teamSheet[0]).text(match.homeTeam);
  $(teamSheet[1]).text(match.awayTeam);
  //cat home team squad
  var squadOne = match.homeTeamGoalkeeper.concat(match.homeTeamDefender).concat(match.homeTeamMidfielder).concat(match.homeTeamAttacker);
  //cat away team squad
  var squadTwo = match.awayTeamGoalkeeper.concat(match.awayTeamDefender).concat(match.awayTeamMidfielder).concat(match.awayTeamAttacker);
  //find home team li selector
  //find away team li selector
  var teamList = $('#teamSheet li');
  //in one for loop
  for(var i = 0; i <= 10; i++){
    //replace [i] li selector with [i] player
    var j = i + 11;
    $(teamList[i]).text(squadOne[i].firstName+' '+squadOne[i].lastName);
    $(teamList[j]).text(squadTwo[i].firstName+' '+squadTwo[i].lastName);
  }
  $('#matchScreenBtn').click(function(){
    $('#matchScreenBtn').text('Match Playing');
    $('#matchScreenBtn').prop('disabled', true);
    console.log(match);
    match.kickOff();
    console.log(match);


    $('#matchScreenBtn').prop('disabled', false);
    $('#matchScreenBtn').text('Continue');
    //adding a class to be listened for all the time
    //make sure once clicked the class is removed
    $('#matchScreenBtn').attr('id', 'matchScreenContinue');
  })
}

function puttingPlayersIntoTeam(gk,def,mid,att,nationChoice,game){
  //find the game in question
  var i = 1;
  var match = "";
  var focus = "";
  var team = "";
  while(i <= 4){
    if(i === 1){
      focus = game.groupAMatches;
    } else if(i === 2){
      focus = game.groupBMatches;
    } else if(i === 3){
      focus = game.groupCMatches;
    } else if(i === 4){
      focus = game.groupDMatches;
    }
    if(nationChoice === focus[0].homeTeam || nationChoice === focus[0].awayTeam){
      match = focus[0];
    }else if(nationChoice === focus[1].homeTeam || nationChoice === focus[1].awayTeam){
      match = focus[1];
    }
    i++;
  }
  //regenerate the array of all goalkeepers
  //find the team in the array of teams
  var locA = -1;
  var locB = -1;
  for(var i = 0; i<game.groupArray.length; i++){
    for(var j = 0; j<game.groupArray[i].length; j++){
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
  //if the team are the home team put them in the right spots
  if(match.homeTeam === nationChoice){
    match.homeTeamGoalkeeper = [];
    for(var i = 0; i < gk.length; i++){
      for(var j = 0; j < goalkeepers.length; j++){
        if(gk[i] === goalkeepers[j].firstName+goalkeepers[j].lastName){
          match.homeTeamGoalkeeper.push(goalkeepers[j]);
        }
      }
    }
    match.homeTeamDefender = [];
    for(var i = 0; i < def.length; i++){
      for(var j = 0; j < defendersArray.length; j++){
        if(def[i] === defendersArray[j].firstName+defendersArray[j].lastName){
          match.homeTeamDefender.push(defendersArray[j]);
        }
      }
    }
    match.homeTeamMidfielder = [];
    for(var i = 0; i < mid.length; i++){
      for(var j = 0; j < midfieldersArray.length; j++){
        if(mid[i] === midfieldersArray[j].firstName+midfieldersArray[j].lastName){
          match.homeTeamMidfielder.push(midfieldersArray[j]);
        }
      }
    }
    match.homeTeamAttacker = [];
    for(var i = 0; i < att.length; i++){
      for(var j = 0; j < attackersArray.length; j++){
        if(att[i] === attackersArray[j].firstName+attackersArray[j].lastName){
          match.homeTeamAttacker.push(attackersArray[j]);
        }
      }
    }
  } else if (match.awayTeam === nationChoice){
  //if the team are the away team put them in the right spots
    match.awayTeamGoalkeeper = [];
    for(var i = 0; i < gk.length; i++){
      for(var j = 0; j < goalkeepers.length; j++){
        if(gk[i] === goalkeepers[j].firstName+goalkeepers[j].lastName){
          match.awayTeamGoalkeeper.push(goalkeepers[j]);
        }
      }
    }
    match.awayTeamDefender = [];
    for(var i = 0; i < def.length; i++){
      for(var j = 0; j < defendersArray.length; j++){
        if(def[i] === defendersArray[j].firstName+defendersArray[j].lastName){
          match.awayTeamDefender.push(defendersArray[j]);
        }
      }
    }
    match.awayTeamMidfielder = [];
    for(var i = 0; i < mid.length; i++){
      for(var j = 0; j < midfieldersArray.length; j++){
        if(mid[i] === midfieldersArray[j].firstName+midfieldersArray[j].lastName){
          match.awayTeamMidfielder.push(midfieldersArray[j]);
        }
      }
    }
    match.awayTeamAttacker = [];
    for(var i = 0; i < att.length; i++){
      for(var j = 0; j < attackersArray.length; j++){
        if(att[i] === attackersArray[j].firstName+attackersArray[j].lastName){
          match.awayTeamAttacker.push(attackersArray[j]);
        }
      }
    }
  } else {
    console.log('didnt work');
  }
  buildingMatchScreen(match);
  $('#matchScreen').removeClass('hide');
  $('#teamPick').addClass('hide');
}

function checkingTeamSelection(tactic,nationChoice,game){
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
  var goalkeepersChosen = [];
  $('#goalkeepersCheckbox:checked').each(function(i){
    goalkeepersChosen[i] = $(this).val();
  })
  var defendersChosen = [];
  $('#defendersCheckbox:checked').each(function(i){
    defendersChosen[i] = $(this).val();
  })
  var midfieldersChosen = [];
  $('#midfieldersCheckbox:checked').each(function(i){
    midfieldersChosen[i] = $(this).val();
  })
  var attackersChosen = [];
  $('#attackersCheckbox:checked').each(function(i){
    attackersChosen[i] = $(this).val();
  })
  if(goalkeepersChosen.length>1){
    alert("too many goalkeepers");
  } else if (goalkeepersChosen < 1 ){
    alert("not enough goalkeepers");
  } else {
    if(defendersChosen<defNo){
      alert("not enough defenders");
    } else if(defendersChosen>defNo){
      alert("too many defenders");
    } else {
      if(midfieldersChosen<defNo){
        alert("not enough midfielders");
      } else if(midfieldersChosen>defNo){
        alert("too many midfielders");
      } else {
        if(attackersChosen<defNo){
          alert("not enough attackers");
        } else if(attackersChosen>defNo){
          alert("too many attackers");
        } else {
          tactic=0;
          puttingPlayersIntoTeam(goalkeepersChosen,defendersChosen,midfieldersChosen,attackersChosen,nationChoice,game);
        }
      }
    }
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
      manager = new Manager(playerName,nationChoice);
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

      if(counter === 0){
        var i=1;
        while(i <= 4){
          if(i === 1){
            focus = game.groupAMatches;
            unsrtTable = game.groupATableUnsorted;
            group = game.groupA;
          } else if(i === 2){
            focus = game.groupBMatches;
            unsrtTable = game.groupBTableUnsorted;
            group = game.groupB;
          } else if(i === 3){
            focus = game.groupCMatches;
            unsrtTable = game.groupCTableUnsorted;
            group = game.groupC;
          } else if(i === 4){
            focus = game.groupDMatches;
            unsrtTable = game.groupDTableUnsorted;
            group = game.groupD;
          }
          for(var j = 0; j <= 1; j++){
            if(nationChoice === focus[j].homeTeam || nationChoice === focus[j].awayTeam){
              $('#fixtureGroupStage').addClass('hide');
              $('#teamPick').removeClass('hide');
            } else {
              focus[j].kickOff();
              game.tableUpdate(focus[j],group,unsrtTable);
            }

          }
          i++;
        }
      }
      game.tableSort(game.groupATable,game.groupATableUnsorted,game.groupAMatches);
      game.tableSort(game.groupBTable,game.groupBTableUnsorted,game.groupBMatches);
      game.tableSort(game.groupCTable,game.groupCTableUnsorted,game.groupCMatches);
      game.tableSort(game.groupDTable,game.groupDTableUnsorted,game.groupDMatches);
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
      //console.log($('#tacticChoice input:checked').val());
    });



    $('#teamPickContinue').click(function(){
      if(tactic === 0){
        alert("please choose a formation");
      } else {
        checkingTeamSelection(tactic,nationChoice,game);
      }
    })
  }

);