import { PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import MDEditor from "@uiw/react-md-editor"
import "@uiw/react-md-editor/dist/markdown-editor.css"
import "@uiw/react-markdown-preview/dist/markdown.css"

export interface LabeledMDEditorProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledMDEditor = ({ name }) => {
  const { input } = useField(name)

  return (
    <div>
      <MDEditor value={input.value} onChange={input.onChange} height={550} />
    </div>
  )
}

export default LabeledMDEditor
