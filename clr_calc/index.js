
var Vcc;
var Vf;
var If;
var CLR;
var method;
var clr_unit = 'kohms';


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

    if(method == 'CLR'){ calc_clr(); }
    else if(method == 'If'){ calc_if(); }

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






// Displays the current values in associated fields
function displayValues(){
    document.getElementById('Vcc').value = parseFloat(Vcc).toFixed(1);
    document.getElementById('Vf').value = parseFloat(Vf).toFixed(2);
    document.getElementById('If').value = parseFloat(If).toFixed(2);
    document.getElementById('CLR').value = parseFloat(CLR).toFixed(5);
}

function calc_clr(){
    CLR = (Vcc - Vf) / If;
}
    
function calc_if() {
    If = (Vcc - Vf) / CLR;
}

function selectionListener(){
    method = document.getElementById("methods").value;
}

function display_field(value, field_name, decimal_accuracy){
    if(isNaN(value)){
        document.getElementById(field_name).value = "";
    }
    else { 
        document.getElementById(field_name).value = parseFloat(value).toFixed(decimal_accuracy);
    }
}

// Dynamically changes the currently displayed unit
function unitListener(unit){
    if(unit.id == 'clr-unit'){
        CLR = parseFloat(document.getElementById('CLR').value) * prefix_to_divisor(clr_unit) * prefix_to_multiplier(unit.value)
        display_field(CLR, 'CLR', 2);
        clr_unit = unit.value;
    }
}