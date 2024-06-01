const sectionTitles = new Map([
    ['1_avertizare', 'Semne de avertizare'],
    ['2_interzicere', 'Semne de interzicere sau restrictie'],
    ['3_prioritate', 'Semne de prioritate'],
    ['4_obligare', 'Semne de obligare'],
    ['5_informare', 'Semne de informare'],
    ['6_orientare', 'Semne de orientare'],
    ['7_turistic', 'Semne de informare turistica'],
    ['8_semnale_luminoase', 'Semnale luminoase'],
    ['9_cale_ferata', 'Indicatoare instalate la trecerea cu calea ferata'],
    ['10_kilometrice', 'Indicatoare kilometrice'],
    ['11_semnalizare_lucrari', 'Mijloace auxiliare de semnalizare a lucrarilor'],
    ['12_benzi_reversibile', 'Dispozitive luminoase pentru dirijarea circulatiei pe benzi reversibile'],
    ['13_marcaje_longitudinale', 'Marcaje longitudinale'],
    ['14_marcaje_transversale', 'Marcaje transversale'],
    ['15_marcaje_diverse', 'Marcaje diverse'],
    ['16_marcaje_laterale', 'Marcaje laterale'],
    ['17_marcaje_temporare', 'Marcaje temporare pentru semnalizarea lucrarilor in zona drumului public'],
    ['18_indicatii_agenti', 'Semnalele politistului rutier']
]);

const getSectionTitle = (section) => {
    return sectionTitles.get(section) || 'Semne de circulatie';
}

module.exports = getSectionTitle;