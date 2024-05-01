function toConvert(value, fromUnit, toUnit, densityOrMolarmass = null){
    if(!densityOrConcentration){

        if(toUnit == "gramas"){
            return value/1000;
        }
        else if(toUnit == "kilogramas"){
            return value*1000;
        }
        
        if(toUnit == "liters"){
            return value/1000;
        }
        else if(toUnit == "mililiters"){
            return value*1000;
        }

        //pressure conversion to pa
        if(fromUnit == "psi"){
            return value * 894.7573;
        }

        //temperature conversion to kelvin
        if(fromUnit == "°F"){
            return ((value - 32) * (5/9) + 273.15);
        }else if(fromUnit == "°C"){
            return value + 273.15;
        }

        //time conversion to hours
        if(fromUnit == "minutes"){
            return value/60;
        } else if(fromUnit == "seconds"){
            return value/3600; 
        }

    }else{
        if(toUnit == "gramas"){
            //density vai tá em g/mL
            if(fromUnit == "mililiters"){
                return value * densityOrMolarmass;
            }else if (fromUnit == "liters"){
                return (value * densityOrMolarmass)*1000;
            }

            if(fromUnit == "mols"){
                //molarmass em g/mol
                return value * densityOrMolarmass;
            }

        }
    }
}
module.exports = toConvert;