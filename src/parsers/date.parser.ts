export class DateParser {
    public static addDurationToCurrentDate(duration: string) {
        const durationParts = DateParser.normalizeDurationInput(duration);

        let hours = 0,
            minutes = 0,
            seconds = 0,
            days = 0;

        for (const part of durationParts) {
            if (part.includes('h')) {
                hours += parseInt(part, 10);
            } else if (part.includes('m')) {
                minutes += parseInt(part, 10);
            } else if (part.includes('s')) {
                seconds += parseInt(part, 10);
            } else if (part.includes('d')) {
                days += parseInt(part, 10);
            }
        }

        const currentDate = new Date();
        const futureDate = new Date(
            currentDate.getTime() + days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000,
        );

        return futureDate;
    }

    public static normalizeDurationInput(input: string): string {
        const replacements: { [key: string]: string[] } = {
            d: ['d', 'day', 'days', 'jour', 'jours'],
            h: ['h', 'hour', 'hours', 'heure', 'heures'],
            m: ['m', 'min', 'minute', 'minutes'],
            s: ['s', 'sec', 'second', 'seconds', 'seconde', 'secondes'],
        };

        const normalizedInput = input
            .replaceAll(' ', '')
            .toLowerCase()
            .replace(/(\d+)\s*([a-z]+)/gi, (match, value, unit) => {
                const normalizedUnit = Object.keys(replacements).find((key) => replacements[key].includes(unit.toLowerCase())) || unit;
                return `${value}${normalizedUnit}`;
            });

        return normalizedInput;
    }
}
