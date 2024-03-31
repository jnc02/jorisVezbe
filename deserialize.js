function popuniFormu() {
    // Dohvatanje JSON stringa iz textarea elementa
    let textarea = document.getElementById('ispis');
    let jsonString = textarea.value;

    // Deserijalizacija JSON stringa u JavaScript objekat
    let podaci;
    try {
        podaci = JSON.parse(jsonString);
    } catch (error) {
        // Ukoliko neuspesno parsiranje, ispisati grešku ispod textarea elementa
        let greskaElement = document.createElement('span');
        greskaElement.textContent = "Greška pri parsiranju JSON-a.";
        greskaElement.style.color = 'red';
        textarea.insertAdjacentElement('afterend', greskaElement);
        return;
    }

    // Provera da li su svi potrebni podaci prisutni u objektu
    let potrebniPodaci = ['ocena', 'datumIzlaska', 'brojIndeksa', 'rok', 'redniBrojIzlaska', 'polozen'];
    let nedostajuciPodaci = potrebniPodaci.filter(podatak => !podaci.hasOwnProperty(podatak));
    if (nedostajuciPodaci.length > 0) {
        // Ako neki od podataka nedostaje, ispisati grešku ispod textarea elementa
        let greskaElement = document.createElement('span');
        greskaElement.textContent = "Nedostajući podaci: " + nedostajuciPodaci.join(', ');
        greskaElement.style.color = 'red';
        textarea.insertAdjacentElement('afterend', greskaElement);
        return;
    }

    // Popunjavanje polja forme sa odgovarajućim podacima
    document.querySelector("[name = ocena]").value = podaci.ocena;
    document.querySelector("[name = datum]").value = podaci.datumIzlaska;
    document.querySelector("[name = broj-indexa]").value = podaci.brojIndeksa;
    document.querySelector("[name = rok][value='" + podaci.rok + "']").checked = true;
    document.querySelector("[name = br-izlaska-na-ispit]").value = podaci.redniBrojIzlaska;
    document.querySelector("[name = polozio]").checked = podaci.polozen;
}



document.addEventListener('DOMContentLoaded', function() {
    // Dohvatanje reference na dugme 'Ucitaj'
    let dugmeUcitaj = document.getElementById('ucitaj');

    // Dodavanje event listener-a za klik na dugme 'Ucitaj'
    dugmeUcitaj.addEventListener('click', function() {
        // Pozivanje funkcije popuniFormu()
        popuniFormu();
    });
});