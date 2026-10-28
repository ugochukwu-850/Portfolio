const formatter = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	day: 'numeric',
	year: 'numeric',
	timeZone: 'UTC'
});

/** `2026-08-27` → `Aug 27, 2026` */
export function formatDate(iso: string) {
	return iso ? formatter.format(new Date(`${iso}T00:00:00Z`)) : '';
}

export const pad = (n: number) => String(n).padStart(2, '0');
