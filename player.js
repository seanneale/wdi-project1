var outfieldPlayer = function(firstName,lastName,nationality,position,defendingAbility,attackingAbility){
  this.firstName = firstName;
  this.lastName = lastName;
  this.nationality = nationality;
  this.position = position;
  this.defendingAbility = defendingAbility;
  this.attackingAbility = attackingAbility;
  this.averageAbility = 0.5 * (defendingAbility + attackingAbility);
}

var goalkeeper = function(firstName,lastName,nationality,ability){
  this.firstName = firstName;
  this.lastName = lastName;
  this.nationality = nationality;
  this.position = "Goalkeeper";
  this.ability = ability;
}
