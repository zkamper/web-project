function renderArticle(imageSources, imageTitles, imageDescriptions, pageTitle) {
    // Get the container element where the images will be appended
    let containerDiv = document.querySelector(".main-content");
    let imageContainerDiv = document.createElement("div");
    imageContainerDiv.classList.add("image-container");

    let mainTitleDiv = document.querySelector(".main-title");
    mainTitleDiv.textContent = pageTitle;

    for (let i = 0; i < imageSources.length; i++) {

        let imageWrapperDiv = document.createElement("div");
        imageWrapperDiv.classList.add("image-wrapper");

        let img = document.createElement("img");
        img.src = imageSources[i];
        img.alt = imageTitles[i]; // Set alt attribute to image title
        imageWrapperDiv.appendChild(img);

        let titleDiv = document.createElement("div");
        titleDiv.classList.add("image-title");
        titleDiv.textContent = imageTitles[i];
        imageWrapperDiv.appendChild(titleDiv);

        let descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("image-description");
        descriptionDiv.textContent = imageDescriptions[i];
        imageWrapperDiv.appendChild(descriptionDiv);

        imageContainerDiv.appendChild(imageWrapperDiv);
        containerDiv.appendChild(imageContainerDiv);
    }
}


let imageURLS =  [
    'https://www.codrutier.ro/storage/images/2627c2fe7f7552cbb5bbc881f6870d85.png',
    'https://www.codrutier.ro/storage/images/5c18a52a5dfa67132c2b9e14030e3281.png',
    'https://www.codrutier.ro/storage/images/211aac5a3112aca6960bc094f8dccf7a.png',
    'https://www.codrutier.ro/storage/images/5829d6807a2c035ea01cb067662b0671.png',
    'https://www.codrutier.ro/storage/images/f2f7231071a40127271a82663b9112e7.png',
    'https://www.codrutier.ro/storage/images/95d47f06d387c15c3620ddbd148d419f.png',
    'https://www.codrutier.ro/storage/images/fac20e68d1f4e9e9b9299bcaa08e0415.png',
    'https://www.codrutier.ro/storage/images/c35a973a2ec132163655142cd5f1b15e.png',
    'https://www.codrutier.ro/storage/images/2b0e70341da56a85e6819ec4744b2e9d.png',
    'https://www.codrutier.ro/storage/images/f24378bebb9b6dbcaf73a08fb9207500.png',
    'https://www.codrutier.ro/storage/images/8513197897db013ca6ed43e055794521.png',
    'https://www.codrutier.ro/storage/images/b4bc0e7b78ee754d9ac8ae242371c2b0.png',
    'https://www.codrutier.ro/storage/images/4a9c8a2d5bc65a9b7b03c5c3fced148a.png',
    'https://www.codrutier.ro/storage/images/22c47268541eb67d85d68a98827d8c50.png',
    'https://www.codrutier.ro/storage/images/1b4152cd5236b17e990dc364e6eae398.png',
    'https://www.codrutier.ro/storage/images/17f73815226867514c47a4e5709fb137.png',
    'https://www.codrutier.ro/storage/images/601bc9f693380a45c7588aa5cbcb8edf.png',
    'https://www.codrutier.ro/storage/images/2a0500eb6355fc0b1dbc946d05de31ba.png',
    'https://www.codrutier.ro/storage/images/71bd552f9f3e09a3f1e97f4cb99686d8.png',
    'https://www.codrutier.ro/storage/images/ae0ab6c83abf508459c4647c0ac050b8.png',
    'https://www.codrutier.ro/storage/images/4dffa600e6d258d1a968d67fe2409f11.png',
    'https://www.codrutier.ro/storage/images/450835ed1b92142e337642a13859b000.png',
    'https://www.codrutier.ro/storage/images/9092990d11d54e7098a4d7172faa1c3f.png',
    'https://www.codrutier.ro/storage/images/cb1f1d25d349236a248a8da27d30cb64.png',
    'https://www.codrutier.ro/storage/images/5e71b53a211d6887785fa084261b3222.png',
    'https://www.codrutier.ro/storage/images/286187b55fa530aefc5cf5aec9e00e56.png',
    'https://www.codrutier.ro/storage/images/f982c2a383f97a0eac807c8cf65b15d6.png',
    'https://www.codrutier.ro/storage/images/7df998cdc92144bef3c043e21e5bca82.png',
    'https://www.codrutier.ro/storage/images/7c82bcfc9d23f8ce97cc97e15b073f9e.png',
    'https://www.codrutier.ro/storage/images/a35f017cdda4cf9043b38b87953993ab.png',
    'https://www.codrutier.ro/storage/images/d76c8f58ac747dca6640b4fa02efda62.png',
    'https://www.codrutier.ro/storage/images/ff2073a26ecb4b0881a737b62dcb1759.png',
    'https://www.codrutier.ro/storage/images/4ed20e1a98afaae62ca751859a998a40.png',
    'https://www.codrutier.ro/storage/images/f4d9fd83ee3b1e96573b4c4e19181685.png',
    'https://www.codrutier.ro/storage/images/0446ec80b14fd948ac01c00caff1c6df.png',
    'https://www.codrutier.ro/storage/images/785dd134b3d76c1c7cffa2d3160768d3.png',
    'https://www.codrutier.ro/storage/images/8691e94bea2f0632cfee0d4a666a6b2d.png',
    'https://www.codrutier.ro/storage/images/bbaa610fb5462432ba42b4cfbaef0e8f.png',
    'https://www.codrutier.ro/storage/images/5bf8eb3a4c77841eb1d3f4fd5af2abb3.png',
    'https://www.codrutier.ro/storage/images/b058aa8ad88aedc3f08043acdaa0679e.png',
    'https://www.codrutier.ro/storage/images/39a8ac331eb3fedbb87819ba21a4dbad.png',
    'https://www.codrutier.ro/storage/images/674d275d65c90ddde2f9cbc31b742955.png',
    'https://www.codrutier.ro/storage/images/186f2d3a8cb9c528e935881f9a22ed2b.png',
    'https://www.codrutier.ro/storage/images/eff9833e39ce88344eefc2811f70d258.png',
    'https://www.codrutier.ro/storage/images/d0cdb95d102ce3d15b78a879f21dc989.png',
    'https://www.codrutier.ro/storage/images/ace706dc95c658df347e8faa307b3dcf.png',
    'https://www.codrutier.ro/storage/images/b697cc5e3d94521b0f50c12f5532871d.png',
    'https://www.codrutier.ro/storage/images/f4b6990867b66ee104cda5b6a7543af0.png',
    'https://www.codrutier.ro/storage/images/e18eef80e9c4cede91de999f5f9db42d.png',
    'https://www.codrutier.ro/storage/images/a81f87348ba3af6c1fc68ab04e7d813f.png',
  ];

  let titles =  [
    'Curbă la stânga',
    'Drum îngustat pe ambele părți',
    'Curbă la dreapta',
    'Curbă dublă',
    'Coborăre periculoasă',
    'Urcare cu înclinare mare',
    'Curbă dublă sau o succesiune de mai mult de două curbe, prima la dreapta',
    'Curbă deosebit de periculoasă',
    'Panouri succesive pentru curbe deosebit de periculoase',
    'Drum îngustat pe partea dreaptă',
    'Drum îngustat pe partea stângă',
    'Acostament periculos',
    'Drum aglomerat',
    'Tunel',
    'Pod mobil',
    'Ieșire spre un chei sau mal abrupt',
    'Drum cu denivelări',
    'Denivelare pentru limitarea vitezei',
    'Drum lunecos',
    'Împreșcare cu pietriș',
    'Căderi de pietre',
    'Presemnalizare trecere pietoni',
    'Copii',
    'Bicicliști',
    'Animale',
    'Animale',
    'Lucrări',
    'Semafoare',
    'Aeroport',
    'Vânt lateral',
    'Circulație în ambele sensuri',
    'Alte pericole',
    'Accident',
    'Intersecție de drumuri',
    'Intersecție cu drum fără prioritate',
    'Intersecție cu drum fără prioritate',
    'Intersecție cu drum fără prioritate',
    'Intersecție cu drum fără prioritate',
    'Presemnalizare intersecție cu sens giratoriu',
    'Trecere la nivel cu cale ferată cu bariere sau semibariere',
    'Trecere la nivel cu o cale ferată fără bariere',
    'Trecere la nivel cu linii de tramvai',
    'Mașini și utilaje agricole',
    'Presemnalizarea unei amenajări rutiere care permite întoarcerea vehiculului',
    'Baliză direcțională care indică ocolirea obstacolului prin partea stângă',
    'Baliză direcțională care indică ocolirea obstacolului prin partea dreaptă',
    'Baliză bidirecțională',
    'Panouri suplimentare pentru trecerea la nivel cu cale ferată',
    'Panouri suplimentare la nodurile rutiere de pe autostrăzi',
    'Trecere la nivel cu o cale ferată, fără bariere',
  ];

  let subtitles = [
    'Este amplasat la cel mult 200 m de o curba la stanga. Conducatorul trebuie sa circule cu viteza redusa in curbe, iar daca vizibilitatea este redusa sub 50 m., toate manevrele (depasirea, oprirea, stationarea, mersul inapoi, intoarcerea) sunt interzise.',
    'Se amplaseaza la 100-200 m de locul in care sectorul de drum incepe sa se ingusteze pe ambele parti cu cel putin jumatate de metru. La intalnirea acestui indicator, conducatorul auto poate preventiv sa reduca viteza, iar manevrele de oprire, stationare, mersul inapoi si intoarcerea sunt interzise. Depasirea este permisa.',
    'Este amplasat la cel mult 200 m de o curba la dreapta. Conducatorul trebuie sa circule cu viteza redusa in curbe, iar daca vizibilitatea este redusa sub 50 m., toate manevrele (depasirea, oprirea, stationarea, mersul inapoi, intoarcerea) sunt interzise. Este permisa depasirea in curbele cu vizibilitate.',
    'Se instaleaza atunci cand urmeaza o succesiune de curbe, daca distanta dintre acestea e mai mica de 250 m. Se amplaseaza la 100-200 m inaintea primei curbe. Aceste indicatoare pot fi insotite si de panouri aditionale, pe care este specificata distanta pana la terminarea sectorului de drum periculos, daca lungimea acestuia depaseste 1000 m. Conducatorul trebuie sa circule cu viteza redusa in curbe, iar daca vizibilitatea este redusa sub 50 m., toate manevrele (depasirea, oprirea, stationarea, mersul inapoi, intoarcerea) sunt interzise.',
    'Se amplaseaza la 100-200 m de inceputul sectorului de drum, cand panta depaseste 7%. Conducatorul auto nu este obligat sa reduca viteza, dar nu are voie sa stationeze pe toata lungimea pantei. Daca, in varful pantei, vizibilitatea este redusa sub 50 m, toate manevrele sunt interzise. Daca drumul nu este suficient de lat pentru a permite trecerea a doua vehicule unul pe langa celalalt, are prioritate cel care urca fata de cel care coboara.',
    'Se instaleaza la 100-200 m de inceputul sectorului de drum, cand panta depaseste 7%. Conducatorul auto nu este obligat sa reduca viteza, dar toate manevrele sunt interzise. Daca drumul nu este suficient de lat pentru a permite trecerea a doua vehicule unul pe langa celalalt, avand prioritate cel care urca fata de cel care coboara.',
    'Se instaleaza atunci cand urmeaza o succesiune de curbe, daca distanta dintre acestea e mai mica de 250 m. Se amplaseaza la 100-200 m inaintea primei curbe. Aceste indicatoare pot fi insotite si de panouri aditionale, pe care este specificata distanta pana la terminarea sectorului de drum periculos, daca lungimea acestuia depaseste 1000 m. Conducatorul trebuie sa circule cu viteza redusa in curbe, iar daca vizibilitatea este redusa, toate manevrele (depasirea, oprirea, stationarea, mersul inapoi, intoarcerea) sunt interzise.',
    'Acest indicator se monteaza in curbe cu raze mai mici de 100 m, sensul sagetilor indicand sensul virajului. Conducatorul trebuie sa circule cu viteza de max. 30 km/h in localitate si max. 50 km/h in afara localitatii, toate manevrele (depasirea, oprirea, stationarea, mersul inapoi, intoarcerea) fiind interzise.',
    'Se instaleaza cate 5 astfel de panouri in curbe cu raze mai mici de 100 m sau in curbe periculoase precedate de aliniamente mai lungi de 1000 m. Sunt amplasate in zona exterioara a curbelor, varful sagetilor indicand sensul virajului.',
    'Se amplaseaza la 100-200 m de locul in care sectorul de drum incepe sa se ingusteze pe ambele parti cu cel putin jumatate de metru. La intalnirea acestui indicator, conducatorul auto poate preventiv sa reduca viteza, iar manevrele de oprire, stationare, mersul inapoi si intoarcerea sunt interzise. Depasirea este permisa.',
    'Se amplaseaza la 100-200 m de locul in care sectorul de drum incepe sa se ingusteze pe ambele parti cu cel putin jumatate de metru. La intalnirea acestui indicator, conducatorul auto poate preventiv sa reduca viteza, iar manevrele de oprire, stationare, mersul inapoi si intoarcerea sunt interzise. Depasirea este permisa.',
    'Intoarcerea este interzisa (soliditatea drumului nu permite).',
    'La intalnirea acestui indicator, conducatorul auto este obligat sa pastreze o distanta de siguranta fata de vehiculul care se deplaseaza in fata sa. Se amplaseaza pe drumurile publice pe care traficul este intens.',
    'Se gaseste la 50-200 m de intrarea in tunel. In tunel, conducatorul auto preventiv, poate sa reduca viteza si toate manevrele (depasirea cu exceptia motocicletelor fara atas, vehiculelor fara motor si ciclomotoarelor, cand vizibilitatea este peste 20 m. iar latimea drumului mai mare de 7 m., oprirea, stationarea, mersul inapoi, intoarcerea) sunt interzise. In cazul imobilizarii in tunel, conducatorul auto este obligat sa opreasca motorul si sa semnalizeze prezenta autovehiculului.',     
    'Se amplaseaza la 100-200 m de podul mobil. Daca podul este ridicat, oprirea este obligatorie. Pe pod, sunt interzise toate manevrele (depasirea cu exceptia motocicletelor fara atas, vehiculelor fara motor si ciclomotoarelor, cand vizibilitatea este peste 20 m. iar latimea drumului mai mare de 7 m., oprirea, stationarea, mersul inapoi, intoarcerea).',
    'Se amplaseaza la 100-200 m de chei sau mal abrupt pentru a atentiona conducatorul auto ca, pe directia inainte, drumul se termina deasupra cheiului sau malului abrupt.',
    'Se amplaseaza la 50-200 m de locul periculos. Daca lungimea sectorului de drum depaseste 0,3 km, indicatorul este insotit de un panou aditional pe care este specificata lungimea sectorului de drum cu denivelari. La intalnirea acestui indicator conducatorii auto sunt obligati sa reduca viteza la max. 30 km/h in localitate si max. 50 km/h in afara localitatii.',
    'Denivelare pentru limitarea vitezei',
    'Se afla montat la 100-200 m de sectorul periculos. Conducatorului auto ii este recomandat sa reduca viteza, sa circule cu atentie sporita, sa nu bruscheze volanul si comenzile autovehiculului, si sa evite folosirea franelor. Daca drumul este acoperit cu polei, zapada batatorita, mazga sau piatra cubica umeda, conducatorul auto este obligat sa reduca viteza la max. 30 km/h in localitate si max. 50 km/h in afara localitatii.',
    'Se amplaseaza la 100-200 m de sectorul de drum periculos. Poate fi insotit de indicatorul "Interzis autovehiculelor de a circula fara a mentine intre ele un interval de cel putin ... m", deoarece exista riscul ca pietrisul de pe partea carosabila sa fie aruncat de rotile vehiculului catre ceilalti participanti la trafic. La intalnirea acestui indicator, conducatorului auto ii este recomandat preventiv sa reduca viteza si sa pastreze o distanta fata de vehiculul care circula in fata sa.',  'Este instalat la 100-200 m de locul periculos. Poate fi insotit de un panou aditional pe care este inscriptionata lungimea sectorului de drum periculos, daca acesta depaseste 300 m. Conducatorului auto ii este recomandat preventiv sa reduca viteza si sa circule cu atentie sporita.',
    'Se instaleaza la 50-200 m de o trecere de pietoni, pe drumurile intens circulate, pe sectoarele de drum unde vizibilitatea este redusa sau in afara localitatilor. Conducatorului auto ii este recomandat preventiv sa reduca viteza si sa circule cu atentie sporita. Acest indicator nu se instaleaza cand locul amplasarii sale coincide cu locul amplasarii indicatorului "Copii".',
    'Conducatorii auto intalnesc acest indicator pe sectoarele de drum frecvent circulate de copii (aflate in imediata apropiere a gradinitelor, scolilor si a locurilor de joaca). Conducatorul este obligat sa reduca viteza sub 30 km/h in localitati, respectiv sub 50 km/k in afara localitatilor in intervalul ora 0700-2200 si sa circule cu atentie sporita. Pe drumurile cu circulatie in ambele sensuri prevazute cu o singura banda pe sens, pe distanta cuprinsa intre aceste indicatoare aferente celor doua sensuri, marcajul de separare a sensurilor este cu linie continua.',
    'Se amplaseaza la 100-200 m de locul in care drumul public se intersecteaza cu o pista pentru biciclisti. La intalnirea acestui indicator, conducatorului auto ii este recomandat preventiv sa reduca viteza.',
    'Se amplaseaza la 100-200 m de sectorul de drum periculos, unde exista riscul ca animalele sa traverseze sau sa circule pe drumul public. La intalnirea acestui indicator, conducatorul auto este obligat sa reduca viteza si sa circule cu atentie sporita. La trecerea pe langa animale care sunt conduse pe partea carosabila sau pe acostament, conducatorul auto este obligat sa reduca viteza la max. 30 km/h in localitate si max. 50 km/h in afara localitatii.',
    'Se amplaseaza la 100-200 m de sectorul de drum periculos, unde exista riscul ca animalele sa traverseze sau sa circule pe drumul public. La intalnirea acestui indicator, conducatorul auto este obligat sa reduca viteza si sa circule cu atentie sporita. La trecerea pe langa animale care sunt conduse pe partea carosabila sau pe acostament, conducatorul auto este obligat sa reduca viteza la max. 30 km/h in localitate si max. 50 km/h in afara localitatii.',
    'Se instaleaza la 20-200 m de sectorul de drum pe care se executa lucrari. Fondul de culoare galbena semnifica caracterul temporar al lucrarii. La intalnirea acestui indicator, conducatorului auto ii este recomandat preventiv sa reduca viteza.',
    'Se instaleaza la 30-200 m de locul in care se afla semaforul, daca se considera ca prezenta semaforului ar putea surprinde conducatorii auto.',
    'Se amplaseaza pe drumurile publice ce trec pe sub culoarele aeriene din apropierea aeroporturilor, pentru a atentiona conducatorul auto de zgomotul puternic sau de zborurile la joasa inaltime a avioanelor.',
    'Este amplaseaza in locurile unde exista frecvent curenti puternici de aer care pot afecta circulatia rutiera. Conducatorii auto trebuie sa fie atenti la trecerea pe langa un autovehicul cu gabarit mare deoarece se poate forma fenomenul de absorbtie.',
    'Este intalnit la iesirea de pe un drum public cu sens unic. Are rolul de a atentiona conducatorul auto ca pe sectorul de drum urmator se va circula in ambele sensuri.',
    'Se amplaseaza cu 50-200 m inaintea locului periculos, in orice situatie periculoasa care nu este prevazuta cu un indicator de avertizare specific. La intalnirea acestui indicator, conducatorului auto ii este recomandat preventiv sa reduca viteza si sa circule cu atentie sporita.',
    'Este un indicator care modifica regimul normal de desfasurare a circulatiei. Conducatorul auto este obligat sa reduca viteza la max. 30 km/h in localitate, respectiv max. 50 km/h in afara localitatii.',
    'Este amplasat numai in afara localitatilor, la 50-200 m inaintea unei intersectii nedirijate de drumuri din aceeasi categorie. In aceasta intersectie se aplica regula prioritatii de dreapta iar conducatorul auto este obligat sa reduca viteza la max. 30 km/h in localitate, respectiv max. 50 km/h in afara localitatii.',
    'Se instaleaza in afara localitatilor, pe drumurile cu prioritate, la 100-200 m de intersectia cu un drum fara prioritate si are rolul de a confirma prioritatea celui care intalneste acest indicator.',
    'Se instaleaza in afara localitatilor, pe drumurile cu prioritate, la 100-200 m de intersectia cu un drum fara prioritate si are rolul de a confirma prioritatea celui care intalneste acest indicator.',
    'Se instaleaza in afara localitatilor, pe drumurile cu prioritate, la 100-200 m de intersectia cu un drum fara prioritate si are rolul de a confirma prioritatea celui care intalneste acest indicator.',
    'Se instaleaza in afara localitatilor, pe drumurile cu prioritate, la 100-200 m de intersectia cu un drum fara prioritate si are rolul de a confirma prioritatea celui care intalneste acest indicator.',
    'Se amplaseaza cu 50-200 m inaintea intersectiilor cu sens giratoriu. La intalnirea acestui indicator, conducatorul auto este obligat sa reduca viteza.',
    'Se amplaseaza la 50 m (in localitate)/ 150 m (in afara localitatilor) inainte de trecerea la nivel cu o cale ferata cu bariere sau semibariere. Conducatorul auto este obligat sa reduca viteza la intalnirea acestui indicator (la mai putin de 50 m). In localitate, amplasarea indicatorului se va face pe acelasi stalp cu panoul suplimentar cu o dunga rosie oblica, iar in afara localitatii pe panoul suplimentar cu trei dungi rosii oblice.',
    'Se amplaseaza la 50 m (in localitate) / 150 m (in afara localitatilor) inainte de trecerea la nivel cu o cale ferata fara bariere. La intalnirea acestui indicator, conducatorul auto este obligat sa opreasca pentru a se asigura, inainte de a traversa calea ferata.',
    'Se amplaseaza cu 50-200 m inaintea intersectiilor in care tramvaiele urmeaza sa vireze la dreapta ori la stanga. La intalnirea acestui indicator, conducatorul auto este obligat sa reduca viteza si sa acorde prioritate tramvaiului.',
    'Mașini și utilaje agricole',
    'Presemnalizarea unei amenajări rutiere care permite întoarcerea vehiculului',
    'Avertizeaza conducatorul de vehicul ca obstacolul intalnit se va ocoli pe partea stanga.',      
    'Avertizeaza conducatorul de vehicul ca obstacolul intalnit se va ocoli pe partea dreapta.',     
    'Avertizeaza conducatorul de vehicul ca va intalni obstacole pe drumul public, care pot fi ocolite pe ambele parti (stanga sau dreapta).',
    'Sunt montate inaintea trecerii la nivel cu calea ferata. Primul panou (cel cu trei dungi) se monteaza la 150 m de calea ferata, al doilea (cel cu doua dungi) - la 100 m, iar ultimul (cel cu o singura dubga) - la 50 m de calea ferata. La intalnirea indicatorului cu trei dungi, conducatorul auto preventiv, trebuie sa reduca viteza. La intalnirea ultimului indicator, cel cu o singura dunga, conducatorul auto nu mai are voie sa execute nicio manevra (depasirea, oprirea, stationarea, mersul inapoi, intoarcerea). In localitate, din cauza conditiilor de trafic, nu se instaleaza decat cel de-al treilea panou.',
    'Se monteaza la 300 m (primul panou), 200 m (al doilea panou) si la 100 m (al treilea panou) de urmatoare bifurcatie de pe o autostrada. Fiecare linie alba inseamna 100 m.',
    'Amplasat la 6-10 m de trecerea la nivel cu o cale ferata simpla, fara bariere indicatorul obliga conducatorul de vehicul sa opreasca in locul cu vizibilitate maxima, dar fara a depasi acest indicator, pentru a se asigura ca nu se apropie niciun tren.',
    ];

let pageTitle = "Indicatoare rutiere de avertizare";
renderArticle(imageURLS, titles, subtitles, pageTitle);