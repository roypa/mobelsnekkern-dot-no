/**************************************************************************
 * The following ID's in div elements are defined by a Google Page template:
 *  1. g_title: The first box where the title is
 *  2. g_description: The second box where the menu is
 *  3. g_body: The third box where the main content/body is
 *  4. g_footer: The forth box where the footer is
 *  5. extraDiv1: Div element nederst på siden (kanskje for ref til Royp IT)
 *
 * The following are defined by me:
 *  1. my_menubar: Where the menu bar should be placed
 *  2. my_google_map: Where the google map should be placed, normally only used in "omoss" pages
 **************************************************************************/

/*
 * Define the menu bar.
 * Every item has same id as the page name, as this is used to assign a class to the link that is currently selected.
 */
var my_menubar_content = ' \
<div id="navcontainer"> \
<ul id="navlist"> \
<li><a href="index.html"            id="index.html"            >Forsiden</a></li> \
<li><a href="div_treprodukter.html" id="div_treprodukter.html" >Div treprodukter</a></li> \
<li><a href="stoler.html"           id="stoler.html"           >Stoler</a></li> \
<!-- li><a href="krakk.html"        id="krakk.html"            >Krakker & Benker</a></li --> \
<li><a href="langbord.html"         id="langbord.html"         >Langbord</a></li> \
<li><a href="skap.html"             id="skap.html"             >Skap</a></li> \
<!-- li><a href="framskap.html"     id="framskap.html"         >Framskap</a></li> \
<li><a href="hjskap.html"           id="hjskap.html"           >Hj&oslash;rneskap</a></li> \
<li><a href="veggskap.html"         id="veggskap.html"         >Rettveggskap</a></li --> \
<li><a href="ramme.html"            id="ramme.html"            >Rammeverksted</a></li> \
<li><a href="kart.html"             id="kart.html"             >Kart</a></li> \
<li><a href="omoss.html"            id="omoss.html"            >Om oss</a></li> \
</ul> \
</div>';

function assignDivElements() {
    /* Set the page's title: 
        Deprecated since we now put the title on every page
    document.getElementById("g_title").innerHTML =
        '<p style="font-family: georgia; text-align: center;">Kunst, Interi&oslash;r &amp; Rammeverksted</p>';
    */
    
    /* Set the page's menu where we have defined div-element with ID=menubar */
    document.getElementById("g_description").innerHTML = my_menubar_content;
    
    /*  Set the page's footer:
          Deprecated since we now put the title on every page  
    document.getElementById("my_footer").innerHTML = '<p align="center">Adresse: <a href="kart.html">Verksgata 5, 1353 B&aelig;rums Verk</a>. Tlf: 67134810, Fax: 67134810, Email: <a href="mailto:post@mobelsnekkern.no">post@mobelsnekkern.no</a></p>';
    */
}

function setCurrentMenuItem() {
    /* location.pathname is the path after domain name, including the leading slash - therefore we calls substring(1).
       Any parameters in the URL are excluded. */
    var pName = "";
    if (location.pathname=="" || location.pathname=="/") {
        pName="index.html";
    } else {
        pName = location.pathname.substring(1);
    }
    var menuSelected = document.getElementById(pName);
    if (menuSelected != null) {
        menuSelected.className = "current";
    } else {
        //If not found, keep the one that is currently the current one
    }
}

/*
 * The function for loading the map must be assigned to the windows.onload event handler.
 * Otherwise it will not work.
 * Also include unloading the map.
 * The global even handler requires that it call a function and not execute code directly.
 * Example:
 *  window.onload = function() { loadGoogleMap(); }
 *  window.onunload=GUnload();
 */
function loadGoogleMap() {
    if (GBrowserIsCompatible()) {
        var pointButikk = new GLatLng(59.93871, 10.50183);
        var map = new GMap2(document.getElementById("my_google_map"));
        map.setCenter(pointButikk, 13);
        //Add controls
        map.addControl(new GLargeMapControl());
        map.addControl(new GScaleControl());
        //map.addControl(new GMapTypeControl());
        map.addControl(new GOverviewMapControl());
        //Add a marker
        var marker = new GMarker(pointButikk);
        map.addOverlay(marker);
        //Open a info window at the marker after page loads
        var markerHtml = "<big>Kunst, Interi&oslash;r &amp; Rammeverksted</big><br/><img src='butikken-gmap.jpg' width='235' height='150'/>";
        marker.openInfoWindowHtml(markerHtml);

        // Make user clicks on the marker open the info window
        GEvent.addListener(marker, "click", function() {
            marker.openInfoWindowHtml(markerHtml);
        });

    } else {
        document.getElementById("my_google_map").innerHTML =
            '<b><em>Dessverre st&oslash;tter ikke din browser visning av kart vha Google Maps</em></b>';
    }
}


/*
  Initialize the PWI (Picasa Web Integrator) with common options
  for every page.
  The only option you need to specify as argument is the album name.
  
  Requires that jquery.pwi.js is loaded ahead of this script.
*/
function init_picasa_web_integrator(opts) {
  $("#picasa_image_container").pwi($.extend({}, {
                                      username: 'mobelsnekkern',
                                      mode: 'album',
                                      /*album: 'Rammeverksted',*/
                                      thumbSize: 144,
                                      maxResults: 30,
                                      showAlbumdate: false,
                                      showAlbumLocation: false,
                                      showPhotoDate: false,
                                      labels: { photo:    "bilde",
                                                photos:   "bilder",
                                                albums:   "Back to albums",
                                                slideshow:"Vis slideshow",
                                                loading:  "Henter bilder, vennligst vent ...",
                                                page:     "Side",
                                                prev:     "Forrige",
                                                next:     "Neste",
                                                devider:  "|"
                                              }
                                      }, opts));
}