
var C1;
var C2;
var Ceq;
var method;
var mode;

// Dynamic Input Checking
// Removes everything thats NOT an integer or floating point number
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
    // Convert prefixed values to actual
    convert_user_values();

    mode = document.getElementById('modes').value
    method = document.getElementById('methods').value

    // Series Capacitor Calculations
    if(mode == 'series'){
        if(method == 'Ceq'){ calc_series_ceq(); }
        if(method == 'C1'){ calc_series_c1(); }
        if(method == 'C2'){ calc_series_c2(); }
    }
    // Parallel Capacitor Calculations
    else if(mode == 'parallel'){
        if(method == 'Ceq'){ calc_parallel_ceq(); }
        if(method == 'C1'){ calc_parallel_c1(); }
        if(method == 'C2'){ calc_parallel_c2(); }
    }

    // Convert actual to prefixed version for display
    convert_to_original_unit();


    displayValues();

}

// Used to convert actual number to prefixed form
function prefix_to_divisor(prefix) {
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
    return 1;
}

// Used to convert prefixed value to actual number
function prefix_to_multiplier(prefix) {
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
    return 1;
}

// Calculate C1 - Series Mode
function calc_series_c1(){
    C1 = (Ceq * C2) / (C2 - Ceq);
}
// Calculate C2 - Series Mode
function calc_series_c2(){
    C2 = (Ceq * C1) / (C1 - Ceq);
}
// Calculate Ceq - Series Mode
function calc_series_ceq(){
    Ceq = (C1 * C2) / (C1 + C2)
}

// Calculate C1 - Parallel Mode
function calc_parallel_c1(){
    C1 = Ceq - C2;
}
// Calculate C2 - Parallel Mode
function calc_parallel_c2(){
    C2 = Ceq - C1;
}
// Calculate Ceq - Parallel Mode
function calc_parallel_ceq(){
    Ceq = C1 + C2;
}

// Up-Conversion
//   When the user specifies the units, convert the numbers based on the units.
function convert_user_values(){
    C1_prefix = document.getElementById('c1-unit').value
    C1 = parseFloat(document.getElementById('C1').value) * prefix_to_divisor(C1_prefix);
    C2_prefix = document.getElementById('c2-unit').value
    C2 = parseFloat(document.getElementById('C2').value) * prefix_to_divisor(C2_prefix);
    Ceq_prefix = document.getElementById('ceq-unit').value
    Ceq = parseFloat(document.getElementById('Ceq').value) * prefix_to_divisor(Ceq_prefix);
}

// Down-conversion
//   When the calculation is finished, convert back to original value.
function convert_to_original_unit(){
    C1_prefix = document.getElementById('c1-unit').value
    C1 = C1 * prefix_to_multiplier(C1_prefix);
    C2_prefix = document.getElementById('c2-unit').value
    C2 = C2 * prefix_to_multiplier(C2_prefix);
    Ceq_prefix = document.getElementById('ceq-unit').value
    Ceq = Ceq * prefix_to_multiplier(Ceq_prefix);
}

// Displays the end calculation values
function displayValues(){
    document.getElementById('C1').value = parseFloat(C1).toFixed(2);
    document.getElementById('C2').value = parseFloat(C2).toFixed(2),
    document.getElementById('Ceq').value = parseFloat(Ceq).toFixed(2);
}

// Selection box listener for method selection
function selectionListener(){
    method = document.getElementById("methods").value;
}

// Selection box listner for mode listener
function modeListener(){
    mode = document.getElementById("modes").value;
}