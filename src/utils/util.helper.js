export const getDateStatus = (row) => {
    const currentDate = new Date();
    if (currentDate > new Date(row.event_date)) {
        return 'DONE';
    }
    return 'UPCOMING';
}

export const getStatus = (row) => {
    if (row.is_active) {
        return 'ACTIVE';
    }
    return 'INACTIVE';
}

export const getDate = (date) => {
    const dateFormated = new Date(date);
        const year = dateFormated.getFullYear();
        const month = String(dateFormated.getMonth() + 1).padStart(2, '0');
        const day = String(dateFormated.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}