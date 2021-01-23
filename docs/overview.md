---
id: overview
title: Overview
sidebar_label: Overview
---

Formx is a React form library with a very simple API where you put all your form logic in a configuration object.

This is what the config looks like:

```ts
import { Config } from "@formx/formx";

type Context = {
  person: Person;
};

const config: Config<Context> = {
  firstName: {
    component: TextField,
    props: (context) => ({
      label: "First name",
      schema: yup.string().required(),
    }),
    initState: (context) => ({
      value: context.person?.firstName,
    }),
  },
  lastName: {
    component: TextField,
    props: (context, form) => ({
      label: "Last name",
      validate: (value) => {
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          typeof value !== "string"
        ) {
          return "This is required";
        }
      },
    }),
    initState: (context) => ({
      value: context.person?.lastName,
    }),
  },
  fullName: {
    component: TextField,
    props: (context, form) => ({
      label: "Full name",
      schema: yup.string().required(),
    }),
    deps: ["firstName", "lastName"],
    effect: (context, form, reason) => {
      form.setValue(
        "fullName",
        `${form.values.firstName} ${form.values.lastName}`
      );
    },
    initState: (context) => ({
      value: `${context.person?.firstName} ${context.person?.lastName}`,
    }),
  },
};
```

## Explanation

### component

Component to render. It will receive the props you passed through the `props` function, and a special `field` prop.

### props

Function that should return props you wish to pass to your component. There are 2 special props: `schema` and `validate`.
All others are arbitrary. It receives the arguments `context` and `form`.
Context are your external dependencies and the values in the object are completely arbitrary.
Form contains `values` and `errors` of the entire form.

### initState

Called on mount for each field, and on reset of the form. Should return initial `value` and/or `error`.
Receives `context` as an argument.

### deps

Fields upon which the field depends on. Every time anything related to those fields changes `props` and `effect` will be called,
and the field in question will be updated.

### effect

We do side effects here. The funciton receives `context`, `form`, and `reason` as arguments.
The `form` argument here also has mutational functions `setValue`, `setError`, and `validateField`.
The `reason` prop is why the effect was called. It's an object that contains the `name` of the field and the `type` of the update.
Name will be one of the fields in your `deps`.
