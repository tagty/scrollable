import { Form, FormProps } from "app/core/components/Form"
import { TextField } from "app/core/components/TextField"
import { LabeledMDEditor } from "app/core/components/LabeledMDEditor"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function PresentationForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <TextField name="title" label="Title" placeholder="Title" />
      <LabeledMDEditor name="text" />
    </Form>
  )
}
