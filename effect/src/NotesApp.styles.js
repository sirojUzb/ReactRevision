import styled from 'styled-components'

export const Wrapper = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 32px 20px;
`

export const Card = styled.section`
  width: min(100%, 620px);
  padding: 28px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow);
`

export const NotesHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  text-align: left;

  span { color: var(--text); font-size: 14px; }
`

export const Form = styled.form`
  display: flex;
  gap: 10px;
  margin: 24px 0;
`

export const TextInput = styled.input`
  min-width: 0;
  flex: 1;
  padding: 12px 14px;
  font: inherit;
  color: var(--text-h);
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;

  &:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
`

export const AddButton = styled.button`
  padding: 10px 18px;
  color: white;
  font: inherit;
  background: var(--accent);
  border: 0;
  border-radius: 8px;
  cursor: pointer;
`

export const NoteList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
`

export const NoteItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px;
  text-align: left;
  background: var(--code-bg);
  border-radius: 10px;
`

export const NoteText = styled.p`
  color: var(--text-h);
  overflow-wrap: anywhere;
`

export const NoteTime = styled.time`
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: var(--text);
`

export const DeleteButton = styled.button`
  flex: 0 0 auto;
  padding: 7px 10px;
  color: #b42318;
  font: inherit;
  font-size: 13px;
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 6px;
  cursor: pointer;
`

export const EmptyState = styled.p`
  padding: 24px;
  color: var(--text);
  background: var(--code-bg);
  border-radius: 10px;
`
