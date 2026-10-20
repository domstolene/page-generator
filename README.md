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

```js
import {
  PageGenerator,
  SectionGenerator,
  PageGeneratorState
} from '@norges-domstoler/dds-page-generator';

const [myState, setMyState] = useState<PageGeneratorState>({
    firstName: '',
    lastName: '',
});

const fields = [{
    fields: [
    {
        component: FormGeneratorSupportedFields.TextInput,
        props: {
            label: 'Fornavn',
            type: 'text',
            name: 'firstName',
            value: myState.firstName as string
        },
    },
    {
        component: FormGeneratorSupportedFields.TextInput,
        props: {
            label: 'Etternavn',
            type: 'text',
            name: 'lastName',
            value: myState.lastName as string
        },
    }],
}];

useEffect(() => {
    console.log('updated state', state);
}, [state]);

<PageGenerator as="form" fields={fields} state={myState} setState={setMyState} />
<SectionGenerator as="form" fields={fields} state={myState} setState={setMyState} />
```

## Migreringsguide fra v4 til v5

Det er gjort endringer i state-håndtering for å unngå duplikater av state. I tidligere versjoner hadde PageGenerator sin egen kopi av state. Dette kunne forårsake feil i state-håndteringen for parent vs child. I ny versjon kan man sende inn state og setState, slik at det kun er én versjon av state. Dette medfører at man må gjøre noen endringer.

- `stateOnChange` er ikke lenger støttet som property.
- `state` og `setState` må settes som property.
- Man bør bruke typen `PageGeneratorState`.
- Man bør bruke property'en `value` for en skjema-komponent og den bør castes til riktig type. Alle aktuelle typer kan finnes i `PageGeneratorStateOptionTypes`
- Om man vil fange opp endringer på state, kan man bruke `useEffect`.

Se i eksempelet over for hvordan dette kan gjøres.
