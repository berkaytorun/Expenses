export const getFormattedDate = (date) => {
    // Get the date as a string in the format 'MM/DD/YYYY'.
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
};

export const getDateMinusDays = (date, days) => {
    // Get a new date object with the specified number of days subtracted from the date.
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
};
