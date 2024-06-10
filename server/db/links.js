
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
        name: '1_avertizare',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-avertizare'
    },
    {
        name: '2_interzicere',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-interzicere-sau-restrictie'
    },
    {
        name: '3_prioritate',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-prioritate'
    },
    {
        name: '4_obligare',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-obligare'
    },
    {
        name: '5_informare',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-informare'
    },
    {
        name: '6_orientare',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-orientare'
    },
    {
        name: '7_turistic',
        url: 'https://www.codrutier.ro/semne-de-circulatie/de-informare-turistica'
    },
    {
        name: '8_semnale_luminoase',
        url: 'https://www.codrutier.ro/semne-de-circulatie/semnale-luminoase'
    },
    {
        name: '9_cale_ferata',
        url: 'https://www.codrutier.ro/semne-de-circulatie/indicatoare-instalate-la-trecerea-cu-calea-ferata'
    },
    {
        name: '10_kilometrice',
        url: 'https://www.codrutier.ro/semne-de-circulatie/indicatoare-kilometrice'
    },
    {
        name: '11_semnalizare_lucrari',
        url: 'https://www.codrutier.ro/semne-de-circulatie/mijloace-auxiliare-de-semnalizare-a-lucrarilor'
    },
    {
        name: '12_benzi_reversibile',
        url: 'https://www.codrutier.ro/semne-de-circulatie/dispozitive-luminoase-pentru-dirijarea-circulatiei-pe-benzi-reversibile'
    },
    {
        name: '13_marcaje_longitudinale',
        url: 'https://www.codrutier.ro/semne-de-circulatie/marcaje-longitudinale'
    },
    {
        name: '14_marcaje_transversale',
        url: 'https://www.codrutier.ro/semne-de-circulatie/marcaje-transversale'
    },
    {
        name: '15_marcaje_diverse',
        url: 'https://www.codrutier.ro/semne-de-circulatie/marcaje-diverse'
    },
    {
        name: '16_marcaje_laterale',
        url: 'https://www.codrutier.ro/semne-de-circulatie/marcaje-laterale'
    },
    {
        name: '17_marcaje_temporare',
        url: 'https://www.codrutier.ro/semne-de-circulatie/marcaje-temporare-pentru-semnalizarea-lucrarilor-in-zona-drumului-public'
    },
    {
        name: '18_indicatii_agenti',
        url: 'https://www.codrutier.ro/semne-de-circulatie/semnalele-politistului-rutier'
    }
]

const START_LINK = 'https://www.scoalarutiera.ro/intrebari-posibile-drpciv-categoria-b/1151/ce-indica-semnalul-agentului-de-circulatie'

module.exports = {
    TO_SCRAPE_LAW,
    TO_SCRAPE_IMG,
    START_LINK
}