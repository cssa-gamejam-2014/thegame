// Draw a person
function drawPerson(outfit, position){
    var c=document.getElementById("examples");
    var ctx=c.getContext("2d");
    var body=document.getElementById("body");
    var hat=document.getElementById("hat");
    ctx.drawImage(body,10,10);
    ctx.drawImage(hat,10,10);
}

function getRandom(range){
    return Math.floor((Math.random()*range));
}

colours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

level1 = {
    generator : function(){
        person = []
        
        chanceOfWear = {hat: 100, shirt: 100, pants: 100, jacket: 100, shoes: 100}
        var clothes = ['hat', 'pants', 'jacket', 'socks', 'shoes'];
        clothes.forEach(function(entry){
            if (getRandom(100) < chanceOfWear[entry]){
                person[entry] =  colours[getRandom(6)];
            }
        });
        
        if (getRandom(2) == 1){
            person['shirt'] = 'green';
        } else {
            person['shirt'] = 'blue';
        }
        
        
        return person;
    },
    validator : function(clothing){
        if (clothing.shirt == 'blue' || clothing.shirt == 'green'){
            return true;
        } else {
            return false;
        }
    }
}

console.log(level1.generator());