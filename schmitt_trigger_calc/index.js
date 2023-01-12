var R;
var r_unit = 'kohms';
var C;
var c_unit = 'uf';

// Supply Voltage
var Vcc;
// Positive Threshold for Schmitt Trigger IC
var Vt_pos;
// Negative Threshold for Schmitt Trigger IC
var Vt_neg;

// Frequency of Oscillation
var f;
var f_unit = 'kHz';
// Period of Oscillation
var T;
var period_unit = 'ms';
// High Pulse width
var T_high = '50';
// Low Pulse Width
var T_low = '50';

// Half (50%) Duty Cycle selected (defaults to using threshold values)
var half_duty_select = 'yes';
// Frequency/Period selected (defaults to frequency)
var frequency_or_period_select = 'f';

// Calculation Method (defaults to plug-and-play mode)
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

// What to multiple to get the unit with prefix from base unit
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

// What to multiply to get the basic unit, without prefix
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

// Displays value in field_name with decimal_accuracy
function display_field(value, field_name, decimal_accuracy){
    if(isNaN(value)){
        document.getElementById(field_name).value = "";
    }
    else { 
        document.getElementById(field_name).value = parseFloat(value).toFixed(decimal_accuracy);
    }
}

// Unit selection, dynamically changes field display value.
function unitListener(unit){
    if(unit.id == 'r-unit'){
        R = parseFloat(document.getElementById('R').value) * prefix_to_divisor(r_unit) * prefix_to_multiplier(unit.value)
        display_field(R, 'R', 2);
        r_unit = unit.value;
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





// Selects between frequency and period as a calculation input
function freq_period_ParamListener(){
    frequency_or_period_select = document.getElementById("f_or_t").value;

    if(method != 'none'){
        if (frequency_or_period_select == 't'){
            document.getElementById('f').disabled = true;
            document.getElementById('f').style.backgroundColor = 'lightgrey';
            document.getElementById('T').disabled = false;
            document.getElementById('T').style.backgroundColor = 'lightgreen';
        }
        else if (frequency_or_period_select == 'f'){
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
}

// Selected between using user-specified voltage threshold values and
// calculating them automatically based on supply voltage.
function halfDutyListener(){
    half_duty_select = document.getElementById("half-duty").value;

    document.getElementById('Vt+').value = "";
    document.getElementById('Vt-').value = "";
    document.getElementById('T').value = '';

    if (half_duty_select == 'no'){
        document.getElementById('Vt+').disabled = false;
        document.getElementById('Vt-').disabled = false;
        document.getElementById('Vt+').style.backgroundColor = 'lightgreen';
        document.getElementById('Vt-').style.backgroundColor = 'lightgreen';
        document.getElementById('th').value = '';
        document.getElementById('tl').value = '';
        document.getElementById('T').value = '';
    }
    else if(half_duty_select == 'yes'){
        document.getElementById('Vt+').disabled = true;
        document.getElementById('Vt-').disabled = true;
        document.getElementById('Vt+').style.backgroundColor = 'lightgrey';
        document.getElementById('Vt-').style.backgroundColor = 'lightgrey';
        document.getElementById('th').value = '50';
        document.getElementById('tl').value = '50';
    }
}



// Up-Conversion
//   When the user specifies the units, convert the numbers based on the units.
function convert_user_values(){
    R_prefix = document.getElementById('r-unit').value
    R = parseFloat(document.getElementById('R').value) * prefix_to_divisor(R_prefix);
    
    C_prefix = document.getElementById('c-unit').value
    C = parseFloat(document.getElementById('C').value) * prefix_to_divisor(C_prefix);

    Vcc = document.getElementById('Vcc').value;

    Vt_pos = document.getElementById('Vt+').value;

    Vt_neg = document.getElementById('Vt-').value;

    f_prefix = document.getElementById('f-unit').value
    f = parseFloat(document.getElementById('f').value) * prefix_to_divisor(f_prefix);
    
    period_prefix = document.getElementById('period-unit').value
    T = parseFloat(document.getElementById('T').value) * prefix_to_divisor(period_prefix);

    th = parseFloat(document.getElementById('th')).value;

    tl = parseFloat(document.getElementById('tl')).value;
}

// Down-conversion
//   When the calculation is finished, convert back to original value.
function convert_to_original_unit(){
    // Voltage Conversion
    R_prefix = document.getElementById('r-unit').value;
    R = R * prefix_to_multiplier(R_prefix);

    // Capacitor Conversion
    C_prefix = document.getElementById('c-unit').value;
    C = C * prefix_to_multiplier(C_prefix);

    // Center Frequency Conversion
    f_prefix = document.getElementById('f-unit').value;
    f = f * prefix_to_multiplier(f_prefix);
    t_prefix = document.getElementById('period-unit').value;
    T = T * prefix_to_multiplier(t_prefix);
}

// Displays the current values in associated fields
function displayValues(){
    display_field(R, 'R', 2);
    display_field(C, 'C', 2);
    display_field(Vcc, 'Vcc', 2);
    display_field(Vt_neg, 'Vt-', 2);
    display_field(Vt_pos, 'Vt+', 2);
    display_field(f, 'f', 2);
    display_field(T, 'T', 3);
    display_field(T_high, 'th', 1);
    display_field(T_low, 'tl', 1);
}

// Enables field_name with default_value and paints it lightgreen
function enable_field(field_name, default_value){
    field = document.getElementById(field_name);
    field.value = default_value;
    field.style.backgroundColor = 'lightgreen';
    field.disabled = false;
}

// Disables field_name with default_value and paints it lightgrey
function disable_field(field_name, default_value){
    field = document.getElementById(field_name);
    field.value = default_value;
    field.style.backgroundColor = 'lightgrey';
    field.disabled = true;
}

// Selects the option of a select field by option text
function select_option_by_name(select_field_name, option_name){
    select_field = document.getElementById(select_field_name);

    for(var i = 0; i < select_field.options.length; i++){
        if(select_field.options[i].text == option_name){
            select_field.options[i].selected = true;
            return;
        }
    }
}

// Disables field FOR CALCULATION (paints it white instead of grey)
function disable_field_for_calculation(field_name, default_value){
    field = document.getElementById(field_name);
    field.value = default_value;
    field.style.backgroundColor = 'whitesmoke';
    field.disabled = true;
}

// Sets up defaults for Method 0 (Plug and Play)
function method0_defaults(){
    enable_field('R', '');
    select_option_by_name('r-unit', 'kΩ');
    r_unit = 'kohms';

    enable_field('C', '');
    select_option_by_name('c-unit', 'uF');
    c_unit = 'uf';

    enable_field('Vcc', '');
    disable_field('Vt+', '');
    disable_field('Vt-', '');

    disable_field_for_calculation('f', '');
    select_option_by_name('f-unit', 'kHz');
    f_unit = 'kHz';

    disable_field_for_calculation('T', '');
    select_option_by_name('period-unit', 'ms');
    period_unit = 'ms';

    disable_field('th', '50');
    disable_field('tl', '50');

    select_option_by_name('half-duty', 'Yes');
    document.getElementById('half-duty').disabled = false;

    select_option_by_name('f_or_t', 'Frequency');
    document.getElementById('f_or_t').disabled = true;
}

// Set sup defaults for method 1, calculate for resistance R
function method1_defaults(){
    select_option_by_name('r-unit', 'kΩ');
    r_unit = 'kohms';
    disable_field_for_calculation('R', '')

    enable_field('C', '');
    select_option_by_name('c-unit', 'uF');
    c_unit = 'uf';

    enable_field('Vcc', '');
    disable_field('Vt+', '');
    disable_field('Vt-', '');

    enable_field('f', '');
    select_option_by_name('f-unit', 'kHz');
    f_unit = 'kHz';

    disable_field('T', '');
    select_option_by_name('period-unit', 'ms');
    period_unit = 'ms';

    disable_field('th', '50');
    disable_field('tl', '50');

    select_option_by_name('half-duty', 'Yes');
    document.getElementById('half-duty').disabled = false;

    select_option_by_name('f_or_t', 'Frequency');
    document.getElementById('f_or_t').disabled = false;
}

// Set sup defaults for method 1, calculate for resistance R
function method2_defaults(){
    enable_field('R', '');
    select_option_by_name('r-unit', 'kΩ');
    r_unit = 'kohms';

    select_option_by_name('c-unit', 'uF');
    c_unit = 'uf';
    disable_field_for_calculation('C', '')

    enable_field('Vcc', '');
    disable_field('Vt+', '');
    disable_field('Vt-', '');

    enable_field('f', '');
    select_option_by_name('f-unit', 'kHz');
    f_unit = 'kHz';

    disable_field('T', '');
    select_option_by_name('period-unit', 'ms');
    period_unit = 'ms';

    disable_field('th', '50');
    disable_field('tl', '50');

    select_option_by_name('half-duty', 'Yes');
    document.getElementById('half-duty').disabled = false;

    select_option_by_name('f_or_t', 'Frequency');
    document.getElementById('f_or_t').disabled = false;
}

// Select the desired calculation method
function selectionListener(){
    method = document.getElementById('methods').value;

    if(method == 'none'){
        // Plug and Play Mode default values and fields
        method0_defaults();
    }
    else if(method == 'method1'){
        // Default values and fields for solving for resistor R
        method1_defaults();
    }
    else if(method == 'method2'){
        // Default values and fields for solving for capacitor C
        method2_defaults();
    }
}





function calculate(){
    convert_user_values();

    // Plug-and-play calculation
    if(method == 'none'){
        // Check if half duty select is ON
        if(half_duty_select == 'no'){
            // Calculate frequency from R, C, Vcc, and Threshold Values
            ln_1 = (Vcc - Vt_neg) / (Vcc - Vt_pos)
            ln_2 = (Vt_pos / Vt_neg)

            f = 1 / (R*C*Math.log(ln_1 * ln_2));

            th = R*C*Math.log(ln_1);
            tl = R*C*Math.log(ln_2);

            T = 1 / f;

            T_high = (th / T)*100;
            T_low = (tl / T)*100;
        }
        else{
            // Calculate frequency from R, C, Vcc, and calculated threshold values
            Vt_neg = (1/3)*Vcc;
            Vt_pos = (2/3)*Vcc;

            f = 1 / (2*R*C*Math.log(Vt_pos/Vt_neg));

            // Calculate Period
            T = 1/f;
            T_high = 50;
            T_low = 50;
        }
    }
    // Solve for R calculation
    else if (method == 'method1'){
        if(half_duty_select == 'no'){
            ln_1 = (Vcc - Vt_neg) / (Vcc - Vt_pos)
            ln_2 = (Vt_pos / Vt_neg)

            if (frequency_or_period_select == 'f'){
                R = 1 / (f*C*Math.log(ln_1 * ln_2));
                T = 1 / f;
            }
            else if(frequency_or_period_select == 't'){
                R = T / (C*Math.log(ln_1 * ln_2));
                f = 1 / T;
            }

            th = R*C*Math.log(ln_1);
            tl = R*C*Math.log(ln_2);

            T_high = (th / T)*100;
            T_low = (tl / T)*100;
        }
        else{
            Vt_neg = (1/3)*Vcc;
            Vt_pos = (2/3)*Vcc;

            if (frequency_or_period_select == 'f'){
                R = 1 / (2*f*C*Math.log(Vt_pos/Vt_neg));
                T = 1 / f;
            }
            else if(frequency_or_period_select == 't'){
                R = T / (2*C*Math.log(Vt_pos/Vt_neg));
                f = 1 / T;
            }

            T_high = 50;
            T_low = 50;
        }
    }
    // Solve for C calculation
    else if(method == 'method2'){
        if(half_duty_select == 'no'){
            ln_1 = (Vcc - Vt_neg) / (Vcc - Vt_pos)
            ln_2 = (Vt_pos / Vt_neg)

            if (frequency_or_period_select == 'f'){
                C = 1 / (f*R*Math.log(ln_1 * ln_2));
                T = 1 / f;
            }
            else if(frequency_or_period_select == 't'){
                C = T / (R*Math.log(ln_1 * ln_2));
                f = 1 / T;
            }

            th = R*C*Math.log(ln_1);
            tl = R*C*Math.log(ln_2);

            T_high = (th / T)*100;
            T_low = (tl / T)*100;
        }
        else{
            Vt_neg = (1/3)*Vcc;
            Vt_pos = (2/3)*Vcc;

            if (frequency_or_period_select == 'f'){
                C = 1 / (2*f*R*Math.log(Vt_pos/Vt_neg));
                T = 1 / f;
            }
            else if(frequency_or_period_select == 't'){
                C = T / (2*R*Math.log(Vt_pos/Vt_neg));
                f = 1 / T;
            }

            T_high = 50;
            T_low = 50;
        }
    }

    convert_to_original_unit();
    displayValues();
}
