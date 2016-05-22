var fretMarkers = [null, 'I', null, 'III', null, 'V', null, 'VII', null, null, 'X', null, 'XII', null, null, 'XV'];

function GTremoveX(array) {
    var searchTerm = 'x';
    cleanArray = [];
    for (n = 0; n <= array.length - 1; n++) {
        if (array[n] != searchTerm && isNaN(parseInt(array[n])) == false) {
            cleanArray.push(parseInt(array[n]));
        }
    }
    return cleanArray;
}

function GTascending(a, b) {
    return a - b;
}

function buildChord(object, show) {
    var data = '';
    data += '<table class="guitar-chord" data-name="' + object.name + '" data-type="' + object.type + '">';
    var maxPos = Math.max.apply(Math, GTremoveX(object.chord));
    var minPos = Math.min.apply(Math, GTremoveX(object.chord));
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

function buildScale(object, show) {
    var data = '';
    data += '<table class="guitar-chord" data-name="' + object.name + '" data-type="' + object.type + '">';
    var allScaleNotesArray = [];
    for (i = 0; i < 6; i++) {
        for (n = 0; n < object.scale[i].length; n++) {
            allScaleNotesArray.push(object.scale[i][n]);
        }
    }
    var sortScalesArray = allScaleNotesArray.sort(GTascending);
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
