# @norges-domstoler/dds-page-generator

![Version](https://img.shields.io/npm/v/@norges-domstoler/dds-page-generator) [![License](https://img.shields.io/npm/l/@norges-domstoler/dds-page-generator)](https://www.npmjs.com/package/@norges-domstoler/dds-page-generator) ![Checks](https://github.com/domstolene/designsystem/actions/workflows/release.yml/badge.svg)

Side- og skjemagenerering basert på JSON-input for bruk i domstolenes tjenester.

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

<PageGenerator as="form" fields={fields} state={myState} setState={setMyState} />
<SectionGenerator as="form" fields={fields} state={myState} setState={setMyState} />
```
