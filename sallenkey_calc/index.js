
var R1;
var R2;
var R3;
var R4;
var C1;
var C2;

var K;
var Q;
var Fc;
var FSF;
var m;
var n;

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
    if(prefix == 'kHz'){
        return 1000;
    }
    if(prefix == 'MHz'){
        return 1000000;
    }
    if(prefix == 'GHz'){
        return 1000000000;
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
    if(prefix == 'kHz'){
        return 1 / 1000;
    }
    if(prefix == 'MHz'){
        return 1 / 1000000;
    }
    if(prefix == 'GHz'){
        return 1 / 1000000000;
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
    
    C1_prefix = document.getElementById('c1-unit').value
    C1 = parseFloat(document.getElementById('C1').value) * prefix_to_divisor(C1_prefix);
    C2_prefix = document.getElementById('c2-unit').value
    C2 = parseFloat(document.getElementById('C2').value) * prefix_to_divisor(C2_prefix);
    
    K = document.getElementById('K').value;
    Q = document.getElementById('Q').value;
    Fc_prefix = document.getElementById('fc-unit').value
    Fc = parseFloat(document.getElementById('Fc').value) *prefix_to_divisor(Fc_prefix);
    FSF = document.getElementById('FSF').value
    m = document.getElementById('m').value
    n = document.getElementById('n').value    
}

// Down-conversion
//   When the calculation is finished, convert back to original value.
function convert_to_original_unit(){
    // Voltage Conversion
    R1_prefix = document.getElementById('r1-unit').value;
    R1 = R1 * prefix_to_multiplier(R1_prefix);
    R2_prefix = document.getElementById('r2-unit').value;
    R2 = R2 * prefix_to_multiplier(R2_prefix);
    R3_prefix = document.getElementById('r3-unit').value;
    R3 = R3 * prefix_to_multiplier(R3_prefix);
    R4_prefix = document.getElementById('r4-unit').value;
    R4 = R4 * prefix_to_multiplier(R4_prefix);

    // Capacitor Conversion
    C1_prefix = document.getElementById('c1-unit').value;
    C1 = C1 * prefix_to_multiplier(C1_prefix);
    C2_prefix = document.getElementById('c2-unit').value;
    C2 = C2 * prefix_to_multiplier(C2_prefix);
    
    // Center Frequency Conversion
    Fc_prefix = document.getElementById('fc-unit').value;
    Fc = Fc * prefix_to_multiplier(Fc_prefix);
}




// Displays the current values in associated fields
function displayValues(){
    document.getElementById('R1').value = parseFloat(R1).toFixed(2);
    document.getElementById('R2').value = parseFloat(R2).toFixed(2);
    document.getElementById('R3').value = parseFloat(R3).toFixed(2);
    document.getElementById('R4').value = parseFloat(R4).toFixed(2);
    document.getElementById('C1').value = parseFloat(C1).toFixed(2);
    document.getElementById('C2').value = parseFloat(C2).toFixed(2);
    
    document.getElementById('K').value = parseFloat(K).toFixed(2);
    document.getElementById('Q').value = parseFloat(Q).toFixed(2);
    document.getElementById('Fc').value = parseFloat(Fc).toFixed(1);
    document.getElementById('FSF').value = parseFloat(FSF).toFixed(2);
    document.getElementById('m').value = parseFloat(m).toFixed(2);
    document.getElementById('n').value = parseFloat(n).toFixed(2);
}

function selectionListener(){
    method = document.getElementById("methods").value;
}


// Calculate Router
function calculate(){
    convert_user_values();

    method = document.getElementById('methods').value

    if(method == 'none'){
        alert("None");
    }
    else if(method == 'method1'){
        alert('Method 1');
    }
    else if(method == 'method2'){
        alert('Method 2');
    }
    else if(method == 'method3'){
        alert('Method 3');
    }

    convert_to_original_unit();

    displayValues();
}