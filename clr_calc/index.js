
var Vcc;
var Vf;
var If;
var CLR;
var method;
var clr_unit = 'kohms';

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

    method = document.getElementById('methods').value

    // CLR Calculation
    if(method == 'CLR'){ calc_clr(); }
    // Forward Current Calculation
    else if(method == 'If'){ calc_if(); }

    // Convert actual to prefixed version for display
    convert_to_original_unit();

    displayValues();
}

// Used to convert actual number to prefixed form
function prefix_to_divisor(prefix) {
    if(prefix == 'kohms'){
        return 1000;
    }
    if(prefix == 'Mohms'){
        return 1000000;
    }
    return 1;
}

// Used to convert prefixed value to actual number
function prefix_to_multiplier(prefix) {
    if(prefix == 'kohms'){
        return 1 / 1000;
    }
    if(prefix == 'Mohms'){
        return 1 / 1000000;
    }
    return 1;
}

// Up-Conversion
//   When the user specifies the units, convert the numbers based on the units.
function convert_user_values(){
    CLR_prefix = document.getElementById('clr-unit').value
    CLR = parseFloat(document.getElementById('CLR').value) * prefix_to_divisor(CLR_prefix);

    Vcc = parseFloat(document.getElementById('Vcc').value);
    Vf = parseFloat(document.getElementById('Vf').value);
    If = parseFloat(document.getElementById('If').value) / 1000;
}

// Down-conversion
//   When the calculation is finished, convert back to original value.
function convert_to_original_unit(){
    CLR_prefix = document.getElementById('clr-unit').value;
    CLR = CLR * prefix_to_multiplier(CLR_prefix);

    If = If * 1000;
}






// Displays values in associated fields
function displayValues(){
    document.getElementById('Vcc').value = parseFloat(Vcc).toFixed(1);
    document.getElementById('Vf').value = parseFloat(Vf).toFixed(2);
    document.getElementById('If').value = parseFloat(If).toFixed(2);
    document.getElementById('CLR').value = parseFloat(CLR).toFixed(5);
}

// Calculate Current Limiting Resistor value
function calc_clr(){
    CLR = (Vcc - Vf) / If;
}
    
// Calculate Forward Current value 
function calc_if() {
    If = (Vcc - Vf) / CLR;
}

// Selects the calculation method
function selectionListener(){
    method = document.getElementById("methods").value;
}

// Displays value in field_name with decimal_accuracy number of decimal places.
function display_field(value, field_name, decimal_accuracy){
    if(isNaN(value)){
        document.getElementById(field_name).value = "";
    }
    else { 
        document.getElementById(field_name).value = parseFloat(value).toFixed(decimal_accuracy);
    }
}

// Dynamically changes the currently displayed unit.
function unitListener(unit){
    if(unit.id == 'clr-unit'){
        CLR = parseFloat(document.getElementById('CLR').value) * prefix_to_divisor(clr_unit) * prefix_to_multiplier(unit.value)
        display_field(CLR, 'CLR', 2);
        clr_unit = unit.value;
    }
}