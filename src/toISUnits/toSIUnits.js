module.exports = {
    conversions(value, unit){
        if(unit == "kg")
            return value;
        else if(unit == "gramas"){
            return value/1000;
        }

        if(unit == "liters"){
            return value;
        }else if(unit == "ml" || unit == "ML"){
            return value/1000;
        }else if(unit == "atm" || unit == "Atm"){
            return value * 101325;
        }

        if(unit == "pa"){
            return value;
        }else if(unit == "psi"){
            return value * 894.7573;
        }

        if(unit == "K")
            return value;
        else if(unit == "°F"){
            return ((value - 32) * (5/9) + 273.15);
        }else if(unit == "°C"){
            return value + 273.15;
        }
    },


    
}