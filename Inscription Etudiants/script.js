//EMAIL
function emailValide(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
//TEL
function telValide(tel) {
  const regex = /^06\d{8}$/;
  return regex.test(tel);//test fct returns boolean
}
//NOM
function nomPrenomValide(nom){
  return nom.length>1;
}
//FILIERE
function filiereValide(nom){
  return nom.length>2;
}
//AGE
function ageValide(date){

  const actualDate = new Date();
  const birthDate = new Date(date);
  let age= actualDate.getFullYear()-birthDate.getFullYear();
  const months= actualDate.getMonth()-birthDate.getMonth();
  
  if(months<0 || (months==0 && actualDate.getDate() < birthDate.getDate())){
    age--;
  }

  return age>17;
}

function nombreNoteValide(event){
  const notesDiv= document.getElementsByName("divNote");
  let nbrInput= notesDiv[0].querySelectorAll('input').length;
  if(nbrInput<4){
    return false;
  }
  return true;
}

function ajoutAuTableau(nom1, prenom1, dateNaissance1, filiere1, email1, tel1, note1, moyenne1){
  
  const tableau= document.getElementById("tableEtudiants");
  
  let newRow= tableau.insertRow();
  let cell1= newRow.insertCell();
  cell1.innerHTML= nom1;

  let cell2= newRow.insertCell();
  cell2.innerHTML= prenom1;

  let cell3= newRow.insertCell();
  cell3.innerHTML= dateNaissance1;

  let cell4= newRow.insertCell();
  cell4.innerHTML= filiere1;

  let cell5= newRow.insertCell();
  cell5.innerHTML= email1;

  let cell6= newRow.insertCell();
  cell6.innerHTML= tel1;

  let cell7= newRow.insertCell();
  cell7.innerHTML= "["+note1+"]";

  let cell8= newRow.insertCell();
  cell8.innerHTML= moyenne1;

  let cell9= newRow.insertCell();
  cell9.innerHTML= `<td>
  <button class="modifier">Modifier</button> <!-- Bouton Modifier -->
  <button class="supprimer">Supprimer</button> <!-- Bouton Supprimer -->
  </td>`;

  //à chaque fois il y a cr&ation de nouveaux boutons on les ajout ces events
  let modifierBoutons= document.querySelectorAll(".modifier");
  let lastModifierBtn= modifierBoutons[modifierBoutons.length-1];
  lastModifierBtn.addEventListener("click", chargerDansFormulaire);

  let supprimerBoutons= document.querySelectorAll(".supprimer");
  let lastSupprimerBtn= supprimerBoutons[supprimerBoutons.length-1];
  lastSupprimerBtn.addEventListener("click", supprimerEtudiant);
}

function noCopy(event){
  alert("Copier n'est pas autorisé. Merci pour votre Compréhension!");
  event.preventDefault();
  return;
}
function noPaste(event){
  //pour empêcher le comportement de copier/coller par défaut.
  event.preventDefault();
  alert("Coller n'est pas autorisé. Merci pour votre Compréhension!");
  
  return;
}
// En faisant cela, vous désactivez effectivement la fonctionnalité de copier-coller pour  
// tous les éléments de formulaire.
for(var elem of document.forms[0].elements){
  elem.addEventListener("copy", noCopy);
  elem.addEventListener("paste", noPaste);
}

//Pour éviter champ de note vide
function noteValide(input){
  const regex= /[0-9]/;
  return regex.test(input);
}

function calculerMoyenne(){
  const notesDiv= document.getElementsByName("divNote");
  let inputsPrecedents= notesDiv[0].querySelectorAll('input');
  let moyenne= 0;
  let somme= 0;
  let nombreNotes= 0;
  for(let elem of inputsPrecedents){
    let note= elem.value;
    if(noteValide(note)){
      somme= parseFloat(somme) + parseFloat(note);
      nombreNotes++;
    }else if(nombreNotes===0){
      //le cas où une seule note qui est saisie
      nombreNotes= 1;
    }
    moyenne= somme/nombreNotes;
  }
  //toFixed(2) pour avoir 2 chiffres après virgule
  formEtudiant.moyenne.value= moyenne.toFixed(2);
}

function nouvelleNote(event){
  event.preventDefault();
  const notesDiv= document.getElementsByName("divNote")[0];
  let inputsPrecedents= notesDiv.querySelectorAll('input');

  //VERIFIER SI LES CHAMPS SONT REMPLIS
  for(let elem of inputsPrecedents){
      if(!noteValide(elem.value)){
        alert("Merci de remplir les champs précédents avant d'ajouter une autre note!");
        return;//Pour sortir du tout et ne pas créer le nouveau champ
      }
  }

  let divSupprimer= document.createElement("div");
  divSupprimer.setAttribute("name", "myDivNote");
  let input= document.createElement("input");
  input.type= "number";
  input.name= "note";
  input.addEventListener("input", function(){
    calculerMoyenne();
  });

  let supprimerNoteBtn= document.createElement("button");
  supprimerNoteBtn.textContent= "x";
  supprimerNoteBtn.style.backgroundColor= "red";
  
  supprimerNoteBtn.addEventListener("click", function(){

    divSupprimer.remove();

    //MISE A JOUR DE LA MOYENNE
    calculerMoyenne();

  });

  divSupprimer.appendChild(input);
  divSupprimer.appendChild(supprimerNoteBtn);

  notesDiv.appendChild(divSupprimer);
  
  //MISE A JOUR DE LA MOYENNE
  calculerMoyenne();
}

const note= document.getElementById("ajouterNote");
note.addEventListener("click", nouvelleNote);
note.disabled= false;

//Créee les nouveaux champs de notes dans formulaire après le click sur bouton modifier
function nouvelleNoteApresModifier(){

  const notesDiv= document.getElementsByName("divNote")[0];
  let divSupprimer= document.createElement("div");
  divSupprimer.setAttribute("name", "myDivNote");
  let input= document.createElement("input");
  input.type= "number";
  input.name= "note";
  input.addEventListener("input", function(){
    calculerMoyenne();
  });
  
  let supprimerNoteBtn= document.createElement("button");
  supprimerNoteBtn.textContent= "x";
  supprimerNoteBtn.style.backgroundColor= "red";
      
  //on attribut à chaque bouton "supprimer" la fonctionnalité de supprission
  supprimerNoteBtn.addEventListener("click", function(){
    //supprission du divee qui contient le champ de la note et le bouton de suppression "x" correspondant à ce champ
    divSupprimer.remove();
  
    //MISE A JOUR DE LA MOYENNE
    calculerMoyenne();
  });

  //ajout du champ de note et son correspondant bouton de suppression "x" à un "div"
  divSupprimer.appendChild(input);
  divSupprimer.appendChild(supprimerNoteBtn);
  // ensuite on ajoute ce nouveau div au dive parent de nom "divNote" qui contient tous les champs de notes et "x"
  notesDiv.appendChild(divSupprimer);
    
  //MISE A JOUR DE LA MOYENNE
  calculerMoyenne();
}

var selectedRow;//représente la ligne sélectionée du tableau
function chargerDansFormulaire(event){

  event.preventDefault();
  // Lorsque le bouton "modifier" est cliqué, l'écouteur d'événement récupère la ligne la plus 
  // proche à l'aide de event.target.closest("tr")
  const row= event.target.closest("tr");
  selectedRow= row;

  let tableauNotesLigne = JSON.parse(row.cells[6].textContent);//pour transformer row.cells[6].textContent de String en array
  if(tableauNotesLigne.length<4){
    selectedRow= undefined;
    alert("Pour modifier l'étudiant, il doit avoir au moins 4 notes.");
    return;
  }
  //puis on récupère le contenu textuel de chaque cellule de la ligne à l'aide de row.cells[i].textContent.
  let nom= row.cells[0].textContent;
  let prenom = row.cells[1].textContent;
  let dateNaissance = row.cells[2].textContent;
  let filiere = row.cells[3].textContent;
  let email = row.cells[4].textContent;
  let tel = row.cells[5].textContent;    
  let moyenne = row.cells[7].textContent;
    
  let formNoteDivs= document.getElementsByName("myDivNote");

  //suppression des anciens inputs de notes
  for(let i=formNoteDivs.length-1; i>=0; i--){
    formNoteDivs[i].remove();
  }

  //Creation de nouveaux inputs pour notes
  //on soustrait 1 car par défaut on a toujour le 1er champs de note
  for(let i=0; i<tableauNotesLigne.length-1; i++){
    nouvelleNoteApresModifier();
  }

  //insertion des nouvelles valeurs à partir du tableau
  formEtudiant.nom.value= nom;
  formEtudiant.prenom.value= prenom;
  formEtudiant.dateNaissance.value= dateNaissance;
  formEtudiant.filiere.value= filiere;
  formEtudiant.email.value= email;
  formEtudiant.tel.value= tel;

  //ajout des notes dans les nouveaux champs  
  let nouveauxChamps= document.getElementsByName("note");
  for(let i=0; i<nouveauxChamps.length; i++){
    nouveauxChamps[i].value= tableauNotesLigne[i];
  }

  formEtudiant.moyenne.value= moyenne;
    
}

//On ajoute cet event au 1er bouton "modifier" qui existe par défaut dans le fichier html
let premierModifierBouton = document.querySelector(".modifier");
premierModifierBouton.addEventListener("click", chargerDansFormulaire);


function addStudent(event){
  
  event.preventDefault();
  const nom= formEtudiant.nom.value;
  const prenom= formEtudiant.prenom.value;
  const dateNaissance= formEtudiant.dateNaissance.value;
  const filiere= formEtudiant.filiere.value;
  const email= formEtudiant.email.value;
  const tel= formEtudiant.tel.value;
  const noteList= [];
  let notes= document.getElementsByName("note");
  for(let i=0; i<document.getElementsByName("note").length; i++){
    if(noteValide(notes[i].value)){
      noteList.push(notes[i].value);
    }
  }
  
  const moyenne= formEtudiant.moyenne.value;
  //validation des champs de formulaire
  if (!nomPrenomValide(nom)) {
    alert("Le nom n'est pas valide");
    return;
  } 
  if (!nomPrenomValide(prenom)) {
    alert("Le prenom n'est pas valide");
    return;
  } 
  if(!ageValide(dateNaissance)){
    alert("L'age n'est pas valide. Il est moins de 18 ans");
    return;
  }
  if (!filiereValide(filiere)) {
    alert("La filière n'est pas valide");
    return;
  }
  if (!emailValide(email)) {
    alert("L'adresse e-mail n'est pas valide");
    return;
  }
  if (!telValide(tel)) {
    alert("Le numéro de téléphone n'est pas valide");
    return;
  }
  
  if (!nombreNoteValide()) {
    alert("Le nombre de notes n'est pas valide. Au mois chaque étudiant doit avoir 4 notes!");
    return;
  }
  //ne peut pas atteindre ici si une entrée n'est pas valide en raison d'un return

  //si aucune ligne du tableau n'est pas sélectionnée lors du submit on va ajouter ces 
  // nouvelles données au tableau
  if(typeof selectedRow === "undefined" ){
    ajoutAuTableau(nom, prenom, dateNaissance, filiere, email, tel, noteList, moyenne);
  }else{
    // sinon on modifie la ligne sélectionnée du tableau
    selectedRow.cells[0].textContent= nom;
    selectedRow.cells[1].textContent= prenom;
    selectedRow.cells[2].textContent= dateNaissance;
    selectedRow.cells[3].textContent= filiere;
    selectedRow.cells[4].textContent= email;
    selectedRow.cells[5].textContent= tel;
    selectedRow.cells[6].textContent= "["+noteList+"]";
    selectedRow.cells[7].textContent= moyenne;
    selectedRow= undefined;//on remet "selectedRow" pour dire qu'aucune ligne n'est plus sélectionnée
  }
}
const form= document.getElementById("formEtudiant");
form.addEventListener("submit", addStudent);

//Suppression d'un étudiant à partir du tableau
function supprimerEtudiant(event){
  event.preventDefault();
  let choix= confirm("Voulez-vous vraiment supprimer cet étudiant ?");
  if(choix){
    // Lorsque le bouton "supprimer" est cliqué et l'utilisateur confirme son choix, l'écouteur d'événement 
    //récupère la ligne la plus proche à l'aide de event.target.closest("tr")
    let row= event.target.closest("tr");
    //puis suppression de cette ligne
    row.remove();
  }
  
}
//Ajout de cet event au premier bouton de suppression qu'on a par défaut dans le fichier html
let premierSupprimerBouton= document.getElementsByClassName("supprimer")[0];
premierSupprimerBouton.addEventListener("click", supprimerEtudiant);

