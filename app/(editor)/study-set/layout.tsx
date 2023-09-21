interface StudysetEditorProps {
  children?: React.ReactNode
}

export default function StudysetEditorLayout({ children }: StudysetEditorProps) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">
      {children}
    </div>
  )
}
