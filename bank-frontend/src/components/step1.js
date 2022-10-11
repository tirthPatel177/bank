import React from 'react'

export default function Step1({ step, setStep }) {
  return (
    <div>
      <div className=''>
        <div>
          <div className='flex items-center justify-center'>
            <div className='text-center'>
              <h1 className='font-bold text-3xl'>Welcome! First thing first...</h1>
              <p className='text-text1'>You can always change them later.</p>
            </div>
          </div>

          <div>

            <div className='flex items-center justify-center'>
              <div className='mt-12 inner-box'>
                <div>
                  <p className='text-base text-text2'>
                    Full Name
                  </p>
                  <input type="text" name="fname" className='p-2 w-full mt-1 outline-none border text-text3 border-border rounded-md' placeholder='Steve Jobs' />
                </div>
                <div className='mt-6'>
                  <p className='text-base text-text2'>
                    Display Name
                  </p>
                  <input type="text" name='dname' className='p-2 w-full mt-1 outline-none border text-text3 border-border rounded-md' placeholder='Steve' />
                </div>
                <div className='mt-6 mb-32'>
                  <button
                    className='bg-steps text-white p-4 w-full rounded-md'
                    onClick={() => setStep(2)}
                  >
                    Create Workspace
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
