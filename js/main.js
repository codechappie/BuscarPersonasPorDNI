const key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InZlaGVuYWsxMzFAbWFpbHJ1bm5lci5uZXQifQ.0jrPOYk0vLIA3Z2UXbkKdtGC3RXHUrdpKxD7D-cGDFQ";
const simpleForm = document.getElementById("simpleForm");
let fatherSurname = document.getElementById("fatherSureName");
let motherSurname = document.getElementById("motherSurName");
let name = document.getElementById("name");
let dniNumber = document.querySelectorAll(".dniNumber");
let newDni;

simpleForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    newDni = document.getElementById("newDni").value;
    consultingNewPersonPerDNI(newDni);
    console.log(newDni)
});

window.onload = ()=>{
    noneData();
};
    

function consultingNewPersonPerDNI(newDni){
    console.log(newDni)
    const url = `https://dniruc.apisperu.com/api/v1/dni/${newDni}?token=${key}`; 
    fetch(url)
    .then((response)=>{
        if(response.ok){
            return response.json();
        }else{
            console.log("error")
        }
    }).then((data)=>{
        dniNumber.forEach( dni => {
            dni.innerHTML=data.dni;
        });
        fatherSurname.innerHTML=data.apellidoPaterno;
        motherSurname.innerHTML=data.apellidoMaterno;
        name.innerHTML=data.nombres;
        alert(`Se encontró a ${data.nombres}`);
    }).catch((err)=>{
        alert("Vaya ocurrio un error :( ");
        noneData();
    });
}

function noneData(){
    dniNumber.forEach( dni => {
        dni.innerHTML="---------";
    });
    fatherSurname.innerHTML="----------";
    motherSurname.innerHTML="----------";
    name.innerHTML="-------";
}