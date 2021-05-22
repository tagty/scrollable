import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextAreaProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  placeholder?: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextArea = forwardRef<HTMLTextAreaElement, LabeledTextAreaProps>(
  ({ name, label, placeholder, outerProps }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps}>
        <label>
          {label}
          <textarea
            {...input}
            disabled={submitting}
            placeholder={placeholder}
            ref={ref}
            rows={10}
          />
        </label>

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 1rem;
            font-weight: bold;
          }

          textarea {
            font-size: 1rem;
            padding: 0.75rem;
            border-radius: 3px;
            border: 1px solid purple;
            appearance: none;
            margin-top: 0.5rem;
            width: 800px;
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledTextArea
