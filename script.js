// BASIC CALCULATOR
let heldValue = null;
let heldOperation = null;
let nextValue = null;

$('.digits button').click(function() {
    if(nextValue === null) {
        nextValue = "0";
    }
    nextValue += $(this).text();
    $('.next-value').text(nextValue);
    updateDisplay();
});

function showValue(location, value) {
    if(value === null) {
        $(location).text('')
    } else {
        $(location).text(Number(value))
    }
}

function updateDisplay() {
    showValue('.held-value', heldValue);
    showValue('.next-value', nextValue);
}

function clearAll() {
    heldValue = null;
    heldOperation = null;
    nextValue = null;
}

function clearEntry() {
    nextValue = null;
}

$('.clear-all').click(function() {
    clearAll();
    $('.next-operation').text('');
    updateDisplay();
});

$('.clear-entry').click(function() {
    clearEntry();
    updateDisplay();
});

function add(x, y) {
    return Number(x) + Number(y);
}

function subtract(x, y) {
    return Number(x) - Number(y);
}

function multiply(x, y) {
    return Number(x) * Number(y);
}

function divide(x, y) {
    return Number(x) / Number(y);
}

function setHeldOperation(operation) {
    if(heldOperation !== null) {
        heldValue = heldOperation(heldValue, nextValue);
    } else if (nextValue !== null) {
        heldValue = nextValue;
    }
    nextValue = null;
    heldOperation = operation;
};

$('.add').click(function() {
    setHeldOperation(add);
    $('.next-operation').text('+');
    updateDisplay();
});

$('.subtract').click(function() {
    setHeldOperation(subtract);
    $('.next-operation').text('-');
    updateDisplay();
});

$('.multiply').click(function() {
    setHeldOperation(multiply);
    $('.next-operation').text('*');
    updateDisplay();
});

$('.divide').click(function() {
    setHeldOperation(divide);
    $('.next-operation').text('/');
    updateDisplay();
});

$('.equals').click(function() {
    setHeldOperation(null);
    $('.next-operation').text('');
    updateDisplay();
});

clearAll();
updateDisplay();

$('.operations').prepend($('<button class="plusMinus">&plus;/&minus;</button>').css({'backgroundColor': '#545353d6', 'color': '#39e241'}));

$('<button class="sqrt">&radic;</button>').css({'backgroundColor': '#545353d6', 'color': '#39e241'}).insertAfter('.divide');

$('<button class="percent">&percnt;</button>').css({'backgroundColor': '#545353d6', 'color': '#39e241'}).insertAfter('.sqrt');

function plusMinus(num) {
    return Number(num) * -1;
}

$('.plusMinus').click(function() {
    nextValue = plusMinus(nextValue)
    updateDisplay();
});

function percent(num) {
    return Number(num) / 100;
}

$('.percent').click(function() {
    heldValue = percent(nextValue)
    nextValue = null;
    updateDisplay();
});

function squareRoot(num) {
    return Math.sqrt(num);
}

$('.sqrt').click(function () {
    heldValue = squareRoot(nextValue)
    nextValue = null;
    updateDisplay();
})