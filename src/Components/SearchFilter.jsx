import { useState } from "react"
import { useAxios } from "../hooks/useAxios"
import { useDebounce } from "../hooks/useDebounce"

export const SearchFilter = () => {
    const [data] = useAxios('https://jsonplaceholder.typicode.com/users')

    const [searchValue, setSearchValue] = useState('')

    // Invoke useDebounce custom hook
    const [debouncedValue, handleDebounce] = useDebounce(searchValue, 1000)

    const handleSearch = (e) => {
        const searchText = e.target.value
        setSearchValue(searchText)
        handleDebounce(searchText)
    }

    const filterData = data.filter((ele) => {
        const result = ele.name.toLowerCase().includes(debouncedValue)
        return result
    })
        
    return (
        <>
            <h1 style={{textAlign:"center",marginTop:"1rem"}} className="text-dark">
                Debounce Search Filter
            </h1>

            <div className="form-group mx-2">
                <input 
                    type="text"  
                    value={searchValue}
                    onChange={handleSearch}
                    placeholder="Search by name..."
                    className="form-control form-control-sm"
                />
            </div>

            {
                data && <table className="table table-sm table-striped">
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                City
                            </th>
                            <th>
                                Population
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterData?.map((country,i) => {
                                const {
                                    name,
                                    address,
                                    website
                                } = country
                                const { city } = address || {};
                                return (
                                    <tr key={i}>
                                        <td>
                                            {name}
                                        </td>
                                        <td>
                                            {city}
                                        </td>
                                        <td>
                                            {website}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
        </>
    )
}
