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

function teamSelectionPageBuild(game,nationChoice,counter){
  if(counter === 0){
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
    // changing the team name
    $('#teamPick h1').text(nationChoice);
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
  }
};

function checkingTeamSelection(tactic,nationChoice,game,counter){
  console.log(tactic);
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
    return false;
  } else if (goalkeepersChosen < 1 ){
    alert("not enough goalkeepers");
    return false;
  } else {
    if(defendersChosen.length<defNo){
      alert("not enough defenders");
      return false;
    } else if(defendersChosen.length>defNo){
      alert("too many defenders");
      return false;
    } else {
      if(midfieldersChosen.length<midNo){
        alert("not enough midfielders");
        return false;
      } else if(midfieldersChosen.length>midNo){
        alert("too many midfielders");
        return false;
      } else {
        if(attackersChosen.length<attNo){
          alert("not enough attackers");
          return false;
        } else if(attackersChosen.length>attNo){
          alert("too many attackers");
          return false;
        } else {
          tactic=0;
          return(true);

        }
      }
    }
  }
}

function puttingPlayersIntoTeam(nationChoice,game,counter){
  //find the game in question
  var i = 1;
  var match = "";
  var focus = "";
  var team = "";
  var goalkeepersChosen = [];
  var defendersChosen = [];
  var midfieldersChosen = [];
  var attackersChosen = [];

  $('#goalkeepersCheckbox:checked').each(function(i){
    goalkeepersChosen[i] = $(this).val();
  })
  $('#defendersCheckbox:checked').each(function(i){
    defendersChosen[i] = $(this).val();
  })
  $('#midfieldersCheckbox:checked').each(function(i){
    midfieldersChosen[i] = $(this).val();
  })
  $('#attackersCheckbox:checked').each(function(i){
    attackersChosen[i] = $(this).val();
  })

  if(counter < 3){
    for(var i = 0; i < game.roundArray[counter].length; i++){
      if(nationChoice === game.roundArray[counter][i].homeTeam || nationChoice === game.roundArray[counter][i].awayTeam){
        match = game.roundArray[counter][i];
        console.log(match);
      }
    }
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
    for(var i = 0; i < goalkeepersChosen.length; i++){
      for(var j = 0; j < goalkeepers.length; j++){
        if(goalkeepersChosen[i] === goalkeepers[j].firstName+goalkeepers[j].lastName){
          match.homeTeamGoalkeeper.push(goalkeepers[j]);
        }
      }
    }
    match.homeTeamDefender = [];
    for(var i = 0; i < defendersChosen.length; i++){
      for(var j = 0; j < defendersArray.length; j++){
        if(defendersChosen[i] === defendersArray[j].firstName+defendersArray[j].lastName){
          match.homeTeamDefender.push(defendersArray[j]);
        }
      }
    }
    match.homeTeamMidfielder = [];
    for(var i = 0; i < midfieldersChosen.length; i++){
      for(var j = 0; j < midfieldersArray.length; j++){
        if(midfieldersChosen[i] === midfieldersArray[j].firstName+midfieldersArray[j].lastName){
          match.homeTeamMidfielder.push(midfieldersArray[j]);
        }
      }
    }
    match.homeTeamAttacker = [];
    for(var i = 0; i < attackersChosen.length; i++){
      for(var j = 0; j < attackersArray.length; j++){
        if(attackersChosen[i] === attackersArray[j].firstName+attackersArray[j].lastName){
          match.homeTeamAttacker.push(attackersArray[j]);
        }
      }
    }
  } else if (match.awayTeam === nationChoice){
  //if the team are the away team put them in the right spots
    match.awayTeamGoalkeeper = [];
    for(var i = 0; i < goalkeepersChosen.length; i++){
      for(var j = 0; j < goalkeepers.length; j++){
        if(goalkeepersChosen[i] === goalkeepers[j].firstName+goalkeepers[j].lastName){
          match.awayTeamGoalkeeper.push(goalkeepers[j]);
        }
      }
    }
    match.awayTeamDefender = [];
    for(var i = 0; i < defendersChosen.length; i++){
      for(var j = 0; j < defendersArray.length; j++){
        if(defendersChosen[i] === defendersArray[j].firstName+defendersArray[j].lastName){
          match.awayTeamDefender.push(defendersArray[j]);
        }
      }
    }
    match.awayTeamMidfielder = [];
    for(var i = 0; i < midfieldersChosen.length; i++){
      for(var j = 0; j < midfieldersArray.length; j++){
        if(midfieldersChosen[i] === midfieldersArray[j].firstName+midfieldersArray[j].lastName){
          match.awayTeamMidfielder.push(midfieldersArray[j]);
        }
      }
    }
    match.awayTeamAttacker = [];
    for(var i = 0; i < attackersChosen.length; i++){
      for(var j = 0; j < attackersArray.length; j++){
        if(attackersChosen[i] === attackersArray[j].firstName+attackersArray[j].lastName){
          match.awayTeamAttacker.push(attackersArray[j]);
        }
      }
    }
  } else {
    console.log('didnt work');
  }
  return match;
}

function buildingMatchScreen(match){
  match.viewed = true;
  console.log(match);
  //removing old match feed
  $('.removable').remove();
  var banner = $('#scoreBanner h1:nth-child(1)');
  $(banner[0]).text(match.homeTeam);
  $(banner[1]).text(0);
  $(banner[2]).text(0);
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
  currentMatch = match;
  $('#matchScreenBtn').click(function(){
    //adding a class to be listened for all the time
    //make sure once clicked the class is removed
    $('#matchScreenBtn').addClass('hide');
    match.kickOff(true);
    $('#matchScreenContinue').removeClass('hide');
  })
}

function fixturePageBuildKnockout(game,counter){
  var edits = $('#fixtureKnockoutStage').find('p');
  //quarter final build
  if(counter === 3){
    for(var i = 0; i < game.quarterFinalMatches.length; i++){
      $(edits[i]).text(game.quarterFinalMatches[i].homeTeam+" vs "+game.quarterFinalMatches[i].awayTeam);
    }
  } else if (counter === 4){
    for(var i = 0; i < game.quarterFinalMatches.length; i++){
      $(edits[i]).text(game.quarterFinalMatches[i].homeTeam+" "+game.quarterFinalMatches[i].homeTeamScore+":"+game.quarterFinalMatches[i].awayTeamScore+" "+game.quarterFinalMatches[i].awayTeam);
    }
  } else if (counter === 5){

  }
}