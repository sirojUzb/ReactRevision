import { useEffect, useRef, useState } from 'react'
import {
  AddButton,
  Card,
  DeleteButton,
  EmptyState,
  Form,
  NoteItem,
  NoteList,
  NoteText,
  NoteTime,
  NotesHeader,
  TextInput,
  Wrapper,
} from './NotesApp.styles'

const STORAGE_KEY = 'react-revision-notes'

function getSavedNotes() {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY)
    return savedNotes ? JSON.parse(savedNotes) : []
  } catch {
    return []
  }
}

function NotesApp() {
  const [notes, setNotes] = useState(getSavedNotes)
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const trimmedText = text.trim()

    if (!trimmedText) return

    setNotes((currentNotes) => [
      { id: crypto.randomUUID(), text: trimmedText, createdAt: Date.now() },
      ...currentNotes,
    ])
    setText('')
    inputRef.current?.focus()
  }

  const deleteNote = (id) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id))
  }

  return (
    <Wrapper>
      <h1>My Notes</h1>

      <Card>
        <NotesHeader>
          <h2>Yangi note qo‘shing</h2>
          <span>{notes.length} ta note</span>
        </NotesHeader>

        <Form onSubmit={addNote}>
          <TextInput
            ref={inputRef}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Masalan, useEffect ni takrorlash..."
            aria-label="Yangi note"
          />
          <AddButton type="submit">Qo‘shish</AddButton>
        </Form>

        {notes.length === 0 ? (
          <EmptyState>Hali notelar yo‘q. Birinchi noteni yozing.</EmptyState>
        ) : (
          <NoteList>
            {notes.map((note) => (
              <NoteItem key={note.id}>
                <div>
                  <NoteText>{note.text}</NoteText>
                  <NoteTime>
                    {new Date(note.createdAt).toLocaleString('uz-UZ')}
                  </NoteTime>
                </div>
                <DeleteButton onClick={() => deleteNote(note.id)} aria-label="Noteni o‘chirish">
                  O‘chirish
                </DeleteButton>
              </NoteItem>
            ))}
          </NoteList>
        )}
      </Card>
    </Wrapper>
  )
}

export default NotesApp
