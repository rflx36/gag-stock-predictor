


export const convertUnixTimestamp = (unixTimestamp: string | number) => {
    const timestamp = typeof unixTimestamp == "string" ? parseInt(unixTimestamp) : unixTimestamp;

    const targetDate = new Date(timestamp * 1000);
    const currentDate = new Date();

    const diffMs = targetDate.getTime() - currentDate.getTime();
    const absDiffMs = Math.abs(diffMs);

    const seconds = Math.floor(absDiffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    let stockIn: string;

    if (days > 0) {
        const remainingHours = hours % 24;
        stockIn = `${days} ${days === 1 ? 'Day' : 'Days'}${remainingHours > 0 ? ` and ${remainingHours} ${remainingHours === 1 ? 'Hour' : 'Hours'}` : ''}`;
    } else if (hours > 0) {
        const remainingMinutes = minutes % 60;
        stockIn = `${hours} ${hours === 1 ? 'Hour' : 'Hours'}${remainingMinutes > 0 ? ` and ${remainingMinutes} ${remainingMinutes === 1 ? 'Minute' : 'Minutes'}` : ''}`;
    } else if (minutes > 0) {
        stockIn = `${minutes} ${minutes === 1 ? 'Minute' : 'Minutes'}`;
    } else {
        stockIn = `${seconds} ${seconds === 1 ? 'Second' : 'Seconds'}`;
    }

    const dateFormatted = targetDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).replace(/(\w{3}) (\d{1,2}), \d{4} at /, '$1, $2 ');

    return {
        stock_in: stockIn,
        date: dateFormatted
    };

}

export const getCurrentUnixTimestamp = () => {
    return Math.floor(Date.now() / 1000)
}
