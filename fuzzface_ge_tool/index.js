var R1;
var R2;
var Vcc;

// First Measurement Variables
var V1;
var I_leakage;
var hFE_Perceived;
var show_units1 = false;

// Second Measurement Variables
var V2;
var V_adj;
var hFE;
var show_units2 = false;

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
        return 1000.0;
    }
    if(prefix == 'Mohms'){
        return 1000000.0;
    }
    if(prefix == 'microAmps'){
        return 1/1000000;
    }
    if(prefix == 'nanoAmps'){
        return 1/1000000000;
    }
    if(prefix == 'milliAmps'){
        return 1/1000;
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
    if(prefix == 'microAmps'){
        return 1000000;
    }
    if(prefix == 'nanoAmps'){
        return 1000000000;
    }
    if(prefix == 'milliAmps'){
        return 1000;
    }
    return 1.0;
}

// Up-Conversion #1
//   When the user specifies the units, convert the numbers based on the units.
function convert_user_values(){
    R1 = parseFloat(document.getElementById('R1').value) * prefix_to_divisor('Mohms');
    R2 = parseFloat(document.getElementById('R2').value) * prefix_to_divisor('kohms');
    V1 = parseFloat(document.getElementById('v1').value);
    V2 = parseFloat(document.getElementById('v2').value);
    Vcc = parseFloat(document.getElementById('Vcc').value);
}

// Down-conversion #1
//   When the calculation is finished, convert back to original value.
function convert_to_original_unit(){
    R1 = R1 * prefix_to_multiplier('Mohms');
    R2 = R2 * prefix_to_multiplier('kohms');
}

// Displays the value in field_name with decimal_accuracy
function display_field(value, field_name, decimal_accuracy){
    if(isNaN(value)){
        document.getElementById(field_name).value = "";
    }
    else { 
        document.getElementById(field_name).value = parseFloat(value).toFixed(decimal_accuracy);
    }
}

// Displays the current values in associated fields for first measurement
function displayValues1(){
    display_field(R1, 'R1', 2);
    display_field(R2, 'R2', 3);
    display_field(V1, 'v1', 3);
    display_field(Vcc, 'Vcc', 3);
}

// Displays the current values in associated fields for second measurement
function displayValues2(){
    display_field(V2, 'v2', 3);
    display_field(V_adj, 'v-adjusted', 3);
    display_field(hFE, 'hfe', 1);
}





// Calculate Router
function calculate_leakage(){
    convert_user_values();

    // Error checking V1 input
    if(isNaN(V1)){
        document.getElementById('v1-msg').style.display = 'block';
        I_leakage = NaN;
        hFE_Perceived = NaN;
    }
    else{
        document.getElementById('v1-msg').style.display = 'none';

        // Calculate Leakage Current and Display
        I_leakage = (V1 / R2) * prefix_to_multiplier('microAmps'); 
        display_leakage_value_with_units = parseFloat(I_leakage).toFixed(1).concat(" ", "μA")
        document.getElementById('i-leakage').innerText = display_leakage_value_with_units;

        I_base = (Vcc / R1) * prefix_to_multiplier('microAmps');
        display_base_current_with_units = parseFloat(I_base).toFixed(1).concat(" ", "μA")
        document.getElementById('i-base').innerText = display_base_current_with_units;

        // Calculate perceived hFE (gain)
        ib = I_base * prefix_to_divisor('microAmps');
        hFE_Perceived = V1 / (ib*R2);
        document.getElementById('hFE-perceived').innerText = parseFloat(hFE_Perceived).toFixed(1);

        // Enables the second calculation.
        document.getElementById('v2').disabled = false;
        document.getElementById('btn2').disabled = false;
        document.getElementById('v2').style.backgroundColor = 'lightgreen';
    }

    convert_to_original_unit();
    displayValues1();
}

function calculate_hFE(){
    convert_user_values();
    
    if(isNaN(V2) | (V2 < V1)){
        if(isNaN(V2)){
            document.getElementById('v2-msg').style.display = 'block';
        }
        if(V2 < V1){
            document.getElementById('v2-msg2').style.display = 'block';
        }
        V_adj = NaN;
        hFE = NaN;
    }
    else {
        document.getElementById('v2-msg').style.display = 'none';
        document.getElementById('v2-msg2').style.display = 'none';

        // Calculate Adjusted Voltage and Display
        V_adj = V2 - V1;
        display_adjusted_voltage_value = parseFloat(V_adj).toFixed(3).concat(" ", "V");
        document.getElementById('v-adjusted').innerText = display_adjusted_voltage_value;

        // Calculate hFE value and display
        hFE = V_adj * 100;
        display_hfe_value = parseFloat(hFE).toFixed(1);
        document.getElementById('hfe').innerText = display_hfe_value;
    }

    convert_to_original_unit();
    displayValues2();
}