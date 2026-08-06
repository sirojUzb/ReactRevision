import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex-grow: 1;
  place-content: center;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 32px 40px;
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow);
  min-width: 320px;
`

export const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text);
`

export const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text);
  transition: background 0.3s;

  ${(props) =>
    props.$running &&
    css`
      background: var(--accent);
      box-shadow: 0 0 0 4px var(--accent-bg);
      animation: pulse 1s ease-in-out infinite;
    `}

  @keyframes pulse {
    50% {
      opacity: 0.4;
    }
  }
`

export const Display = styled.p`
  font-family: var(--mono);
  font-size: 56px;
  font-weight: 500;
  color: var(--text-h);
  letter-spacing: 1px;
  margin: 0;
`

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--code-bg);
  overflow: hidden;
`

export const ProgressFill = styled.div`
  height: 100%;
  background: var(--accent);
  transition: width 0.1s linear;
`

export const Controls = styled.div`
  display: flex;
  gap: 12px;
`

export const Button = styled.button`
  font-size: 16px;
  padding: 10px 24px;
  border-radius: 8px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  cursor: pointer;
  transition:
    border-color 0.3s,
    opacity 0.3s;

  &:hover:not(:disabled) {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  ${(props) =>
    (props.$variant === 'lap' || props.$variant === 'reset') &&
    css`
      color: var(--text);
      background: var(--code-bg);
    `}
`

export const Laps = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 160px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const LapItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 10px;
  border-radius: 6px;
  font-family: var(--mono);
  font-size: 14px;
  color: var(--text);

  ${(props) =>
    props.$best &&
    css`
      color: var(--accent);
      background: var(--accent-bg);
    `}
  ${(props) =>
    props.$worst &&
    css`
      opacity: 0.6;
    `}
`

export const Hint = styled.p`
  font-size: 13px;
  color: var(--text);
  opacity: 0.6;
  margin: 0;
`
