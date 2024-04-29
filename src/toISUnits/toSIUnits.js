module.exports = {
    conversions(value, unit){
        if(unit == "kilograma")
            return value;
        else if(unit == "gramas"){
            return value/1000;
        }

        if(unit == "liters"){
            return value;
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

        if(unit == "hours"){
            return value;
        }else if(unit == "minutes"){
            return value/60;
        } else if(unit == "seconds"){
            return value/3600; 
        }

    },


    
}