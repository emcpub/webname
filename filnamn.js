
var jsonName;
var statusArray = Array.apply(null, Array(25)).map(function () {});
var codeSystem;
var laguageSwitch = "sv";			//sv = Sverige, en =  england
var felArray =[];


$(document).ready(function()
{
	//$.getJSON("filnamn.json", function(json)
	$.getJSON("https://emcpub.github.io/webname/filnamn.json", function(json)
	
	{
		// Initierar variabler och gömmer helptexten
		jsonName = json;
		$("#helpShow").hide();
		$("#checkName").hide();
		var tempText;

		//Språkvals flaggor
		tempText = '<img src="http://emcpub.github.io/webname/Sweden.png" id="sverige" alt="Svenska" onclick="flagClick(&quot;sv&quot;);">&nbsp;&nbsp;<img src="http://emcpub.github.io/webname/UnitedKingdom.png" id="england" alt="English"  onclick="flagClick(&quot;en&quot;);">' 
		$('#flags').html(tempText);
	
				
		// Hantera valet av kodmodell, BSAB - TEXT - KKS - SSEN
		tempText = '<form action=""><input type="radio" name="codeType" id="BSAB" value="BSAB">BSAB&nbsp;&nbsp;&nbsp;<input type="radio" name="codeType" id="TEXT" value="TEXT">TEXT&nbsp;&nbsp;&nbsp;<input type="radio" name="codeType" id="KKS" value="KKS">KKS&nbsp;&nbsp;&nbsp;<input type="radio" name="codeType" id="SSEN" value="SSEN">SSEN</form>';
		$("#s0").html(tempText);
		
		$("input:radio[name=codeType]").on("click", function() {
			var vald = $("input:radio[name=codeType]:checked").val();		//Valt värde i radiobuttons
			
			resetForm(1, 1);												// Återställer formuläret från part 1 och nedåt 
			codeSystem = vald;												//Spara undan vilket kodsystem som vi opererar under 
			
			switch (vald) {
				case "BSAB":

					$('#' + 'kksfel').remove();

					loadList(jsonName.verksamhet, jsonName.oversatt, "verksamhet", "Verksamhet", "labels1", "dots1", "Y", "s1", "kod", "verksamhet", "del1", "", "", 
					"anlaggning", jsonName.anlaggning, "kod", "anlaggning", "verksamhet", "del2", "anlaggning", "dots2","", "", "","Y", "", "", "", "", "block");
					
					loadList(jsonName.anlaggning, jsonName.oversatt, "anlaggning", "Anläggning", "labels2", "dots2", "Y", "s2", "kod", "anlaggning", "del2", "", "", 
					"block", jsonName.block, "kod", "block", "anlaggning", "del3", "block", "dots3", "Y", "verksamhet", "verksamhet", "Y");
					
					loadList(jsonName.block, jsonName.oversatt, "block", "Block", "labels3", "dots3", "Y", "s3", "kod", "block", "del3");

					loadList(jsonName.ansvarigpart, jsonName.oversatt, "ansvarigpart", "Ansvarigpart", "labels4", "dots4", "Y", "s4", "kod", "part", "del5","C","-" ); 	//del4 & del6 också
					loadList(jsonName.IK1, jsonName.oversatt, "IK1", "Innehållskod", "labels5", "dots5", "N", "s5", "kod", "IK1","","","","IK2",jsonName.IK2,"kod","IK2","omrade","del7","IK2","dots6");
					loadList(jsonName.IK2, jsonName.oversatt, "IK2", "Innehållskod", "labels6", "dots6", "Y", "s6", "kod", "IK2","del7","A","-", "", "", "", "", "", "", "", "", "", "", "", "", "Y", "IK1", "forklaring", "omrade");		//del8 också
					
					//Radiobutton för val av MODELL - RITNING
					if (laguageSwitch == 'en')
					{
						tempText = '<form action=""><input type="radio" name="codeModelDrawing" value="MODEL">Model&nbsp;&nbsp;&nbsp;<input type="radio" name="codeModelDrawing" value="DRAWING">Drawing</form>';
					} else {
						tempText = '<form action=""><input type="radio" name="codeModelDrawing" value="MODEL">Modell&nbsp;&nbsp;&nbsp;<input type="radio" name="codeModelDrawing" value="DRAWING">Ritning</form>';
					}
					
					$("#s7").html(tempText);
					statusArray[20] = "red";		//Sätter position 20 i statusarray till aktiverad (red)
					
					$("input:radio[name=codeModelDrawing]").on("click", function() {
						vald = $("input:radio[name=codeModelDrawing]:checked").val();		//Gjort val i radiobuttons 
						resetForm(9,9);														// Återställer formuläret från part 9 och nedåt
						statusArray[20] = "green";											//Sätter position 20 i statusarray till val utfört (green)
						
						switch (vald) {
							case "MODEL":
								loadList(jsonName.typavmodell, jsonName.oversatt, "typavmodell", "Typ av modellfil", "labels8", "dots8", "Y", "s8", "kod", "avser", "del9");
								
								//Radiobuttons frö val av numrering enligt BYGGNAD/PLAN - LÖPNUMMER
								if (laguageSwitch == 'en')
								{
									tempText = '<form action=""><input type="radio" name="modelBnr" value="BNR">Building number & floor plan&nbsp;&nbsp;&nbsp;<input type="radio" name="modelBnr" value="LOPNR">Serial number</form>';
								} else {
									tempText = '<form action=""><input type="radio" name="modelBnr" value="BNR">Byggnadsnr & plan&nbsp;&nbsp;&nbsp;<input type="radio" name="modelBnr" value="LOPNR">Löpnummer</form>';
								}
								$("#s9").html(tempText);
								statusArray[21] = "red";									//Sätter position 21 i statusarray till aktiverad (red)
								
								$("input:radio[name=modelBnr]").on("click", function() {
								vald = $("input:radio[name=modelBnr]:checked").val();		//Gjort val i radiobuttons 
								resetForm(10, 10);											// Återställer formuläret från part 10 och nedåt
								statusArray[21] = "green";									//Sätter position 21 i statusarray till val utfört (green)
								
								switch (vald) {
									case "BNR":
										loadList(jsonName.byggnr, jsonName.oversatt, "byggnr", "Byggnadsnummer", "labels10", "dots10", "Y", "s10", "bnr", "text","del10");
										loadList(jsonName.plan, jsonName.oversatt, "plan", "Plan", "labels11", "dots11", "Y", "s11", "kod", "plan","del11");
										loadList(jsonName.bilagetyp, jsonName.oversatt, "bilagetyp", "Typ av bilaga", "labels12", "dots12", "N", "s12", "kod", "avser","del13", "B", "-"); //del 12 (innan) också
										loadField("lopNrBilaga", jsonName.oversatt, "Löpnummer (bilaga, 2 siffror)", "labels13", "dots13", "N", "s13", "del14","","", "R", "2", "1", "^[0-9]{2}$", "2 siffror. Noll utfyllt framför t.ex. 01. Inte 00.");
										loadList(jsonName.sprak, jsonName.oversatt, "sprak", "Språk", "labels14", "dots14", "N", "s14", "kod", "avser","del15");
									break;
																		
									case "LOPNR":
										loadField("lopnr", jsonName.oversatt, "Löpnummer (4 siffror)", "labels10", "dots10", "Y", "s10", "del10","","", "R", "4","1","^[0-9]{4}$", "4 siffror. Noll utfyllt framför t.ex. 0010. Inte 0000." );
										loadList(jsonName.bilagetyp, jsonName.oversatt, "bilagetyp", "Typ av bilaga", "labels11", "dots11", "N", "s11", "kod", "avser","del12","B", "-");		//del 11 (innan) också
										loadField("lopNrBilaga", jsonName.oversatt, "Löpnummer (bilaga, 2 siffror)", "labels12", "dots12", "N", "s12", "del13","","", "R", "2", "1", "^[0-9]{2}$", "2 siffror. Noll utfyllt framför t.ex. 01. Inte 00.");
										loadList(jsonName.sprak, jsonName.oversatt, "sprak", "Språk", "labels13", "dots13", "N", "s13", "kod", "avser","del14");
									break;
								};
								});
								
							break;
							

							//Här är vi . Man har valt ritning och sedan väljer man typ av ritningen enligt nedan, så långt rätt. När man sedan väljer i nästa alternativ knappar så försvinner sista "-" efter Typ av ritning.
							//Felet blir samma oavsett vilken alternativ knapp man väljer.


							case "DRAWING":
								loadList(jsonName.typavritning, jsonName.oversatt, "typavritning", "Typ av ritning", "labels8", "dots8", "Y", "s8", "kod", "avser", "del9", "A", "-");		//del 10 också
								
								//Radiobuttons frö val av numrering enligt BYGGNAD/PLAN - LÖPNUMMER
								if (laguageSwitch == 'en')
								{
									tempText = '<form action=""><input type="radio" name="modelBnr" value="BNR">Building number & floor plan&nbsp;&nbsp;&nbsp;<input type="radio" name="modelBnr" value="LOPNR">Serial number</form>';
								} else {
									tempText = '<form action=""><input type="radio" name="modelBnr" value="BNR">Byggnadsnr & plan&nbsp;&nbsp;&nbsp;<input type="radio" name="modelBnr" value="LOPNR">Löpnummer</form>';
								}
								$("#s9").html(tempText);
								statusArray[21] = "red";									//Sätter position 21 i statusarray till aktiverad (red)
								
								$("input:radio[name=modelBnr]").on("click", function() {
								vald = $("input:radio[name=modelBnr]:checked").val();		//Gjort val i radiobuttons 
								resetForm(11, 11);											// Återställer formuläret från part 10, 11 och nedåt
								statusArray[21] = "green";									//Sätter position 21 i statusarray till val utfört (green)
								
								switch (vald) {
									case "BNR":
										loadList(jsonName.byggnr, jsonName.oversatt, "byggnr", "Byggnadsnummer", "labels10", "dots10", "Y", "s10", "bnr", "text","del11");
										loadList(jsonName.plan, jsonName.oversatt, "plan", "Plan", "labels11", "dots11", "Y", "s11", "kod", "plan","del12");
										loadField("ritningsdel", jsonName.oversatt, "Ritningsdel (0-2 tecken a-z, A-Z, 0-9)", "labels12", "dots12", "N", "s12", "del13","","", "R", "2", "0", "^[a-zA-Z0-9]{1,2}$", "0-2 bokstäver (a-zA-Z) och/eller siffror.");
										loadList(jsonName.bilagetyp, jsonName.oversatt, "bilagetyp", "Typ av bilaga", "labels13", "dots13", "N", "s13", "kod", "avser","del15", "B", "-");			//del 14 (innan) också
										loadField("lopNrBilaga", jsonName.oversatt, "Löpnummer (bilaga, 2 siffror)", "labels14", "dots14", "N", "s14", "del16","","", "R", "2", "1", "^[0-9]{2}$", "2 siffror. Noll utfyllt framför t.ex. 01. Inte 00.");
										loadList(jsonName.sprak, jsonName.oversatt, "sprak", "Språk", "labels15", "dots15", "N", "s15", "kod", "avser","del17");
									break;
									
									case "LOPNR":
										loadField("lopnr", jsonName.oversatt, "Löpnummer (4 siffror)", "labels10", "dots10", "Y", "s10", "del11","","", "R", "4", "1", "^[0-9]{4}$", "4 siffror. Noll utfyllt framför t.ex. 0010. Inte 0000." );
										loadField("ritningsdel", jsonName.oversatt, "Ritningsdel (0-2 tecken a-z, A-Z, 0-9)", "labels11", "dots11", "N", "s11", "del12","","", "R", "2", "0", "^[a-zA-Z0-9]{1,2}$", "0-2 bokstäver (a-zA-Z) och/eller siffror (0-9).");
										loadList(jsonName.bilagetyp, jsonName.oversatt, "bilagetyp", "Typ av bilaga", "labels12", "dots12", "N", "s12", "kod", "avser","del14", "B", "-");		//del 13 (innan) också
										loadField("lopNrBilaga", jsonName.oversatt, "Löpnummer (bilaga, 2 siffror)", "labels13", "dots13", "N", "s13", "del15","","", "R", "2", "1", "^[0-9]{2}$", "2 siffror. Noll utfyllt framför t.ex. 01. Inte 00.");
										loadList(jsonName.sprak, jsonName.oversatt, "sprak", "Språk", "labels14", "dots14", "N", "s14", "kod", "avser","del16");
									break;
								};
								});
								
								
							break;
						}
					});				
					break;
			
				case "TEXT":

					$('#' + 'kksfel').remove();

					loadList(jsonName.verksamhet, jsonName.oversatt, "verksamhet", "Verksamhet", "labels1", "dots1", "Y", "s1", "kod", "verksamhet", "del1", "", "", 
					"anlaggning", jsonName.anlaggning, "kod", "anlaggning", "verksamhet", "del2", "anlaggning", "dots2","", "", "","Y", "", "", "", "", "block");
					
					loadList(jsonName.anlaggning, jsonName.oversatt, "anlaggning", "Anläggning", "labels2", "dots2", "Y", "s2", "kod", "anlaggning", "del2", "", "", 
					"block", jsonName.block, "kod", "block", "anlaggning", "del3", "block", "dots3", "Y", "verksamhet", "verksamhet", "Y");
					
					loadList(jsonName.block, jsonName.oversatt, "block", "Block", "labels3", "dots3", "Y", "s3", "kod", "block", "del3");

					loadList(jsonName.ansvarigpart, jsonName.oversatt, "ansvarigpart", "Ansvarigpart", "labels4", "dots4", "Y", "s4", "kod", "part", "del5","C","-" ); 	//del4 & del6 också
					loadList(jsonName.DT1, jsonName.oversatt, "DT1", "Dokumentgrupp", "labels5", "dots5", "N", "s5", "kod", "DT1", "", "", "", "DT2", jsonName.DT2, "kod", "DT2", "omrade", "del7", "DT2","dots6", "", "", "", "", "Y", "DT1", "forklaring", "kod");
					loadList(jsonName.DT2, jsonName.oversatt, "DT2", "Dokumenttyp", "labels6", "dots6", "Y", "s6", "kod", "DT2", "del7", "A", "-", "", "", "", "", "", "", "", "", "", "", "", "", "Y", "DT1", "forklaring", "omrade");	//del8 också
					loadField("lopnr", jsonName.oversatt, "Löpnummer (3 siffror)", "labels7", "dots7", "Y", "s7", "del9", "", "", "R", "3", "3", "^[0-9]{3}$", "3 siffror. Noll utfyllt framför t.ex. 010. Inte 000." );
					loadList(jsonName.bilagetyp, jsonName.oversatt, "bilagetyp", "Typ av bilaga", "labels8", "dots8", "N", "s8", "kod", "avser","del11","B", "-");		//del 10 (innan) också
					loadField("lopNrBilaga", jsonName.oversatt, "Löpnummer (bilaga, 2 siffror)", "labels9", "dots9", "N", "s9", "del12","","", "R", "2", "2", "^[0-9]{2}$", "2 siffror. Noll utfyllt framför t.ex. 01. Inte 00.");
					loadList(jsonName.sprak, jsonName.oversatt, "sprak", "Språk", "labels10", "dots10", "N", "s10", "kod", "avser","del13");
					break;

				case "KKS":

					$('#' + 'kksfel').remove();

					loadList(jsonName.verksamhet, jsonName.oversatt, "verksamhet", "Verksamhet", "labels1", "dots1", "Y", "s1", "kod", "verksamhet", "del1", "", "", 
					"anlaggning", jsonName.anlaggning, "kod", "anlaggning", "verksamhet", "del2", "anlaggning", "dots2","", "", "","Y", "", "", "", "", "block");
					
					loadList(jsonName.anlaggning, jsonName.oversatt, "anlaggning", "Anläggning", "labels2", "dots2", "Y", "s2", "kod", "anlaggning", "del2", "", "", 
					"block", jsonName.block, "kod", "block", "anlaggning", "del4", "block", "dots3", "Y", "verksamhet", "verksamhet", "Y");
					
					loadList(jsonName.block, jsonName.oversatt, "block", "Block", "labels3", "dots3", "Y", "s3", "kod", "block", "del4","B","_");

					loadField("kks", jsonName.oversatt, "Beteckning KKS (14 tecken)", "labels4", "dots4", "Y", "s4", "del5","A","_", "K", "14", "14", "", "Felaktig längd. Skall vara 14 tecken.", "Y");

					loadList(jsonName.DT1, jsonName.oversatt, "DT1", "Dokumentgrupp", "labels5", "dots5", "N", "s5", "kod", "DT1", "", "", "", "DT2", jsonName.DT2, "kod", "DT2", "omrade", "del7", "DT2","dots6", "", "", "", "", "Y", "DT1", "forklaring", "kod");
					loadList(jsonName.DT2, jsonName.oversatt, "DT2", "Dokumenttyp", "labels6", "dots6", "Y", "s6", "kod", "DT2", "del7", "A", "_", "", "", "", "", "", "", "", "", "", "", "", "", "Y", "DT1", "forklaring", "omrade");	//del8 också

					loadField("lopnr", jsonName.oversatt, "Löpnummer (min. 3 siffror)", "labels7", "dots7", "Y", "s7", "del9", "", "", "R", "9", "3", "^[0-9]{3,9}$", "Minimun 3 siffror. Noll utfyllt framför t.ex. 010. Inte 000." );

					loadList(jsonName.bilagetyp, jsonName.oversatt, "bilagetyp", "Typ av bilaga", "labels8", "dots8", "N", "s8", "kod", "avser","del11","B", "-");		//del 10 (innan) också
					loadField("lopNrBilaga", jsonName.oversatt, "Löpnummer (bilaga, 2 siffror)", "labels9", "dots9", "N", "s9", "del12","","", "R", "2", "2", "^[0-9]{2}$", "2 siffror. Noll utfyllt framför t.ex. 01. Inte 00.");
					loadList(jsonName.sprak, jsonName.oversatt, "sprak", "Språk", "labels10", "dots10", "N", "s10", "kod", "avser","del13");
					break;

				case "SSEN":

					$('#' + 'kksfel').remove();

					loadList(jsonName.verksamhet, jsonName.oversatt, "verksamhet", "Verksamhet", "labels1", "dots1", "Y", "s1", "kod", "verksamhet", "del1", "", "", 
					"anlaggning", jsonName.anlaggning, "kod", "anlaggning", "verksamhet", "del2", "anlaggning", "dots2","", "", "","Y", "", "", "", "", "block");
					
					loadList(jsonName.anlaggning, jsonName.oversatt, "anlaggning", "Anläggning", "labels2", "dots2", "Y", "s2", "kod", "anlaggning", "del2", "", "", 
					"block", jsonName.block, "kod", "block", "anlaggning", "del3", "block", "dots3", "Y", "verksamhet", "verksamhet", "Y");
					
					loadList(jsonName.block, jsonName.oversatt, "block", "Block", "labels3", "dots3", "Y", "s3", "kod", "block", "del3","A","_");

					loadField("ssen", jsonName.oversatt, "Beteckning SSEN (14 tecken)", "labels4", "dots4", "Y", "s4", "del5","A","_", "S", "14", "14", "", "Felaktig längd. Skall vara 14 tecken.", "Y");

					loadList(jsonName.DT1, jsonName.oversatt, "DT1", "Dokumentgrupp", "labels5", "dots5", "N", "s5", "kod", "DT1", "", "", "", "DT2", jsonName.DT2, "kod", "DT2", "omrade", "del7", "DT2","dots6", "", "", "", "", "Y", "DT1", "forklaring", "kod");
					loadList(jsonName.DT2, jsonName.oversatt, "DT2", "Dokumenttyp", "labels6", "dots6", "Y", "s6", "kod", "DT2", "del7", "A", "_", "", "", "", "", "", "", "", "", "", "", "", "", "Y", "DT1", "forklaring", "omrade");	//del8 också

					loadField("lopnr", jsonName.oversatt, "Löpnummer (min. 3 siffror)", "labels7", "dots7", "Y", "s7", "del9", "", "", "R", "9", "3", "^[0-9]{3,9}$", "Minimun 3 siffror. Noll utfyllt framför t.ex. 010. Inte 000." );

					loadList(jsonName.bilagetyp, jsonName.oversatt, "bilagetyp", "Typ av bilaga", "labels8", "dots8", "N", "s8", "kod", "avser","del11","B", "-");		//del 10 (innan) också
					loadField("lopNrBilaga", jsonName.oversatt, "Löpnummer (bilaga, 2 siffror)", "labels9", "dots9", "N", "s9", "del12","","", "R", "2", "2", "^[0-9]{2}$", "2 siffror. Noll utfyllt framför t.ex. 01. Inte 00.");
					loadList(jsonName.sprak, jsonName.oversatt, "sprak", "Språk", "labels10", "dots10", "N", "s10", "kod", "avser","del13");
					break;
			}
		});	
	});
	
	//Laddar om hela sidan
	$("#reset").click( function()
	{
		location.reload();				
	});
	
	// Kontroll av om filnamnet innehåller alla nödvädiga delar i namnet
	$("#checkStatus").click( function()
	{
		checkStatus();
	});
	
	// Mouseenter för Reset knappen
	$("#reset, #checkStatus").mouseenter( function()
	{
		$(this).css({"background-color": "lightblue"});
	});

	// Mouseleave för Reset knappen
	$("#reset, #checkStatus").mouseleave( function()
	{
		$(this).css({"background-color": "lightgrey"});
	});
	
	// Kontroll av om filnamnet som kopieras innehåller alla nödvädiga delar i namnet
	$('#nyaNamnet').on("copy", checkStatus);
	
});


// Språk om användaren har valt det
function flagClick (land)
{	
	if (laguageSwitch != land)
	{
		laguageSwitch = land;
		 $("input:radio[name=codeType]").removeAttr('checked');
		
		if (laguageSwitch == "sv")
		{
			location.reload();
		} else {
			resetForm(1, 1);
		}
	}
};



// ***** LOAD LIST *****
	//partJson: 					objektreferens till den del av Json filen som vi ska ladda
	//jsonWordTranslate				objectreferens till området med översättningar i Json filen
	//jsonWord: 					vad aktuellt område heter i Json filen
	//rubrik: 						den text som visas som rubrik i formuläret
	//listPartLabel, listPartDot: 	id på span element som rubriken och ev. * ska läggas in i
	//listPartDotSwitch:			= Y -> * och <br>, = N -> <br> och markering som hjälptext
	//listPart:						id på span element som lista ska läggas in i
	//tempkod:						namnet på det fält i Json filen som innehåller aktuell kod
	//kodtext:						namnet på det fält i Json filen som innehåller beskrivingen för aktuella koder						
	//targetPart:					id på den span i filnamnet som det valda värdet ska sättas in i
	//delimitControl:				B = before, A = after, C = both
	//delimitSign:					vilket tecken som ska användas som delimiter

	// ***** Dessa används vid kopplad lista. Uppgifter om den listan som ska ladda om utifrån valet ovan *****
	//idLink: 						ID på listan som jag ska ladda området i
	//partJsonLink: 				objektreferens till den del av Json filen som jag ska arbeta med
	//tempkodLink:					namnet på kodfältet i Json filen i länkade listan
	//kodtextLink:					namnet på textfältet för resp. kod i den länkade listan
	//searchKodLink: 				namnet på det fältet i Json filen som vi ska jämföra med
	//targetPartLink:				namnet på det span fältet som den länkade lista spara sina värden i
	//jsonWordLink:					vad aktuellt område heter i Json filen för den länkade listan
	//listPartDotLink:				namnet på span fältet för "*" för den länkade listan

	// ***** Dessa värden används vid kopplad lista som beror på valen i 2 andra listor *****
	//secondField:					= Y -> ett andra fält används för att hitta rätt värden
	//searchKodLink2:				namnet på det fältet i Json filen som vi ska jämföra med
	//secondId:						ID (namnet) på den lista som jag ska hämta värden från. Den andra (ig. första) listan som behövs för jämförelsen

	//loadFirstEmptyLine:			= Y -> vi läser in en första tom rad för varje delomrdåe från Json filen
	//helpControl:					= Y -> styr om vi sätter in help bilden och kopplar klick till denna för att visa tabell för val
	//helpDependentLink:			namnet på den lista (jsonWord) som denna lista är kopplad till/beroende av 
	//forklaringtext:				namnet på det fält i Json filen som innehåller förklaringen för koden
	//searchField:					namnet på fältet i Json filen som vi ska jämför det valda värdet från den beroende listan med 
	//secondDownStreamField:		namnet på de fält som en lista skall nollställa vid tomt val. Verksamhet -> (Anläggning) -> Block 

function loadList (partJson, jsonWordTranslate, jsonWord, rubrik, listPartLabel, listPartDot, listPartDotSwitch, listPart, tempkod, kodtext, targetPart, 
delimitControl, delimitSign, idLink, partJsonLink, tempkodLink, kodtextLink, searchKodLink, targetPartLink, jsonWordLink, listPartDotLink,
secondField, searchKodLink2, secondId, loadFirstEmptyLine, helpControl, helpDependentLink, forklaringtext, searchField, secondDownStreamField )
{
	if (laguageSwitch == "en")										//Om språk switchen är satt till en = Engelska översätt ordet som vi skickar till funktioner
	{
		rubrik = translate(jsonWordTranslate, rubrik);
	}	
	$('#'+listPartLabel).html(rubrik);								//Sätter rubriken på listan
	
	
	if (listPartDotSwitch == "Y" && helpControl != "Y")				//Krav på ifyllnad * men ingen hjälp symbol
	{
		$('#'+listPartDot).html('&nbsp;*<br>');
		statusArray[targetPart.slice(3)] = "red";					//Aktiverar platsen i statusarray enligt numret på targetparten
		fixBackground (jsonWord, listPartDot, targetPart);			//Ställer in * till rätt färg
	}
	else if (listPartDotSwitch == "Y" && helpControl == "Y")		//Krav på ifyllnad * och visar också hjälpsymbolen
	{
		temptext = '&nbsp;*&nbsp;&nbsp;<img src="https://googledrive.com/host/0B9p21sv0NGWSS3dielhBejllUFk" id="' + jsonWord + 'HelpPNG' + '"><br>';
		$('#'+listPartDot).html(temptext);
		statusArray[targetPart.slice(3)] = "red";
		fixBackground (jsonWord, listPartDot, targetPart);
	}
	else if  (listPartDotSwitch == "N" && helpControl != "Y")		//Inte krav på ifyllnad * och inte visa något hjälp symbol heller
	{
		$('#' + listPartDot).html('<br>');
		$('#' + listPartLabel).attr("class", "blueText");			//Sätter klassen som gör att det bli blå, italic text i formuläret 
	}
	else if (listPartDotSwitch == "N" && helpControl == "Y")		//Inte krav på ifyllnad * men visar hjälp symbol
	{
		temptext = '&nbsp;&nbsp;<img src="https://googledrive.com/host/0B9p21sv0NGWSS3dielhBejllUFk" id="' + jsonWord + 'HelpPNG' + '"><br>';
		$('#' + listPartDot).html(temptext);
		$('#' + listPartLabel).attr("class", "blueText");
	}




//Ladda listan med värden
	var temptext = '<select class="lists" id="' + jsonWord + '">';
	var breakFlag1 = false;											//Förhindrar att fler än 1 tom post laddas till listan
	
	if (laguageSwitch == "en") {kodtext = kodtext + "En"};			//Språkflaggan satt till engelska (en)

	$.each(partJson, function()
	{	
		if (!(this[tempkod] == "" && breakFlag1)) {
			temptext = temptext + '<option value="' + this[tempkod] + '">' + this[tempkod] + ' - ' + this[kodtext] + '</option>';
		}
		if (this[tempkod] == "") {breakFlag1 = true;}				//Förhindra att flera "-" poster laddas
	});
	temptext += '</select>';
	$('#'+listPart).html(temptext);
	



	//Klick på Help bilden
	$('#' + jsonWord + 'HelpPNG').click( function()
	{
		showHelpList (partJson, jsonWord, tempkod, kodtext, helpDependentLink, forklaringtext, searchField);	
	});
	
	
	//Något ändras i listan
	$('#'+jsonWord).change(function () 
	{
		var listValue = $('#'+ jsonWord).val();					//Det nya värdet som man har valt i listan
		$('#' + targetPart).html(listValue);					//Sätter det nya värdet i targetparten
		
		
		//Om man har valt något annat i verksamhet och det har varit AA valt tidigare. Då gör vi reload och börjar om
		var tempLabel = $('#labels2').text();		
		if ((tempLabel == "Detaljruta" || tempLabel == "Detalj square") && jsonWord == "verksamhet")
		{			
			$("input:radio[name=codeType]").removeAttr('checked');
			resetForm(1, 1);
		}
		
		if (listPartDotSwitch == "Y")							//Om det är krav på ifyllnad sätt rätt färg *
		{
		fixBackground (jsonWord, listPartDot, targetPart);
		}
		
		
		tempNr = parseInt(targetPart.slice(3));					//Tar reda på numret utifrån targetparten
		
		if (delimitControl == "B") {							//Ska ha en delimiter innan listan
			if (listValue == ""){								//Om valt värde är "" plocka bort delimitern också
				$('#del'+(tempNr - 1)).html("");
			} else {	
				$('#del'+(tempNr - 1)).html(delimitSign);
			}
		}
		else if (delimitControl == "A") {						//Ska ha en delimiter efter listan
			if (listValue == ""){
				$('#del'+(tempNr + 1)).html("");
			} else {
				$('#del'+(tempNr + 1)).html(delimitSign);
			}
		}
		else if (delimitControl == "C") {						//Ska ha en delimiter både innan och efter listan
			if (listValue == ""){
				$('#del'+(tempNr - 1)).html("");
				$('#del'+(tempNr + 1)).html("");
			} else {
				$('#del'+(tempNr - 1)).html(delimitSign);
				$('#del'+(tempNr + 1)).html(delimitSign);
			}
		}
		
		
		//Används när man har valt verksamheten AA -> ledningsnät och ruta / block systemet ska tillämpas
		if (jsonWord == "verksamhet" && listValue == "AA")
		{
			fixAA(listPart, targetPart);
			idLink = "";		//Om vi har satt in nya listor enligt ovan vill vi inte att koden nedan ska köras. Inte längre relevant.
		}
	
		
		//Används när en länkad lista ska laddas beroende på val i föregående lista enligt ovan
		if (idLink != "") {												//Finns det en länkangiven till den beroende listan?
			
			temptext = '<select class="lists" id="' + idLink + '">';
			var breakFlag1 = false;

			if (laguageSwitch == "en" && !(kodtextLink.endsWith("En")) )
			{
				kodtextLink = kodtextLink + "En";
			}

			if (listValue == "") {
				$.each(partJsonLink, function()
				{ 
					if (!(this[tempkod] == "" && breakFlag1)) {
						temptext = temptext + '<option value="' + this[tempkodLink] + '">' + this[tempkodLink] + ' - ' + this[kodtextLink] + '</option>';
					}
					if (this[tempkod] == "") {breakFlag1 = true;}		//Förhindra att flera "-" poster laddas 
				});
				
			} else if (secondField == "Y") {							//Används om den beroende listan är beroende av två värden i två olika listor
				
				var listValue2 = $('#' + secondId).val();
				breakFlag1 = false;
				
				$.each(partJsonLink, function()
				{
					if (loadFirstEmptyLine == "Y" && this[tempkodLink] == "" && !(breakFlag1))				//Laddar en första tom rad om man önskar det. Oavsett vilket område det gäller
					{
						temptext = temptext + '<option value="' + this[tempkodLink] + '">' + this[tempkodLink] + ' - ' + this[kodtextLink] + '</option>';
						breakFlag1 = true;
					}	
					else
					{
						if(this[searchKodLink] == listValue && this[searchKodLink2] == listValue2) { 
						temptext = temptext + '<option value="' + this[tempkodLink] + '">' + this[tempkodLink] + ' - ' + this[kodtextLink] + '</option>';
						}
					} 
				});
				
			} else {													//Används vid normal laddning med listan beroende av ett fält i en annan lista
				breakFlag1 = false;

				$.each(partJsonLink, function()
				{
					if (loadFirstEmptyLine == "Y" && this[tempkodLink] == "" && !(breakFlag1))
					{
						temptext = temptext + '<option value="' + this[tempkodLink] + '">' + this[tempkodLink] + ' - ' + this[kodtextLink] + '</option>';
						breakFlag1 = true;
					}	
					else
					{					
						if(this[searchKodLink] == listValue) { 
							temptext = temptext + '<option value="' + this[tempkodLink] + '">' + this[tempkodLink] + ' - ' + this[kodtextLink] + '</option>';
						}
					} 
				});
			}
			
			temptext += '</select>';
			$('#'+idLink).html(temptext);					//Laddar den beroende listan med filtrerade värden
			$('#' + targetPartLink).html("");				//Nollställer den länkade targetparten
			fixBackground (jsonWordLink, listPartDotLink, targetPartLink);
			
			if (secondDownStreamField != "" )
			{
				$('#' + secondDownStreamField).val("").trigger('change');
			}
		};
	});
};



// ***** LOAD FIELD *****
	//jsonWord: 					vad aktuellt område heter i Json filen
	//jsonWordTranslate				objectreferens till området med översättningar i Json filen
	//rubrik: 						den text som visas som rubrik i formuläret
	//listPartLabel, listPartDot: 	id på span element som rubriken och ev. * ska läggas in i
	//listPartDotSwitch:			= Y -> * och <br>, = N -> <br> och markering som hjälptext
	//listPart:						id på span element som lista ska läggas in i
	//targetPart:					id på den span i filnamnet som det valda värdet ska sättas in i
	//delimitControl:				B = before, A = after, C = both
	//delimitSign:					vilket tecken som ska användas som delimiter
	//testTyp:						"R" = test mot regex. formel, "K" = test mot en lista i Json fil KKS, "S" = test mot en lista i Json fil SSEN)
	//fieldSizeMax:					anger maxlängden på det som kan skrivas i fältet
	//fieldSizeMin:					anger minlängd på det som har matas in
	//testRegEx:					reg.ex. uttryck som ska användas för test mot reg.ex.  
	//testErrorMessage:				meddelande om testet inte går bra
	//helpControl:					= Y -> styr om vi sätter in help bilden och kopplar klick till denna för att visa tabell för val

function loadField (jsonWord, jsonWordTranslate, rubrik, listPartLabel, listPartDot, listPartDotSwitch, listPart, 
targetPart, delimitControl, delimitSign, testTyp, fieldSizeMax, fieldSizeMin, testRegEx, testErrorMessage, helpControl)
{
	if (laguageSwitch == "en")
	{
		rubrik = translate(jsonWordTranslate, rubrik);
	}
	
	$('#'+listPartLabel).html(rubrik);

	
	if (listPartDotSwitch == "Y" && helpControl != "Y")
	{
		$('#'+listPartDot).html(' *<br>');
		statusArray[targetPart.slice(3)] = "red";
		fixBackground (jsonWord, listPartDot, targetPart);	
	}
	else if  (listPartDotSwitch == "N" && helpControl != "Y") 
	{
		$('#' + listPartDot).html('<br>');
		$('#' + listPartLabel).attr("class", "blueText");
	}
	else if (listPartDotSwitch == "Y" && helpControl == "Y")
	{
		temptext = '&nbsp;*&nbsp;&nbsp;<img src="https://googledrive.com/host/0B9p21sv0NGWSS3dielhBejllUFk" id="' + jsonWord + 'HelpPNG' + '"><br>';
		$('#' + listPartDot).html(temptext);
		statusArray[targetPart.slice(3)] = "red";
		fixBackground (jsonWord, listPartDot, targetPart);
	}
	else if  (listPartDotSwitch == "N" && helpControl == "Y") 
	{
		temptext = '&nbsp;&nbsp;<img src="https://googledrive.com/host/0B9p21sv0NGWSS3dielhBejllUFk" id="' + jsonWord + 'HelpPNG' + '"><br>';
		$('#' + listPartDot).html(temptext);
		$('#' + listPartLabel).attr("class", "blueText");
	}

	
	//Klick på Help bilden
	$('#' + jsonWord + 'HelpPNG').click( function()
	{
		showHelpList ("", jsonWord);	
	});

	var temptext = '<input type="text" id="' + jsonWord + '" maxlength="' + fieldSizeMax + '">'
	$('#'+listPart).html(temptext);
	
	
	//Något ändras i fältet
	$('#' + jsonWord).focusout(function () 
	{
		var fieldValue = $('#'+ jsonWord).val();			//Angivet värde
		var val = parseInt(fieldValue);
		var tempClass = 'fieldErrorText' + listPart;		//klass för att visas om test av innehåll inte går bra
		
		if (fieldValue == "")
		{
			$('#' + targetPart).html("");
			fixBackground (jsonWord, listPartDot, targetPart);	
		}
		
		if (testTyp == "R" && fieldValue != "") 			//Test enligt regex. formel och att valt värden inte är = ""
		{
			var patt = new RegExp(testRegEx);
			var testResult = patt.test(fieldValue);	
			
			if (!testResult || val == 0)
			{
				$('#' + targetPart).html("");
				$('#' + jsonWord).attr("class", "fieldError"); 
				
				if (laguageSwitch == "en")
				{
					testErrorMessage = translate(jsonWordTranslate, testErrorMessage);
				}	
				$("<span class='" + tempClass + "'><font color:'red'><i><br>  " + testErrorMessage + "</br></i></font></span>").insertAfter($('#' + jsonWord));				
				
			} else {
			
				$('#' + targetPart).html(fieldValue);
				
				if (listPartDotSwitch == "Y")
				{
				fixBackground (jsonWord, listPartDot, targetPart);
				}
				
				$("." + tempClass).remove();
				
				$('#' + jsonWord).removeClass('fieldError');
				
				tempNr = parseInt(targetPart.slice(3));
				
				if (delimitControl == "B") {
					if (fieldValue == ""){
						$('#del'+(tempNr - 1)).html("");
					} else {	
						$('#del'+(tempNr - 1)).html(delimitSign);
					}
				}
				else if (delimitControl == "A") {
					if (fieldValue == ""){
						$('#del'+(tempNr + 1)).html("");
					} else {
						$('#del'+(tempNr + 1)).html(delimitSign);
					}
				}
				else if (delimitControl == "C") {
					if (fieldValue == ""){
						$('#del'+(tempNr - 1)).html("");
						$('#del'+(tempNr + 1)).html("");
					} else {
						$('#del'+(tempNr - 1)).html(delimitSign);
						$('#del'+(tempNr + 1)).html(delimitSign);
					}
				}
			}
			
		}
		if (testTyp == "K" && fieldValue != "")			//Test av fält innehåll mot lista t.ex. vid KKS
		{
			$('#' + 'kksfel').remove();
			
			var KKSstring = $('#' + jsonWord).val();

			if(KKSstring.length < 14 || KKSstring.length > 14)				
			{
				$('#' + targetPart).html("");
				$('#' + jsonWord).attr("class", "fieldError"); 
				
				if (laguageSwitch == "en")
				{
					testErrorMessage = translate(jsonWordTranslate, testErrorMessage);
				}	
				$("<span class='" + tempClass + "'><font color:'red'><i>  " + testErrorMessage + "</i></font></span>").insertAfter($('#' + jsonWord));	
			} else {										//Strängen har rätt längd 14 tecken
				
				$("." + tempClass).remove();
				$('#' + jsonWord).removeClass('fieldError');

				var kksPart1 = KKSstring.substring(0,3);
				var kksPart2 = KKSstring.substring(3,5);
				var kksPart3 = KKSstring.substring(5,7);
				var kksPart4 = KKSstring.substring(7,10);
				var kksPart5 = KKSstring.substring(10,12);
				var kksPart6 = KKSstring.substring(12);

				checkCodeLogic (1, kksPart1, kksPart2, 1);		// Kontroll av varje nivå av koden
				checkCodeLogic (2, kksPart3, kksPart4, 2);		
				checkCodeLogic (3, kksPart5, kksPart6, 3);		


				var tempText = "<span id='kksfel'><br><p>";						// Bygga ihop felmeddelande om det finns några fel
				var tempFelText = "";

				if (felArray.length > 0)
				{
					for (var i=0; i < felArray.length;i += 2)
					{
						for (var x = 0; x < jsonName.felmeddelande.length; x++)
						{
							if (jsonName.felmeddelande[x].nr == felArray[i+1])
							{
								if (laguageSwitch == "sv")
								{
									tempFelText = jsonName.felmeddelande[x].sv;
									break;
								} else if (laguageSwitch == "en")
								{
									tempFelText = jsonName.felmeddelande[x].en;
									break;
								}
							}
						}


						if (felArray[i] == 1 && laguageSwitch == "sv")
						{
							tempText += "Nivå 1, System: " + tempFelText + "<br>";
							tempFelText = "";
						}
						else if (felArray[i] == 1 && laguageSwitch == "en")
						{
							tempText += "Level 1, System: " + tempFelText + "<br>";
							tempFelText = "";
						}
						else if (felArray[i] == 2 && laguageSwitch == "sv")
						{
							tempText += "Nivå 2, Aggregat: " + tempFelText + "<br>";
							tempFelText = "";
						}
						else if (felArray[i] == 2 && laguageSwitch == "en")
						{
							tempText += "Level 2, Unit: " + tempFelText + "<br>";
							tempFelText = "";
						}
						else if (felArray[i] == 3 && laguageSwitch == "sv")
						{
							tempText += "Nivå 3, Komponent: " + tempFelText + "<br>";
							tempFelText = "";
						}
						else if (felArray[i] == 3 && laguageSwitch == "en")
						{
							tempText += "Level 3, Component: " + tempFelText + "<br>";
							tempFelText = "";
						}
					}
				}

				tempText += "</p><br></span>"

				if (felArray.length > 0)
				{
					$('#'+listPart).after(tempText);
					$('#' + targetPart).html("");

					if (listPartDotSwitch == "Y")
					{
						var kksFlag = true;
						fixBackground (jsonWord, listPartDot, targetPart, kksFlag);
					}

				}
				else
				{
					$('#' + targetPart).html(fieldValue);
				
					if (listPartDotSwitch == "Y")
					{
						fixBackground (jsonWord, listPartDot, targetPart);
					}

					tempNr = parseInt(targetPart.slice(3));
				
					if (delimitControl == "B") {
						if (fieldValue == ""){
							$('#del'+(tempNr - 1)).html("");
						} else {	
							$('#del'+(tempNr - 1)).html(delimitSign);
						}
					}
					else if (delimitControl == "A") {
						if (fieldValue == ""){
							$('#del'+(tempNr + 1)).html("");
						} else {
							$('#del'+(tempNr + 1)).html(delimitSign);
						}
					}
					else if (delimitControl == "C") {
						if (fieldValue == ""){
							$('#del'+(tempNr - 1)).html("");
							$('#del'+(tempNr + 1)).html("");
						} else {
							$('#del'+(tempNr - 1)).html(delimitSign);
							$('#del'+(tempNr + 1)).html(delimitSign);
						}
					}
				}

				felArray = [];
			}
		}



		if (testTyp == "S" && fieldValue != "")			//Test av fält innehåll mot lista t.ex. vid SSEN
		{
			$('#' + 'kksfel').remove();
			
			var SSENstring = $('#' + jsonWord).val();

			if(SSENstring.length < 14 || SSENstring.length > 14)				
			{
				$('#' + targetPart).html("");
				$('#' + jsonWord).attr("class", "fieldError"); 
				
				if (laguageSwitch == "en")
				{
					testErrorMessage = translate(jsonWordTranslate, testErrorMessage);
				}	
				$("<span class='" + tempClass + "'><font color:'red'><i>  " + testErrorMessage + "</i></font></span>").insertAfter($('#' + jsonWord));	
			} else {										//Strängen har rätt längd 14 tecken
				
				$("." + tempClass).remove();
				$('#' + jsonWord).removeClass('fieldError');

				var ssenPart1 = SSENstring.substring(0,2);
				var ssenPart2 = SSENstring.substring(2,4);

				var ssenPart3 = SSENstring.substring(4,5);		// "_"

				var ssenPart4 = SSENstring.substring(5,7);
				var ssenPart5 = SSENstring.substring(7,9);
				
				var ssenPart6 = SSENstring.substring(9,10);		// "_"

				var ssenPart7 = SSENstring.substring(10,12);
				var ssenPart8 = SSENstring.substring(12);

				checkCodeLogic (4, ssenPart1, ssenPart2, 1);	// Kontroll av varje nivå av koden
				checkCodeLogic (4, ssenPart4, ssenPart5, 2);		
				checkCodeLogic (4, ssenPart7, ssenPart8, 3);	

				checkCodeLogic (5, ssenPart3, "", 1);			// Kontroll av "_"
				checkCodeLogic (5, ssenPart6, "", 2);


				var tempText = "<span id='kksfel'><br><p>";		// Bygga ihop felmeddelande om det finns några fel
				var tempFelText = "";

				if (felArray.length > 0)
				{
					for (var i=0; i < felArray.length;i += 2)
					{
						for (var x = 0; x < jsonName.felmeddelande.length; x++)
						{
							if (jsonName.felmeddelande[x].nr == felArray[i+1])
							{
								if (laguageSwitch == "sv")
								{
									tempFelText = jsonName.felmeddelande[x].sv;
									break;
								} else if (laguageSwitch == "en")
								{
									tempFelText = jsonName.felmeddelande[x].en;
									break;
								}
							}
						}
									
						tempText += "Nivå/Level " + felArray[i] + ": " + tempFelText + "<br>";
						tempFelText = ""; 
					}
				}

				tempText += "</p><br></span>"

				if (felArray.length > 0)
				{
					$('#'+listPart).after(tempText);
					$('#' + targetPart).html("");

					if (listPartDotSwitch == "Y")
					{
						var kksFlag = true;
						fixBackground (jsonWord, listPartDot, targetPart, kksFlag);
					}

				}
				else
				{
					$('#' + targetPart).html(fieldValue);
				
					if (listPartDotSwitch == "Y")
					{
						fixBackground (jsonWord, listPartDot, targetPart);
					}

					tempNr = parseInt(targetPart.slice(3));
				
					if (delimitControl == "B") {
						if (fieldValue == ""){
							$('#del'+(tempNr - 1)).html("");
						} else {	
							$('#del'+(tempNr - 1)).html(delimitSign);
						}
					}
					else if (delimitControl == "A") {
						if (fieldValue == ""){
							$('#del'+(tempNr + 1)).html("");
						} else {
							$('#del'+(tempNr + 1)).html(delimitSign);
						}
					}
					else if (delimitControl == "C") {
						if (fieldValue == ""){
							$('#del'+(tempNr - 1)).html("");
							$('#del'+(tempNr + 1)).html("");
						} else {
							$('#del'+(tempNr - 1)).html(delimitSign);
							$('#del'+(tempNr + 1)).html(delimitSign);
						}
					}
				}

				felArray = [];
			}
		}
		
	});
} 


// Kollar koderna för KKS och SSEN beteckningar regelverket
// level 		- Vilken typ av test det är som ska utföras
// part1, part2 - Koder och nummer som ska testas
// codeLevel	- Kod för på vilken nivå som koderna hör hemma på  1,2 eller 3  
function checkCodeLogic (level, part1, part2, codelevel)
{
		if (level == 1)
		{
			if (part1 == "###" && part2 == "##" ) return;	//Bara ### ##, OK
		}
		if (level == 2)
		{
			if (part1 == "##" && part2 == "###" ) return;
		}
		if (level == 3 || level == 4)
		{
			if (part1 == "##" && part2 == "##" ) return;
		}
		


		if (level != 5)
		{
			var tempPart1 = "";									// Test om part1 finns i json filen
			var tempTest1 = false;

			for (var x=0; x<part1.length; x++)					// Tar bort ev. "#" i part 1
			{
				if (part1.substring(x,x+1) != "#")
				{
					tempPart1 += part1.substring(x,x+1);
				}
			}

			if (tempPart1 != "")
			{
				if (level == 1)
				{
					for (var i = 0; i < jsonName.kks1.length; i++)
					{
						if (jsonName.kks1[i].kks1 == tempPart1)
						{
							tempTest1 = true;
							break;
						}
					}
				} 
				else if (level == 2)
				{
					for (var i = 0; i < jsonName.kks2.length; i++)
					{
						if (jsonName.kks2[i].kks2 == tempPart1)
						{
							tempTest1 = true;
							break;
						}
					}
				}
				else if (level == 3)
				{
					for (var i = 0; i < jsonName.kks3.length; i++)
					{
						if (jsonName.kks3[i].kks3 == tempPart1)
						{
							tempTest1 = true;
							break;
						}
					}
				}
				else if (level == 4)
				{
					for (var i = 0; i < jsonName.ssen.length; i++)
					{
						if (jsonName.ssen[i].ssen == tempPart1)
						{
							tempTest1 = true;
							break;
						}
					}
				}	
			}

			if (!tempTest1)
			{
				if (level == 1 || level == 2 || level == 3)
				{
					felArray[felArray.length] = codelevel;
					felArray[felArray.length] = 2;
				}
				else if (level == 4)
				{
					felArray[felArray.length] = codelevel;
					felArray[felArray.length] = 4;
				}
			}
		}



		if (level == 1 || level == 3 || level == 4)
		{
			if (part1.indexOf("#") >= 0 && part2 != "##")		// # i part1 -> bara # i part2 
			{
				felArray[felArray.length] = codelevel;
				felArray[felArray.length] = 1;
			}
			else if (part2 == "##")
			{}
			else
			{
				var tempTestNumeric = $.isNumeric(part2);			// Test om part 2 är numerisk

				if (!tempTestNumeric)
				{
					felArray[felArray.length] = codelevel;
					felArray[felArray.length] = 3;
				}
			}
		}
		else if (level == 2)
		{
			if (part1.indexOf("#") >= 0 && part2 != "###")		// # i part1 -> bara # i part2 
			{
				felArray[felArray.length] = codelevel;
				felArray[felArray.length] = 1;
			}
			else if (part2 == "###")
			{}
			else
			{
			
				var tempTestNumeric = $.isNumeric(part2);			// Test om part 2 är numerisk

				if (!tempTestNumeric)
				{
					felArray[felArray.length] = codelevel;
					felArray[felArray.length] = 3;
				}
			}
		}


		if (level == 5)				// Test så att tecknet "_" är rätt
		{
			if (part1 != "_")
			{
				felArray[felArray.length] = codelevel;
				felArray[felArray.length] = 5;
			}
		}
}


// Ändrar / nollställer färgen på fälten vid inmatning av värden
function fixBackground (partName, dot, targetPart, kksFlag)
{
	var tempPartName = "#" + partName;
	var tempDotName = "#" + dot;

	if($(tempPartName).val() && !(kksFlag))
	{
		$(tempDotName).css("color", "Green");
		statusArray[targetPart.slice(3)] = "green";
	}
	else
	{
		$(tempDotName).css("color", "red");
		statusArray[targetPart.slice(3)] = "red";
	};
}


//Nollställer formuläret nedan för angivet nummer
//sNumber:		Numret på delen i formuläret
//partNumber:	Numret på target delen i nya filnamnet

function resetForm (sNumber, partNumber)
{
	for (var i=partNumber; i < 17; i++)
	{
		$('#labels' + i).html("");
		$('#labels' + i).removeClass("blueText");
		$('#dots' + i).html("");
		$('#s' + i).html("");
		statusArray[i] = "undefined";
	}
	
	for (var x=sNumber; x < 17; x++)
	{
		$('#del' + x).html("");
	}
	
	for (var z=20; z < 26; z++)
	{
		statusArray[z] = "undefined";
	}
}


function showHelpList(partJson, jsonWord, tempkod, kodtext, helpDependentLink, forklaringtext, searchField)
{
	var temptext;
	var listValue = $('#' + helpDependentLink).val();
	
	temptext = "<img id='cross' src='https://googledrive.com/host/0B9p21sv0NGWSSWRMaXAwQ0ZZamM'><br>"; 	//close.png

	if (jsonWord == "kks")
	{
		temptext = temptext + "<table id='" + jsonWord + "HelpTable" + "' class='helpListKKS'>";

		temptext = temptext + '<tr><th colspan="2">Nivå/Level 1</th><th colspan="2">Nivå/Level 2</th><th colspan="2">Nivå/Level 3</th></tr>'
		temptext = temptext + '<tr><td>AAA</td><td>NN</td><td>AA</td><td>NNN</td><td>AA</td><td>NN</td>'
		temptext = temptext + '<tr><td id="exempel" colspan="6">Exempel/Example</td>'
		temptext = temptext + '<tr><td>LAB</td><td>10</td><td>AA</td><td>202</td><td>KE</td><td>01</td>'
		temptext = temptext + '<tr><td>AS#</td><td>##</td><td>##</td><td>###</td><td>##</td><td>##</td>'
		temptext = temptext + '<tr><td>##</td><td>##</td><td>##</td><td>###</td><td>KE</td><td>10</td>'
		temptext = temptext + '<tr><td>LAB</td><td>10</td><td>AA</td><td>202</td><td>##</td><td>##</td>'

		temptext = temptext + "</table>";
	
		$("#helpShow").html(temptext);
		$("#helpShow").css("width", 300);
		$("#cross").css({position: "relative", left: "272px"});
		$("#helpShow").toggle( "fold" );
		
	}
	else if (jsonWord == "ssen")
	{
		temptext = temptext + "<table id='" + jsonWord + "HelpTable" + "' class='helpListKKS'>";

		temptext = temptext + '<tr><th colspan="3">Nivå/Level 1</th><th colspan="3">Nivå/Level 2</th><th colspan="2">Nivå/Level 3</th></tr>'
		temptext = temptext + '<tr><td>AA</td><td>NN</td><td>_</td><td>AA</td><td>NN</td><td>_</td><td>AA</td><td>NN</td>'
		temptext = temptext + '<tr><td id="exempel" colspan="8">Exempel/Example</td>'
		temptext = temptext + '<tr><td>HQ</td><td>20</td><td>_</td><td>HN</td><td>10</td><td>_</td><td>MA</td><td>01</td>'
		temptext = temptext + '<tr><td>CC</td><td>01</td><td>_</td><td>FL</td><td>10</td><td>_</td><td>##</td><td>##</td>'
		temptext = temptext + '<tr><td>FM</td><td>##</td><td>_</td><td>##</td><td>##</td><td>_</td><td>KE</td><td>10</td>'
		temptext = temptext + '<tr><td>##</td><td>##</td><td>_</td><td>##</td><td>##</td><td>_</td><td>##</td><td>##</td>'

		temptext = temptext + "</table>";
	
		$("#helpShow").html(temptext);
		$("#helpShow").css("width", 350);
		$("#cross").css({position: "relative", left: "322px"});
		$("#helpShow").toggle( "fold" );
	}
	else
	{
		temptext = temptext + "<table id='" + jsonWord + "HelpTable" + "' class='helpList'>";
		
		if (laguageSwitch == "en")				//Språkflaggan satt till engelska (en)
		{
			//kodtext = kodtext + "En"
			forklaringtext = forklaringtext + "En";
		};			
		
		$.each(partJson, function ()
		{
			if (listValue == "" && this[tempkod] != "")
			{
				temptext = temptext + '<tr><td width=6%>' + this[tempkod] + '</td><td width=34%><b>' + this[kodtext] + '</b></td><td>' + this[forklaringtext] + '</td></tr>';
			}
			else
			{ 
				if (this[searchField] == listValue)
				{
					temptext = temptext + '<tr><td width=6%>' + this[tempkod] + '</td><td width=34%><b>' + this[kodtext] + '</b></td><td>' + this[forklaringtext] + '</td></tr>';
				};	
			}
		});

		temptext = temptext + "</table>";
	
		$("#helpShow").html(temptext);
		$("#helpShow").css("width", 600);
		$("#cross").css({position: "relative", left: "572px"});
		$("#helpShow").toggle( "fold" );
		
		
		$('#' + jsonWord + "HelpTable").find('tr').click( function()
		{
			var valdKod = $(this).find('td:first').text();
			$('#' + jsonWord).val(valdKod).trigger('change');
			$("#helpShow").toggle( "fold" );
		});
	}
	
	
	$("#cross").click( function ()
	{
		$("#helpShow").toggle( "fold" );
	});	
}


function checkStatus ()
{
	var okFlag = "undefined";						// 1 = alla fält ok, 0 = något fält saknas
	var temptext;
	
	for (var i = 0; i < 25; i++)
	{
		if (typeof statusArray[i] !== "undefined")
		{
			if (statusArray[i] == "green")
			{
				okFlag = 1;
			}	
			else if (statusArray[i] == "red")
			{
				okFlag = 0;
				break;
			}
		}
	}
	
	temptext = "<img id='cross2' src='https://googledrive.com/host/0B9p21sv0NGWSSWRMaXAwQ0ZZamM'><br>";		//close.png
	
	if (okFlag == 0)
	{
		if (laguageSwitch == "en")
		{
			temptext = temptext + "The new file name is not complete. All parts needed are not filled in the form.<br><br><b>Do not use</b> this file name without further adjustment !!<br>  ";	
		} else {
			temptext = temptext + "Nya filnamnet är inte komplett. Alla delar som behövs är inte ifyllda i formuläret.<br><br>Använd <b>inte</b> detta filnamn utan vidare justering !!<br>  ";
		}
		$("#checkName").css("background-color", "#FF2626");
		$("#checkName").css("color", "white");
	}
	else if (okFlag == 1)
	{
		if (laguageSwitch == "en")
		{
			temptext = temptext + "All necessary parts are completed. OK to use the file name.<br />";	
		} else {
			temptext = temptext + "Alla delar som behövs är ifyllda. OK att använda filnamnet.<br />";
		}

		$("#checkName").css("background-color", "#94EBAE");
		$("#checkName").css("color", "black");	
	}
	
	$("#checkName").html(temptext);

	$("#cross2").css({position: "relative", left: "345px"});
	$("#cross2").css({marginBottom: "5px"});

	$("#checkName").toggle( "fold" );

	$("#cross2").click( function ()
	{
		$("#checkName").toggle( "fold" );

	});
}


//Används när man har valt verksamhet = AA -> Kommun och detaljblocks funktion istället
function fixAA(listPart, targetPart)
{
	if (codeSystem == "KKS")
	{
		//Här finns en delimiter i mellan jämför med nedan.
	}
	else
	{
		var temp1 = parseInt(listPart.slice(1)) + 1;
		var temp2 = temp1 + 1;
		var tempNr = parseInt(targetPart.slice(3));					//Tar reda på numret utifrån targetparten	
	}

	var tempLabel1 = 'labels' + temp1;
	var tempDots1 = 'dots' + temp1;
	var tempS1 = 's' + temp1;
	var tempDel1 = 'del' + (tempNr + 1);

	var tempLabel2 = 'labels' + temp2;
	var tempDots2 = 'dots' + temp2;
	var tempS2 = 's' + temp2;
	var tempDel2 = 'del' + (tempNr + 2);

	$('#' + tempLabel1).html("");
	$('#' + tempDots1).html("");
	$('#' + tempS1).html("");			
	$('#' + tempDel1).html("");
	statusArray[tempNr+1] = "undefined";

	$('#' + tempLabel2).html("");
	$('#' + tempDots2).html("");
	$('#' + tempS2).html("");			
	$('#' + tempDel2).html("");
	statusArray[tempNr+2] = "undefined";


	loadList(jsonName.anlaggning2, jsonName.oversatt, "anlaggning2", "Detaljruta", tempLabel1, tempDots1, "Y", tempS1, "kod", "anlaggning2", tempDel1);
	loadField("municipalityframe", jsonName.oversatt, "Kommunruta (4 siffror, 1-2256)", tempLabel2, tempDots2, "Y", tempS2, tempDel2,"", "", "R", "4", "4", "^(225[0-6]|22[0-4][0-9]|2[01][0-9][0-9]|1[0-9][0-9][0-9]|0[0-9][0-9][0-9])$", "4 siffror. Noll utfyllt framför t.ex. 0010." );
}


//Översätter till engelska
function translate(jsonWordTranslate, rubrik)
{
	var tempSvar;
	$.each(jsonWordTranslate, function ()
	{
		if (this['sv']  == rubrik)
		{
			tempSvar = this['en'];
		}
	})
	return tempSvar;
}


