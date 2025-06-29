'use client'

import { useSearchParams } from 'next/navigation'

const getErrorMessage = (error: string | null) => {
  switch (error) {
    case 'Configuration':
      return 'There is a problem with the server configuration.'
    case 'AccessDenied':
      return 'You do not have permission to access this resource.'
    case 'Verification':
      return 'The verification link may have expired or already been used.'
    default:
      return 'An unexpected error occurred.'
  }
}

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const errorMessage = getErrorMessage(error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {errorMessage}
          </div>
          <div className="mt-4 text-center">
            <a
              href="/auth/login"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Return to login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
