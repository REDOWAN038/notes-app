import { useState } from "react"
import { MdAdd, MdClose } from "react-icons/md"
const Tag = ({ tags, setTags }) => {
    const [tag, setTag] = useState("")
    const handleTag = (e) => {
        setTag(e.target.value)
    }

    const addNewTag = () => {
        if (tag.trim !== "") {
            setTags([...tags, tag.trim()])
            setTag("")
        }
    }

    const handleKeyDown = (e) => {
        if (e.key == "Enter") {
            addNewTag()
        }
    }

    const handleRemoveTag = (removeTag) => {
        setTags(tags.filter((val) => val !== removeTag))
    }

    return (
        <div>
            {tags?.length > 0 ? (
                <div className='flex items-center gap-2 flex-wrap mt-2'>
                    {tags.map((val, idx) => (
                        <span
                            key={idx}
                            className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'
                        >
                            # {val}
                            <button
                                onClick={() => {
                                    handleRemoveTag(val)
                                }}
                            >
                                <MdClose />
                            </button>
                        </span>
                    ))}
                </div>
            ) : null}

            <div className='flex items-center gap-4 mt-3'>
                <input
                    type='text'
                    className='text-sm bg-transparent border px-3 py-2 rounded outline-none'
                    placeholder='Add Tags'
                    value={tag}
                    onChange={handleTag}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700'
                    onClick={() => addNewTag()}
                >
                    <MdAdd className='text-2xl text-blue-700 hover:text-white' />
                </button>
            </div>
        </div>
    )
}

export default Tag
