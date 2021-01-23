---
id: fieldConfig
title: FieldConfig
sidebar_label: FieldConfig
---

## Fields

### `component: React.FC<ComponentProps> | React.Component<ComponentProps>`

Component to render. It will receive the props you passed through the `props` function, and a special `field` prop.

### `props: (context: Context, form: FormProp) => PropsObject`

Function that should return props you wish to pass to your component.

### `initState?: (context:Context) => ({value?: any, error?: string})`

Called on mount for each field, and on reset of the form. Should return initial `value` and/or `error`.
Receives `context` as an argument.

### `deps?: string[]`

Fields upon which the field depends on. Every time anything related to those fields changes `props` and `effect` will be called,
and the field in question will be updated.

### `effect?: (context: Context, form: FormPropWithMutations, reason: UpdateReason) => void`

We do side effects here.

### `transform?: (context: Context, form: FormProp, value: any) => any;`

This is called on submit. The value you return from here will be present in the second argument of the `onSubmit` callback - `transformedValues`.

### `[key: string]: any;`

You can add any additional fields to your field config. Could be a `tab` field for example, if your form is split into multiple sections/tabs.
