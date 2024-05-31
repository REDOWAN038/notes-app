const Empty = ({ message }) => {
    return (
        <div className='flex items-center justify-center mt-20'>
            <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
                {message}
            </p>
        </div>
    )
}

export default Empty
