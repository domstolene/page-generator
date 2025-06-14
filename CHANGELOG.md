# @norges-domstoler/dds-page-generator

## 6.7.1

### Patch Changes

- 68cb379: Oppdater lovlige tegn for CharacterValidator

## 6.7.0

### Minor Changes

- 6feb370: Legg til invalidCharacter validator

## 6.6.0

### Minor Changes

- ce3c762: Oppgrader designsystem

## 6.5.0

### Minor Changes

- 9c4d0de: Legg til Tooltip-komponent fra designsystemet

## 6.4.0

### Minor Changes

- 7abd256: Legg til SplitButton komponent

## 6.3.0

### Minor Changes

- eaed55b: Legg til Search-komponent

## 6.2.0

### Minor Changes

- 3d7312f: Oppgrader til React v19 og Designsystem v20

## 6.1.2

### Patch Changes

- 57fbb8b: Oppdater formdata når selectOnChange trigges

## 6.1.1

### Patch Changes

- c6d250c: Fjern validering for eksportert DateOfBirthDatePicker

## 6.1.0

### Minor Changes

- 511b971: Legg til støtte for validering for DatePicker

## 6.0.1

### Patch Changes

- e3391dd: Legg til manglende prop for DetailList

## 6.0.0

### Major Changes

- 9d91f72: Oppdater @norges-domstoler/dds-components til v18

## 5.9.3

### Patch Changes

- 4fdfd9b: Fix validering

## 5.9.2

### Patch Changes

- c2b45d9: Oppdater tredjeparts bibliotek for riktig validering av fødselsnummer

## 5.9.1

### Patch Changes

- dbed7c6: Fix onSubmit via htmlProps

## 5.9.0

### Minor Changes

- 99ab0a8: Legg til støtte for onSubmit-property i PageGenerator. Dette gjør at man får validert skjemaet før man sender det inn

## 5.8.0

### Minor Changes

- e62f78a: Legg til validering for Select-komponent

## 5.7.2

### Patch Changes

- 4032c52: Legg til NumbersOnlyValidator

## 5.7.1

### Patch Changes

- d1a3cb5: Legg til ny hjelpemetode for DetailListRow

## 5.7.0

### Minor Changes

- 7f96cb9: Legg til støtte for ny komponent DetailList

## 5.6.0

### Minor Changes

- 9696557: Oppgrader pakker

## 5.5.0

### Minor Changes

- fd36ee7: Legg til støtte for å bruke novalidate på et skjema

## 5.4.1

### Patch Changes

- 0606017: Eksporter validatorer

## 5.4.0

### Minor Changes

- 0bd8489: Legg til validatorer for Required, Nin, PhoneNumber og Email

## 5.3.2

### Patch Changes

- c8cc816: Vis feilmelding for felt som ligger i PageGeneratorRow

## 5.3.1

### Patch Changes

- b361e20: Fikser bug hvor det oppstod flere hooks mellom hver render av GenerateGridChild.

## 5.3.0

### Minor Changes

- a191b33: Oppgrader 3.parts pakker

## 5.2.0

### Minor Changes

- e251141: Forbedre validering ved at klient slipper å sette errorMessage selv og at errorMessage forsvinner når man skriver inn

## 5.1.0

### Minor Changes

- 955f784: Legg til støtte for enkel validering i PageGenerator

## 5.0.0

### Major Changes

- c5c4aa1: Legg til støtte for å sende inn parent state og parent setState istedenfor at parent og PageGenerator har hver sin state

## 4.1.2

### Patch Changes

- 9dceeee: fix: sett korrekt type for rowProps i helpers

## 4.1.1

### Patch Changes

- 8d30c79: fix: skriv om FormFields til funksjon for å støtte bruk av useScreenSize hook i hjelpemetode for inputfelt
- 40f2a14: Fix console error for stateOnChange property

## 4.1.0

### Minor Changes

- 9c6807d: Legg til hjelpemetoder for common input fields

## 4.0.2

### Patch Changes

- bef04d3: Fix design error der felt i en Row ikke var alignet vertikalt med flex-start

## 4.0.1

### Patch Changes

- 4ab2c9f: fix: flytt hooks call lenger opp i pagegenerator og sectiongenerator

## 4.0.0

### Major Changes

- 608a8f3: Legg til støtte for Fieldset og Legend, og fjern unødvendig støtte for rowType og breakpoint i PageGeneratorRow.
  Hva må gjøres etter oppdatering:

  - Fjern all bruk av feltene `rowType` og `breakpoint` for PageGeneratorRow.

## 3.1.2

### Patch Changes

- 6ecc4d5: Returner verdi for TextArea i stateOnChange

## 3.1.1

### Patch Changes

- b10bb7e: Bump the non-major group with 18 updates

## 3.1.0

### Minor Changes

- 8e90a31: Legg til støtte for bruk av ToggleBar og ToggleRadio

## 3.0.0

### Major Changes

- e728274: Oppdater avhengighet @norges-domstoler/dds-components til siste major- versjon og gjør endringer tilknyttet spacing-tokens og DatePicker

## 2.7.11

### Patch Changes

- 5fa0cda: Ingen endringer. Tester ny release pipeline.

## 2.7.10

### Patch Changes

- Updated dependencies [0541191]
  - @norges-domstoler/dds-components@13.12.0

## 2.7.9

### Patch Changes

- Updated dependencies [76d0288]
  - @norges-domstoler/dds-components@13.11.5

## 2.7.8

### Patch Changes

- 4634c63: Samle alle interne pakker tilbake inn i dds-components
- Updated dependencies [4634c63]
  - @norges-domstoler/dds-components@13.11.4

## 2.7.7

### Patch Changes

- Updated dependencies [b4f284e]
- Updated dependencies [40089c4]
  - @norges-domstoler/dds-components@13.11.3

## 2.7.6

### Patch Changes

- Updated dependencies [d482ef7]
  - @norges-domstoler/dds-components@13.11.2
  - @norges-domstoler/dds-typography@0.1.6

## 2.7.5

### Patch Changes

- @norges-domstoler/dds-components@13.11.1
- @norges-domstoler/dds-typography@0.1.5

## 2.7.4

### Patch Changes

- Updated dependencies [e2f96277]
  - @norges-domstoler/dds-components@13.11.0
  - @norges-domstoler/dds-typography@0.1.4

## 2.7.3

### Patch Changes

- @norges-domstoler/dds-components@13.10.5

## 2.7.2

### Patch Changes

- f21593bb: Bruker mer spesifikk versjon av interne dependencies
- Updated dependencies [f21593bb]
  - @norges-domstoler/dds-components@13.10.4
  - @norges-domstoler/dds-typography@0.1.3
  - @norges-domstoler/dds-design-tokens@3.0.3

## 2.7.1

### Patch Changes

- abf6e105: Gjør typene til Select mer konkrete. `TOption` trenger nå kun å inneholde feltene `label` og `value`.
- 5ca91f84: Diverse småfikser oppdaget etter strengere eslint-regler
- Updated dependencies [7cb301f8]
- Updated dependencies [b14868fb]
- Updated dependencies [abf6e105]
- Updated dependencies [5ca91f84]
  - @norges-domstoler/dds-design-tokens@3.0.2
  - @norges-domstoler/dds-components@13.10.1
  - @norges-domstoler/dds-typography@0.1.1

## 2.7.0

### Minor Changes

- eaff8a3e: Tillat versjon 6 av styled-components i peer dependencies.

### Patch Changes

- Updated dependencies [958d5a99]
- Updated dependencies [eaff8a3e]
  - @norges-domstoler/dds-components@13.10.0
  - @norges-domstoler/dds-typography@0.1.0

## 2.6.1

### Patch Changes

- 029695f1: Fikse feil med designsystemet hvor det ikke fungerte i Next.js page router applikasjoner.
- Updated dependencies [029695f1]
- Updated dependencies [2b80dade]
  - @norges-domstoler/dds-components@13.9.0
  - @norges-domstoler/dds-typography@0.0.7

## 2.6.0

### Minor Changes

- 630a4fbc: Add TextArea to PageGenerator

### Patch Changes

- Updated dependencies [db0c5d72]
  - @norges-domstoler/dds-components@13.8.8

## 2.5.3

### Patch Changes

- 8eb214ef: Bump dependencies
- Updated dependencies [8eb214ef]
  - @norges-domstoler/dds-components@13.8.5
  - @norges-domstoler/dds-design-tokens@3.0.2
  - @norges-domstoler/dds-typography@0.0.4

## 2.5.2

### Patch Changes

- 209f3962: Forenkler byggeprosessen. Burde ikke oppleve noen endringer.
- Updated dependencies [209f3962]
  - @norges-domstoler/dds-components@13.8.3
  - @norges-domstoler/dds-typography@0.0.3

## 2.5.1

### Patch Changes

- 74c80136: Legg til manglende nullsjekk for obj når det sjekkes for validations

## 2.5.0

### Minor Changes

- 18ff827d: Legg til validering for TextInput i PageGenerator

## 2.4.0

### Minor Changes

- 68f1c88c: Legg til støtte for children for CardField i PageGenerator
- b225f163: Legg til støtte for ComponentProps for ButtonField i PageGenerator

## 2.3.0

### Minor Changes

- f0383c23: Legg til støtte for HStack og VStack i PageGenerator

### Patch Changes

- e9de7b1e: Legger til `displayName` på alle komponenter. Dette skal gjøre feilmeldinger knyttet til Elsa-komponenter lettere å lese.
- 57652c2e: Fix(section-generator): Fjern rowType fra rest for å unngå feilmelding i konsoll-loggen
- Updated dependencies [48090b12]
- Updated dependencies [e9de7b1e]
- Updated dependencies [c12ec87d]
  - @norges-domstoler/dds-components@13.4.0

## 2.2.5

### Patch Changes

- Updated dependencies [0f517fa3]
- Updated dependencies [735adcbc]
- Updated dependencies [6b1e53c5]
- Updated dependencies [5916d4df]
- Updated dependencies [45d2024e]
  - @norges-domstoler/dds-components@13.0.0

## 2.2.4

### Patch Changes

- a39e72b0: Fix: Returner hele option-elementet når selectOnChange trigges i PageGenerator og SectionGenerator
- Updated dependencies [f7be56dd]
  - @norges-domstoler/dds-components@12.1.3

## 2.2.3

### Patch Changes

- 02e499c2: Bruk siste versjon av npm til publishing av pakker
- Updated dependencies [02e499c2]
  - @norges-domstoler/dds-components@12.1.2

## 2.2.2

### Patch Changes

- 1aeaa4b0: Ta i bruk [npm package provenance](https://github.blog/2023-04-19-introducing-npm-package-provenance/).
  Dette gjør at konsumenter verifiserbart kan sjekke hvor pakkens innhold kommer fra.
- Updated dependencies [1aeaa4b0]
  - @norges-domstoler/dds-components@12.1.1

## 2.2.1

### Patch Changes

- Updated dependencies [e451bf8b]
- Updated dependencies [8d91d37c]
  - @norges-domstoler/dds-components@12.0.0

## 2.2.0

### Minor Changes

- 99fe4ac2: Legg til støtte for å bruke Drawer og DrawerGroup i dds-page-generator

### Patch Changes

- Updated dependencies [82339ae4]
  - @norges-domstoler/dds-components@11.3.2

## 2.1.1

### Patch Changes

- 21fb7cf8: Fix: Legg til type HTMLElement inn i typen for SectionGeneratorRow

## 2.1.0

### Minor Changes

- 1a11adc4: Legg til ny type SectionGeneratorRow

### Patch Changes

- fa29cd1e: Fjern nødvendighet for peerDependencies på andre designsystempakker
- b03c8284: Endre alle `peerDependencies` til å være mer føyelig i hvilke versjoner vi tillater.
- Updated dependencies [f0e24282]
- Updated dependencies [b03c8284]
  - @norges-domstoler/dds-components@11.3.1

## 2.0.0

### Minor Changes

- 887bfa76: Legg til støtte for å skjule PageGeneratorRow

### Patch Changes

- Updated dependencies [f8a9776a]
  - @norges-domstoler/dds-components@11.3.0

## 1.1.1

### Patch Changes

- 81b0a1f1: SectionGenerator: Legg til manglende key på React.Fragment

## 1.1.0

### Minor Changes

- 6c1f5af5: Legg til støtte for React.Fragment som wrapper-element for SectionGenerator

### Patch Changes

- 0525dc53: Gjør react, react-dom og styled-components til eksterne dependencies sånn at disse ikke blir inkludert i bygget. Dette vil fikse "invalid hook call"-feilen

## 1.0.0

### Patch Changes

- f4adb526: Legg til ny pakke PageGenerator `@norges-domstoler/dds-page-generator`
- Updated dependencies [03f759b2]
- Updated dependencies [f4adb526]
- Updated dependencies [1aa3cf44]
  - @norges-domstoler/dds-components@11.2.0
