
class ObjSeccioFrontendProductes {

    constructor () {
    }

    async iniciaSeccio () {
        let refLoading = document.getElementById('productesLoading'),
            refContinguts = document.getElementById('productesContinguts'),
            objRebut = null,
            valor = null,
            imatges=[],
            codiHTML = '',
            cntProducte = 0

        // Amaguem els continguts actuals i mostrem la càrrega
        refContinguts.style.display = 'none'
        refLoading.style.display = 'flex'

        // Demanem el llistat de productes al servidor
        objRebut = await promiseCallServer('POST', '/call/llistatProductes', {})
        console.log (objRebut)
        // Transformem l'objecte rebut en codi HTML

        if (objRebut.resultat === 'ok') {
            for (cntProducte = 0; cntProducte < objRebut.missatge.length; cntProducte = cntProducte + 1) {
                valor = objRebut.missatge[cntProducte]
                console.log(valor.imatge)
                imatges=JSON.parse(valor.imatge)
                codiHTML=codiHTML + '<div class= "productes">'
                codiHTML = codiHTML + '<div class="tituloproductes">' + valor.nom +'</div>'
                codiHTML = codiHTML + '<div class="imagenesproducte">'
                codiHTML = codiHTML + '<div class="flechaimagenes" onclick="seccioFrontendProductes.canviimatge(\'izquierda\','+cntProducte+')">&lt;</div>'
                codiHTML = codiHTML + '<img id="p'+cntProducte+'i0" src="' + imatges[0] + '" width="400" height="200" onclick=\'navegacio.canviaSeccio("frontendProducte&' + cntProducte + '")\'/>'
                codiHTML = codiHTML + '<img id="p'+cntProducte+'i1" src="' + imatges[1] + '" class="none" width="400" height="200" onclick=\'navegacio.canviaSeccio("frontendProducte&' + cntProducte + '")\'/>'
                codiHTML = codiHTML + '<img id="p'+cntProducte+'i2" src="' + imatges[2] + '" class="none" width="400" height="200" onclick=\'navegacio.canviaSeccio("frontendProducte&' + cntProducte + '")\'/>'
                codiHTML = codiHTML + '<div class="flechaimagenes" onclick="seccioFrontendProductes.canviimatge(\'derecha\','+cntProducte+')">&gt;</div>'
                codiHTML = codiHTML + '</div>'               
                codiHTML = codiHTML + '<div>' + valor.descripcio +'</div>'
                codiHTML = codiHTML + '<div>' + valor.preu +' €</div>'
                codiHTML = codiHTML + '</div>'
            }
        }

        // Amaguem la càrrega i mostrem el llistat de productes
        refContinguts.innerHTML = codiHTML
        refContinguts.style.display = 'flex'
        refLoading.style.display = 'none'
    }
    canviimatge(direccio,producte){
        let ref0=document.getElementById('p'+producte+'i0'),
        ref1=document.getElementById('p'+producte+'i1'),
        ref2=document.getElementById('p'+producte+'i2'),
        sty0=window.getComputedStyle(ref0,''),
        sty1=window.getComputedStyle(ref1,''),
        sty2=window.getComputedStyle(ref2,''),
        dis0=sty0.getPropertyValue('display'),
        dis1=sty1.getPropertyValue('display'),
        dis2=sty2.getPropertyValue('display'),
        img=-1
        if(dis0!='none') {
            img=0
            ref0.style.display='none'
        }
        if(dis1!='none')  {
            img=1
            ref1.style.display='none'
        }
        if(dis2!='none')  {
            img=2
            ref2.style.display='none'
        }

        if(direccio=='izquierda'){
            if(img==0) img=2
            else if(img==1) img=0
            else if(img==2) img=1
        }
        if(direccio=='derecha'){
            if(img==0) img=1
            else if(img==1) img=2
            else if(img==2) img=0
        }
        if(img==0) ref0.style.display='flex'
        if(img==1) ref1.style.display='flex'
        if(img==2) ref2.style.display='flex'
    }
}