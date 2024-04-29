
const TO_SCRAPE_LAW = [
    {
        name: "capitolul_1",
        url: "https://www.codrutier.ro/codul-rutier/1-dispozitii-generale"
    },
    {
        name: "capitolul_2",
        url: "https://www.codrutier.ro/codul-rutier/2-vehiculele"
    },
    {
        name: "capitolul_3",
        url: "https://www.codrutier.ro/codul-rutier/3-conducatorii-de-vehicule"
    },
    {
        name: "capitolul_4",
        url: "https://www.codrutier.ro/codul-rutier/4-semnalizarea-rutiera"
    },
    {
        name: "capitolul_5",
        url: "https://www.codrutier.ro/codul-rutier/5-reguli-de-circulatie"
    },
    {
        name: "capitolul_6",
        url: "https://www.codrutier.ro/codul-rutier/6-infractiuni-si-pedepse"
    },
    {
        name: "capitolul_7",
        url: "https://www.codrutier.ro/codul-rutier/7-raspunderea-contraventionala"
    },
    {
        name: "capitolul_8",
        url: "https://www.codrutier.ro/codul-rutier/8-cai-de-atac-impotriva-procesului-verbal"
    },
    {
        name: "capitolul_9",
        url: "https://www.codrutier.ro/codul-rutier/9-atributii-ale-unor-ministere"
    },
    {
        name: "capitolul_10",
        url: "https://www.codrutier.ro/codul-rutier/dispozitii-finale"

    }
]

const TO_SCRAPE_IMG = [
    {
        name: '1-avertizare',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-avertizare'
    },
    {
        name: '2-interzicere',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-interzicere-sau-restrictie'
    },
    {
        name: '3-prioritate',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-prioritate'
    },
    {
        name: '4-obligare',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-obligare'
    },
    {
        name: '5-informare',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-informare'
    },
    {
        name: '6-orientare',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-orientare'
    },
    {
        name: '7-turistic',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-informare-turistica'
    },
    {
        name: '8-semnale-luminoase',
        url: 'https://www.codrutier.ro/semne-de-circulatie/semnale-luminoase'
    },
    {
        name: '9-cale-ferata',
        url: 'https://www.codrutier.ro/semne-de-circulatie/indicatoare-instalate-la-trecerea-cu-calea-ferata'
    },
    {
        name: '10-kilometrice',
        url: 'https://www.codrutier.ro/semne-de-circulatie/indicatoare-kilometrice'
    },
    {
        name: '11-semnalizare-lucrari',
        url: 'https://www.codrutier.ro/semne-de-circulatie/mijloace-auxiliare-de-semnalizare-a-lucrarilor'
    },
    {
        name: '12-benzi-reversibile',
        url: 'https://www.codrutier.ro/semne-de-circulatie/dispozitive-luminoase-pentru-dirijarea-circulatiei-pe-benzi-reversibile'
    },
    {
        name: '13-marcaje-longitudinale',
        url: 'https://www.codrutier.ro/semne-de-circulatie/marcaje-longitudinale'
    },
    {
        name: '14-marcaje-transversale',
        url: 'https://www.codrutier.ro/semne-de-circulatie/marcaje-transversale'
    },
    {
        name: '15-marcaje-diverse',
        url: 'https://www.codrutier.ro/semne-de-circulatie/marcaje-diverse'
    },
    {
        name: '16-marcaje-laterale',
        url: 'https://www.codrutier.ro/semne-de-circulatie/marcaje-laterale'
    },
    {
        name: '17-marcaje-temporare',
        url: 'https://www.codrutier.ro/semne-de-circulatie/marcaje-temporare-pentru-semnalizarea-lucrarilor-in-zona-drumului-public'
    },
    {
        name: '18-indicatii-agenti',
        url: 'https://www.codrutier.ro/semne-de-circulatie/semnalele-politistului-rutier'
    }
]

module.exports = {
    TO_SCRAPE_LAW,
    TO_SCRAPE_IMG
}