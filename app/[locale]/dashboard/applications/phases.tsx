'use client'

export default function Component() {
  return (
    <div className='bg-[#e6f7ff] p-10'>
      <div className='flex justify-between items-center mb-6'>
        <GiftIcon className='text-red-600' />
        <div className='flex space-x-4'>
          <div className='flex flex-col items-center'>
            <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-blue-600'>
              <span className='text-sm font-bold text-blue-600'>1</span>
            </div>
            <span className='text-xs mt-1'>Start order</span>
          </div>
          <div className='flex flex-col items-center'>
            <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-blue-600'>
              <span className='text-sm font-bold text-blue-600'>2</span>
            </div>
            <span className='text-xs mt-1'>Prepare gift</span>
          </div>
          <div className='flex flex-col items-center'>
            <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-blue-600'>
              <span className='text-sm font-bold text-blue-600'>3</span>
            </div>
            <span className='text-xs mt-1'>Pack gift</span>
          </div>
          <div className='flex flex-col items-center'>
            <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-blue-600'>
              <span className='text-sm font-bold text-blue-600'>4</span>
            </div>
            <span className='text-xs mt-1'>Decorate box</span>
          </div>
          <div className='flex flex-col items-center'>
            <div className='flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-blue-600'>
              <span className='text-sm font-bold text-blue-600'>5</span>
            </div>
            <span className='text-xs mt-1'>Send gift</span>
          </div>
        </div>
        <GiftIcon className='text-red-600' />
      </div>
      <div className='max-w-2xl mx-auto bg-white rounded-lg p-6 shadow'>
        <h2 className='text-xl font-semibold mb-4'>Send gift</h2>
        <p className='text-sm'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tortor
          ipsum, eleifend vitae massa non, dignissim finibus eros. Maecenas non
          eros tristique nisl maximus sollicitudin.
        </p>
      </div>
    </div>
  )
}

function GiftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='20 12 20 22 4 22 4 12' />
      <rect width='20' height='5' x='2' y='7' />
      <line x1='12' x2='12' y1='22' y2='7' />
      <path d='M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z' />
      <path d='M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z' />
    </svg>
  )
}
