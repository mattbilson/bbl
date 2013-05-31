bbl
===

<b>Hyperlightweight Javascript Library for Localization, supporting both declarative and imperative modes.</b>
<br>
<h3>Usage</h3>
Use bbl to dynamically load localization resources that contain phrase translations from a base language into a local one, and have those translations performed automatically on existing DOM elements, or programmatically via Javascript.

<h4>Setup</h4>
This library requires JQuery for the dynamic loading component (AJAX get).
See the index.html for script includes. Only bbl.js is needed, it will load the language resources when needed.

Easiest way to see how everything works is to download the repo, drop it into your web server and have at it.

<h4>Using it in HTML</h4>
Use the data-bbl-html, data-bbl-text and data-bbl-value HTML tags to specify how the translation will be inserted into the DOM object whose visible content is being translated. FOr example, data-bbl-html would be used for divs and spans, text would be used for options in a select, and value would be used for buttons.
<pre>
&lt;span data-bbl-html="This is my content">&lt;/span>

&lt;input type=button data-bbl-value="Translate" />

&lt;select>
  &lt;option value="0" data-bbl-text="Your First Option">&lt;/option>
  &lt;option value="1" data-bbl-text="Your Second Option">&lt;/option>
&lt;/select>
</pre>
Once your HTML is built, in Javascript you would set the bbl language resource:
<pre>
&lt;script>
  bbl.resource('js/trans_i10l_fr.js');
&lt;/script>
</pre>
This will automatically convert the data-bbl-* elements to the translated values. innerHTML, values and texts of the various objects will be updated.

You can swap out the language file at any time by using bbl.resource(resourceFile).

You can also translate newly-added content by calling the following, which will translate all translatable elements in the DOM:
<pre>
  bbl.all();
</pre>

You can also translate a single object via:
<pre>
  bbl.one(domElem);
</pre>

<h4>Using it in Javascript</h4>
You can use bbl to programatically perform translations, either directly on DOM elements as described above, or simply assign translated values to a variable.

<pre>
// change the resource
bbl.resource('js/trans_l10n_fr.js');
		
// translate something
var txt = bbl('one'); 
// outputs une

var txt = bbl('forty'); 
// outputs quarante
		
var txt = bbl('This is a story'); 
// outputs C'est une histoire
</pre>

<h4>Language Resource Files</h4>
The resource files are straightforward JS objects configured as such:
<pre>
bbl.set({
    'This is a sample': 'Ceci est un exemple',
    'This is sample {0} of {1}': 'C\'est &eacute;chantillon {0} sur {1}',
    'one': 'une',
    'forty': 'quarante',
    'Usage': 'Utilisation',
    'bbl Localization Service': 'Service de localisation bbl',
    'change the resource': 'modifier la ressource',
    'translate something': 'traduire quelque chose',
    'outputs': 'sorties',
    'Language Resource': 'Ressource en Langues',
    'Use the {0} resource': 'Utilisez le {0} ressource',
    'Translate': 'Traduire',
    'Go ahead and change me':'Allez-y et changez-moi'
})

</pre>

Each line is a base language phrase:translated language phrase.

<h4>Parameterization</h4>
bbl supports basic parameterization capabilities. This allows you to put variable terms within a translatable phrase, and in turn those variable terms can be translatable as well.

For example, you could have a base language phrase:

This is sample {0} of {1}

Where {0} and {1} represent the order of parameter values that will be provided in an Array (or in the data-bbl-parms HTML attribute, separated by bars | ).

In Javascript, you could translate the above via:

<pre>
var trans = bbl('This is sample {0} of {1}',['1','40']);
// output will be C'est &eacute;chantillon 1 sur 40
</pre>

Because there are no translatable values for the two parameters, they will be simply dropped in as-is. <b>Note</b> that this is the case for any translation request -- if no translation of a phrase is available, the base phrase is returned.

If you do have translatable parameters, the parameters will be translated as well, i.e.

<pre>
var trans = bbl('This is sample {0} of {1}',['one','forty']);
// output will be C'est &eacute;chantillon une sur quarante
</pre>

To do this declaratively in HTML, use data-bbl-parms:

<pre>
&lt;span data-bbl-html="This is sample {0} of {1}" data-bbl-parms="one|forty">&lt;/span>
</pre>

Then, when the translation action occurs, the HTML will be replaced as above.




