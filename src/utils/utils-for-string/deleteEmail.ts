export default function deleteEmailPart(email: string): string {
	const atIndex = email.indexOf('@')
	if (atIndex !== -1) {
		return email.substring(0, atIndex)
	}
	return email
}

export function formattingForDB(email: string): string {
	const atIndex = email.indexOf('@')
	const withoutAt = email.split('@').join('_')
	const clearKey = withoutAt.split('.').join('_')
	if (atIndex !== -1) {
		return clearKey
	}
	return email
}
