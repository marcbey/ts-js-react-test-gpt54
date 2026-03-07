import { useEffect, useRef, useState } from 'react'

type UseLocalStorageStateOptions<T> = {
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
}

export const useLocalStorageState = <T,>(
  key: string,
  initialValue: T,
  options: UseLocalStorageStateOptions<T> = {},
) => {
  const serializeRef = useRef(options.serialize ?? JSON.stringify)
  const deserializeRef = useRef(options.deserialize ?? ((value: string) => JSON.parse(value) as T))
  const initialValueRef = useRef(initialValue)

  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValueRef.current

    const storedValue = window.localStorage.getItem(key)
    if (storedValue === null) return initialValueRef.current

    try {
      return deserializeRef.current(storedValue)
    } catch {
      return initialValueRef.current
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const serializedValue = serializeRef.current(value)

    if (window.localStorage.getItem(key) !== serializedValue) {
      window.localStorage.setItem(key, serializedValue)
    }
  }, [key, value])

  return [value, setValue] as const
}
