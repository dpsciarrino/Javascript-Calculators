
var R1;
var R2;
var Vin;
var Vout;
var method;


// Dynamic Input Checking
var validNumber = new RegExp(/^\d*\.?\d*$/);
var lastVal = ""
function checkInput(elem) {
  if (validNumber.test(elem.value)) {
    lastVal = elem.value;
  } else {
    elem.value = lastVal;
  }
}


// Calculate Router
function calculate(){
    convert_user_values();

    method = document.getElementById('methods').value

    if(method == 'Vout'){ calc_vout(); }
    else if(method == 'Vin'){ calc_vin(); }
    else if(method == 'R1'){ calc_r1(); }
    else if(method == 'R2'){ calc_r2(); }

    convert_to_original_unit();


    displayValues();
}

// Compute prefix value
function prefix_to_divisor(prefix) {
    if(prefix == 'kohms'){
        return 1000;
    }
    if(prefix == 'Mohms'){
        return 1000000;
    }
    if(prefix == 'pf'){
        return (1 / 1000000000000);
    }
    if(prefix == 'nf'){
        return (1 / 1000000000);
    }
    if(prefix == 'uf'){
        return (1 / 1000000);
    }
    if(prefix == 'mf'){
        return (1 / 1000);
    }
    if(prefix == 'uV'){
        return (1 / 1000000);
    }
    if(prefix == 'mV'){
        return (1 / 1000);
    }
    return 1;
}

function prefix_to_multiplier(prefix) {
    if(prefix == 'kohms'){
        return 1 / 1000;
    }
    if(prefix == 'Mohms'){
        return 1 / 1000000;
    }
    if(prefix == 'pf'){
        return 1000000000000;
    }
    if(prefix == 'nf'){
        return 1000000000;
    }
    if(prefix == 'uf'){
        return 1000000;
    }
    if(prefix == 'mf'){
        return 1000;
    }
    if(prefix == 'uV'){
        return (1000000);
    }
    if(prefix == 'mV'){
        return (1000);
    }
    return 1;
}

// Up-Conversion
//   When the user specifies the units, convert the numbers based on the units.
function convert_user_values(){
    R1_prefix = document.getElementById('r1-unit').value
    R1 = parseFloat(document.getElementById('R1').value) * prefix_to_divisor(R1_prefix);
    R2_prefix = document.getElementById('r2-unit').value
    R2 = parseFloat(document.getElementById('R2').value) * prefix_to_divisor(R2_prefix);
    Vin_prefix = document.getElementById('vin-unit').value
    Vin = parseFloat(document.getElementById('Vin').value) * prefix_to_divisor(Vin_prefix);
    Vout_prefix = document.getElementById('vout-unit').value
    Vout = parseFloat(document.getElementById('Vout').value) * prefix_to_divisor(Vout_prefix);
}

// Down-conversion
//   When the calculation is finished, convert back to original value.
function convert_to_original_unit(){
    R1_prefix = document.getElementById('r1-unit').value;
    R1 = R1 * prefix_to_multiplier(R1_prefix);
    R2_prefix = document.getElementById('r2-unit').value;
    R2 = R2 * prefix_to_multiplier(R2_prefix);

    Vin_prefix = document.getElementById('vin-unit').value;
    Vin = Vin * prefix_to_multiplier(Vin_prefix);

    Vout_prefix = document.getElementById('vout-unit').value;
    Vout = Vout * prefix_to_multiplier(Vout_prefix);
}






// Displays the current values in associated fields
function displayValues(){
    document.getElementById('R1').value = parseFloat(R1).toFixed(2);
    document.getElementById('R2').value = parseFloat(R2).toFixed(2);
    document.getElementById('Vin').value = parseFloat(Vin).toFixed(2);
    document.getElementById('Vout').value = parseFloat(Vout).toFixed(2);
}

function calc_vout(){
    Vout = Vin * (R2 / (R1 + R2));
}
    
function calc_vin() {
    Vin = Vout * ((R1 + R2) / R2);
}
    
function calc_r1() {
    var ratio = Vout / Vin;
    R1 = (R2 * (1 - ratio)) / ratio;
}

function calc_r2() {
    var ratio = Vout / Vin;
    R2 = (ratio * R1) / (1 - ratio);
}

function selectionListener(){
    method = document.getElementById("methods").value;
}