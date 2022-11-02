export const getFormattedDate = (date) => {
    // Get the date as a string in the format 'MM/DD/YYYY'.
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
};
