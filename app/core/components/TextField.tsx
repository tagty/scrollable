import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface TextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps}>
        <label>
          <input {...input} disabled={submitting} {...props} ref={ref} />
        </label>

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}

        <style jsx>{`
          input {
            font-size: 1rem;
            padding: 0.75rem;
            border-radius: 3px;
            border: 1px solid #cdc9c9;
            appearance: none;
            margin: 0.5rem 0;
            width: 800px;
          }
        `}</style>
      </div>
    )
  }
)

export default TextField
