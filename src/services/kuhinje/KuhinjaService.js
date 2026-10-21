import { kuhinje } from "./KuhinjaPodaci";

// 1/4 Read od CRUD
async function get(){
    return {data: [...kuhinje]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra){
    return {data: kuhinje.find(s => s.sifra === parseInt(sifra))}    
}


// 2/4 Create od CRUD
async function dodaj(kuhinja){
    if(kuhinje.length===0){
        kuhinja.sifra = 1
    }else{
        kuhinja.sifra = kuhinje[kuhinje.length-1].sifra + 1
    }
    kuhinje.push(kuhinja)
}

// 3/4 Update od CRUD
async function promijeni(sifra,kuhinja){
    const index = nadiIndex(sifra)
    kuhinje[index] = {...kuhinje[index], ...kuhinja}
}

// ne moraju sve funkcije biti dostupne izvana
function nadiIndex(sifra){
    return kuhinje.findIndex(s => s.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra){
    const index = nadiIndex(sifra)
    kuhinje.splice(index,1)
}

export default{
    get,
    dodaj,
    getBySifra,
    promijeni,
    obrisi
}