function toConvert(value, fromUnit, toUnit, densityOrMolarmass = null) {
    if (!densityOrMolarmass) {
        if (toUnit == "kilograma") {
            return value / 1000;
        } else if (toUnit == "grama") {
            return value * 1000;
        }

        if (toUnit == "liter") {
            return value / 1000;
        } else if (toUnit == "mililiter") {
            return value * 1000;
        }

        //pressure conversion to pa
        if (fromUnit == "psi") {
            return value * 894.7573;
        }

        //temperature conversion to kelvin
        if (fromUnit == "farenheit") {
            return (value - 32) * (5 / 9) + 273.15;
        } else if (fromUnit == "celsius") {
            return value + 273.15;
        }

        //time conversion to hours
        if (fromUnit == "minutes") {
            return value / 60;
        } else if (fromUnit == "seconds") {
            return value / 3600;
        }
    } else {
        if (toUnit == "grama") {
            //density vai tá em g/mL
            if (fromUnit == "mililiter") {
                return value * densityOrMolarmass;
            } else if (fromUnit == "liter") {
                return value * densityOrMolarmass * 1000;
            }

            if (fromUnit == "mols") {
                //molarmass em g/mol
                return value * densityOrMolarmass;
            }
        }
    }
}
module.exports = toConvert;
