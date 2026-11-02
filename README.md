# @norges-domstoler/dds-page-generator

![Version](https://img.shields.io/npm/v/@norges-domstoler/dds-page-generator) [![License](https://img.shields.io/npm/l/@norges-domstoler/dds-page-generator)](https://www.npmjs.com/package/@norges-domstoler/dds-page-generator) ![Checks](https://github.com/domstolene/designsystem/actions/workflows/release.yml/badge.svg)

Side- og skjemagenerering for React basert på typede feltdefinisjoner, bygget på Domstolenes designsystem (DDS).

Pakken setter sammen DDS-komponenter fra feltdefinisjoner og håndterer responsivt grid, oppdatering av skjemastate og feltvalidering. Utseende og komponentenes grunnleggende tilgjengelighetsstøtte kommer fra DDS.

## Når passer pakken?

Pakken passer for tjenester som allerede bruker DDS og bygger flere skjemaer med lignende felt, grupper og valideringsregler. Feltdefinisjoner og feltbyggere kan gjenbrukes på tvers av skjemaer, slik at standardvalg ikke må gjentas i hvert komponenttre.

For et lite engangsskjema eller en side med mye spesialtilpasset interaksjon kan det være enklere å bruke DDS-komponentene direkte i JSX. Pakken er ikke en visuell skjemabygger eller en erstatning for backendens validering og forretningslogikk.

### TypeScript, ikke et JSON-format

`fields` er JavaScript-/TypeScript-objekter med typer fra `PageGeneratorField` og `PageGeneratorRow`. Definisjonene kan inneholde hendelsesfunksjoner, valideringsfunksjoner, JSX og datoobjekter. De er derfor ikke generelt serialiserbare som JSON.

Skjemaer som skal lagres som JSON eller leveres fra backend, trenger et eget dataformat og en oversettelse til feltdefinisjonene. Pakken definerer ikke et slikt format og validerer ikke eksterne skjemadefinisjoner ved kjøretid.

## Utvikling

Installer [mise](https://mise.jdx.dev/), og kjør `mise install` og `mise run install` i prosjektmappen. Node og pnpm hentes fra `mise.toml`. Kjør for eksempel `mise run test`, `mise run build` eller `mise tasks` for å se tilgjengelige oppgaver.

Hvis mise ber deg godkjenne prosjektkonfigurasjonen, se gjennom `mise.toml` og kjør `mise trust` i prosjektmappen før du installerer verktøy eller kjører oppgaver.

## 📦 Installasjon

Pakken krever React og React DOM 19, `@norges-domstoler/dds-components` 25 og `@norges-domstoler/dds-design-tokens` 11. Disse er peer dependencies og må være tilgjengelige i applikasjonen.

```sh
pnpm add @norges-domstoler/dds-page-generator
```

Alternativt: `npm install @norges-domstoler/dds-page-generator`.

## 🔨 Bruk

Eksempelet forutsetter at applikasjonen er omsluttet av DDS sin `DdsProvider`, og at designsystemets stiloppsett er på plass.

```tsx
import { useState } from 'react';
import {
  PageGenerator,
  PageGeneratorSupportedFields,
  RequiredValidator,
  type PageGeneratorField,
} from '@norges-domstoler/dds-page-generator';

export function Example() {
  const [myState, setMyState] = useState({
    firstName: '',
    lastName: '',
  });

  const fields: PageGeneratorField[] = [
    {
      component: PageGeneratorSupportedFields.TextInput,
      props: {
        label: 'Fornavn',
        type: 'text',
        name: 'firstName',
        value: myState.firstName,
      },
      validations: [RequiredValidator('Skriv inn fornavn')],
    },
    {
      component: PageGeneratorSupportedFields.TextInput,
      props: {
        label: 'Etternavn',
        type: 'text',
        name: 'lastName',
        value: myState.lastName,
      },
    },
    {
      component: PageGeneratorSupportedFields.Button,
      props: { type: 'submit' },
      innerHTML: 'Lagre',
    },
  ];

  return (
    <PageGenerator
      as="form"
      fields={fields}
      state={myState}
      setState={setMyState}
      noValidate
      onSubmit={() => {
        console.log('Gyldig skjema:', myState);
      }}
    />
  );
}
```

## Gjenbruk av feltgrupper

Feltbyggerne setter standardverdier som label og feltnavn. De legger ikke automatisk til valideringsregler. Bruk `fieldProps.validations` når et felt skal valideres.

Her brukes samme navnegruppe i både søker- og kontaktpersondefinisjonen:

```tsx
import {
  EmailInput,
  FirstNameInput,
  LastNameInput,
  RequiredValidator,
  type PageGeneratorField,
} from '@norges-domstoler/dds-page-generator';

type NameState = { firstName: string; lastName: string };

function nameFields(state: NameState): PageGeneratorField[] {
  return [
    FirstNameInput({
      props: { value: state.firstName },
      fieldProps: { validations: [RequiredValidator('Skriv inn fornavn')] },
    }),
    LastNameInput({ props: { value: state.lastName } }),
  ];
}

export function applicantFields(state: NameState): PageGeneratorField[] {
  return nameFields(state);
}

export function contactPersonFields(
  state: NameState & { email: string },
): PageGeneratorField[] {
  return [...nameFields(state), EmailInput({ props: { value: state.email } })];
}
```

Send resultatet til `PageGenerator.fields` sammen med det aktuelle skjemaets `state` og `setState`. Bygg definisjonene fra gjeldende state ved rendering, slik at kontrollerte verdier oppdateres.

## State og feltnavn

- Applikasjonen eier skjemaverdiene. Send `state` og `setState` sammen for redigerbare skjemaer; generatoren beholder ikke en egen kopi av verdiene.
- For tekstfelt brukes `props.name` som state-nøkkel. Koble `props.value` til samme nøkkel i state. For kontrollerte avkrysningsbokser brukes `props.checked` og en boolsk state-verdi.
- Feltnavn bør være unike i skjemaet. Nøkler er flate strenger; `person.firstName` tolkes ikke som en sti i et nestet objekt.
- `Select` og `DatePicker` har også `name` på selve feltdefinisjonen. Sett denne lik `props.name`, siden endringshåndtering og validering bruker disse navnene.
- `Select` bruker opsjonsobjekter eller lister med opsjonsobjekter som verdi. `DatePicker` bruker `CalendarDate` fra `@internationalized/date` eller `null`.
- Generatoren setter egne `onChange`- og `onBlur`-handlers på støttede skjemafelt. Ikke bruk disse propsene til egen forretningslogikk; reager på endringer i applikasjonens state, for eksempel med `useEffect`.
- `formDataOnChange` rapporterer valideringsmetadata som `errors`, `errorMessages`, `valid`, `touched` og `submitted`. Det er ikke en callback for hver endring av skjemaverdiene, og `valid` er ikke en garanti for at alle felt er kontrollert før innsending.

## Validering og innsending

`validations` støttes på `TextInput`, `TextArea`, `Select` og `DatePicker`. En regel er et objekt med en synkron `rule(value)` som returnerer `true` for en gyldig verdi, en `message` og eventuelt en `formMessage`. Den første feilen vises ved feltet. `getFormErrorMessage` kan brukes til en separat feiloppsummering.

- Tekstfelt valideres ved blur. Select og datovelger valideres ved endring og blur. Ved endring av tekst skjules feltets eksisterende feilmelding frem til neste validering.
- Med `as="form"` og `onSubmit` valideres feltene før callbacken kalles. Rader og nestede `children`, blant annet i `Card` og `Fieldset`, inngår i gjennomgangen.
- `required`/`isRequired` på DDS-komponenten og en regel som `RequiredValidator` er forskjellige mekanismer. Legg til en regel dersom generatorens validering skal håndheve at feltet er påkrevd.
- `noValidate` slår av nettleserens innebygde skjemavalidering, ikke generatorens regler. Bruk det når generatoren skal styre feilmeldingene.
- `hide` styrer rendering, ikke hvilke regler som gjelder. Et skjult felt eller felt i en skjult gruppe kan fortsatt blokkere innsending. Fjern feltet fra definisjonen eller tilpass reglene dersom det ikke skal inngå i valideringen.
- Valideringen er synkron og erstatter ikke servervalidering. Kontroller også innsendte verdier på serveren.

De innebygde validatorene er enkle regler, ikke fullstendige domenevalidatorer. For eksempel godtar `RequiredValidator` mellomrom som innhold, og `PhoneNumberValidator` godtar bare sifre. Vurder reglene opp mot tjenestens behov, og bruk egne regler der det trengs.

## Layout og komponentvalg

`PageGenerator` bruker DDS sitt grid og kan rendres som `div` eller `form`. En rad samler felt horisontalt med responsiv avstand. `Card.children` støtter både felt og seksjonsrader og bruker det omsluttende skjemaets state og handlers, også i nestede containere.

`SectionGenerator` er alternativet uten det ytre gridet og støtter `div`, `form` og `fragment`. Bruk `PageGenerator` for skjemaer som trenger den dokumenterte innsendingen og valideringen via `onSubmit`.

Komponentutvalget er knyttet til DDS, ikke et register for vilkårlige React-komponenter. Bruk direkte JSX der generatorens feltmodell ikke passer.

## Migreringsguide fra v4 til v5

Det er gjort endringer i state-håndtering for å unngå duplikater av state. I tidligere versjoner hadde PageGenerator sin egen kopi av state. Dette kunne forårsake feil i state-håndteringen for parent vs child. I ny versjon kan man sende inn state og setState, slik at det kun er én versjon av state. Dette medfører at man må gjøre noen endringer.

- `stateOnChange` er ikke lenger støttet som property.
- `state` og `setState` må settes som property.
- La gjerne `useState` utlede typen fra startverdiene, eller angi en konkret state-type for felt med flere mulige verdityper. `PageGeneratorState` kan brukes når feltene er dynamiske.
- Bruk property-en `value` for skjema-komponenter; med konkret state-type trengs normalt ingen typekonvertering.
- Om man vil fange opp endringer på state, kan man bruke `useEffect`.

Se i eksempelet over for hvordan dette kan gjøres.
