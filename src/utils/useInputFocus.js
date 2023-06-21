import { useEffect} from 'react'

const useInputFocus = (onItemChanged, inputRef) =>
  useEffect(() => {
    inputRef.current.focus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onItemChanged])

export default useInputFocus
