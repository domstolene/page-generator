# @norges-domstoler/dds-page-generator

![Version](https://img.shields.io/npm/v/@norges-domstoler/dds-page-generator) [![License](https://img.shields.io/npm/l/@norges-domstoler/dds-page-generator)](https://www.npmjs.com/package/@norges-domstoler/dds-page-generator) ![Checks](https://github.com/domstolene/designsystem/actions/workflows/release.yml/badge.svg)

Side- og skjemagenerering basert på JSON-input for bruk i domstolenes tjenester.

## Utvikling

Installer [mise](https://mise.jdx.dev/), og kjør `mise install` og `mise run install` i prosjektmappen. Node og pnpm hentes fra `mise.toml`. Kjør for eksempel `mise run test`, `mise run build` eller `mise tasks` for å se tilgjengelige oppgaver.

Hvis mise ber deg godkjenne prosjektkonfigurasjonen, se gjennom `mise.toml` og kjør `mise trust` i prosjektmappen før du installerer verktøy eller kjører oppgaver.

## 📦 Installasjon

```sh
pnpm add @norges-domstoler/dds-page-generator

or

npm install @norges-domstoler/dds-page-generator
```

## 🔨 Bruk

```tsx
import { useState } from 'react';
import {
  PageGenerator,
  PageGeneratorSupportedFields,
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
  ];

  return (
    <PageGenerator
      as="form"
      fields={fields}
      state={myState}
      setState={setMyState}
    />
  );
}
```

## Migreringsguide fra v4 til v5

Det er gjort endringer i state-håndtering for å unngå duplikater av state. I tidligere versjoner hadde PageGenerator sin egen kopi av state. Dette kunne forårsake feil i state-håndteringen for parent vs child. I ny versjon kan man sende inn state og setState, slik at det kun er én versjon av state. Dette medfører at man må gjøre noen endringer.

- `stateOnChange` er ikke lenger støttet som property.
- `state` og `setState` må settes som property.
- La gjerne `useState` utlede typen fra startverdiene, eller angi en konkret state-type for felt med flere mulige verdityper. `PageGeneratorState` kan brukes når feltene er dynamiske.
- Bruk property-en `value` for skjema-komponenter; med konkret state-type trengs normalt ingen typekonvertering.
- Om man vil fange opp endringer på state, kan man bruke `useEffect`.

Se i eksempelet over for hvordan dette kan gjøres.
