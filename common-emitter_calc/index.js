let R1 = 430000;
let R1_prefix = 'kohms';
let R2 = 43000;
let R2_prefix = 'kohms';
let R3 = 10000;
let R3_prefix = 'kohms';
let R4 = 390;
let R4_prefix = 'ohms';
let beta = 600;
let Vcc = 9;
let Vbe = 0.65;

let Vc = 0;
let Vc_prefix = 'V';
let Vb = 0;
let Vb_prefix = 'mV';
let Ve = 0;
let Ve_prefix = 'mV';

let Ic = 0;
let Ic_prefix = 'uA';
let Ib = 0;
let Ib_prefix = 'nA';
let Ie = 0;
let Ie_prefix = 'uA';

let Av = R3 / R4;

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

// Dynamically changes the currently displayed unit
function unitListener(unit){
    if(unit.id == 'r1-unit'){
        R1 = parseFloat(document.getElementById('R1').value) * prefix_to_divisor(R1_prefix) * prefix_to_multiplier(unit.value)
        display_field(R1, 'R1', 5);
        R1_prefix = unit.value;
    }
    else if(unit.id == 'r2-unit'){
        R2 = parseFloat(document.getElementById('R2').value) * prefix_to_divisor(R2_prefix) * prefix_to_multiplier(unit.value)
        display_field(R2, 'R2', 5);
        R2_prefix = unit.value;
    }
    else if(unit.id == 'r3-unit'){
        R3 = parseFloat(document.getElementById('R3').value) * prefix_to_divisor(R3_prefix) * prefix_to_multiplier(unit.value)
        display_field(R3, 'R3', 5);
        R3_prefix = unit.value;
    }
    else if(unit.id == 'r4-unit'){
        R4 = parseFloat(document.getElementById('R3').value) * prefix_to_divisor(R4_prefix) * prefix_to_multiplier(unit.value)
        display_field(R4, 'R4', 5);
        R4_prefix = unit.value;
    }
    else if(unit.id == 'Vc-unit'){
        Vc = parseFloat(document.getElementById('Vc').value) * prefix_to_divisor(Vc_prefix) * prefix_to_multiplier(unit.value)
        display_field(Vc, 'Vc', 5);
        Vc_prefix = unit.value;
    }
    else if(unit.id == 'Vb-unit'){
        Vb = parseFloat(document.getElementById('Vb').value) * prefix_to_divisor(Vb_prefix) * prefix_to_multiplier(unit.value)
        display_field(Vb, 'Vb', 5);
        Vb_prefix = unit.value;
    }
    else if(unit.id == 'Ve-unit'){
        Ve = parseFloat(document.getElementById('Ve').value) * prefix_to_divisor(Ve_prefix) * prefix_to_multiplier(unit.value)
        display_field(Ve, 'Ve', 5);
        Ve_prefix = unit.value;
    }
    else if(unit.id == 'Ic-unit'){
        Ic = parseFloat(document.getElementById('Ic').value) * prefix_to_divisor(Ic_prefix) * prefix_to_multiplier(unit.value)
        display_field(Ic, 'Ic', 5);
        Ic_prefix = unit.value;
    }
    else if(unit.id == 'Ib-unit'){
        Ib = parseFloat(document.getElementById('Ib').value) * prefix_to_divisor(Ib_prefix) * prefix_to_multiplier(unit.value)
        display_field(Ib, 'Ib', 5);
        Ib_prefix = unit.value;
    }
    else if(unit.id == 'Ie-unit'){
        Ie = parseFloat(document.getElementById('Ie').value) * prefix_to_divisor(Ie_prefix) * prefix_to_multiplier(unit.value)
        display_field(Ie, 'Ie', 5);
        Ie_prefix = unit.value;
    }

}

function display_field(value, field_name, decimal_accuracy){
    if(isNaN(value)){
        document.getElementById(field_name).value = "";
    }
    else { 
        document.getElementById(field_name).value = parseFloat(value).toFixed(decimal_accuracy);
    }
}



// Compute prefix value
function prefix_to_divisor(prefix) {
    if(prefix == 'kohms'){
        return 1000;
    }
    if(prefix == 'Mohms'){
        return 1000000;
    }
    if(prefix == 'nA' || prefix == 'nV'){
        return 0.000000001;
    }
    if(prefix == 'uA' || prefix == 'uV'){
        return 0.000001;
    }
    if(prefix == 'mA' || prefix == 'mV'){
        return 0.001;
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
    if(prefix == 'nA' || prefix == 'nV'){
        return 1000000000;
    }
    if(prefix == 'uA' || prefix == 'uV'){
        return 1000000;
    }
    if(prefix == 'mA' || prefix == 'mV'){
        return 1000;
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
    R3_prefix = document.getElementById('r3-unit').value
    R3 = parseFloat(document.getElementById('R3').value) * prefix_to_divisor(R3_prefix);
    R4_prefix = document.getElementById('r4-unit').value
    R4 = parseFloat(document.getElementById('R4').value) * prefix_to_divisor(R4_prefix);

    Vcc = parseFloat(document.getElementById('Vcc').value);
    Vbe = parseFloat(document.getElementById('Vbe').value);
    beta = parseFloat(document.getElementById('beta').value);

    Vc_prefix = document.getElementById('Vc-unit').value;
    Vc = parseFloat(document.getElementById('Vc').value) * prefix_to_divisor(Vc_prefix);
    Vb_prefix = document.getElementById('Vb-unit').value;
    Vb = parseFloat(document.getElementById('Vb').value) * prefix_to_divisor(Vb_prefix);
    Ve_prefix = document.getElementById('Ve-unit').value;
    Ve = parseFloat(document.getElementById('Ve').value) * prefix_to_divisor(Ve_prefix);
    
    Ic_prefix = document.getElementById('Ic-unit').value;
    Ic = parseFloat(document.getElementById('Ic').value) * prefix_to_divisor(Ic_prefix);
    Ib_prefix = document.getElementById('Ib-unit').value;
    Ib = parseFloat(document.getElementById('Ib').value) * prefix_to_divisor(Ib_prefix);
    Ie_prefix = document.getElementById('Ie-unit').value;
    Ie = parseFloat(document.getElementById('Ie').value) * prefix_to_divisor(Ie_prefix);
    
    Av = document.getElementById('Av').value; 
}

// Down-conversion
//   When the calculation is finished, convert back to original value.
function convert_to_original_unit(){
    // Resistor Conversion
    R1_prefix = document.getElementById('r1-unit').value;
    R1 = R1 * prefix_to_multiplier(R1_prefix);
    R2_prefix = document.getElementById('r2-unit').value;
    R2 = R2 * prefix_to_multiplier(R2_prefix);
    R3_prefix = document.getElementById('r3-unit').value;
    R3 = R3 * prefix_to_multiplier(R3_prefix);
    R4_prefix = document.getElementById('r4-unit').value;
    R4 = R4 * prefix_to_multiplier(R4_prefix);

    // Voltage Conversion
    Vc_prefix = document.getElementById('Vc-unit').value;
    Vc = Vc * prefix_to_multiplier(Vc_prefix);
    Vb_prefix = document.getElementById('Vb-unit').value;
    Vb = Vb * prefix_to_multiplier(Vb_prefix);
    Ve_prefix = document.getElementById('Ve-unit').value;
    Ve = Ve * prefix_to_multiplier(Ve_prefix);
    
    // Current Conversion
    Ic_prefix = document.getElementById('Ic-unit').value;
    Ic = Ic * prefix_to_multiplier(Ic_prefix);
    Ib_prefix = document.getElementById('Ib-unit').value;
    Ib = Ib * prefix_to_multiplier(Ib_prefix);
    Ie_prefix = document.getElementById('Ie-unit').value;
    Ie = Ie * prefix_to_multiplier(Ie_prefix);
}

// Displays the current values in associated fields
function displayValues(){
    document.getElementById('R1').value = parseFloat(R1).toFixed(2);
    document.getElementById('R2').value = parseFloat(R2).toFixed(2);
    document.getElementById('R3').value = parseFloat(R3).toFixed(2);
    document.getElementById('R4').value = parseFloat(R4).toFixed(2);

    document.getElementById('Vcc').value = parseFloat(Vcc).toFixed(2);
    document.getElementById('Vbe').value = parseFloat(Vbe).toFixed(2);
    document.getElementById('beta').value = parseFloat(beta).toFixed(0);
    
    document.getElementById('Vc').value = parseFloat(Vc).toFixed(2);
    document.getElementById('Vb').value = parseFloat(Vb).toFixed(2);
    document.getElementById('Ve').value = parseFloat(Ve).toFixed(2);
    document.getElementById('Ic').value = parseFloat(Ic).toFixed(2);
    document.getElementById('Ib').value = parseFloat(Ib).toFixed(2);
    document.getElementById('Ie').value = parseFloat(Ie).toFixed(2);
    

    document.getElementById('Av').value = parseFloat(Av).toFixed(2);
}

function p(thing_to_print){
    console.log(thing_to_print);
}

// Calculate Router
function calculate(){
    convert_user_values();

    // Solve system of equations via matrix inversion
    let a = -1 * (beta + 1) * R4;
    let b = ((beta + 1) * R4) + R2;
    let c = R1;
    let d = R2;
    
    let inv_divisor = (a * d) - (b * c);

    let A_inv1 = d / inv_divisor;
    let A_inv2 = (-1) * (b / inv_divisor);
    let A_inv3 = (-1) * (c / inv_divisor);
    let A_inv4 = a / inv_divisor;

    let i1 = (A_inv1 * Vbe) + (A_inv2 * Vcc);
    let i2 = (A_inv3 * Vbe) + (A_inv4 * Vcc);

    // Calculate DC Voltage and Current Values
    Vb = R2 * i2;
    Ib = i1 - i2;

    Ic = beta * Ib;
    Vc = Vcc - (Ic * R3);

    Ie = Ic + Ib;
    Ve = Ie * R4;

    // Calculate Gain
    Av = -1 * (R3 / R4);

    convert_to_original_unit();

    displayValues();
}