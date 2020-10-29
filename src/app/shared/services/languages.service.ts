import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  public miscellanousText: string[] = [];
  public tournamentDatesText: string[] = [];
  public participantsText: string[] = [];
  public poolsText: string[] = [];
  public matchesText: string[] = [];
  public dashboardText: string[] = [];
  public refereeText: string[] = [];
  public authorisationText: string[] = [];
  public registerText: string[] = [];
  public validationText: string[] = [];
  public rolesText: string[] = [];

  constructor() {
    this.getTextInCorretLanguage();
  }

  getTextInCorretLanguage() {
    this.getMiscellanousTexts();
    this.getTournamentDatesTexts();
    this.getParticipantsTexts();
    this.getPoolTexts();
    this.getMatchesTexts();
    this.getDashboardTexts();
    this.getRefereeTexts();
    this.getAuthorisationTexts();
    this.getRegisterTexts();
    this.getValidationTexts();
    this.getRoleTexts();
  }

  private getMiscellanousTexts() {
    this.miscellanousText.push("Muokkaa");//0
    this.miscellanousText.push("Tallenna");//1
    this.miscellanousText.push("Peruuta");//2
    this.miscellanousText.push("Muuta nimeä");//3
    this.miscellanousText.push("Poista");//4
    this.miscellanousText.push("Turnaus poistettu.");//5
    this.miscellanousText.push("Sulje");//6
    this.miscellanousText.push("Lisää uusi turnaus");//7
    this.miscellanousText.push("Turnaukset");//8
    this.miscellanousText.push("Turnauksen tiedot");//9
    this.miscellanousText.push("Nimi");//10
    this.miscellanousText.push("Lisää");//11
    this.miscellanousText.push("Turnauksen nimi");//12
    this.miscellanousText.push("Klo:");//13
    this.miscellanousText.push("Id:");//14
    this.miscellanousText.push("Pvm:");//15
    this.miscellanousText.push("Osoite:");//16
    this.miscellanousText.push("Sijainti:");//17
    this.miscellanousText.push("Henkilöt:");//18
    this.miscellanousText.push("Tallenna muutokset:");//19
    this.miscellanousText.push("Turnaus lisätty.");//20
    this.miscellanousText.push("Palauttaa takaisin toiminto näkymään.");//21
    this.miscellanousText.push("Tallentaa turnauksen tietokantaan.");//22
    this.miscellanousText.push("Muutokset tallennettu.");//23
    this.miscellanousText.push("OK");//24
    this.miscellanousText.push("Aloita turnaus");//25
    this.miscellanousText.push("Käynnistää turnauksen, jotta otteluita voidaan tuomaroida ja katsojat pääsevät seuraamaan tuloksia.");//26
    this.miscellanousText.push("Lopeta turnaus");//27
    this.miscellanousText.push("Lopettaa turnauksen, jottei otteluita voida enää tuomaroida ja poistaa turnauksen katsojien näkymästä.");//28
    this.miscellanousText.push("Nollaa turnauksesta käynnistämisen ja lopettamisen tiedot.");//29
    this.miscellanousText.push("Nollaa aloitus ja lopetus.");//30
    this.miscellanousText.push("Käynnissä olevia turnauksia ei löydetty.");//31
    this.miscellanousText.push("Takaisin");//32
  }

  private getTournamentDatesTexts() {
    this.tournamentDatesText.push("Turnauspäivät");//0
    this.tournamentDatesText.push("Uusi turnauspäivä ja osoite");//1
    this.tournamentDatesText.push("Osoite");//2
    this.tournamentDatesText.push("Valitse päivämäärä");//3
    this.tournamentDatesText.push("Poista");//4
    this.tournamentDatesText.push("Missä turnaus on tällä päivällä?");//5
    this.tournamentDatesText.push("Milloin turnauspäivä on?");//6
  }

  private getParticipantsTexts() {
    this.participantsText.push("Osallistujat");//0
    this.participantsText.push("Lisää osallistuja");//1
    this.participantsText.push("Etunimi");//2
    this.participantsText.push("Osallistujan etunimi");//3
    this.participantsText.push("Lisää osallistujalle etunimi");//4
    this.participantsText.push("Sukunimi");//5
    this.participantsText.push("Osallistujan sukunimi");//6
    this.participantsText.push("Lisää osallistujalle sukunimi");//7
    this.participantsText.push("Taso");//8
    this.participantsText.push("Osallistujan taitotaso");//9
    this.participantsText.push("Lisää osallistujalle taitotaso");//10
    this.participantsText.push("Voitot: ");//11
    this.participantsText.push("Häviöt: ");//12
    this.participantsText.push("Osallistujan tiedot");//13
    this.participantsText.push("Lisätyt osallistujat");//14
  }

  private getPoolTexts() {
    this.poolsText.push("Poolit");//0
    this.poolsText.push("Lisää pooli");//1
    this.poolsText.push("Nimi");//2
    this.poolsText.push("Poolin nimi");//3
    this.poolsText.push("Lisää poolille nimi");//4
    this.poolsText.push("Lisätyt poolit");//5
    this.poolsText.push("Id");//6
    this.poolsText.push("Poolin tunniste/id");//7
    this.poolsText.push("Poolin tiedot");//8
    this.poolsText.push("Lisää pooliin osallistuvat kilpailijat");//9
    this.poolsText.push("Poolin voittaja");//10
    this.poolsText.push("Poolin toinen");//11
    this.poolsText.push("Poolin voittajat");//12
    this.poolsText.push("Kilpailija");//13
    this.poolsText.push("Valitse voittaja");//14
    this.poolsText.push("Valitse toinen sija");//15
    this.poolsText.push("Voittajia ei ole vielä asetettu. Ne asetetaan tuomarin toimesta, kun pooli on ohi. Muussa tapauksessa ne voi asettaa valitsemalla poolin muokkauksen.");//16
    this.poolsText.push("Valitse poolille voittaja ja toinen sija.");//17
    this.poolsText.push("Tälle poolille ei ole tulevia otteluita.");//18
    this.poolsText.push("Kaikki poolin ottelut ovat ohi.");//19
    this.poolsText.push("Pooliin ei ole vielä aseteltu kilpailijoita.");//20
  }

  private getMatchesTexts() {
    this.matchesText.push('Ottelut');//0
    this.matchesText.push('Lisää uusi ottelu');//1
    this.matchesText.push('Poista ottelu');//2
    this.matchesText.push('Muokkaa ottelua');//3
    this.matchesText.push('Pisteet');//4
    this.matchesText.push('Aloita ottelu');//5
    this.matchesText.push('Lopeta ottelu');//6
    this.matchesText.push('Kilpailija 1');//7
    this.matchesText.push('Kilpailija 2');//8
    this.matchesText.push('Ottelun tunniste/id');//9
    this.matchesText.push('Ottelun sijainti');//10
    this.matchesText.push('Valitse kilpailija');//11
    this.matchesText.push('Ottelun päivä');//12
    this.matchesText.push('Valitse ottelulle päivä');//13
    this.matchesText.push('Ottelun aika');//14
    this.matchesText.push('Valitse ottelulle aika');//15
    this.matchesText.push('Lisää ottelulle tunniste/id');//16
    this.matchesText.push('Lisää ottelun sijainti esim. huone a3');//17
    this.matchesText.push('Tyhjät ottelut tulee lisätä pooliin ennen kuin niille voi asettaa kilpailijat ja muut tiedot. Tämän jälkeen muutokset pitää tallentaa.');//18
    this.matchesText.push('Lisää ottelu');//19
    this.matchesText.push('Lisätyt ottelut');//20
    this.matchesText.push('Tallenna muutokset, jotta uusi ottelu tallentuu tietokantaan ja tulee näkyviin listalle.');//21
    this.matchesText.push('Tallenna muutokset, jotta poistetut ottelut poistuvat tietokannastakin.');//22
    this.matchesText.push('Ottelut on nyt poistettu tietokannastakin.');//23
    this.matchesText.push('Ottelu on käynnissä.');//24 
    this.matchesText.push('Ottelu on ohi.');//25
    this.matchesText.push('Valitse voittaja.');//26
    this.matchesText.push('Jatka ottelua.');//27
    this.matchesText.push('Valitse vielä ottelun voittaja päättääksesi ottelun.');//28
  }

  private getDashboardTexts() {
    this.dashboardText.push("Turnaukset");//0
    this.dashboardText.push("Turnausten ylläpito");//1
    this.dashboardText.push("Turnausten ylläpitäjien toiminnot.");//2
    this.dashboardText.push("Lisää turnauksia");//3
    this.dashboardText.push("Muokkaa turnauksia");//4
    this.dashboardText.push("Lisää tuomareita tai muita ylläpitäjiä");//5
    this.dashboardText.push("Lisää käyttäjiä");//6
    this.dashboardText.push("Otteluiden tuomarointi");//7
    this.dashboardText.push("Tuomaroi otteluita");//8
    this.dashboardText.push("Siirry valitsemaan turnaus ja ottelu");//9
    this.dashboardText.push("Siirry");//10
  }

  private getRefereeTexts() {
    this.refereeText.push("Käynnissä olevat turnaukset");//0
    this.refereeText.push("Valitse ottelu");//1
    this.refereeText.push("Tulevat ottelut");//2
    this.refereeText.push("Aloita ottelu");//3
    this.refereeText.push("Aloittamalla ottelun, sen tuomarointi voidaan aloittaa ja ottelu siirtyy nähtäväksi myös seuranta palveluun.");//4
    this.refereeText.push("Anna pisteitä");//5
    this.refereeText.push("Anna virhe");//6
    this.refereeText.push("Lopeta ottelu");//7
    this.refereeText.push("Valitsemalla kyllä, varmistat, että ottelu on ohi ja tulos pitää paikkansa.");//8
    this.refereeText.push("Palaa takaisin");//9
    this.refereeText.push("Ottelua ei löytynyt!");//10
    this.refereeText.push("Palaa alkuun ja kokeile uudestaan.");//11
    this.refereeText.push("Pisteet:");//12
    this.refereeText.push("Virheet:");//13
    this.refereeText.push("Kyllä");//14
    this.refereeText.push("Ei, sulje tämä ja palaa tarkistamaan ottelun tulos.");//15
    this.refereeText.push("Avaa nähdäksesi turnauksen poolit ja ottelut.");//16
  }

  private getAuthorisationTexts() {
    this.authorisationText.push("Kirjaudu");//0
    this.authorisationText.push("Kirjaudu sisään palveluun tuomarina tai asettelijana.");//1
    this.authorisationText.push("Kirjaudu sisään");//2
    this.authorisationText.push("Kirjaudu ulos");//3
    this.authorisationText.push("Käyttäjätunnus");//4
    this.authorisationText.push("sähköposti@mail.com");//5
    this.authorisationText.push("Salasana");//6
    this.authorisationText.push("Salasana unohtunut?");//7
    this.authorisationText.push("Lähetä");//8
    this.authorisationText.push("Syötä sähköposti");//9
    this.authorisationText.push("Sähköpostiosoite");//10
    this.authorisationText.push("Annettua sähköpostia ei ole kirjattu järjestelmään.");//11
    this.authorisationText.push("Lähetetty");//12
    this.authorisationText.push("Tarkista sähköpostisi ja palaa takaisin kirjautumissivulle.");//13
    this.authorisationText.push("Anna salasana.");//14
  }

  private getRegisterTexts() {
    this.registerText.push("Rekisteröi uusi käyttäjä")//0
    this.registerText.push("Valitse käyttäjälle rooli")//1
    this.registerText.push("Rooli")//2
    this.registerText.push("Tuomari")//3
    this.registerText.push("Järjestäjä")//4
    this.registerText.push("Luo uusi käyttäjä. Käyttäjä tulee kirjautumaan sisään sähköposti ja salasana yhdistelmällä. Käyttäjä voi myöhemmin vaihtaa salasanan. Käyttäjän rooli määrittelee mitä hän voi järjestelmässä tehdä. Järjestäjä pystyy lisäämään ja poistamaan käyttäjiä, turnauksia ja otteluita, hän voi myös muokata turnauksia. Tuomari pystyy vain toimitsemaan otteluita.")//5
    this.registerText.push()//6
    this.registerText.push()//7
    this.registerText.push()//8
  }

  private getValidationTexts() {
    this.validationText.push('Käyttäjätunnus tarvitaan.');//0
    this.validationText.push('Käyttäjätunnuksen tulee olla vähintään viisi merkkiä pitkä.');//1
    this.validationText.push('Käyttäjätunnus ei saa olla yli 25 merkkiä pitkä.');//2
    this.validationText.push('Tunnuksessa saa olla vain numeroita ja kirjaimia.');//3
    this.validationText.push('Tämä tunnus on jo käytössä.');//4
    this.validationText.push('Sähköposti on pakollinen.');//5
    this.validationText.push('Tämä sähköpostiosoite ei ole kelvollinen.');//6
    this.validationText.push('Salasana pitää varmistaa.');//7
    this.validationText.push('Salasanat eivät täsmää keskenään.');//8
    this.validationText.push('Salasana tarvitaan.');//9
    this.validationText.push('Salasanan tulee olla vähintään viisi merkkiä pitkä.');//10
    this.validationText.push('Salsanan tulee sisältää isoja ja pieniä kirjaimia sekä numeroita.');//11
    this.validationText.push('Sinun tulee hyväksyä käyttöehdot.');//12
  }

  getRoleTexts() {
    this.rolesText.push("Järjestäjä");//0
    this.rolesText.push("Tuomari");//1
  }
}
