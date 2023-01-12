var R1;
var r1_unit = 'kohms';
var R2;
var r2_unit = 'kohms';
var R3;
var r3_unit = 'kohms';
var C;
var c_unit = 'uf';

var K;
var f;
var f_unit = 'kHz';
var T;
var period_unit = 'ms';

var f_or_t;
var method = 'none';

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
        R1 = parseFloat(document.getElementById('R1').value) * prefix_to_divisor(r1_unit) * prefix_to_multiplier(unit.value)
        display_field(R1, 'R1', 2);
        r1_unit = unit.value;
    }
    else if(unit.id == 'r2-unit'){
        R2 = parseFloat(document.getElementById('R2').value) * prefix_to_divisor(r2_unit) * prefix_to_multiplier(unit.value)
        display_field(R2, 'R2', 2);
        r2_unit = unit.value;
    }
    else if(unit.id == 'r3-unit'){
        R3 = parseFloat(document.getElementById('R3').value) * prefix_to_divisor(r3_unit) * prefix_to_multiplier(unit.value)
        display_field(R3, 'R3', 2);
        r3_unit = unit.value;
    }
    else if(unit.id == 'c-unit'){
        C = parseFloat(document.getElementById('C').value) * prefix_to_divisor(c_unit) * prefix_to_multiplier(unit.value)
        display_field(C, 'C', 2);
        c_unit = unit.value;
    }
    else if(unit.id == 'f-unit'){
        f = parseFloat(document.getElementById('f').value) * prefix_to_divisor(f_unit) * prefix_to_multiplier(unit.value)
        display_field(f, 'f', 2);
        f_unit = unit.value;
    }
    else if(unit.id == 'period-unit'){
        T = parseFloat(document.getElementById('T').value) * prefix_to_divisor(period_unit) * prefix_to_multiplier(unit.value)
        display_field(T, 'T', 3);
        period_unit = unit.value;
    }
}

// Compute prefix value
function prefix_to_divisor(prefix) {
    if(prefix == 'kohms'){
        return 1000.0;
    }
    if(prefix == 'Mohms'){
        return 1000000.0;
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
        return 1000.0;
    }
    if(prefix == 'MHz'){
        return 1000000.0;
    }
    if(prefix == 'GHz'){
        return 1000000000.0;
    }
    if(prefix == 'us'){
        return (1 / 1000000);
    }
    if(prefix == 'ns'){
        return (1 / 1000000000);
    }
    if(prefix == 'ms'){
        return (1 / 1000);
    }
    return 1.0;
}

function prefix_to_multiplier(prefix) {
    if(prefix == 'kohms'){
        return 1 / 1000;
    }
    if(prefix == 'Mohms'){
        return 1 / 1000000;
    }
    if(prefix == 'pf'){
        return 1000000000000.0;
    }
    if(prefix == 'nf'){
        return 1000000000.0;
    }
    if(prefix == 'uf'){
        return 1000000.0;
    }
    if(prefix == 'mf'){
        return 1000.0;
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
    if(prefix == 'us'){
        return (1000000);
    }
    if(prefix == 'ns'){
        return (1000000000);
    }
    if(prefix == 'ms'){
        return (1000);
    }
    return 1.0;
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

    C_prefix = document.getElementById('c-unit').value
    C = parseFloat(document.getElementById('C').value) * prefix_to_divisor(C_prefix);

    K = document.getElementById('K').value;

    f_prefix = document.getElementById('f-unit').value
    f = parseFloat(document.getElementById('f').value) * prefix_to_divisor(f_prefix);
    
    period_prefix = document.getElementById('period-unit').value
    T = parseFloat(document.getElementById('T').value) * prefix_to_divisor(period_prefix);
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

    // Capacitor Conversion
    C_prefix = document.getElementById('c-unit').value;
    C = C * prefix_to_multiplier(C_prefix);

    // Center Frequency Conversion
    f_prefix = document.getElementById('f-unit').value;
    f = f * prefix_to_multiplier(f_prefix);
    t_prefix = document.getElementById('period-unit').value;
    T = T * prefix_to_multiplier(t_prefix);
}


function display_field(value, field_name, decimal_accuracy){
    if(isNaN(value)){
        document.getElementById(field_name).value = "";
    }
    else { 
        document.getElementById(field_name).value = parseFloat(value).toFixed(decimal_accuracy);
    }
}

// Displays the current values in associated fields
function displayValues(){
    display_field(R1, 'R1', 2);
    display_field(R2, 'R2', 2);
    display_field(R3, 'R3', 2);
    display_field(C, 'C', 2);
    display_field(K, 'K', 2);
    display_field(f, 'f', 2);
    display_field(T, 'T', 3);
}

function setOutputParamListener(){
    f_or_t = document.getElementById("f_or_t").value;

    if (f_or_t == 't'){
        document.getElementById('f').disabled = true;
        document.getElementById('f').style.backgroundColor = 'lightgrey';
        document.getElementById('T').disabled = false;
        document.getElementById('T').style.backgroundColor = 'lightgreen';
    }
    else if (f_or_t == 'f'){
        document.getElementById('f').disabled = false;
        document.getElementById('f').style.backgroundColor = 'lightgreen';
        document.getElementById('T').disabled = true;
        document.getElementById('T').style.backgroundColor = 'lightgrey';
    }
    else {
        document.getElementById('f').disabled = true;
        document.getElementById('f').style.backgroundColor = 'lightgrey';
        document.getElementById('T').disabled = true;
        document.getElementById('T').style.backgroundColor = 'lightgrey';
    }
}

function selectionListener(){
    method = document.getElementById("methods").value;
    if(method == "none"){
        document.getElementById('f_or_t').disabled = true;
    }
    else{
        document.getElementById('f_or_t').disabled = false;
    }
    enable_fields();
    setup_fields(method); 
}

function enable_fields(){
    document.getElementById("K").disabled = false;
    document.getElementById("f").disabled = false;
    document.getElementById("T").disabled = false;

    document.getElementById("R1").disabled = false;
    document.getElementById("r1-unit").disabled = false;
    document.getElementById("R2").disabled = false;
    document.getElementById("r2-unit").disabled = false;
    document.getElementById("R3").disabled = false;
    document.getElementById("r3-unit").disabled = false;
    document.getElementById("C").disabled = false;
    document.getElementById("c-unit").disabled = false;
    
    document.getElementById("K").value = "";
    document.getElementById("f").value = "";
    document.getElementById("T").value = "";

    document.getElementById("R1").value = "";
    document.getElementById("R2").value = "";
    document.getElementById("R3").value = "";
    document.getElementById("C").value = "";

    document.getElementById("R1").style.backgroundColor = "lightgreen";
    document.getElementById("R2").style.backgroundColor = "lightgreen";
    document.getElementById("R3").style.backgroundColor = "lightgreen";
    document.getElementById("C").style.backgroundColor = "lightgreen";

    f_or_t = document.getElementById('f_or_t').value
    if(f_or_t == 'f'){
        document.getElementById("f").style.backgroundColor = "lightgreen";
    }
    else if(f_or_t == 't'){
        document.getElementById("T").style.backgroundColor = "lightgreen";
    }
}

// Disables one field.
function disable_field(a){
    document.getElementById(a).disabled = 'true';
    document.getElementById(a).style.backgroundColor = "lightgrey";
}

// Disables the fields based on selected method.
function setup_fields(m){
    if(m == 'none'){
        fields_to_disable = ["K", "R2", "f", "T"]
        fields_to_disable.forEach(disable_field);
    }
    else if(m == 'method1'){
        fields_to_disable = ["R2", "R3", "K"]
        if(f_or_t == 'f'){
            fields_to_disable.push("T");
        }
        else if(f_or_t == 't'){
            fields_to_disable.push("f");
        }
        else {
            fields_to_disable.push("T");
            fields_to_disable.push("f");
        }
        fields_to_disable.forEach(disable_field);
    }
    else if(m == 'method2'){
        fields_to_disable = ["C", "R2", "K"]
        if(f_or_t == 'f'){
            fields_to_disable.push("T");
        }
        else if(f_or_t == 't'){
            fields_to_disable.push("f");
        }
        else {
            fields_to_disable.push("T");
            fields_to_disable.push("f");
        }
        fields_to_disable.forEach(disable_field);
    }
}

// Calculate Router
function calculate(){
    convert_user_values();

    R2 = R1;
    K = 1 + (R2/R1);

    if(method == 'none'){
        f = 1 / (2 * Math.log(3) * R3 * C);
        T = 1 / f;
    }
    else if(method == 'method1'){
        if(f_or_t == 'f'){
            // Calculate R2 from frequency
            R3 = 1 / (2 * Math.log(3) * f * C);
            T = 1 / f;
        }
        else if(f_or_t == 't'){
            // Calculate R2 from period
            f = 1 / T;
            R3 = 1 / (2 * Math.log(3) * f * C);
        }
    }
    else if(method == 'method2'){
        if(f_or_t == 'f'){
            // Calculate C from frequency
            T = 1 / f;
            C = 1 / (2 * Math.log(3) * R3 * f);
        }
        else if(f_or_t == 't'){
            // Calculate C from period
            f = 1 / T;
            C = 1 / (2 * Math.log(3) * R3 * f);
        }
    }

    convert_to_original_unit();
    displayValues();
}
