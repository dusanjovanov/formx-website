---
id: form
title: Form
sidebar_label: Form
---

## Props

### `config: Config`

Your config object.

### `context: {[key:string]: any}`

These are your external dependencies. Could be:

- an object from the server
- some state you have
- t function from `i18next` package
- `redux dispatch`
- ...etc

### `onSubmit: (values: {[key:string]: any}, transformedValues: {[key:string]: any}) => void`

This gets called when you submit the form, and all fields are valid (i.e. the `errors` state is an empty object)

### `applyProps: (name: string, fieldConfig: FieldConfig) => PropsObject`

What this function returns will be merged with and it will override the fields props. It is a way to globally apply a prop to all fields
(e.g. read only mode - where you would just pass isDisabled: true to every field);

## Return props (API)

Things you get in function as prop (`children` function) and through `useFormContext`.

### `fields: {[name: string]: ReactNode}`

This is an object that contains all your fields already rendered for you to place at your will. This is done so you can have whatever form layout you want.

### `submitForm: () => void`

Function to trigger submit.

### `resetForm: () => void`

Function to trigger reset. When you call this function, the init method from your class will be called.

### `getFieldsStack: (filter?: (name: string, fieldConfig: FieldConfig) => boolean) => ReactNode[]`

Function to get an array of rendered fields so you don't have to place every field individually.
You get a filter function if you want to place some fields differently.

### `subscribe: (cb: SubscribeCallback) => void;`

You can subscribe outside of the form to every change (value, error, context)

### `focusField: (name: string) => void;`

Imperatively focus a field. This depends on `focusRef` being passed to something with a `focus` method in your component.

```ts
type API = {
  fields: IndexObject<ReactNode>;
  getFieldsStack: (filter?: GetFieldsStackFilterFn) => ReactNode[];
  submitForm: () => void;
  resetForm: () => void;
  focusField: (name: string) => void;
  subscribe: (cb: SubscribeCallback) => void;
};

type GetFieldsStackFilterFn = (
  name: string,
  fieldConfig: FieldConfig
) => boolean;


type SubscribeCallback = (args: FormProp, reason: UpdateReason) => void;

export type UpdateReason = {
  name: string;
  type: ChangeType;
};

export type ChangeType = "value" | "error" | "blur";

type Props = {
  children: (args: API) => any;
  context: Context;
  onSubmit: (
    originalValues: IndexObject,
    transformedValues: IndexObject
  ) => void;
  config: Config;
  applyProps?: (name: string, config: FieldConfig) => IndexObject | undefined;
};


class Form extends React.Component<Props> {...}
```
