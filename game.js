
$(document).ready(function(){
    // Draw a person
    function drawPerson(outfit, position){
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        var posOffset = (position-1)*200+12
        
        var body=document.getElementById("body");
        ctx.drawImage(body,posOffset,10);
        
        for (var key in outfit){
            ctx.drawImage(document.getElementById(key+"_"+outfit[key]),posOffset,10);
        }
        var hat=document.getElementById("hat");
        
        ctx.drawImage(hat,posOffset,10);
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

    drawPerson(level1.generator(), 1);
    drawPerson(level1.generator(), 2);
    drawPerson(level1.generator(), 3);

});