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

```ts
type Context {
  [key: string]: any
}

type ComponentProps = {
  field: FieldProp;
  [key: string]: any;
};

type PropsObject = {
  schema?: any;
  validate?: (value: any) => undefined | string | Promise<any>;
  [key: string]: any;
};


type FieldProp = {
  value: any;
  error?: string;
  onChange: (value: any) => void;
  onBlur: () => void;
  focusRef: React.RefObject<{ focus: () => void; [key: string]: any }>;
};

type FormProp = {
  values: { [key: string]: any };
  errors: { [key: string]: string | undefined };
};

type FormPropWithMutations = {
  values: { [key: string]: any };
  errors: { [key: string]: string | undefined };
  setValue: (name: string, value: any) => void;
  setError: (name: string, error?: string) => void;
  validateField: (name: string) => void;
};

export type UpdateReason = {
  name: string;
  type: ChangeType;
};

export type ChangeType = "value" | "error" | "blur";

type FieldConfig<Context = IndexObject, Props = PropsObject> = {
  component: React.FC<Props>;
  props: (context: Context, form: FormProp) => Props;
  deps?: string[];
  initState?: (
    context: Context
  ) => {
    value?: any;
    error?: string | undefined;
  };
  effect?: (
    context: Context,
    form: FormPropWithMutations,
    reason: UpdateReason
  ) => void;
  transform?: (context: Context, form: FormProp, value: any) => any;
  [key: string]: any;
};
```
