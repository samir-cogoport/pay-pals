import React from 'react'
import type { FieldErrors, FieldValues } from 'react-hook-form'

type ErrorMessageProps = {
	name: string
	errors: FieldErrors<FieldValues>
}

const ErrorMessage = ({ name, errors }: ErrorMessageProps) => {
	const message = errors[name]?.message

	if (typeof message !== 'string' || message.length === 0) {
		return null
	}

	return <div className='text-xs text-red-400'>{message}</div>
}

export default ErrorMessage
