
var R1;
var R2;
var Req;
var method;
var mode;

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

    mode = document.getElementById('modes').value
    method = document.getElementById('methods').value

    if(mode == 'series'){
        if(method == 'Req'){ calc_series_req(); }
        if(method == 'R1'){ calc_series_r1(); }
        if(method == 'R2'){ calc_series_r2(); }
    }
    else if(mode == 'parallel'){
        if(method == 'Req'){ calc_parallel_req(); }
        if(method == 'R1'){ calc_parallel_r1(); }
        if(method == 'R2'){ calc_parallel_r2(); }
    }

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
    return 1;
}

function prefix_to_multiplier(prefix) {
    if(prefix == 'kohms'){
        return 1/1000;
    }
    if(prefix == 'Mohms'){
        return 1/1000000;
    }
    return 1;
}

// Series Calculations
function calc_series_r1(){
    R1 = Req - R2;
}
function calc_series_r2(){
    R2 = Req - R1;
}
function calc_series_req(){
    Req = R1 + R2;
}

// Parallel Calculations
function calc_parallel_r1(){
    R1 = (Req * R2) / (R2 - Req);
}
function calc_parallel_r2(){
    R2 = (Req * R1) / (R1 - Req);
}
function calc_parallel_req(){
    Req = (R1 * R2) / (R1 + R2)
}

// Up-Conversion
//   When the user specifies the units, convert the numbers based on the units.
function convert_user_values(){
    R1_prefix = document.getElementById('r1-unit').value
    R1 = parseFloat(document.getElementById('R1').value) * prefix_to_divisor(R1_prefix);
    R2_prefix = document.getElementById('r2-unit').value
    R2 = parseFloat(document.getElementById('R2').value) * prefix_to_divisor(R2_prefix);
    Req_prefix = document.getElementById('req-unit').value
    Req = parseFloat(document.getElementById('Req').value) * prefix_to_divisor(Req_prefix);
}

// Down-conversion
//   When the calculation is finished, convert back to original value.
function convert_to_original_unit(){
    R1_prefix = document.getElementById('r1-unit').value
    R1 = R1 * prefix_to_multiplier(R1_prefix);
    R2_prefix = document.getElementById('r2-unit').value
    R2 = R2 * prefix_to_multiplier(R2_prefix);
    Req_prefix = document.getElementById('req-unit').value
    Req = Req * prefix_to_multiplier(Req_prefix);
}

// Displays the end calculation values
function displayValues(){
    document.getElementById('R1').value = parseFloat(R1).toFixed(2);
    document.getElementById('R2').value = parseFloat(R2).toFixed(2),
    document.getElementById('Req').value = parseFloat(Req).toFixed(2);
}

// Selection box listener for method selection
function selectionListener(){
    method = document.getElementById("methods").value;
}

// Selection box listner for mode listener
function modeListener(){
    mode = document.getElementById("modes").value;
}

