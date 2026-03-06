import { useEffect, useState } from 'react'

type UseLocalStorageStateOptions<T> = {
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
}

export const useLocalStorageState = <T,>(
  key: string,
  initialValue: T,
  options: UseLocalStorageStateOptions<T> = {},
) => {
  const serialize = options.serialize ?? JSON.stringify
  const deserialize = options.deserialize ?? ((value: string) => JSON.parse(value) as T)

  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue

    const storedValue = window.localStorage.getItem(key)
    if (storedValue === null) return initialValue

    try {
      return deserialize(storedValue)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(key, serialize(value))
  }, [key, serialize, value])

  return [value, setValue] as const
}
