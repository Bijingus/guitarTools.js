function removeX(array) {
    var searchTerm = 'x';
    cleanArray = [];
    for (n = 0; n <= array.length - 1; n++) {
        if (array[n] != searchTerm && isNaN(parseInt(array[n])) == false) {
            cleanArray.push(parseInt(array[n]));
        }
    }
    return cleanArray;
}

function buildChord(object, show) {
    fretMarkers = [null, 'I', null, 'III', null, 'V', null, 'VII', null, null, 'X', null, 'XII', null, null, 'XV'];
    var data = '';
    data += '<table class="guitar-chord" data-name="' + object.name + '" data-type="' + object.type + '">';
    var maxPos = Math.max.apply(Math, removeX(object.chord));
    var minPos = Math.min.apply(Math, removeX(object.chord));
    if (minPos != 0) {
        minPos = minPos - 1;
    }
    for (f = minPos; f <= maxPos + 1; f++) {
        data += '<tr>';
        for (var s = 0; s < object.chord.length; s++) {
            if (s == 0) {
                if (fretMarkers[f] != null) {
                    data += '<td class="fret-marker"><span>' + fretMarkers[f] + '</span></td>';
                } else {
                    data += '<td class="empty-fret-marker"></td>';
                }
            }
            if (f == 0) {
                chordClass = 'guitar-chord-nut';
            } else {
                chordClass = '';
            }
            if (object.chord[s] == f) {
                if (show == 'fingering') {
                    finger = object.fingering[s];
                } else {
                    finger = object.degrees[s];
                }
                chordClass += ' guitar-chord-note-active';
            } else if (f == minPos && object.chord[s] == 'x') {
                finger = 'x';
                chordClass += ' guitar-chord-note-x';
            } else {
                chordClass += ' guitar-chord-note-none';
                finger = '';
            }
            data += '<td class="fretted-note ' + chordClass + '"><span class="guitar-chord-note">' + finger + '</span></td>';
        }
        data += '</tr>';
    }
    data += '</table>';
    return data;
}

/*
function buildChords(name, type) {
    var data = '';
    for (i = 0; i < chords.length; i++) {
        if (chords[i].name == name && chords[i].type == type) {
            data += buildChord(chords[i], show);
        }
    }
    return data;
}
*/

/*
function buildChordsByNameType(nameType, show, maxChords) {
    var data = '';
    var count = 0;
    for (i = 0; i < chords.length; i++) {
        if (chords[i].name + chords[i].type == nameType) {
            data += buildChord(chords[i], show);
            count++;
            if (count == maxChords) {
                break;
            }
        }
    }
    return data;
}
*/

function buildScale(object, show) {
    fretMarkers = [null, 'I', null, 'III', null, 'V', null, 'VII', null, null, 'X', null, 'XII', null, null, 'XV'];
    var data = '';
    data += '<table class="guitar-chord" data-name="' + object.name + '" data-type="' + object.type + '">';
    var allScaleNotesArray = [];
    for (i = 0; i < 6; i++) {
        for (n = 0; n < object.scale[i].length; n++) {
            allScaleNotesArray.push(object.scale[i][n]);
        }
    }

    function ascending(a, b) {
        return a - b;
    }
    var sortScalesArray = allScaleNotesArray.sort(ascending);
    maxPos = sortScalesArray[sortScalesArray.length - 1];
    minPos = sortScalesArray[0];
    if (minPos != 0) {
        minPos = minPos - 1;
    }
    for (f = minPos; f <= maxPos + 1; f++) {
        data += '<tr>';
        for (s = 0; s < object.scale.length; s++) {
            if (s == 0) {
                if (fretMarkers[f] != null) {
                    data += '<td class="fret-marker"><span>' + fretMarkers[f] + '</span></td>';
                } else {
                    data += '<td class="empty-fret-marker"></td>';
                }
            }
            if (f == 0) {
                chordClass = 'guitar-chord-nut';
            } else {
                chordClass = '';
            }
            var finger = '';
            for (n = 0; n < object.scale[s].length; n++) {
                if (object.scale[s][n] == f) {
                    if (show == 'fingering') {
                        finger = object.fingering[s][n];
                    } else {
                        finger = object.degrees[s][n];
                    }
                    if (object.root[s] == object.scale[s][n]) {
                        var rootClass = 'guitar-chord-note-root';
                    }
                    chordClass += ' guitar-chord-note-active';
                    break;
                } else if (f == minPos && object.scale[s][n] == 'x') {
                    finger = 'x';
                    chordClass += ' guitar-chord-note-x';
                    break;
                } else {
                    chordClass += ' guitar-chord-note-none';
                    finger = '';
                }
            }
            data += '<td class="fretted-note ' + chordClass + ' ' + rootClass + '"><span class="guitar-chord-note">' + finger + '</span></td>';
            rootClass = '';
        }
        data += '</tr>';
    }
    data += '</table>';
    return data;
}

/*
function buildScales(name, type) {
    var data = '';
    for (sc = 0; sc < scales.length; sc++) {
        if (scales[sc].name == name && scales[sc].type == type) {
            data += buildScale(scales[sc]);
        }
    }
    return data;
}
*/


/*
function scaleToString(scaleArray) {
    var placementStr = '';
    for (p = 0; p < scaleArray.length; p++) {
        placementStr += scaleArray[p].toString();
        if (p != scaleArray.length - 1) {
            placementStr += '|';
        }
    }
    return placementStr;
}

function buildAllScalesShortcodesTableRows() {
    var data = '';
    for (sc = 0; sc < scales.length - 1; sc++) {
        if (scales[sc].name != 'x') {
            var placementStr = scaleToString(scales[sc].scale);
            var fingeringStr = scaleToString(scales[sc].fingering);
            data += '<tr>';
            data += '<td>' + buildScale(scales[sc], 'fingering') + '</td>';
            data += '<td>' + scales[sc].name + ' ' + scales[sc].type + '</td>';
            data += '<td>[guitar-scale name="' + scales[sc].name + '" type="' + scales[sc].type + '" root="' + scales[sc].root + '" placement="' + placementStr + '" fingering="' + fingeringStr + '"]</td>';
            data += '</tr>';
        }
    }
    return data;
}

function buildSearchScalesShortcodesTableRows() {
    var data = '';
    var searchInput = jQuery('#chord-search');
    var query = searchInput.val().toUpperCase();
    for (sc = 0; sc < scales.length; sc++) {
        if (scales[sc].name != 'x' && query.indexOf(scales[sc].name.toUpperCase() + ' ' + scales[sc].type.toUpperCase()) != -1) {
            var placementStr = scaleToString(scales[sc].scale);
            var fingeringStr = scaleToString(scales[sc].fingering);
            data += '<tr>';
            data += '<td>' + buildScale(scales[sc], 'fingering') + '</td>';
            data += '<td>' + scales[sc].name + ' ' + scales[sc].type + '</td>';
            data += '<td>[guitar-scale name="' + scales[sc].name + '" type="' + scales[sc].type + '" root="' + scales[sc].root + '" placement="' + placementStr + '" fingering="' + fingeringStr + '"]</td>';
            data += '</tr>';
        }
    }
    return data;
}

function buildAllChordShortcodesTable() {
    var data = '';
    for (i = 0; i < chords.length - 1; i++) {
        if (chords[i].name != 'x') {
            data += '<tr>';
            data += '<td>' + buildChord(chords[i], 'fingering') + '</td>';
            data += '<td>' + chords[i].name + chords[i].type + '</td>';
            data += '<td>[guitar-chord name="' + chords[i].name + '" type="' + chords[i].type + '" placement="' + chords[i].chord + '" fingering="' + chords[i].fingering + '"]</td>';
            data += '</tr>';
        }
    }
    return data;
}

function buildSearchChordShortcodesTable() {
    var data = '';
    var searchInput = jQuery('#chord-search');
    var query = searchInput.val().toUpperCase();
    for (i = 0; i < chords.length; i++) {
        if (chords[i].name != 'x' && query.indexOf(chords[i].name.toUpperCase() + chords[i].type.toUpperCase()) != -1) {
            data += '<tr>';
            data += '<td>' + buildChord(chords[i], 'fingering') + '</td>';
            data += '<td>' + chords[i].name + chords[i].type + '</td>';
            data += '<td>[guitar-chord name="' + chords[i].name + '" type="' + chords[i].type + '" placement="' + chords[i].chord + '" fingering="' + chords[i].fingering + '"]</td>';
            data += '</tr>';
        }
    }
    return data;
}
*/
