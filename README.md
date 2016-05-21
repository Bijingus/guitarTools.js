# guitarTools.js
Javascript library of functions for creating diagrams of guitar chords and scales.

Here are three examples of this library in use.

<ul>
<li>http://myguitarpal.com/guitar-chord-finder/</li>
<li>http://myguitarpal.com/guitar-scale-finder/</li>
<li>http://myguitarpal.com/mp3/g-to-d-over-f-sharp/</li>
</ul>

<h2>Basic Setup</h2>
Download and include the guitarTools.js script somewhere in between your <code>head</code> tags.
You should include the stylesheet as well in the head of your document.

<h2>Using guitarTools.js</h2>
There are two main functions you should be aware of at present.  <code>buildChord()</code> and <code>buildScale()</code>.

<h3>buildChord() Usage</h3>
<code>buildChord(chord, show)</code>
Returns an HTML chord diagram.

<h3>buildChord() Parameters</h3>
<strong>chord</strong>
(object)(required) The object for the chord you would like to build.

<strong>show</strong>
(string)(required)
Currently accepts two options.  <code>fingering</code> or <code>degrees</code>.  <code>fingering</code> will output the chord fingerings, <code>degrees</code> will output the chordal degrees.

<h3>Usage</h3>
This function only returns the chord and does not automatically display the chord.  So, if you'd like to display an Em chord in the element with the id "chord" you'd do the following.

	var elem = document.getElementById('chord');
	
	elem.innerHTML = buildChord(
	    {
	        fingering: [0,1,2,0,0,0],
	        chord: [0,2,2,0,0,0],
	        degrees: [1,5,1,'b3',5,1],
	    }, 'fingering'
	);
	
The object needs three properties defined which are <code>fingering</code>, <code>chord</code> and <code>degrees</code>.  

<code>chord</code> = the actual placement of the notes on the guitar fretboard.
<code>fingering</code> = the fingers used to fret the notes.
<code>degrees</code> = scale degrees the chord is built from.

Each of these properties values should be an array with six values in the array.  There are six values in the array representing six strings on a guitar. So the first value will be the sixth string, second value the fifth string, third value the fourth string and so on.

If you'd like to build a chord where not every string is played, use "x" as the note value for that string.  For example:

	var elem = document.getElementById('chord');
	
	elem.innerHTML = buildChord(
	    {
	        fingering: ['x',0,2,3,2,0],
	        chord: ['x',0,2,2,1,0],
	        degrees: ['x',1,5,1,'b3',5],
	    }, 'fingering'
	);

<h3>buildScale() Usage</h3>
<code>buildScale(scale, show)</code>
Returns an HTML scale diagram.

<h3>buildScale() Parameters</h3>
<strong>scale</strong>
(object)(required) The object for the scale you would like to build.

<strong>show</strong>
(string)(required)
Takes either "fingering" or "degrees" depending upon which you would like to show.

<h3>Usage</h3>
Usage is very similar to <code>buildChord()</code>.  The structure of the scale object is slightly different in order to accommodate more than one note per string.

To show a C Major guitar scale diagram in the element with the id of "scale" you would do the following. 

	var elem = document.getElementById('scale');

	elem.innerHTML = buildScale(
		{
			root: [['x'],[3],['x'],['x'],['x'],['x']],
			fingering: [[],[3],[0,2,3],[0,2],[0,1],[]],
			scale: [[],[3],[0,2,3],[0,2],[0,1],[]],
		}, 'fingering'
	);
	
You can see there are now multi-dimensional arrays for <code>root</code>, <code>fingering</code> and <code>scale</code> in order to support multiple fretted notes per string.

This will make the most sense if you copy the example above, change some values then look at the html output of the function.

<code>root</code> = the starting note of the scale.  <strong>Fill in the rest of the strings without root notes with "x"</strong>.
<code>fingering</code> = the fingering of the scale.
<code>scale</code> = the actual placement of the notes in the scale on the fretboard.
