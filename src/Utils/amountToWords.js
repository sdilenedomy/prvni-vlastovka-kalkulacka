/**
 * Převod čísel 1-9 na string podle řádu následujícího čísla
 * @param {number} cislo
 * @param {number} rad
 * @return {string}
 */

function jednotkySlovne(cislo, rad) {
  const cislice = ['', 'jedna', 'dva', 'tři', 'čtyři', 'pět', 'šest', 'sedm', 'osm', 'devět'];

  // Dvojka se skloňuje: dva, dvě stě, dva tisíce, dva milióny, dvě miliardy
  const radyKdeSeSklonujeDvojka = [3, 5, 7, 9];
  if (radyKdeSeSklonujeDvojka.includes(rad)) {
    cislice[2] = 'dvě';
  }

  // Číslovka „jedna“ se při řádech tisíc, milión,... nepíše
  if (rad !== 0) {
    cislice[1] = '';
  }

  return (cislice[cislo]);
}

/**
 * Převod čísel 10-99 na string
 * @param {number} jednotky
 * @param {number} desitky
 * @return {string}
 */
function desitkySlovne(jednotky, desitky) {
  const desetAzDevatenact = ['deset', 'jedenáct', 'dvanáct', 'třináct', 'čtrnáct', 'patnáct', 'šestnáct', 'sedmnáct', 'osmnáct', 'devatenáct'];

  let desitkaSlovem = '';

  if (desitky === 1) {
    return (desetAzDevatenact[jednotky]);
  }

  if (desitky > 1 && desitky < 5) {
    desitkaSlovem = `${jednotkySlovne(desitky, 0)}cet`;
  } else if (desitky === 5) {
    desitkaSlovem = 'padesát';
  } else if (desitky === 6) {
    desitkaSlovem = 'šedesát';
  } else if (desitky === 7 || desitky === 8) {
    desitkaSlovem = `${jednotkySlovne(desitky, 0)}desát`;
  } else {
    desitkaSlovem = 'devadesát';
  }

  return `${desitkaSlovem}${jednotkySlovne(jednotky, 0)}`;
}

/**
 * Převod čísel 1-999 na string podle řádu následujícího čísla
 * @param {number} cislo
 * @param {number} rad
 * @return {string}
 */
function stovkySlovne(cislo, rad) {
  // Z čísla dostaneme číslice na místě jednotek
  const jednotky = cislo % 10;
  // a desítek
  const desitky = Math.trunc(cislo / 10) % 10;
  // a stovek
  const stovky = Math.trunc(cislo / 100) % 10;

  let jednotkyDesitkySlovem = '';

  // Nejdřív převedeme na text jednotky a desítky (číslo 0 až 99)
  if (desitky === 0) {
    // Jen jednotky
    if (stovky === 0) {
      // Celá trojice je číslo 0 až 9, skloňujeme tedy podle řádu
      jednotkyDesitkySlovem = jednotkySlovne(jednotky, rad);
    } else {
      // Je to složené číslo, číslovka 1 a 2 se tedy neskloňuje (základní tvar je pro řád 0)
      jednotkyDesitkySlovem = jednotkySlovne(jednotky, 0);
    }
  } else {
    // Je to číslo od 10 do 99
    jednotkyDesitkySlovem = desitkySlovne(jednotky, desitky);
  }

  // Teď k převedenému dvojcifernému číslu přidáme stovky
  const stovkyPredpona = jednotkySlovne(stovky, 3);
  let stovkyPripona = '';
  if (stovky === 1) {
    stovkyPripona = 'sto';
  } else if (stovky === 2) {
    stovkyPripona = 'stě';
  } else if (stovky === 3 || stovky === 4) {
    stovkyPripona = 'sta';
  } else if (stovky > 4 && stovky < 10) {
    stovkyPripona = 'set';
  }
  const stovkySlovem = stovky === 0 ? '' : `${stovkyPredpona}${stovkyPripona}`;
  return jednotkyDesitkySlovem === '' ? stovkySlovem : `${stovkySlovem}${jednotkyDesitkySlovem}`;
}

/**
 * Zjištení přípony řádu
 * @param {number} cislo
 * @param {number} rad
 * @return {string}
 */
function radSlovne(cislo, rad) {
  let slovne = '';
  let predpona = '';

  if (rad === 1) {
    if (cislo === 2 || cislo === 3 || cislo === 4) {
      predpona = 'tisíce';
    } else {
      predpona = 'tisíc';
    }
  } else if (rad === 2 || rad === 3) {
    predpona = 'mi';
  } else if (rad === 4 || rad === 5) {
    predpona = 'bi';
  } else if (rad === 6 || rad === 7) {
    predpona = 'tri';
  } else if (rad === 8 || rad === 9) {
    predpona = 'kvadri';
  }

  if (rad === 1) { // tisíce
    if (cislo !== 0) {
      slovne = predpona;
    }
  } else if (rad % 2 === 0) { // „lióny“ - milión, bilióny, trilióny
    if (cislo === 0) {
      slovne = '';
    } else if (cislo === 1) {
      slovne = `${predpona}lion`;
    } else if (cislo === 2 || cislo === 3 || cislo === 4) {
      slovne = `${predpona}liony`;
    } else {
      slovne = `${predpona}lionů`;
    }
  } else { // „liardy“ - miliarda, biliardy, triliarda
    // eslint-disable-next-line no-lonely-if
    if (cislo === 0) {
      slovne = '';
    } else if (cislo === 1) {
      slovne = `${predpona}liarda`;
    } else if (cislo === 2 || cislo === 3 || cislo === 4) {
      slovne = `${predpona}liardy`;
    } else {
      slovne = `${predpona}liard`;
    }
  }

  return slovne;
}

/**
 * Vyskloňuje koruny: 1 koruna; 2-4 koruny; 0, 5, 6, ... korun
 * @param {number} cislo
 * @param {string} mena
 * @return {string}
 */
function sklonujMenu(cislo, mena) {
  if (mena === 'Kč') {
    if (cislo === 1) return ('koruna česká');
    if (cislo === 2 || cislo === 3 || cislo === 4) return ('koruny české');
    return ('korun českých');
  } if (mena === 'EUR') {
    if (cislo === 1) return ('euro');
    if (cislo === 2 || cislo === 3 || cislo === 4) return ('eura');
    return ('eur');
  }
  return ('');
}

/**
 * Funkce na převod čísla na slovo se skloňováním
 * @param {number} cislo
 * @param {string} mena
 * @return {string}
 */
function prevedNaSlovo(cislo, mena) {
  if (cislo === 0) return 'nula korun českých'; // nulu ošetříme ručně

  let slovne = '';
  let rad = 0;
  let pomocneCislo = cislo;
  let analyza;

  // TODO: přepsat na for loop
  while (pomocneCislo !== 0) {
    // pracujeme s prvními třemi číslicemi
    analyza = pomocneCislo % 1000;

    // První tři číslice převedeme na text
    slovne = `${stovkySlovne(analyza, rad)}${slovne}`;

    // Upravíme na jednosto
    if (analyza >= 100 && analyza <= 199) {
      slovne = `jedno${slovne}`; // jednosto...
    }

    // Vyskloňujeme dvě (dvě koruny české)
    if (rad === 0 && cislo === 2) {
      slovne = 'dvě';
    }

    // Odebereme poslední tři číslice, které jsme právě zpracovali
    pomocneCislo = Math.trunc(pomocneCislo / 1000);

    if (pomocneCislo !== 0) {
      // A přidáme text řádu, pokud nějaký je
      rad += 1;
      slovne = `${radSlovne(pomocneCislo % 1000, rad)}${slovne}`;
    }

    // Úprava na finanční číslovku - přidání slova "jeden", "jedna" (jedenmilion, jednamiliarda)
    if (analyza === 1 && rad > 0) {
      if (rad % 2 === 0 || rad === 1) {
        // jedentisíc, jedenmilión, ...
        slovne = `jeden${slovne}`;
      } else {
        // jednamiliarda, ...
        slovne = `jedna${slovne}`;
      }
    }
  }

  return `${slovne} ${sklonujMenu(cislo, mena)}`;
}

export default function amountToWords(number, currency) {
  return prevedNaSlovo(parseInt(number, 10), currency);
}

// console.log(prevedNaSlovo(process.argv.slice(2)[0]));
