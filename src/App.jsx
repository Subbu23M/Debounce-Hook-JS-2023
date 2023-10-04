import { useState } from "react"
import { useDebounce } from "./hooks/useDebounce"
import { SearchFilter } from "./Components/SearchFilter"

export const App = () => {
    const [inputValue, setInputValue] = useState('')

    // Invoke useDebounce custom hook
    const [debouncedValue, handleDebounce] = useDebounce(inputValue, 1000)

    const handleChange = (e) => {
        const eventvalue = e.target.value
        setInputValue(eventvalue)
        handleDebounce(eventvalue)
    }
    return (
        <>
            <h1 style={{textAlign:"center",marginTop:"1rem"}} className="text-primary">
                Debounce Input 
            </h1>

            <form>
                <div className="form-group mx-2">
                    <input 
                        type="text"  
                        value={inputValue}
                        onChange={handleChange}
                        className="form-control form-control-sm"
                    />
                </div>
            </form>
            <div className="text-center lead">
                <p>
                    Without Debouncing - {inputValue}
                </p>
                <p>
                    With Debouncing - {debouncedValue}
                </p>
            </div>
            <SearchFilter/>
        </>
    )
}