---
id: quickstart
title: Quickstart
sidebar_label: Quickstart
---

## Install

```bash
npm i @formx/formx
```

## Create your configuration

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

## Create your component

```tsx
const TextField = ({ label, isVisible, field, background }) => {
  if (typeof isVisible === "boolean" && !isVisible) return null;

  return (
    <div style={{ background }}>
      <h4>{label}</h4>
      <input
        type="text"
        {...field}
        value={field.value ?? ""}
        onChange={(e) => field.onChange(e.target.value)}
      />
      {field.error}
    </div>
  );
};
```

### Explanation

There is a special prop passed to you components called `field`.
It includes following things:

- value
- onChange
- onBlur
- error
- focusRef (should be passed to something with a`focus()` method.

Every other prop is arbitrary.

These props are passed with `props` function in the configuration.

## Wire everything up

```tsx
import { Form } from "@formx/formx";

export const App = () => {
  const [person, setPerson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = React.useRef<Form>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const person = await getPerson();
      setPerson(person);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!formRef.current) return;
    formRef.current.resetForm();
  }, [person]);

  const context = {
    person,
  };

  return (
    <Form
      config={config}
      context={context}
      onSubmit={(originalValues, transformedValues) =>
        console.log(originalValues, transformedValues)
      }
      applyProps={(name, config) => {
        if (name === "firstName") {
          return {
            background: "yellow",
          };
        }
      }}
      ref={formRef}
    >
      {({ fields, submitForm, resetForm, subscribe }) => {
        return (
          <div>
            {isLoading && <h1>Loading person...</h1>}
            {fields.firstName}
            {fields.lastName}
            {fields.fullName}
            <button onClick={() => submitForm()}>Submit</button>
            <button onClick={() => resetForm()}>Reset</button>
          </div>
        );
      }}
    </Form>
  );
};
```

### Explanation

We're using the Form component and we're passing it 4 things:

- `config` - Your config object
- `onSubmit` - Function that will be called when you submit if all fields are valid. It will be called with values and transformed values.
- `context` - External dependencies. In this case, it's a person object that we get from the server.
- `ref`- Ref to the Form component. We use this to reset the form from the outside when the person object arrives from the server.
- `applyProps` - Function that receives the name and config of the field whose props will be merged and overriden by what this fn returns.
