// DEFINE AN ANGULAR APP

var app = angular.module('converter', []);

app.controller('myCtrl', function ($scope) {

    // DEFINE THE GLOBAL VARIABLES FOR THE SCOPE
    $scope.clicked = 'bin';
    $scope.units = ['bin', 'dec', 'oct', 'hex'];

    // FUNCTION CALLED WHENEVER THE TEXT FIELD CHANGES
    $scope.onInput = function () {
        switch ($scope.clicked) {
            // PERFORM THE BINARY CONVERSION
            case 'bin':
                $('#dec-res').html('= ' + $scope.formatProperly(
                    $scope.binToDec($scope.toConvert),
                    3, ' ') + '<sub>10</sub>');
                $('#oct-res').html('= ' + $scope.formatProperly(
                    $scope.binToOct($scope.toConvert),
                    3, ' ') + '<sub>8</sub>');
                $('#hex-res').html('= ' + $scope.formatProperly(
                    $scope.binToHex($scope.toConvert),
                    4, ' ') + '<sub>16</sub>');
                break;
            // PERFORM THE DECIMAL CONVERSION
            case 'dec':
                $('#bin-res').html('= ' + $scope.formatProperly(
                    $scope.decToBin($scope.toConvert),
                    4, ' ') + '<sub>2</sub>');
                $('#oct-res').html('= ' + $scope.formatProperly(
                    $scope.decToOct($scope.toConvert),
                    3, ' ') + '<sub>8</sub>');
                $('#hex-res').html('= ' + $scope.formatProperly(
                    $scope.decToHex($scope.toConvert),
                    4, ' ') + '<sub>16</sub>');
                break;
            // PERFORM THE OCTAL CONVERSION
            case 'oct':
                $('#bin-res').html('= ' + $scope.formatProperly(
                    $scope.octToBin($scope.toConvert),
                    4, ' ') + '<sub>2</sub>');
                $('#dec-res').html('= ' + $scope.formatProperly(
                    $scope.octToDec($scope.toConvert),
                    3, ' ') + '<sub>10</sub>');
                $('#hex-res').html('= ' + $scope.formatProperly(
                    $scope.octToHex($scope.toConvert),
                    4, ' ') + '<sub>16</sub>');
                break;
            // PERFORM THE HEXADECIMAL CONVERSION
            case 'hex':
                $('#bin-res').html('= ' + $scope.formatProperly(
                    $scope.hexToBin($scope.toConvert),
                    4, ' ') + '<sub>2</sub>');
                $('#dec-res').html('= ' + $scope.formatProperly(
                    $scope.hexToDec($scope.toConvert),
                    3, ' ') + '<sub>10</sub>');
                $('#oct-res').html('= ' + $scope.formatProperly(
                    $scope.hexToOct($scope.toConvert),
                    3, ' ') + '<sub>8</sub>');
                break;
        }
    }

    // BINARY TO DECIMAL
    $scope.binToDec = function (bin) {
        var conv = bin;
        var col = 1;
        var dec = 0;
        for (var i = conv.length - 1; i >= 0; i--) {
            if (conv[i] == '1') {
                dec += col;
            }
            if (conv[i] != '0' && conv[i] != '1') {
                return dec
            }
            col *= 2;
        }
        return dec;
    }

    // BINARY TO OCTAL
    $scope.binToOct = function (bin) {
        var conv = bin;
        var temp = [];
        var oct = '';
        for (var i = conv.length - 1; i >= 0; i -= 3) {
            temp.push(conv.substr(-3));
            conv = conv.slice(0, -3);
        }
        for (var i in temp.reverse()) {
            switch (temp[i]) {
                case '0':
                case '00':
                case '000':
                    oct += '0';
                    break;
                case '1':
                case '01':
                case '001':
                    oct += '1';
                    break;
                case '10':
                case '010':
                    oct += '2';
                    break;
                case '011':
                case '11':
                    oct += '3';
                    break;
                case '100':
                    oct += '4';
                    break;
                case '101':
                    oct += '5';
                    break;
                case '110':
                    oct += '6';
                    break;
                case '111':
                    oct += '7';
            }
        }
        return oct;
    }

    // BINARY TO HEXADECIMAL
    $scope.binToHex = function (bin) {
        var conv = bin;
        var temp = [];
        var hex = '';
        for (var i = conv.length - 1; i >= 0; i -= 4) {
            temp.push(conv.substr(-4));
            conv = conv.slice(0, -4);
        }
        for (var i in temp.reverse()) {
            switch (temp[i]) {
                case '0':
                case '00':
                case '000':
                case '0000':
                    hex += '0';
                    break;
                case '1':
                case '01':
                case '001':
                case '0001':
                    hex += '1';
                    break;
                case '10':
                case '010':
                case '0010':
                    hex += '2';
                    break;
                case '11':
                case '011':
                case '0011':
                    hex += '3';
                    break;
                case '100':
                case '0100':
                    hex += '4';
                    break;
                case '101':
                case '0101':
                    hex += '5';
                    break;
                case '110':
                case '0110':
                    hex += '6';
                    break;
                case '111':
                case '0111':
                    hex += '7';
                    break;
                case '1000':
                    hex += '8';
                    break;
                case '1001':
                    hex += '9';
                    break;
                case '1010':
                    hex += 'A';
                    break;
                case '1011':
                    hex += 'B';
                    break;
                case '1100':
                    hex += 'C';
                    break;
                case '1101':
                    hex += 'D';
                    break;
                case '1110':
                    hex += 'E';
                    break;
                case '1111':
                    hex += 'F';
                    break;
            }
        }
        return hex;
    }

    // DECIMAL TO BINARY
    $scope.decToBin = function (dec) {
        var decs = [Number(dec)];
        var bin = '';
        while (Math.floor(dec / 2) >= 1) {
            dec = Math.floor(dec / 2);
            decs.push(dec);
        }
        decs.reverse();
        for (var i in decs) {
            if (decs[i] % 2 == 0) {
                bin += '0'
            } else {
                bin += '1'
            }
        }
        return bin;
    }

    // DECIMAL TO OCTAL
    $scope.decToOct = function (dec) {
        var bin = $scope.decToBin(dec);
        var oct = $scope.binToOct(bin);
        return oct;
    }

    // DECIMAL TO HEXADECIMAL
    $scope.decToHex = function (dec) {
        var bin = $scope.decToBin(dec);
        var hex = $scope.binToHex(bin);
        return hex;
    }

    // OCTAL TO BINARY
    $scope.octToBin = function (oct) {
        var bin = '';
        for (var i in oct) {
            switch (oct[i]) {
                case '0':
                    bin += '000';
                    break;
                case '1':
                    bin += '001';
                    break;
                case '2':
                    bin += '010';
                    break;
                case '3':
                    bin += '011';
                    break;
                case '4':
                    bin += '100';
                    break;
                case '5':
                    bin += '101';
                    break;
                case '6':
                    bin += '110';
                    break;
                case '7':
                    bin += '111';
            }
        }
        return bin;
    }

    // OCTAL TO DECIMAL
    $scope.octToDec = function (oct) {
        var bin = $scope.octToBin(oct);
        var dec = $scope.binToDec(bin);
        return dec;
    }

    // OCTAL TO HEXADECIMAL
    $scope.octToHex = function (oct) {
        var bin = $scope.octToBin(oct);
        var hex = $scope.binToHex(bin);
        return hex;
    }

    // HEXADECIMAL TO BINARY
    $scope.hexToBin = function (hex) {
        var bin = '';
        for (var i in hex) {
            switch (hex[i]) {
                case '0':
                    bin += '0000';
                    break;
                case '1':
                    bin += '0001';
                    break;
                case '2':
                    bin += '0010';
                    break;
                case '3':
                    bin += '0011';
                    break;
                case '4':
                    bin += '0100';
                    break;
                case '5':
                    bin += '0101';
                    break;
                case '6':
                    bin += '0110';
                    break;
                case '7':
                    bin += '0111';
                    break;
                case '8':
                    bin += '1000';
                    break;
                case '9':
                    bin += '1001';
                    break;
                case 'A':
                case 'a':
                    bin += '1010';
                    break;
                case 'B':
                case 'b':
                    bin += '1011';
                    break;
                case 'C':
                case 'c':
                    bin += '1100';
                    break;
                case 'D':
                case 'd':
                    bin += '1101';
                    break;
                case 'E':
                case 'e':
                    bin += '1110';
                    break;
                case 'F':
                case 'f':
                    bin += '1111';
                    break;
            }
        }
        return bin;
    }

    // HEXADECIMAL TO DECIMAL
    $scope.hexToDec = function (hex) {
        var bin = $scope.hexToBin(hex);
        var dec = $scope.binToDec(bin);
        return dec;
    }

    // HEXADECIMAL TO OCTAL
    $scope.hexToOct = function (hex) {
        var bin = $scope.hexToBin(hex);
        var oct = $scope.binToOct(bin);
        return oct;
    }

    // FUNCTION CALLED WHEN CHANGING THE CONVERSION BASE UNIT
    $scope.changeTo = function (what) {
        $scope.clicked = what;
        $scope.colorClicked();
        $scope.toConvert = '';
        $('#bin-res').html('= ');
        $('#dec-res').html('= ');
        $('#oct-res').html('= ');
        $('#hex-res').html('= ');
    }

    // FUNCTION CALLED FOR MAKING THE RESULT HUMAN READABLE
    $scope.formatProperly = function (what, every, separator) {
        var conv = String(what);
        var temp = [];
        for (var i = conv.length - 1; i >= 0; i -= every) {
            temp.push(conv.substr(-every));
            conv = conv.slice(0, -every);
        }
        return temp.reverse().join(separator);
    }

    // FUNCTION CALLED FOR CHANGING THE APPEARANCE OF THE INTERFACE
    $scope.colorClicked = function () {
        // CHANGE THE COLOR OF THE BUTTON WHEN PRESSED
        for (var i = 0; i < $scope.units.length; i++) {
            if ($scope.units[i] == $scope.clicked) {
                $('#' + $scope.units[i] + '-btn').addClass('w3-light-gray');
                $('.' + $scope.clicked).slideUp();
            }
            else {
                $('#' + $scope.units[i] + '-btn').removeClass('w3-light-gray');
            }
        }
        switch ($scope.clicked) {
            // FOR BINARY APPEARANCE
            case 'bin':
                $('.bin').slideUp();
                $('.dec').slideDown();
                $('.oct').slideDown();
                $('.hex').slideDown();
                $('#remainder').text(
                    'You can only input positive 1s or 0s.');
                $('#main-input').attr('type', 'number');
                break;
            // FOR DECIMAL APPEARANCE
            case 'dec':
                $('.bin').slideDown();
                $('.dec').slideUp();
                $('.oct').slideDown();
                $('.hex').slideDown();
                $('#remainder').text(
                    'You can only input positive numbers.');
                $('#main-input').attr('type', 'number');
                break;
            // FOR OCTAL APPEARANCE
            case 'oct':
                $('.bin').slideDown();
                $('.dec').slideDown();
                $('.oct').slideUp();
                $('.hex').slideDown();
                $('#main-input').attr('type', 'number');
                $('#remainder').text(
                    'You can only input positve numbers from 0 to 7.');
                break;
            // FOR HEXADECIMAL APPEARANCE
            case 'hex':
                $('.bin').slideDown();
                $('.dec').slideDown();
                $('.oct').slideDown();
                $('.hex').slideUp();
                $('#main-input').attr('type', 'text');
                $('#remainder').text('All positive numbers and letters ' +
                    'from A to F in any case only.');
        }
    }
});