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
      }
      // creating the player object
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


var ireland = new squad ('Republic of Ireland', 'Irish', [
    ['Keiren' , 'Westwood'] , ['Shay' , 'Given'] , ['Darren' , 'Randolph']
  ] , [
    ['Seamus' , 'Coleman'] , ['Ciaran' , 'Clark'] , ["John" , "O'Shea"] , ['Richard' , 'Keogh'] , ['Shane' , 'Duffy'] , ['Cyrus' , 'Christie'] , ['Stephen' , 'Ward']
  ] , [
    ['Glenn' , 'Whelan'] , ['Aiden' , 'McGeady'] , ['James' , 'McCarthy'] , ['James' , 'McClean'] , ['Jeff' , 'Hendrick'] , ['David' , 'Meyler'] , ['Robbie' , 'Brady'] , ['Wes' , 'Hoolahan'] , ['Stephen' , 'Quinn']
  ] , [
    ['Shane' , 'Long'] , ['Robbie' , 'Keane'] , ['Jonathan' , 'Walters'] , ['Daryl' , 'Murphy']
  ] );

ireland.generatePlayers();

var spain = new squad ('Spain', 'spanish', [
    ['Iker' , 'Casillas'] , ['David' , 'de Gea'] , ['Sergio' , 'Rico']
  ] , [
    ['Cesar' , 'Azpilicueta'] , ['Gerard' , 'Pique'] , ['Marc' , 'Bartra'] , ['Hector' , 'Bellerin'] , ['Sergio' , 'Ramos'] , ['' , 'Juanfran'] , ['Mikel' , 'San Jose'] , ['Jordi' , 'Alba']
  ] , [
    ['Sergio' , 'Busquets'] , ['Andres' , 'Iniesta'] , ['' , 'Koke'] , ['Cesc' , 'Fabregas'] , ['' , 'Thiago'] , ['Bruno' , 'Soriano'] , ['David' , 'Silva']
  ] , [
    ['Alvaro' , 'Morata'] , ['Lucas' , 'Vazquez'] , ['' , 'Pedro'] , ['Aritz' , 'Aduriz'] , ['' , 'Nolito']
  ] );

spain.generatePlayers();

var germany = new squad ('Germany', 'german', [
    ['Manuel' , 'Neuer'] , ['Bernd' , 'Leno'] , ['Marc-Andre' , 'ter Stegen']
  ] , [
    ['Shkodran' , 'Mustafi'] , ['Jonas' , 'Hector'] , ['Benedikt' , 'Howedes'] , ['Mats' , 'Hummels'] , ['Jonathan' , 'Tah'] , ['Jerome' , 'Boateng'] , ['Joshua' , 'Kimmich']
  ] , [
    ['Sami' , 'Khedira']  , ['Bastian' , 'Schweinsteiger'] , ['Mesut' , 'Ozil'] , ['Andre' , 'Schurrle'] , ['Julian' , 'Draxler'] , ['Emre' , 'Can'] , ['Julian' , 'Weigl'] , ['Toni' , 'Kroos'] , ['Mario' , 'Gotze'] , ['Leroy' , 'Sane']
  ] , [
    ['Lukas Podolski'] , ['Thomas' , 'Muller'] , ['Mario' , 'Gomez']
  ] );

germany.generatePlayers();

var france = new squad ('France', 'french', [
    ['Hugo' , 'Lloris'] , ['Steve' , 'Mandanda'] , ['Benoît' , 'Costil']
  ] , [
    ['Christophe' , 'Jallet'] , ['Patrice' , 'Evra'] , ['Adil' , 'Rami'] , ['Eliaquim' , 'Mangala'] , ['Lucas' , 'Digne'] , ['Bacary' , 'Sagna'] , ['Laurent' , 'Koscielny'] , ['Samuel' , 'Umtiti']
  ] , [
    ["N'Golo" , 'Kante']  , ['Yohan' , 'Cabaye'] , ['Dimitri' , 'Payet'] , ['Morgan Schneiderlin'] , ['Blaise Matuidi'] , ['Paul Pogba'] , ['Moussa Sissoko']
  ] , [
    ['Antoine' , 'Griezmann'] , ['Olivier' , 'Giroud'] , ['André-Pierre' , 'Gignac'] , ['Anthony' , 'Martial'] , ['Kingsley'' , ''Coman']
  ] );

france.generatePlayers();

var england = new squad ('England', 'engish', [
    ['Joe' , 'Hart'] , ['Fraser' , 'Forster'] , ['Tom' , 'Heaton']
  ] , [
    ['Kyle' , 'Walker'] , ['Danny' , 'Rose'] , ['Gary' , 'Cahill'] , ['Chris' , 'Smalling'] , ['Nathaniel' , 'Clyne'] , ['John' , 'Stones'] , ['Ryan' , 'Bertrand']
  ] , [
    ['James' , 'Milner']  , ['Raheem' , 'Sterling'] , ['Adam' , 'Lallana'] , ['Jordan' , 'Henderson'] , ['Eric' , 'Dier'] , ['Jack' , 'Wilshere'] , ['Dele' , 'Alli']
  ] , [
    ['Harry' , 'Kane'] , ['Wayne' , 'Rooney'] , ['Jamie' , 'Vardy'] , ['Daniel' , 'Sturridge'] , ['Marcus' , 'Rashford']
  ] );

england.generatePlayers();

var australia = new squad ('Australia', 'australian', [
    ['Mathew' , 'Ryan'] , ['Mitchell' , 'Langerak'] , ['Eugene' , 'Galekovic']
  ] , [
    ['Ivan' , 'Franjic'] , ['Jason' , 'Davidson'] , ['Matthew' , 'Spiranovic'] , ['Chris' , 'Herd'] , ['Aziz' , 'Behich'] , ['Trent' , 'Sainsbury'] , ['Alex' , 'Wilkinson']
  ] , [
    ['Mark' , 'Milligan']  , ['Mathew' , 'Leckie'] , ['Tommy' , 'Oar'] , ['James' , 'Troisi'] , ['Mile' , 'Jedinak'] , ['Matt' , 'McKay'] , ['Terry' , 'Antonis'] , ['Massimo' , 'Luongo'] , ['Mark' , 'Bresciano']
  ] , [
    ['Tim' , 'Cahill'] , ['Tomi' , 'Juric'] , ['Robbie' , 'Kruse'] , ['Nathan' , 'Burns']
  ] );

australia.generatePlayers();

var southKorea = new squad ('South Korea', 'south korean', [
    ['Jung' , 'Sung-ryong'] , ['Kim' , 'Seung-gyu'] , ['Kim' , 'Jin-hyeon']
  ] , [
    ['Kim' , 'Chang-soo'] , ['Kim' , 'Jin-su'] , ['Kim' , 'Ju-young'] , ['Kwak' , 'Tae-hwi'] , ['Kim' , 'Young-gwon'] , ['Jang' , 'Hyun-soo'] , ['Cha' , 'Du-ri']
  ] , [
    ['Park' , 'Joo-ho']  , ['Son' , 'Heung-min'] , ['Kim' , 'Min-woo'] , ['Nam' , 'Tae-hee'] , ['Han' , 'Kyo-won'] , ['Koo' , 'Ja-cheol'] , ['Han' , 'Kook-young'] , ['Lee' , 'Myung-joo'] , ['Ki' , 'Sung-yueng'] , ['Lee' , 'Chung-yong']
  ] , [
    ['Cho' , 'Young-cheol'] , ['Lee' , 'Keun-ho'] , ['Lee' , 'Jung-hyup']
  ] );

southKorea.generatePlayers();

var algeria = new squad ('Algeria', 'algeria', [
    ['Azzedine' , 'Doukha'] , ['Cédric' , 'Si Mohamed'] , ['Raïs' , "M'Bolhi"]
  ] , [
    ['Madjid' , 'Bougherra'] , ['Faouzi' , 'Ghoulam'] , ['Liassine' , 'Cadamuro-Bentaïba'] , ['Rafik' , 'Halliche'] , ['Djamel' , 'Mesbah'] , ['Carl' , 'Medjani'] , ['Aissa' , 'Mandi'] , ['Mehdi' , 'Zeffane']
  ] , [
    ['Riyad' , 'Mahrez']  , ['Medhi' , 'Lacen'] , ['Sofiane' , 'Feghouli'] , ['Yacine' , 'Brahimi'] , ['Nabil' , 'Bentaleb'] , ['Foued' , 'Kadir'] , ['Abdelmoumene' , 'Djabou'] , ['Saphir' , 'Taider'] , ['Ahmed' , 'Kashi']
  ] , [
    ['Ishak' , 'Belfodil'] , ['Islam' , 'Slimani'] , ['El Arbi' , 'Soudani']
  ] );

algeria.generatePlayers();

var ghana = new squad ('Ghana', 'Ghanaian', [
    ['Brimah' , 'Razak'] , ['Ernest' , 'Sowah'] , ['Fatau' , 'Dauda']
  ] , [
    ['Edwin' , 'Gyimah'] , ['Mohamed' , 'Awal'] , ['Baba' , 'Rahman'] , ['Daniel' , 'Amartey'] , ['Jonathan' , 'Mensah'] , ['John' , 'Boye'] , ['Harrison' , 'Afful']
  ] , [
    ['Afriyie' , 'Acquah']  , ['Christian' , 'Atsu'] , ['Emmanuel' , 'Agyemang-Badu'] , ['Andre' , 'Ayew'] , ['Mubarak' , 'Wakaso'] , ['Mohammed' , 'Rabiu'] , ['Solomon' , 'Asante'] , ['Frank' , 'Acheampong']
  ] , [
    ['Kwesi' , 'Appiah'] , ['Asamoah' , 'Gyan'] , ['Jordan' , 'Ayew'] , ['Mahatma' , 'Otoo'] , ['David' , 'Accam']
  ] );

ghana.generatePlayers();

var ivoryCoast = new squad ('Ivory Coast', 'Ivorian', [
    ['Boubacar' , 'Barry'] , ['Sylvain' , 'Gbohouo'] , ['Sayouba' , 'Mande']
  ] , [
    ['Ousmane' , 'Viera'] , ['Kolo' , 'Toure'] , ['Siaka' , 'Tiene'] , ['Jean-Daniel' , 'Akpa-Akpro'] , ['Serge' , 'Aurier'] , ['Eric' , 'Bailly'] , ['Wilfried' , 'Kanon']
  ] , [
    ['Roger' , 'Assale']  , ['Cheick' , 'Doukoure'] , ['Cheick' , 'Tiote'] , ['Ismael' , 'Diomande'] , ['Max' , 'Gradel'] , ['Yaya' , 'Toure'] , ['Serey' , 'Die']
  ] , [
    ['Seydou' , 'Doumbia'] , ['Salomon' , 'Kalou'] , ['' , 'Gervinho'] , ['Junior' , 'Tallo'] , ['Wilfried' , 'Bony'] , ['Lacina' , 'Traore']
  ] );

ivoryCoast.generatePlayers();

// var germany = new squad ('Germany', 'german', [
//     ['' , ''] , [''] , ['']
//   ] , [
//     ['' , ''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     ['']  , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] );

// germany.generatePlayers();

// var germany = new squad ('Germany', 'german', [
//     ['' , ''] , [''] , ['']
//   ] , [
//     ['' , ''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     ['']  , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] );

// germany.generatePlayers();

// var germany = new squad ('Germany', 'german', [
//     ['' , ''] , [''] , ['']
//   ] , [
//     ['' , ''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     ['']  , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] );

// germany.generatePlayers();

// var germany = new squad ('Germany', 'german', [
//     ['' , ''] , [''] , ['']
//   ] , [
//     ['' , ''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     ['']  , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] );

// germany.generatePlayers();

// var germany = new squad ('Germany', 'german', [
//     ['' , ''] , [''] , ['']
//   ] , [
//     ['' , ''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     ['']  , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] );

// germany.generatePlayers();

// var germany = new squad ('Germany', 'german', [
//     ['' , ''] , [''] , ['']
//   ] , [
//     ['' , ''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     ['']  , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] );

// germany.generatePlayers();

// var germany = new squad ('Germany', 'german', [
//     ['' , ''] , [''] , ['']
//   ] , [
//     ['' , ''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     ['']  , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] );

// germany.generatePlayers();

// var germany = new squad ('Germany', 'german', [
//     ['' , ''] , [''] , ['']
//   ] , [
//     ['' , ''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     ['']  , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] );

// germany.generatePlayers();

// var germany = new squad ('Germany', 'german', [
//     ['' , ''] , [''] , ['']
//   ] , [
//     ['' , ''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     ['']  , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] );

// germany.generatePlayers();

// var germany = new squad ('Germany', 'german', [
//     ['' , ''] , [''] , ['']
//   ] , [
//     ['' , ''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     ['']  , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] );

// germany.generatePlayers();

// var germany = new squad ('Germany', 'german', [
//     ['' , ''] , [''] , ['']
//   ] , [
//     ['' , ''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     ['']  , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] , [
//     [''] , [''] , [''] , [''] , [''] , [''] , [''] , [''] , ['']
//   ] );

// germany.generatePlayers();
